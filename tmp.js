let vars = {};
 vars["2afcc3e"] = {
  UP: -1,
  DOWN: 1
};
 vars["166934f"] = rowsNum => Array(rowsNum).fill(null).map(() => []);
 vars["b8bd08"] = ({railCount, currentRail, direction}) => {
  switch (currentRail) {
    case 0:
      return vars["2afcc3e"].DOWN;
    case vars["13dd7b3"] - 1:
      return vars["2afcc3e"].UP;
    default:
      return direction;
  }
};
 vars["5e1ae9b"] = (targetRailIndex, letter) => {
  function onEachRail(rail, currentRail) {
    return currentRail === targetRailIndex ? [...rail, letter] : rail;
  }
  return onEachRail;
};
 vars["bce5c9"] = ({fence, currentRail, direction, chars}) => {
  if (chars.length === 0) {
    return vars["5488f"];
  }
   vars["13dd7b3"] = vars["5488f"].length;
   [letter, ...nextChars] = chars;
   vars["fabd7a"] = vars["b8bd08"]({
    railCount: vars["3eeced4"],
    currentRail: currentRail,
    direction: direction
  });
  return vars["bce5c9"]({
    fence: vars["5488f"].map(vars["5e1ae9b"](currentRail, letter)),
    currentRail: currentRail + vars["fabd7a"],
    direction: vars["2e0d2c9"],
    chars: nextChars
  });
};
 vars["3bb157a"] = params => {
   ({strLen, chars, fence, targetRail, direction, coords}) = params;
   vars["3eeced4"] = vars["5488f"].length;
  if (chars.length === 0) {
    return vars["5488f"];
  }
   [currentRail, currentColumn] = coords;
   vars["1cb5d4e"] = currentColumn === vars["2e47ed"] - 1;
   vars["2e0d2c9"] = vars["1cb5d4e"] ? vars["2afcc3e"].DOWN : vars["b8bd08"]({
    railCount: vars["224b4e6"],
    currentRail: currentRail,
    direction: direction
  });
   vars["3325072"] = vars["1cb5d4e"] ? targetRail + 1 : targetRail;
   vars["34cd4a1"] = [vars["1cb5d4e"] ? 0 : currentRail + vars["22e6bfd"], vars["1cb5d4e"] ? 0 : currentColumn + 1];
   vars["4d8126f"] = currentRail === targetRail;
   [currentChar, ...remainderChars] = chars;
   vars["2996ad6"] = vars["4d8126f"] ? remainderChars : chars;
   vars["2680a5a"] = vars["4d8126f"] ? vars["5488f"].map(vars["5e1ae9b"](currentRail, currentChar)) : vars["5488f"];
  return vars["3bb157a"]({
    strLen: vars["2e47ed"],
    chars: vars["2996ad6"],
    fence: vars["2680a5a"],
    targetRail: vars["3325072"],
    direction: vars["22e6bfd"],
    coords: vars["34cd4a1"]
  });
};
 vars["e39e6"] = params => {
   {strLen, fence, currentRail, direction, code} = params;
  if (code.length === vars["2e47ed"]) {
    return code.join("");
  }
   vars["224b4e6"] = vars["5488f"].length;
   [currentChar, ...vars["3325072"]] = vars["5488f"][currentRail];
   vars["22e6bfd"] = vars["b8bd08"]({
    railCount: vars["224b4e6"],
    currentRail: currentRail,
    direction: direction
  });
  return vars["e39e6"]({
    railCount: vars["224b4e6"],
    strLen: vars["2e47ed"],
    currentRail: currentRail + vars["22e6bfd"],
    direction: vars["22e6bfd"],
    code: [...code, currentChar],
    fence: vars["5488f"].map((rail, idx) => idx === currentRail ? vars["3325072"] : rail)
  });
};
 vars["25ec068"] = (string, railCount) => {
   vars["5488f"] = vars["166934f"](vars["224b4e6"]);
   vars["3f8cde4"] = vars["bce5c9"]({
    fence: vars["5488f"],
    currentRail: 0,
    direction: vars["2afcc3e"].DOWN,
    chars: string.split("")
  });
  return vars["3f8cde4"].flat().join("");
};
 vars["cc9f90"] = (string, railCount) => {
   vars["2e47ed"] = string.length;
   vars["38d42d9"] = vars["166934f"](vars["224b4e6"]);
   vars["3930e8d"] = vars["3bb157a"]({
    strLen: vars["2e47ed"],
    chars: string.split(""),
    fence: vars["38d42d9"],
    targetRail: 0,
    direction: vars["2afcc3e"].DOWN,
    coords: [0, 0]
  });
  return vars["e39e6"]({
    strLen: vars["2e47ed"],
    fence: vars["3930e8d"],
    currentRail: 0,
    direction: vars["2afcc3e"].DOWN,
    code: []
  });
};
 vars["1455d4a"] = 10;
 vars["4899936"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas integer eget aliquet nibh praesent tristique magna. Tortor at risus viverra adipiscing at in tellus integer. Tristique risus nec feugiat in fermentum posuere urna. Sodales ut etiam sit amet nisl. Odio euismod lacinia at quis risus. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et tortor at risus viverra adipiscing at in tellus. Quam vulputate dignissim suspendisse in est ante in. At consectetur lorem donec massa sapien faucibus et. Sed faucibus turpis in eu mi. Neque vitae tempus quam pellentesque nec nam aliquam.  Suscipit tellus mauris a diam. Neque volutpat ac tincidunt vitae semper quis lectus. Laoreet suspendisse interdum consectetur libero. Et tortor consequat id porta nibh venenatis. Duis at tellus at urna. Mauris commodo quis imperdiet massa tincidunt nunc. In pellentesque massa placerat duis ultricies lacus. Sagittis id consectetur purus ut faucibus pulvinar elementum. Urna porttitor rhoncus dolor purus non. Quam elementum pulvinar etiam non quam lacus. Volutpat odio facilisis mauris sit. Tristique magna sit amet purus gravida quis blandit turpis. Nunc mattis enim ut tellus elementum sagittis vitae.";
vars["cc9f90"](vars["25ec068"](vars["4899936"], vars["1455d4a"]), vars["1455d4a"]).toLowerCase() === vars["4899936"].toLowerCase();