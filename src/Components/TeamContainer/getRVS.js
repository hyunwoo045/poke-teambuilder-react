const getRVS = (basestat, evs, ivs) => {
  let newRVS = [];
  for (let i = 0; i < 6; i++) {
    let BS = basestat[i];
    let EV = evs[i];
    let IV = ivs[i];
    if (i === 0) {
      newRVS.push(Math.floor((BS * 2 + IV + EV / 4) * 0.5 + 10 + 50));
    } else {
      newRVS.push(Math.floor((BS * 2 + IV + EV / 4) * 0.5 + 5));
    }
  }
  return newRVS;
};
export default getRVS;
