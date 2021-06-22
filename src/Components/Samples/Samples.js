import React, { useState } from "react";
import Builder from "./Builder/Builder";
import Box from "./Box/Box";

function Samples() {
  const localSampleData = JSON.parse(localStorage.getItem("data-sample"));
  const [boxData, setBoxData] = useState(localSampleData);
  return (
    <div id="app-samples">
      <Builder
        onSetNewSample={(sample) => {
          if (boxData[0].samples.length === boxData[0].maxLength) {
            alert("Waiting Box Full!");
            return;
          }
          let newList = Array.from(boxData);
          newList[0].samples.push(sample);
          setBoxData(newList);
        }}
      ></Builder>
      <Box
        boxData={boxData}
        setData={(data) => {
          setBoxData(data);
        }}
      ></Box>
    </div>
  );
}

export default Samples;
