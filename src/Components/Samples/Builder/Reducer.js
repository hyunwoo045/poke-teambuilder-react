import emptySample from "./emptySample";

function reducer(state, action) {
  switch (action.type) {
    case "NAME_INPUT":
      return {
        ...state,
        name: action.value,
      };
    case "ITEM_INPUT":
      return {
        ...state,
        item: action.value,
      };
    case "ABILITY_INPUT":
      return {
        ...state,
        ability: action.value,
      };
    case "MOVES_INPUT":
      let newMoves = Array.from(state.moves);
      newMoves[action.idx] = action.value;
      return {
        ...state,
        moves: newMoves,
      };
    case "EVS_INPUT":
      let newVal = action.value;
      if (newVal > 252) newVal = 252;
      else if (newVal < 0 || newVal === "") newVal = 0;
      let newEVS = Array.from(state.evs);
      newEVS[action.idx] = newVal;
      let curSum = newEVS.reduce((sum, curVal) => {
        return sum + Number(curVal);
      }, 0);
      if (curSum > 510) {
        newEVS[action.idx] = 0;
        newEVS[action.idx] =
          508 -
          newEVS.reduce((sum, curVal) => {
            return sum + Number(curVal);
          }, 0);
      }
      return {
        ...state,
        evs: newEVS,
      };
    case "IVS_INPUT":
      let newIvsValue = action.value;
      if (newIvsValue > 31) newIvsValue = 31;
      else if (newIvsValue < 0 || newIvsValue === "") newIvsValue = 0;
      let newIVS = Array.from(state.ivs);
      newIVS[action.idx] = newIvsValue;
      return {
        ...state,
        evs: newIVS,
      };
    case "NATURE_INPUT":
      return {
        ...state,
        nature: {
          ...state.nature,
          [action.key]: action.value,
        },
      };
    case "RESET":
      return emptySample();
    default:
      return state;
  }
}
export default reducer;
