import React, {useEffect, useRef, useState} from "react";
import Rete from "rete";
import {createRoot} from "react-dom/client";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import Context from "efficy-rete-context-menu-plugin";

import {NumComponent} from "./nodes/NumComponent";
import {TextComponent} from "./nodes/TextComponent";
import {AddComponent} from "./nodes/AddComponent";
import {EditorInputComponent} from "./nodes/EditorInputComponent";
import {EditorOutputComponent} from "./nodes/EditorOutputComponent";
import {ParserComponent} from "./nodes/ParserComponent";
import {EmitterComponent} from "./nodes/EmitterComponent";
import {JsonStringifyComponent} from "./nodes/JsonStringifyComponent";
import {TextFallbackComponent} from "./nodes/TextFallbackComponent";

export async function createEditor(container) {
    const components = [
        new EditorInputComponent(),   // 0
        new EditorOutputComponent(),  // 1
        new ParserComponent(),        // 2
        new EmitterComponent(),       // 3
        new JsonStringifyComponent(), // 4
        new TextFallbackComponent(),  // 5
        new NumComponent(),
        new AddComponent(),
        new TextComponent(),
    ];

    const editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin, {createRoot});
    editor.use(Context);

    const engine = new Rete.Engine("demo@0.1.0");

    components.map((c) => {
        editor.register(c);
        engine.register(c);
    });

    const input = await components[0].createNode();
    const parser = await components[2].createNode();
    const emitter = await components[3].createNode();
    const output = await components[1].createNode();
    const stringifyException = await components[4].createNode();
    const stringifyAst = await components[4].createNode();
    const fallback = await components[5].createNode();

    input.position = [0, 0];
    parser.position = [250, 0];
    emitter.position = [500, 0];
    stringifyException.position = [500, 150];
    stringifyAst.position = [500, -150];
    fallback.position = [750, 0];
    output.position = [1000, 0];

    editor.addNode(input);
    editor.addNode(parser);
    editor.addNode(emitter);
    editor.addNode(stringifyException);
    editor.addNode(stringifyAst);
    editor.addNode(fallback);
    editor.addNode(output);

    editor.connect(input.outputs.get("text"), parser.inputs.get("text"));
    editor.connect(parser.outputs.get("ast"), emitter.inputs.get("ast"));
    editor.connect(parser.outputs.get("ast"), stringifyAst.inputs.get("anything"));
    editor.connect(parser.outputs.get("exception"), stringifyException.inputs.get("anything"));
    editor.connect(emitter.outputs.get("text"), fallback.inputs.get("text1"));
    editor.connect(stringifyException.outputs.get("text"), fallback.inputs.get("text2"));
    editor.connect(fallback.outputs.get("text"), output.inputs.get("text"));

    editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        async () => {
            await engine.abort();
            await engine.process(editor.toJSON());
        }
    );

    editor.view.resize();
    editor.trigger("process");
    AreaPlugin.zoomAt(editor, editor.nodes);

    return editor;
}

export function useRete() {
    const [container, setContainer] = useState(null);
    const editorRef = useRef();

    useEffect(() => {
        if (container) {
            createEditor(container).then((value) => {
                editorRef.current = value;
            });
        }
    }, [container]);

    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, []);

    return [setContainer];
}
