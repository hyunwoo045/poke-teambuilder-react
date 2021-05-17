import React, { useState } from "react";
import SampleCreator from "./TeamContainer/SampleCreator";
import SampleBox from "./TeamContainer/SampleBox";

function TeamContainer() {
  const localData = localStorage.getItem("sample");
  const [curSample, setSample] = useState({
    name: "잠만보",
    item: "",
    ability: "",
    moves: ["", "", "", ""],
    evs: [0, 0, 0, 0, 0, 0],
    ivs: [31, 31, 31, 31, 31, 31],
  });
  const [sampleList, setSampleList] = useState(JSON.parse(localData));
  return (
    <div id="team-container">
      <SampleCreator
        data={curSample}
        onSetSample={(key, value) => {
          setSample({ ...curSample, [key]: value });
        }}
        onSetSampleList={(data) => {
          console.log(data);
          setSampleList(data);
        }}
      ></SampleCreator>
      <SampleBox
        samplelist={sampleList}
        onSetSample={(data) => {
          setSample(data);
        }}
      ></SampleBox>
    </div>
  );
}
export default TeamContainer;
