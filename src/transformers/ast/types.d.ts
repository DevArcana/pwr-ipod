// types for es2020
// https://github.com/estree/estree

declare namespace acornTypes {
  export interface Node {
    type: string;
    loc: SourceLocation | null;
  }

  export interface SourceLocation {
    source: string | null;
    start: Position;
    end: Position;
  }

  export interface Position {
    line: number; // >= 1
    column: number; // >= 0
  }

  export interface Identifier extends Expression, Pattern {
    type: "Identifier";
    name: string;
  }

  export interface Literal extends Expression {
    type: "Literal";
    value: string | boolean | null | number | RegExp | bigint;
    raw: string;
  }

  export interface BigIntLiteral extends Literal {
    bigint: string;
  }

  export interface RegExpLiteral extends Literal {
    regex: {
      pattern: string;
      flags: string;
    };
  }

  export interface Program extends Node {
    type: "Program";
    body: [Directive | Statement];
    sourceType: "script" | "module";
    body: [Statement | ModuleDeclaration];
  }

  export interface Function extends Node {
    id: Identifier | null;
    params: [Pattern];
    body: FunctionBody;
  }

  export interface Statement extends Node {}

  export interface ExpressionStatement extends Statement {
    type: "ExpressionStatement";
    expression: Expression;
  }

  export interface Directive extends ExpressionStatement {
    expression: Literal;
    directive: string;
  }

  export interface BlockStatement extends Statement {
    type: "BlockStatement";
    body: [Statement];
  }

  export interface FunctionBody extends BlockStatement {
    body: [Directive | Statement];
  }

  export interface EmptyStatement extends Statement {
    type: "EmptyStatement";
  }

  export interface DebuggerStatement extends Statement {
    type: "DebuggerStatement";
  }

  export interface WithStatement extends Statement {
    type: "WithStatement";
    object: Expression;
    body: Statement;
  }

  export interface ReturnStatement extends Statement {
    type: "ReturnStatement";
    argument: Expression | null;
  }

  export interface LabeledStatement extends Statement {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
  }

  export interface BreakStatement extends Statement {
    type: "BreakStatement";
    label: Identifier | null;
  }

  export interface ContinueStatement extends Statement {
    type: "ContinueStatement";
    label: Identifier | null;
  }

  export interface IfStatement extends Statement {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
  }

