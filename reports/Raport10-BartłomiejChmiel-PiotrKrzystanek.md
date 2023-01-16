# Raport 10

12.12.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 10 przygotowaliśmy trzecią metodę deobfuskacji kodu;
`UnProperty to dict`.

## Przekształcenie UnProperty to dict

Celem przekształcenia jest odwrócenie operacji
`Property to dict`. Algorytm odwracający składa się z
następujących kroków:

- wykrycie wszystkich wywołań dostępu typu `member expression`
- zamiana każdego wywołania na wywołanie typu `identifier`

Przekształcenie `Property to dict` jest odwracalne, jednak wymaga wykrycia jaki identyfikator może być użyty jako identyfikator.

Sama implementacja jest następująca:

```ts
full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.MemberExpression) {
        const exp = node as unknown as acornTypes.MemberExpression;

        exp.property.type = "Identifier";
        exp.property["name"] = (exp.property as acornTypes.Literal).value;

        exp.computed = false;
      }
    });
```

## Testy jednostkowe

Dodatkowo dodaliśmy testy jednostkowe dla zaimplementowanego
przekształcenia weryfikujące jego poprawność.
