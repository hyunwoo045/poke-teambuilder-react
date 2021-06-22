const getRVS = (basestat, evs, ivs, character) => {
  let newRVS = [];
  for (let i = 0; i < 6; i++) {
    let BS = Number(basestat[i]);
    let EV = Number(evs[i]);
    let IV = Number(ivs[i]);
    if (i === 0) {
      newRVS.push(Math.floor((BS * 2 + IV + EV / 4) * 0.5 + 10 + 50));
    } else {
      newRVS.push(Math.floor((BS * 2 + IV + EV / 4) * 0.5 + 5));
    }
  }
  if (character.high !== -1) {
    newRVS[character.high] = Math.floor(newRVS[character.high] * 1.1);
  }
  if (character.low !== -1) {
    newRVS[character.low] = Math.floor(newRVS[character.low] * 0.9);
  }
  return newRVS;
};
export default getRVS;
