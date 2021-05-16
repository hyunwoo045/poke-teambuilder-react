import React from "react";
import getRVS from "./getRVS";
import Dex from "./data/pokedex";
import "./Style/StatTable.css";

function StatTable(props) {
  const setSample = (key, value) => {
    props.onSetSample(key, value);
  };
  const labels = ["HP", "Atk", "Def", "Sp.Atk", "Sp.Def", "Speed"];
  const baseStat = Object.values(Dex[props.fixedname]["baseStats"]);
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
        {baseStat.map((name, i) => (
          <div id={"column-basestat-" + i} key={i}>
            <label>{name}</label>
          </div>
        ))}
      </div>
      <div id="column-evs">
        <div>노력치</div>
        {props.data.evs.map((name, i) => (
          <div id={"column-evs-" + i} key={i}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                let newArr = Array.from(props.data.evs);
                newArr[i] = Number(e.target.value);
                setSample("evs", newArr);
              }}
            ></input>
          </div>
        ))}
      </div>
      <div id="column-slider">
        <div></div>
        {props.data.evs.map((name, i) => (
          <div id={"column-slider-" + i} key={i}>
            <input
              type="range"
              min="0"
              max="252"
              value={name}
              onChange={(e) => {
                let newArr = Array.from(props.data.evs);
                newArr[i] = Number(e.target.value);
                setSample("evs", newArr);
              }}
            ></input>
          </div>
        ))}
      </div>
      <div id="column-ivs">
        <div>개체값</div>
        {props.data.ivs.map((name, i) => (
          <div id={"column-ivs-" + i} key={i}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                let newArr = Array.from(props.data.ivs);
                newArr[i] = Number(e.target.value);
                setSample("ivs", newArr);
              }}
            ></input>
          </div>
        ))}
      </div>
      <div id="column-rvs">
        <div>실수치</div>
        {getRVS(baseStat, props.data.evs, props.data.ivs).map((name, i) => (
          <div id={"column-rvs-" + i} key={i}>
            <label>{name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default StatTable;
