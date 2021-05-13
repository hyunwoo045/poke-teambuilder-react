import React, { useState } from "react";
import SampleCreator from "./TeamContainer/SampleCreator";
import SampleBox from "./TeamContainer/SampleBox";

function TeamContainer() {
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
        data={samples}
        onSetSamples={(data) => {
          setSamples(data);
        }}
      ></SampleCreator>
      <SampleBox></SampleBox>
    </div>
  );
}

export default TeamContainer;
