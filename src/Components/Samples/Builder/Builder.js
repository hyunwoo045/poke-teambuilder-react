import "./Builder.css";
import React, { useState, useReducer } from "react";
import Samplechart from "./Components/Samplechart";
import Stattable from "./Components/Stattable";
import Listloader from "./Components/Listloader";
import Dex from "../../../data/pokedex";
import reducer from "./Reducer";
import emptySample from "./emptySample";

function Builder(props) {
  const [curMode, setMode] = useState("name");
  const [curSample, dispatch] = useReducer(reducer, emptySample());
  const [isProper, setProper] = useState(false);
  return (
    <div id="sample-builder">
      <button
        onClick={() => {
          if (!isProper) {
            alert("Invalid Pokemon Name");
            return;
          }
          props.onSetNewSample(curSample);
        }}
      >
        박스에 저장하기
      </button>
      <button
        onClick={() => {
          setMode("name");
          setProper(false);
          dispatch({ type: "RESET" });
        }}
      >
        리 셋
      </button>
      <Samplechart
        curSample={curSample}
        isProper={isProper}
        onSetSample={(key, value) => {
          dispatch({ type: key, value: value });
          if (key === "NAME_INPUT" && Object.keys(Dex).includes(value)) {
            console.log("Proper name");
            setProper(true);
          } else if (
            key === "NAME_INPUT" &&
            !Object.keys(Dex).includes(value)
          ) {
            setProper(false);
          }
        }}
        onSetMode={(mode) => {
          setMode(mode);
        }}
        onSetMove={(value, idx) => {
          dispatch({ type: "MOVES_INPUT", value: value, idx: idx });
        }}
      ></Samplechart>
      <Stattable
        curSample={curSample}
        isProper={isProper}
        onSetEvs={(value, idx) => {
          if (value[value.length - 1] === "+" && idx !== 0) {
            value = value.slice(0, -1);
            dispatch({ type: "NATURE_INPUT", key: "high", value: idx });
          } else if (value[value.length - 1] === "-" && idx !== 0) {
            value = value.slice(0, -1);
            dispatch({ type: "NATURE_INPUT", key: "low", value: idx });
          }
          dispatch({ type: "EVS_INPUT", value: value, idx: idx });
        }}
        onSetIvs={(value, idx) => {
          dispatch({ type: "IVS_INPUT", value: value, idx: idx });
        }}
      ></Stattable>

      <Listloader
        curMode={curMode}
        curSample={curSample}
        isProper={isProper}
        onSetSample={(key, value) => {
          setProper(true);
          dispatch({ type: key, value: value });
        }}
        onSetMove={(value, idx) => {
          dispatch({ type: "MOVES_INPUT", value: value, idx: idx });
        }}
      ></Listloader>
    </div>
  );
}

export default Builder;
