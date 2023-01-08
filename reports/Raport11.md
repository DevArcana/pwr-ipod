# Raport 11

19.12.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 11 przygotowaliśmy czwartą metodę deobfuskacji kodu;
`UnGlobal strings`.

## Przekształcenie UnGlobal strings

Celem przekształcenia jest odwrócenie operacji
`Global strings`. Algorytm odwracający składa się z
następujących kroków:

- Wykrycie wszystkich definicji słowników w kodzie i zapisanie ich z ich wartościami do zmiennej
- Wykrycie wszystkich wywołań `member expression` w kodzie
- Odfiltrowanie tych wywołań, które odnoszą się do zapisanych słowników
- Zastąpienie wywołania wartością ze słownika
- Usunięcie definicji słownika z kodu

### Wykrycie wszystkich definicji słowników w kodzie i zapisanie ich z ich wartościami do zmiennej

Proces wykrywania słowników wymaga jednorazowego przejścia drzewa AST i wyszukiwania tych węzłów, których typ to `VariableDeclaration`.
Jeśli taki węzeł zawiera niepustą tablicę o nazwie `declarations`, to należy sprawdzić każdy z jej elementów.
Element tablicy powinien mieć typ `VariableDeclarator` i jego inicjalizator typ `ObjectExpression`.
Oznacza to, że jest to słownik.

```ts
const dictionary: { [key: string]: string } = {};
declaration.init.properties.forEach((prop: acornTypes.Property) => {
  if (prop.type != "Property") return;
  // @ts-ignore
  const key = prop.key["value"];
  // @ts-ignore
  const value = prop.value["value"];
  dictionary[key] = value;
});

if (Object.keys(dictionary).length > 0) {
  dictionaries[declaration.id.name] = dictionary;
}
```

### Zastąpienie wywołania wartością ze słownika

```ts
full(data, (node: acorn.Node) => {
  if (node.type === NodeTypes.MemberExpression) {

    if (node.object.type != "Identifier") {
      return;
    }

    const name = node.object.name;
    const value = node.property.value;

    if (!(name in dictionaries)) {
      return;
    }

    node["computed"] = false;
    node.type = "Literal";
    node.value = dictionaries[name][value];
  }
});
```

### Usunięcie definicji słownika z kodu

Ostatnim krokiem jest zlokalizowanie definicji wcześniej zapisanych słowników i usunięcie każdej z nich.

## Testy jednostkowe

Dodatkowo dodaliśmy testy jednostkowe dla zaimplementowanego
przekształcenia weryfikujące jego poprawność.
