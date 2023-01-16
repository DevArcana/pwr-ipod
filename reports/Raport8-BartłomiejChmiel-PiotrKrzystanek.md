# Raport 8

28.11.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 8 przygotowaliśmy pierwszą metodę deobfuskacji kodu;
`unmangle variable definitions`.

## Przekształcenie unmangle variable definitions

Celem przekształcenia jest odwrócenie operacji
`Identifier mangle`. Algorytm odwracający składa się z
następujących kroków:

- przywrócenie słów kluczowych właściwości zmiennych np. `const`, `let`, `var`.
- przywrócenie nazw zmiennych
- usunięcie definicji zmiennej globalnej `vars`.

### Przywrócenie słów kluczowych zmiennych

Niestety informacje o oryginalnych właściwościach zmiennych,
a dokładniej informacji o tym czy zmienna jest modyfikowalna czy
stała, zostały zatracone podczas procesu obfuskacji. Z tego
powodu, przyjmujemy konwencję, że każda zmienna była
modyfikowalna i miała słowo kluczowe `let` przed deklaracją.

W procesie przywrócenia, przemierzamy całe drzewo AST za pomocą
biblioteki `acorn-walk`, znajdujemy wszystkie deklaracje
zmiennych i zmieniamy ich typ na `let`.

### Przywrócenie nazw zmiennych

Oryginalne nazwy zmiennych zostały stracone w procesie
obfuskacji, więc używamy generowanych nazw zastępczych. W celu
poprawienia czytelności deobfuskowanego kodu, przyjeliśmy
następującą konwencję nazewniczą:

`Ax`

gdzie:

- A - typ zmiennej
- x - licznik wystąpień zmiennych tego samego typu

Każda zmienna jest przywracana w następujący sposób wraz z
odpowiadającą jej wartością odczytywaną ze zmiennej globalnej
`vars` powstałej w procesie obfuskacji.

### Usunięcie definicji zmiennej globalnej `vars`

Ta operacja polega na zlokalizowaniu zmiennej globalnej `vars`,
a następnie usunięcia jej.

## Testy jednostkowe

Dodatkowo dodaliśmy testy jednostkowe dla zaimplementowanego
przekształcenia weryfikujące jego poprawność.
