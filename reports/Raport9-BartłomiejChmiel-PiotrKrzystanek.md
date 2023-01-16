# Raport 9

5.12.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 9 przygotowaliśmy drugą metodę deobfuskacji kodu;
`UnHex string mangler`.

## Przekształcenie UnHex string mangler

Celem przekształcenia jest odwrócenie operacji
`Hex string mangler`. Algorytm odwracający składa się z
następujących kroków:

- wykrycie wszystkich literałów tekstowych w kodzie
- wykrycie które literały zawierają przekształconą formę tekstu
- zamiana wartości literałów na tekst czytelny dla człowieka

Przekształcenie `Hex string mangler` jest całkowicie odwracalne.

### Zamiana wartości literałów

W celu zamiany wartości wykorzystaliśmy regex `/(\\x[a-fA-F0-9]{2})/g`, którego każdą z grup traktowaliśmy jako wartość tekstową reprezentującą kod heksadecymalny pojedynczego znaku.

## Testy jednostkowe

Dodatkowo dodaliśmy testy jednostkowe dla zaimplementowanego
przekształcenia weryfikujące jego poprawność.
