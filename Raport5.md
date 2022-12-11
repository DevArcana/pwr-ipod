# Raport 5

7.11.2022 11:15

Na zajęcia 5 przygotowaliśmy podstawę aplikacji webowej do
obfuskacji i deobfuskacji kodu źródłowego napisanego w języku
JavaScript.

## Setup

### React (https://reactjs.org)

Stworzyliśmy aplikację webową opartą na frameworku webowym `React`.
Jest to jeden z najpopularniejszych frameworków używanych do
tworzenia frontendu. Jego główną zaletą jest mały poziom skomplikowania
głównego mechanizmu manipulacji DOM, dzięki czemu, sposób użycia nie odbiega
trudnością od używania zwykłej biblioteki.

### Typescript (https://www.typescriptlang.org)

W celu uniknięcia wielu problemów związanych ze stosowaniem
języka skryptowego JavaScript do implementacji frontendu używając
`Reacta`, postanowiliśmy zamienić JavaScript na Typescript. Dzięki
temu we wczesnej fazie możemy uniknąć wielu błędów związanych
z typami, oraz utrzymać bardziej spójną strukturę kodu stosując
własne definicje typów. Wszystkie typy są weryfikowane podczas
kompilacji, a następnie usuwane z końcowego programu, dzięki czemu
nie powodują spowolnienia aplikacji.

### pnpm (https://pnpm.io)

`React` i inne biblioteki używane podczas projektu posiadają wiele
zależności. W celu przyspieszenia procesu pobierania ich, będziemy
używać `pnpm`. Jest to manager pakietów wspierający równoległe
pobieranie zależności.

## Rete.js (https://rete.js.org)

## Codemirror (https://codemirror.net)