  export interface SwitchStatement extends Statement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: [SwitchCase];
  }

  export interface SwitchCase extends Node {
    type: "SwitchCase";
    test: Expression | null;
    consequent: [Statement];
  }

  export interface ThrowStatement extends Statement {
    type: "ThrowStatement";
    argument: Expression;
  }

  export interface TryStatement extends Statement {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
  }

  export interface CatchClause extends Node {
    type: "CatchClause";
    param: Pattern | null;
    body: BlockStatement;
  }

  export interface WhileStatement extends Statement {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
  }
  export interface DoWhileStatement extends Statement {
    type: "DoWhileStatement";
    body: Statement;
    test: Expression;
  }

  export interface ForStatement extends Statement {
    type: "ForStatement";
    init: VariableDeclaration | Expression | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
  }

  export interface ForInStatement extends Statement {
    type: "ForInStatement";
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
  }

  export interface Declaration extends Statement {}

  export interface FunctionDeclaration extends Function, Declaration {
    type: "FunctionDeclaration";
    id: Identifier;
  }
  export interface VariableDeclaration extends Declaration {
    type: "VariableDeclaration";
    declarations: [VariableDeclarator];
    kind: "var" | "let" | "const";
  }

  export interface VariableDeclarator extends Node {
    type: "VariableDeclarator";
    id: Pattern;
    init: Expression | null;
  }

  export interface Expression extends Node {}

  export interface ThisExpression extends Expression {
    type: "ThisExpression";
  }

  export interface ArrayExpression extends Expression {
    type: "ArrayExpression";
    elements: [Expression | SpreadElement | null];
  }

  export interface ObjectExpression extends Expression {
    type: "ObjectExpression";
    properties: [Property | SpreadElement];
  }

  export interface ObjectPattern {
    type: "ObjectPattern";
    properties: [AssignmentProperty | RestElement];
  }

  export interface Property extends Node {
    type: "Property";
    value: Expression;
    kind: "init" | "get" | "set";
    key: Expression;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
  }

  export interface FunctionExpression extends Function, Expression {
    type: "FunctionExpression";
  }

  export interface UnaryExpression extends Expression {
    type: "UnaryExpression";
    operator: "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";
    prefix: boolean;
    argument: Expression;
  }

  export interface UpdateExpression extends Expression {
    type: "UpdateExpression";
    operator: "++" | "--";
    argument: Expression;
    prefix: boolean;
  }

  export interface BinaryExpression extends Expression {
    type: "BinaryExpression";
    operator:
      | "=="
      | "!="
      | "==="
      | "!=="
      | "<"
      | "<="
      | ">"
      | ">="
      | "<<"
      | ">>"
      | ">>>"
      | "+"
      | "-"
      | "*"
      | "/"
      | "%"
      | "|"
      | "^"
      | "&"
      | "in"
      | "instanceof"
      | "**";
    left: Expression;
    right: Expression;
  }

  export interface AssignmentExpression extends Expression {
    type: "AssignmentExpression";
    operator:
      | "="
      | "+="
      | "-="
      | "*="
      | "/="
      | "%="
      | "<<="
      | ">>="
      | ">>>="
      | "|="
      | "^="
      | "&="
      | "**=";
    right: Expression;
    left: Pattern;
  }

  export interface LogicalExpression extends Expression {
    type: "LogicalExpression";
    operator: "||" | "&&" | "??";
    left: Expression;
    right: Expression;
  }

  export interface MemberExpression extends Expression, Pattern, ChainElement {
    type: "MemberExpression";
    object: Expression | Super;
    property: Expression;
    computed: boolean;
  }

  export interface ConditionalExpression extends Expression {
    type: "ConditionalExpression";
    test: Expression;
    alternate: Expression;
    consequent: Expression;
  }

  export interface CallExpression extends ChainElement {
    type: "CallExpression";
    callee: Expression | Super;
    arguments: [Expression | SpreadElement];
  }

  export interface NewExpression extends Expression {
    type: "NewExpression";
    callee: Expression;
    arguments: [Expression | SpreadElement];
  }

  export interface SequenceExpression extends Expression {
    type: "SequenceExpression";
    expressions: [Expression];
  }

  export interface Pattern extends Node {}

  export interface Function {
    generator: boolean;
    async: boolean;
  }

  export interface ForOfStatement extends ForInStatement {
    type: "ForOfStatement";
    await: boolean;
  }

  export interface Super extends Node {
    type: "Super";
  }

  export interface SpreadElement extends Node {
    type: "SpreadElement";
    argument: Expression;
  }

  export interface ArrowFunctionExpression extends Function, Expression {
    type: "ArrowFunctionExpression";
    body: FunctionBody | Expression;
    expression: boolean;
    generator: false;
  }

  export interface YieldExpression extends Expression {
    type: "YieldExpression";
    argument: Expression | null;
    delegate: boolean;
  }

  export interface TemplateLiteral extends Expression {
    type: "TemplateLiteral";
    quasis: [TemplateElement];
    expressions: [Expression];
  }

  export interface TaggedTemplateExpression extends Expression {
    type: "TaggedTemplateExpression";
    tag: Expression;
    quasi: TemplateLiteral;
  }

  export interface TemplateElement extends Node {
    type: "TemplateElement";
    tail: boolean;
    value: {
      cooked: string | null;
      raw: string;
    };
  }

  export interface AssignmentProperty extends Property {
    type: "Property"; // inherited
    value: Pattern;
    kind: "init";
    method: false;
  }

  export interface ArrayPattern extends Pattern {
    type: "ArrayPattern";
    elements: [Pattern | null];
  }

  export interface RestElement extends Pattern {
    type: "RestElement";
    argument: Pattern;
  }

  export interface AssignmentPattern extends Pattern {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
  }

  export interface Class extends Node {
    id: Identifier | null;
    superClass: Expression | null;
    body: ClassBody;
  }

  export interface ClassBody extends Node {
    type: "ClassBody";
    body: [MethodDefinition];
  }

  export interface MethodDefinition extends Node {
    type: "MethodDefinition";
    key: Expression;
    value: FunctionExpression;
    kind: "constructor" | "method" | "get" | "set";
    computed: boolean;
    static: boolean;
  }

  export interface ClassDeclaration extends Class, Declaration {
    type: "ClassDeclaration";
    id: Identifier;
  }

  export interface ClassExpression extends Class, Expression {
    type: "ClassExpression";
  }

  export interface MetaProperty extends Expression {
    type: "MetaProperty";
    meta: Identifier;
    property: Identifier;
  }

  export interface ModuleDeclaration extends Node {}

  export interface ModuleSpecifier extends Node {
    local: Identifier;
  }
  export interface ImportDeclaration extends ModuleDeclaration {
    type: "ImportDeclaration";
    specifiers: [
      ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
    ];
    source: Literal;
  }

  export interface ImportSpecifier extends ModuleSpecifier {
    type: "ImportSpecifier";
    imported: Identifier;
  }

  export interface ImportDefaultSpecifier extends ModuleSpecifier {
    type: "ImportDefaultSpecifier";
  }

  export interface ImportNamespaceSpecifier extends ModuleSpecifier {
    type: "ImportNamespaceSpecifier";
  }

  export interface ExportNamedDeclaration extends ModuleDeclaration {
    type: "ExportNamedDeclaration";
    declaration: Declaration | null;
    specifiers: [ExportSpecifier];
    source: Literal | null;
  }

  export interface ExportSpecifier extends ModuleSpecifier {
    type: "ExportSpecifier";
    exported: Identifier;
  }

  export interface AnonymousDefaultExportedFunctionDeclaration
    extends Function {
    type: "FunctionDeclaration";
    id: null;
  }

  export interface AnonymousDefaultExportedClassDeclaration extends Class {
    type: "ClassDeclaration";
    id: null;
  }

  export interface ExportDefaultDeclaration extends ModuleDeclaration {
    type: "ExportDefaultDeclaration";
    declaration:
      | AnonymousDefaultExportedFunctionDeclaration
      | FunctionDeclaration
      | AnonymousDefaultExportedClassDeclaration
      | ClassDeclaration
      | Expression;
  }

  export interface ExportAllDeclaration extends ModuleDeclaration {
    type: "ExportAllDeclaration";
    source: Literal;
    exported: Identifier | null;
  }

  export interface AwaitExpression extends Expression {
    type: "AwaitExpression";
    argument: Expression;
  }

  export interface ChainExpression extends Expression {
    type: "ChainExpression";
    expression: ChainElement;
  }

  export interface ChainElement extends Node {
    optional: boolean;
  }

  export interface ImportExpression extends Expression {
    type: "ImportExpression";
    source: Expression;
  }

  export interface NodeLiteral {
    type: string;
    start: number;
    end: number;
    value: string;
    raw: string;
  }
}
