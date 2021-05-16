import React from "react";
import Dex from "./data/pokedex";

function SampleChart(props) {
  const setSample = (key, value) => {
    props.onSetSample(key, value);
  };

  let moveArr = [];
  for (let i = 0; i < 4; i++) {
    moveArr.push(
      <input
        type="text"
        placeholder="기술"
        id={"move-" + i}
        key={i}
        value={props.data.moves[i]}
        onClick={(e) => {
          props.onSetMode(e.target.id);
        }}
        onChange={(e) => {
          let newMoves = Array.from(props.data.moves);
          newMoves[i] = e.target.value;
          setSample("moves", newMoves);
        }}
      ></input>
    );
  }
  return (
    <div id="samplechart">
      <div id="samplechart-left">
        <div id="samplechart-left-top">
          <div id="sampleimg">
            <img
              src={"sprites/" + Dex[props.fixedname]["num"] + ".jpg"}
              alt=""
            ></img>
          </div>
        </div>
        <div id="samplechart-left-bottom">
          <input
            id="sample-pokename"
            type="text"
            placeholder="이름"
            value={props.data.name}
            onClick={() => {
              props.onSetMode("pokename");
            }}
            onChange={(e) => {
              setSample("name", e.target.value);
            }}
          ></input>
          <input
            id="sample-item"
            type="text"
            placeholder="도구"
            value={props.data.item}
            onClick={() => {
              props.onSetMode("item");
            }}
            onChange={(e) => {
              setSample("item", e.target.value);
            }}
          ></input>
          <input
            id="sample-ability"
            type="text"
            placeholder="특성"
            value={props.data.ability}
            onClick={() => {
              props.onSetMode("ability");
            }}
            onChange={(e) => {
              setSample("ability", e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div id="samplechart-right">{moveArr}</div>
    </div>
  );
}
export default SampleChart;
