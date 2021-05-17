import React, { useState } from "react";
import "./Style/SampleBox.css";
import Dex from "./data/pokedex";
function SampleBox(props) {
  const [isHover, setIsHover] = useState(-1);
  const data = props.samplelist;
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

  const handleHoverEnter = (i) => {
    setIsHover(i);
  };
  const handleHoverLeave = () => {
    setIsHover(-1);
  };
  const getHoverSampleData = (data) => {
    return (
      <div className="sample-tooltip">
        <div>
          {data.name} @{data.item}
        </div>
        <div>특성: {data.ability}</div>
        <div>
          {data.evs.map((name, i) => {
            if (i !== 5) return <span key={i}>{name}-</span>;
            else return <span key={i}>{name}</span>;
          })}
        </div>
        <div>{getMovesContent(data.moves)}</div>
      </div>
    );
  };
  for (let i = 0; i < data.length; i++) {
    res.push(
      <div
        className="sample"
        key={i}
        onClick={() => {
          props.onSetSample(data[i]);
          props.onSetCurIdx(i);
          props.onSetFixedName(data[i].name);
        }}
        onMouseEnter={() => {
          handleHoverEnter(i);
        }}
        onMouseLeave={() => {
          handleHoverLeave();
        }}
      >
        <div className="sample-img">
          <img
            src={"sprites/" + Dex[data[i].name]["num"] + ".jpg"}
            alt=""
          ></img>
        </div>
        {/* <div className="sample-info">
          <div>도구: {data[i].item}</div>
          <div>특성: {data[i].ability}</div>
          <div>{getMovesContent(data[i].moves)}</div>
        </div> */}
        {isHover === i && (
          <div className="div-button-close">
            <button
              onClick={(e) => {
                e.stopPropagation();
                let newSampleList = Array.from(data);
                newSampleList.splice(i, 1);
                props.onSetSampleList(newSampleList);
                localStorage.setItem("sample", JSON.stringify(newSampleList));
              }}
              className="button-close"
            ></button>
          </div>
        )}
        {isHover === i && getHoverSampleData(data[i])}
      </div>
    );
  }
  return (
    <div id="samplebox">
      {res}
      <div
        className="sample"
        onClick={() => {
          const emptySample = {
            name: "",
            item: "",
            ability: "",
            moves: ["", "", "", ""],
            evs: [0, 0, 0, 0, 0, 0],
            ivs: [31, 31, 31, 31, 31, 31],
          };
          props.onSetSample(emptySample);
          props.onSetCurIdx(data.length);
          props.onSetFixedName("missingno");
        }}
      >
        추가하기
      </div>
    </div>
  );
}
export default SampleBox;
