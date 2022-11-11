import Rete from "rete";
import React from "react";

interface Props {
  readonly: boolean;
  value: string;
  onChange: (value: string) => void;
}

type Component = React.FunctionComponent<Props>;

const component: Component = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    ref={(ref) => {
      ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
    }}
    onChange={(e) => onChange(e.target.value)}
  />
);

export class TextControl extends Rete.Control {
  private emitter: any;
  private component: Component;
  private props: Props;

  constructor(emitter: any, key: any, node: any, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = component;

    const initial = node.data[key] || "";

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      },
    };
  }

  setValue(value: string) {
    this.props.value = value;
    this.putData(this.key, value);

    // @ts-ignore
    this.update();
  }
}