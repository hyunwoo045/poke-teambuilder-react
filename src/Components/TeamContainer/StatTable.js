import React from "react";
import getRVS from "./getRVS";
import "./Style/StatTable.css";

function StatTable(props) {
  const labels = ["HP", "Atk", "Def", "Sp.Atk", "Sp.Def", "Speed"];
  const setEVS = (idx, val) => {
    props.evs[idx] = val;
    props.onChangeEVS(props.evs);
  };

  const setIVS = (idx, val) => {
    props.ivs[idx] = val;
    props.onChangeIVS(props.ivs);
  };

  return (
    <div id="statsetter">
      <div id="column-label">
        <div></div>
        {labels.map((name, i) => (
          <div id={"column-label-" + name} key={i}>
            <label>{name}</label>
          </div>
        ))}
      </div>
      <div id="column-basestat">
        <div>종족값</div>
        {props.basestat.map((name, i) => (
          <div id={"column-basestat-" + i} key={i}>
            <label>{name}</label>
          </div>
        ))}
      </div>
      <div id="column-evs">
        <div>노력치</div>
        {props.evs.map((name, i) => (
          <div id={"column-evs-" + i} key={i}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setEVS(i, Number(e.target.value));
              }}
            ></input>
          </div>
        ))}
      </div>
      <div id="column-slider">
        <div></div>
        {props.evs.map((name, i) => (
          <div id={"column-slider-" + i} key={i}>
            <input
              type="range"
              min="0"
              max="252"
              value={name}
              onChange={(e) => {
                setEVS(i, Number(e.target.value));
              }}
            ></input>
          </div>
        ))}
      </div>
      <div id="column-ivs">
        <div>개체값</div>
        {props.ivs.map((name, i) => (
          <div id={"column-ivs-" + i} key={i}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setIVS(i, Number(e.target.value));
              }}
            ></input>
          </div>
        ))}
      </div>
      <div id="column-rvs">
        <div>실수치</div>
        {getRVS(props.basestat, props.evs, props.ivs).map((name, i) => (
          <div id={"column-rvs-" + i} key={i}>
            <label>{name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default StatTable;
