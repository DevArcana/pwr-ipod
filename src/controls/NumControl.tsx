import Rete from "rete";
import React from "react";

interface Props {
  readonly: boolean;
  value: number;
  onChange: (value: number) => void;
}

type Component = React.FunctionComponent<Props>;

const component: Component = ({ value, onChange }) => (
  <input
    type="number"
    value={value}
    ref={(ref) => {
      ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
    }}
    onChange={(e) => onChange(+e.target.value)}
  />
);

export class NumControl extends Rete.Control {
  private emitter: any;
  private component: Component;
  private props: Props;

  constructor(emitter: any, key: any, node: any, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = component;

    const initial = node.data[key] || 0;

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

  setValue(value: number) {
    this.props.value = value;
    this.putData(this.key, value);

    // @ts-ignore
    this.update();
  }
}