# Raport 11

19.12.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 11 zrobiliśmy zmiany w interfejsie użytkownika w celu ułatwienia testowania różnych konfiguracji.

### Zapisywanie konfiguracji

Każda konfiguracja może zostać zapisana pod wybraną przez użytkownika nazwą.

### Odczytywanie konfiguracji

Lista rozwijana pozwala na odczyt konfiguracji wcześniej zapisanej.

### Sposób przechowywania zapisanych konfiguracji

Wszystkie zapisane dane przechowywane są za pomocą mechanizmu przeglądarki `LocalStorage`.
Oznacza to, że wszystkie dane zapisywane są w całości lokalnie.