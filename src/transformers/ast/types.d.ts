declare namespace acornTypes {
  export interface NodeLiteral {
    type: string;
    start: number;
    end: number;
    value: string;
    raw: string;
  }
}
