# Raport 2

10.10.2022 11:15

Bartłomiej Chmiel i Piotr Krzystanek

## Sprawozdanie

Wybraliśmy temat "Obfuskator i analizator kodu JavaScript".
Na zajęciach omówiliśmy z prowadzącym plan realizacji projektu i przedyskutowaliśmy temat pod kątem potencjalnych problemów i propozycji rozwiązań.


## Literatura

### Obfuskacja

Chandan Kumar Behera, D. Lalitha Bhaskari, _Different Obfuscation Techniques for Code Protection_

Procedia Computer Science,

Volume 70,

2015,

Pages 757-763,

ISSN 1877-0509,

https://doi.org/10.1016/j.procs.2015.10.114.

(https://www.sciencedirect.com/science/article/pii/S1877050915032780)

Abstract
> With the advancements in digital technology, the threat of unimaginable level of duplicating and illegal reproducing of software also increases. Therefore the piracy rate is increasing proportionally. This scenario has clearly placed the threat for the software manufacturers and leads to the development of numerous software protection techniques. The numerous software protection techniques have been developed and one of such software protection techniques is code obfuscation. The code obfuscation is a mechanism for hiding the original algorithm, data structures or the logic of the code, or to harden or protect the code (which is considered as intellectual property of the software writer) from the unauthorized reverse engineering process. In general, code obfuscation involves hiding a program's implementation details from an adversary, i.e. transforming the program into a semantically equivalent (same computational effect) program, which is much harder to understand for an attacker. None of the current code obfuscation techniques satisfy all the obfuscation effectiveness criteria to resistance the reverse engineering attacks. Therefore the researchers as well as the software industries are trying their best to apply newer and better obfuscation techniques over their intellectual property in a regular process. But unfortunately, software code is not safe, i.e. still it can be cracked. This paper presents some of the obfuscation methods, which can help to protect the sensitive code fragments of any software, without alteration of inherent functionalities of the software. The proposed obfuscation techniques are implemented in assembly level code, with taking care of the theory of optimizing transformations. The assembly code represents the data dependencies and comfort to analyse the data after disassembling the executable as compared to the decompiled code.
Keywords: Program obfuscation; software protection; code transformation; Assembly code; byte level manipulation.


### Javascript

https://www.javascript.com/


Będziemy używać następujących dokumentów w celu analizy specyfikacji języka
Javascript:

- https://github.com/estree/estree
- https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

Będziemy używać standardu: *ES2020*
