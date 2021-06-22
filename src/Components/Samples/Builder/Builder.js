import "./Builder.css";
import React, { useState } from "react";
import Samplechart from "./Components/Samplechart";
import Stattable from "./Components/Stattable";
import Listloader from "./Components/Listloader";
import Dex from "../../../data/pokedex";

const emptySample = {
  name: "",
  item: "",
  ability: "",
  moves: ["", "", "", ""],
  evs: [0, 0, 0, 0, 0, 0],
  ivs: [31, 31, 31, 31, 31, 31],
  character: { high: -1, low: -1 },
};

function Builder(props) {
  const [curMode, setMode] = useState("name");
  const [curSample, setSample] = useState(emptySample);
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
          setSample(emptySample);
          setProper(false);
        }}
      >
        리 셋
      </button>
      <Samplechart
        curSample={curSample}
        isProper={isProper}
        onSetSample={(key, value) => {
          setSample({ ...curSample, [key]: value });
          if (key === "name" && Object.keys(Dex).includes(value)) {
            console.log("Proper name");
            setProper(true);
          } else if (key === "name" && !Object.keys(Dex).includes(value)) {
            setProper(false);
          }
        }}
        onSetMode={(mode) => {
          setMode(mode);
        }}
        onSetMove={(value, idx) => {
          let newList = Array.from(curSample.moves);
          newList[idx] = value;
          setSample({ ...curSample, moves: newList });
        }}
      ></Samplechart>
      <Stattable
        curSample={curSample}
        isProper={isProper}
        onSetEvs={(value, idx) => {
          if (value[value.length - 1] === "+" && idx !== 0) {
            value = value.slice(0, -1);
            let newObj = curSample.character;
            newObj.high = idx;
            setSample({ ...curSample, character: newObj });
          } else if (value[value.length - 1] === "-" && idx !== 0) {
            value = value.slice(0, -1);
            let newObj = curSample.character;
            newObj.low = idx;
            setSample({ ...curSample, character: newObj });
          }
          if (value > 252) {
            value = 252;
          } else if (value < 0 || value === "") {
            value = 0;
          }
          let newList = Array.from(curSample.evs);
          newList[idx] = Number(value);
          if (
            newList.reduce((sum, curVal) => {
              return sum + Number(curVal);
            }, 0) > 510
          ) {
            newList[idx] = 0;
            newList[idx] =
              508 -
              newList.reduce((sum, curVal) => {
                return sum + Number(curVal);
              }, 0);
          }
          setSample({ ...curSample, evs: newList });
        }}
        onSetIvs={(value, idx) => {
          if (value > 31) {
            value = 31;
          } else if (value < 0) {
            value = 0;
          }
          let newList = Array.from(curSample.ivs);
          newList[idx] = Number(value);
          setSample({ ...curSample, ivs: newList });
        }}
      ></Stattable>

      <Listloader
        curMode={curMode}
        curSample={curSample}
        isProper={isProper}
        onSetSample={(key, value) => {
          setSample({ ...curSample, [key]: value });
          setProper(true);
        }}
        onSetMove={(value, idx) => {
          let newList = Array.from(curSample.moves);
          newList[idx] = value;
          setSample({ ...curSample, moves: newList });
        }}
      ></Listloader>
    </div>
  );
}

export default Builder;
