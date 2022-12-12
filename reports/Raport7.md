# Raport 7

21.11.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Zakres zmian

Na zajęcia 7 przygotowaliśmy przekształcenie `Global strings`.

## Przekształcenie - Global strings

To przekształcenie polega na zbieraniu wszystkich ciągów znaków
z programu i dodawaniu ich do głównego słownika zdefiniowanego
na początku programu, oraz zastępowanie każdego odwołania do wspomnianego ciągu, odpowiednim odwołaniem do wartości we
wspomnianym słowniku.

Ta metoda pozwala na zaciemnienie struktury programu, poprzez
ukrycie ciągów znaków bazowych, przy czym nie zmienia działania
programu.

Powyższa metoda obfuskacji pozwala na stosowanie jej wielokrotnie.
Każde odwołanie do słownika używa klucza jako ciągu znaków,
dzięki czemu można je jeszcze raz zastąpić odwołaniem do
odpowiedniego słownika. Po zastosowaniu tej metody wielokrotnie,
w górnej części kodu powstaje wiele obszernych słowników odwołujących
się do siebie samych, przez co znalezienie szukanego ciągu znaków
jest utrudnione.

Kod przed przekształceniem:

```js
console.log("text");
```

Kod po przekształceniu jednokrotnym:

```js
let meFQrzyhJwIeEbN = {
  YTZhIJXaKmxW_by: "text",
};
console.log(meFQrzyhJwIeEbN["YTZhIJXaKmxW_by"]);
```

Kod po przekształceniu 4-krotnym:

```js
let KEMYDWLCvxiiIXp = {
  yJfTOGnuuybEkun: "text",
  qQcPAWYoAUgdJYy: "COcURT_bLLqzsGg",
  armpAifZwDyQaIJ: "pYzRKWolrGzCLra",
  IoKjDvXpeqkGYiQ: "hrrDihbDKUBJmAN",
  gwjotAmqslJpCWN: "QZpaRYtHrPRizSS",
  RqmymUqtsSmQXwN: "XGxukAZhPYBqJIm",
  pFyqBPBcVpQQZPg: "sfCiTmUHBVwdwKQ",
  KIcALYpOcyL_azZ: "rvjchIiCqaKjzLb",
};
let tKfV_PtpxrTZmyq = {
  QZpaRYtHrPRizSS: KEMYDWLCvxiiIXp["yJfTOGnuuybEkun"],
  XGxukAZhPYBqJIm: KEMYDWLCvxiiIXp["qQcPAWYoAUgdJYy"],
  sfCiTmUHBVwdwKQ: KEMYDWLCvxiiIXp["armpAifZwDyQaIJ"],
  rvjchIiCqaKjzLb: KEMYDWLCvxiiIXp["IoKjDvXpeqkGYiQ"],
};
let z_mXZhHEZEmVaYF = {
  pYzRKWolrGzCLra: tKfV_PtpxrTZmyq[KEMYDWLCvxiiIXp["gwjotAmqslJpCWN"]],
  hrrDihbDKUBJmAN: tKfV_PtpxrTZmyq[KEMYDWLCvxiiIXp["RqmymUqtsSmQXwN"]],
};
let jfXkRCVVOdQCICj = {
  COcURT_bLLqzsGg:
    z_mXZhHEZEmVaYF[tKfV_PtpxrTZmyq[KEMYDWLCvxiiIXp["pFyqBPBcVpQQZPg"]]],
};
console.log(
  jfXkRCVVOdQCICj[
    z_mXZhHEZEmVaYF[tKfV_PtpxrTZmyq[KEMYDWLCvxiiIXp["KIcALYpOcyL_azZ"]]]
  ]
);
```
