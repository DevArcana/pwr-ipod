import { textTransformToOneLine } from "../../../transformers/text/oneLine";
import { AbstractTextComponent } from "./AbstractTextComponent";

export class OneLineComponent extends AbstractTextComponent {
  constructor() {
    super("Remove new lines");
  }

  transformation(input: string): string {
    return textTransformToOneLine(input);
  }
}
