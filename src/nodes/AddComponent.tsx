import Rete from "rete";
import { NumControl } from "../controls/NumControl";
import { numSocket } from "../sockets";
// @ts-ignore
import { Control, Node, Socket } from "rete-react-render-plugin";

class Component extends Node {
  private props: any;
  private state!: {
    outputs: any[];
    controls: any[];
    inputs: any[];
    selected: boolean;
  };

  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;

    return (
      <div className={`node ${selected}`}>
        <div className="title">{node.name}</div>
        {/* Outputs */}
        {outputs.map((output) => (
          <div className="output" key={output.key}>
            <div className="output-title">{output.name}</div>
            <Socket
              type="output"
              socket={output.socket}
              io={output}
              innerRef={bindSocket}
            />
          </div>
        ))}
        {/* Controls */}
        {controls.map((control) => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Inputs */}
        {inputs.map((input) => (
          <div className="input" key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
            {!input.showControl() && (
              <div className="input-title">{input.name}</div>
            )}
            {input.showControl() && (
              <Control
                className="input-control"
                control={input.control}
                innerRef={bindControl}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export class AddComponent extends Rete.Component {
  constructor() {
    super("Add");

    // @ts-ignore
    this.data.component = Component;
  }

  // @ts-ignore
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

  // @ts-ignore
  worker(node, inputs, outputs) {
    const n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    const n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
    const sum = n1 + n2;

    const editor = this.editor!;

    const preview = editor.nodes
      .find((n) => n.id === node.id)!
      .controls.get("preview")!;

    // @ts-ignore
    preview.setValue(sum);

    outputs["num"] = sum;
  }
}
