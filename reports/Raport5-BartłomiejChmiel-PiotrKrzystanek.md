# Raport 5

7.11.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 5 przygotowaliśmy podstawę aplikacji webowej do
obfuskacji i deobfuskacji kodu źródłowego napisanego w języku
JavaScript.

## React (https://reactjs.org)

Stworzyliśmy aplikację webową opartą na frameworku webowym `React`.
Jest to jeden z najpopularniejszych frameworków używanych do
tworzenia frontendu. Jego główną zaletą jest mały poziom skomplikowania
głównego mechanizmu manipulacji DOM, dzięki czemu, sposób użycia nie odbiega
trudnością od używania zwykłej biblioteki.

## Typescript (https://www.typescriptlang.org)

W celu uniknięcia wielu problemów związanych ze stosowaniem
języka skryptowego JavaScript do implementacji frontendu używając
`Reacta`, postanowiliśmy zamienić JavaScript na Typescript. Dzięki
temu we wczesnej fazie możemy uniknąć wielu błędów związanych
z typami, oraz utrzymać bardziej spójną strukturę kodu stosując
własne definicje typów. Wszystkie typy są weryfikowane podczas
kompilacji, a następnie usuwane z końcowego programu, dzięki czemu
nie powodują spowolnienia aplikacji.

## pnpm (https://pnpm.io)

`React` i inne biblioteki używane podczas projektu posiadają wiele
zależności. W celu przyspieszenia procesu pobierania ich, będziemy
używać `pnpm`. Jest to manager pakietów wspierający równoległe
pobieranie zależności.

## Rete.js (https://rete.js.org)

Obfuskacja i deobfuskacja kodu składa się z ciągu przekształceń
zachodzących w odpowiedniej kolejności. Warto zauważyć, że złożenie
tych przekształceń nie zawsze jest przemienne. W celu demonstracji
zaimplementowanych przekształceń i umożliwienia użytkownikowi dowolnej
modyfikacji przebiegu jak i składowych ciągu przekształceń, środowisko
do `visual programming` będzie użyte.

Jedną z popularniejszych bibliotek dostępnych do implementacji takiego
środowiska jest `Rete.js`. Umożliwia modularną budowę z możliwością 
prostego dodawania nowych komponentów z transformacjami. Dodatkowo,
biblioteka umożliwia interakcję real-time za pomocą architektury `event-based`.

## Codemirror (https://codemirror.net)

Biblioteka umożliwiająca dodanie edytora tekstowego do aplikacji.
Zawiera wiele przydatych funkcjonalności zwiększających przejrzystość
demonstrowanego kodu, jak na przykład:

- podświetlanie składni
- numerowane linie
- search/replace i inne.
