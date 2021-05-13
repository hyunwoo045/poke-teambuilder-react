import React, { useState } from "react";
import SampleCreator from "./TeamContainer/SampleCreator";
import SampleBox from "./TeamContainer/SampleBox";

function TeamContainer() {
  const [lastIdx, setLastIdx] = useState(0);
  const [samples, setSamples] = useState([
    {
      id: 0,
      name: "이상해씨",
      dexnum: 1,
      item: "기합의띠",
      ability: "엽록소",
      moves: ["씨뿌리기", "수면가루", "솔라빔", "기사회생"],
      evs: [0, 0, 0, 0, 0, 0],
      ivs: [31, 31, 31, 31, 31, 31],
    },
  ]);
  return (
    <div id="team-container">
      <SampleCreator
        idx={lastIdx}
        onSetSamples={(data, idx) => {
          const newArr = Array.from(samples);
          newArr.push(data);
          setSamples(newArr);
          setLastIdx(idx);
        }}
      ></SampleCreator>
      <SampleBox sampleData={samples}></SampleBox>
    </div>
  );
}

export default TeamContainer;
