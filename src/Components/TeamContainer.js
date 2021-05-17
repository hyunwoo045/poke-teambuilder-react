import React, { useState } from "react";
import SampleCreator from "./TeamContainer/SampleCreator";
import SampleBox from "./TeamContainer/SampleBox";

function TeamContainer() {
  const localData = JSON.parse(localStorage.getItem("sample"));
  const [curIdx, setCurIdx] = useState(localData.length);
  const [fixedName, setFixedName] = useState(
    localData[localData.length - 1].name
  );
  const [curSample, setSample] = useState(localData[localData.length - 1]);
  const [sampleList, setSampleList] = useState(localData);
  return (
    <div id="team-container">
      <SampleCreator
        data={curSample}
        fixedname={fixedName}
        idx={curIdx}
        onSetSample={(key, value) => {
          setSample({ ...curSample, [key]: value });
        }}
        onSetSampleList={(data) => {
          console.log(data);
          setSampleList(data);
        }}
        onSetCurIdx={(idx) => {
          setCurIdx(idx);
        }}
        onSetFixedName={(name) => {
          setFixedName(name);
        }}
      ></SampleCreator>
      <SampleBox
        samplelist={sampleList}
        onSetSample={(data) => {
          setSample(data);
        }}
        onSetSampleList={(data) => {
          setSampleList(data);
        }}
        onSetCurIdx={(idx) => {
          setCurIdx(idx);
        }}
        onSetFixedName={(name) => {
          setFixedName(name);
        }}
      ></SampleBox>
    </div>
  );
}
export default TeamContainer;
