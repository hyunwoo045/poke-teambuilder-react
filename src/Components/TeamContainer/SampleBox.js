import React from "react";
import "./Style/SampleBox.css";

function SampleBox(props) {
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
      <div className="sample" key={i}>
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
