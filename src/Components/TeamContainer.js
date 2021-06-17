import React, { useState } from "react";
import SampleCreator from "./TeamContainer/SampleCreator";
import SampleBox from "./SampleBox/SampleBox";

function TeamContainer() {
  const localData = JSON.parse(localStorage.getItem("sample"));
  const [fixedName, setFixedName] = useState(() => {
    if (localData.length === 0) {
      return "missingno";
    } else {
      return localData[localData.length - 1].name;
    }
  });
  const [curSample, setSample] = useState(() => {
    if (localData.length === 0) {
      return {
        name: "",
        ability: "",
        item: "",
        evs: [0, 0, 0, 0, 0, 0],
        ivs: [31, 31, 31, 31, 31, 31],
        moves: ["", "", "", ""],
      };
    } else {
      return localData[localData.length - 1];
    }
  });
  const [sampleList, setSampleList] = useState(localData);
  return (
    <div id="team-container">
      <SampleCreator
        data={curSample}
        fixedname={fixedName}
        onSetSample={(key, value) => {
          setSample({ ...curSample, [key]: value });
        }}
        onSetSampleList={(data) => {
          console.log(data);
          setSampleList(() => {
            return data;
          });
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
          localStorage.setItem("sample", JSON.stringify(data));
        }}
        onSetFixedName={(name) => {
          setFixedName(name);
        }}
      ></SampleBox>
    </div>
  );
}
export default TeamContainer;
