import React from "react";
import Dex from "../../../../data/pokedex";
import getRvs from "./getRvs";
import "./Stattable.css";

function Stattable(props) {
  const labels = ["HP", "Atk", "Def", "Sp.Atk", "Sp.Def", "Speed"];
  const curName = props.isProper ? props.curSample.name : "missingno";
  const baseStats = Object.values(Dex[curName]["baseStats"]);
  return (
    <div id="sample-builder-stattable">
      <div id="builder-stattable">
        <div id="stattable-column-label">
          <div></div>
          {labels.map((name, idx) => (
            <div key={"label" + idx}>{name}</div>
          ))}
        </div>
        <div id="stattable-column-basestat">
          <div>종족값</div>
          {baseStats.map((value, idx) => (
            <div
              key={"bs" + idx}
              className={
                props.curSample.nature.high === idx
                  ? "column-basestat-high"
                  : props.curSample.nature.low === idx
                  ? "column-basestat-low"
                  : "column-basestat-none"
              }
            >
              {value}
            </div>
          ))}
        </div>
        <div id="stattable-column-evs">
          <div>노력치</div>
          {props.curSample.evs.map((value, idx) => (
            <div key={"evs" + idx}>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  props.onSetEvs(e.target.value, idx);
                }}
              ></input>
            </div>
          ))}
        </div>
        <div id="stattable-column-evs-slider">
          <div></div>
          {props.curSample.evs.map((value, idx) => (
            <div key={"evs-s" + idx}>
              <input
                type="range"
                min="0"
                max="252"
                value={value}
                onChange={(e) => {
                  props.onSetEvs(e.target.value, idx);
                }}
              ></input>
            </div>
          ))}
        </div>
        <div id="stattable-column-ivs">
          <div>개체값</div>
          {props.curSample.ivs.map((value, idx) => (
            <div key={"ivs" + idx}>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  props.onSetIvs(e.target.value, idx);
                }}
              ></input>
            </div>
          ))}
        </div>
        <div id="stattable-column-rvs">
          <div>결과값</div>
          {getRvs(
            baseStats,
            props.curSample.evs,
            props.curSample.ivs,
            props.curSample.nature
          ).map((value, idx) => (
            <div
              key={"rvs" + idx}
              className={
                props.curSample.nature.high === idx
                  ? "column-basestat-high"
                  : props.curSample.nature.low === idx
                  ? "column-basestat-low"
                  : "column-basestat-none"
              }
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div id="builder-stattable-label">
        노력치 옆에 '+', '-'을 입력하여 성격을 설정할 수 있습니다.
      </div>
    </div>
  );
}

export default Stattable;
