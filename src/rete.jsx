import React, {useEffect, useRef, useState} from "react";
import Rete from "rete";
import {createRoot} from "react-dom/client";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import Context from "efficy-rete-context-menu-plugin";
import {MyNode} from "./MyNode";
import {NumControl} from "./controls/NumControl";
import {numSocket} from "./sockets";
import {NumComponent} from "./nodes/NumComponent";
import {TextComponent} from "./nodes/TextComponent";

class AddComponent extends Rete.Component {
    constructor() {
        super("Add");
        this.data.component = MyNode; // optional
    }

    builder(node) {
        const inp1 = new Rete.Input("num1", "Number", numSocket);
        const inp2 = new Rete.Input("num2", "Number2", numSocket);
        const out = new Rete.Output("num", "Number", numSocket);

        inp1.addControl(new NumControl(this.editor, "num1", node));
        inp2.addControl(new NumControl(this.editor, "num2", node));

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, "preview", node, true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        const n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        const n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        const sum = n1 + n2;

        this.editor.nodes
            .find((n) => n.id == node.id)
            .controls.get("preview")
            .setValue(sum);
        outputs["num"] = sum;
    }
}

export async function createEditor(container) {
    const components = [new NumComponent(), new AddComponent(), new TextComponent()];

    const editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin, {createRoot});
    editor.use(Context);

    const engine = new Rete.Engine("demo@0.1.0");

    components.map((c) => {
        editor.register(c);
        engine.register(c);
    });

    const n1 = await components[0].createNode({num: 2});
    const n2 = await components[0].createNode({num: 3});
    const add = await components[1].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
    editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

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
