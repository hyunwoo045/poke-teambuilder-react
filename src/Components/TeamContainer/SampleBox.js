import React, { useState } from "react";
import "./Style/SampleBox.css";

function SampleBox(props) {
  const [isHovering, setHover] = useState(false);
  const localData = localStorage.getItem("sample");
  const data = JSON.parse(localData);
  let res = [];
  const getMovesContent = (moves) => {
    return (
      <div className="sample-moves">
        {moves.map((name, idx) => (
          <div key={idx} className="sample-move">
            - {name}
          </div>
        ))}
      </div>
    );
  };
  for (let i = 0; i < data.length; i++) {
    res.push(
      <div
        className="sample"
        key={i}
        onMouseEnter={(e) => {
          setHover(true);
          console.log(data[i]);
        }}
        onMouseLeave={() => {
          setHover(false);
          console.log("mouse leave");
        }}
        onClick={() => {
          let newData = JSON.parse(localData);
          newData.splice(i, 1);
          localStorage.setItem("sample", JSON.stringify(newData));
        }}
      >
        <div className="sample-img">
          <img src={"sprites/" + data[i].dexnum + ".jpg"} alt=""></img>
        </div>
        <div className="sample-item">
          <div>도구: {data[i].item}</div>
          <div>특성: {data[i].ability}</div>
          <div>{getMovesContent(data[i].moves)}</div>
        </div>
      </div>
    );
  }
  return <div id="samplebox">{res}</div>;
}
export default SampleBox;
