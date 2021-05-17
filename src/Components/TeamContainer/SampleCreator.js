import React, { useState } from "react";
import SampleChart from "./SampleChart";
import StatTable from "./StatTable";
import ListLoader from "./ListLoader";
import "./Style/SampleCreator.css";
import "./Style/ListLoader.css";

function SampleCreator(props) {
  const [mode, setMode] = useState("pokename");
  const exportToBox = () => {
    if (props.fixedname === undefined) {
      alert("Choose Pokemon!!!");
      return;
    }
    const newSample = {
      name: props.data.name,
      item: props.data.item,
      ability: props.data.ability,
      moves: props.data.moves,
      evs: props.data.evs,
      ivs: props.data.ivs,
    };
    const localData = localStorage.getItem("sample");
    const newArr = JSON.parse(localData);
    if (props.idx === newArr.length) {
      newArr.push(newSample);
    } else {
      newArr[props.idx] = newSample;
    }
    props.onSetSampleList(newArr);
    props.onSetCurIdx(newArr.length);
    localStorage.setItem("sample", JSON.stringify(newArr));
  };

  return (
    <div id="samplecreator">
      <button onClick={() => exportToBox()}>박스에 저장하기</button>
      <SampleChart
        data={props.data}
        fixedname={props.fixedname}
        onSetMode={(m) => {
          setMode(m);
        }}
        onSetSample={(key, value) => {
          props.onSetSample(key, value);
        }}
      ></SampleChart>
      <StatTable
        data={props.data}
        fixedname={props.fixedname}
        onSetSample={(key, value) => {
          props.onSetSample(key, value);
        }}
      ></StatTable>
      <ListLoader
        mode={mode}
        data={props.data}
        fixedName={props.fixedname}
        onSetSample={(key, value) => {
          props.onSetSample(key, value);
        }}
        onSetFixedName={(name) => {
          props.onSetFixedName(name);
        }}
      ></ListLoader>
    </div>
  );
}

export default SampleCreator;
