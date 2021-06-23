import "./Samplechart.css";
import React from "react";
import Dex from "../../../../data/pokedex";

function Samplechart(props) {
  return (
    <div id="sample-builder-chart">
      <div id="sample-builder-chart-left">
        <div id="sample-builder-chart-left-top">
          <div>
            {props.isProper ? (
              <img
                src={"regular/" + Dex[props.curSample.name]["name"] + ".png"}
                alt=""
                height="80"
                width="80"
              ></img>
            ) : null}
          </div>
        </div>
        <div id="sample-builder-chart-left-bottom">
          <input
            id={props.isProper ? "sample-pokename" : "sample-pokename-invalid"}
            type="text"
            placeholder="이름"
            value={props.curSample.name}
            onChange={(e) => {
              props.onSetSample("NAME_INPUT", e.target.value);
            }}
            onFocus={() => {
              props.onSetMode("name");
            }}
          ></input>
        </div>
      </div>
      <div id="sample-builder-chart-snd">
        <div id="sample-builder-chart-snd-type">
          <div>타 입</div>
        </div>
        <div id="sample-builder-chart-snd-bottom">
          <input
            id="sample-item"
            type="text"
            placeholder="아이템"
            value={props.curSample.item}
            onChange={(e) => {
              props.onSetSample("ITEM_INPUT", e.target.value);
            }}
            onFocus={() => {
              props.onSetMode("item");
              props.onSetSample("ITEM_INPUT", "");
            }}
          ></input>
        </div>
      </div>
      <div id="sample-builder-chart-trd">
        <div id="sample-builder-chart-trd-empty">
          <div></div>
        </div>
        <div id="sample-builder-chart-trd-ability">
          <input
            id="sample-ability"
            type="text"
            placeholder="특성"
            value={props.curSample.ability}
            onFocus={() => {
              props.onSetMode("ability");
              props.onSetSample("ABILITY_INPUT", "");
            }}
            onChange={(e) => {
              props.onSetSample("ABILITY_INPUT", e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div id="sample-builder-chart-right">
        {props.curSample.moves.map((move, moveIdx) => (
          <input
            key={moveIdx}
            className="sample-move"
            type="text"
            placeholder="기술"
            value={move}
            onChange={(e) => {
              props.onSetMove(e.target.value, moveIdx);
            }}
            onFocus={() => {
              props.onSetMode("move-" + moveIdx);
              props.onSetMove("", moveIdx);
            }}
          ></input>
        ))}
      </div>
    </div>
  );
}

export default Samplechart;
