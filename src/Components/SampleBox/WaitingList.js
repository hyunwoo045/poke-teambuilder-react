import Dex from "../data/pokedex";
import React, { useState } from "react";

function WaitingList(props) {
  const [isHover, setIsHover] = useState(-1);
  const handleDragStart = (e, params) => {
    props.onSetDragSample(params);
    props.onSetDragNode(e.target);
  };
  const handleHoverEnter = (i) => {
    setIsHover(i);
  };
  const handleHoverLeave = () => {
    setIsHover(-1);
  };
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
  let pokeList = [];
  for (let i = 0; i < props.sampleData.length; i++) {
    let curName = props.sampleData[i].name;
    let curData = props.sampleData[i];
    pokeList.push(
      <span
        key={i}
        className="sample"
        onMouseEnter={() => {
          handleHoverEnter(i);
        }}
        onMouseLeave={() => {
          handleHoverLeave();
        }}
        onClick={(e) => {
          e.stopPropagation();
          let newSampleList = Array.from(props.sampleData);
          newSampleList.splice(i, 1);
          props.onSetSampleList(newSampleList);
          localStorage.setItem("sample", JSON.stringify(newSampleList));
        }}
        onDragStart={(e) => handleDragStart(e, { grpIdx: "sample", curData })}
      >
        <img
          className="sample-img"
          src={"regular/" + Dex[curName]["name"] + ".png"}
          alt=""
        ></img>
        {isHover === i && getHoverSampleData(props.sampleData[i])}
      </span>
    );
  }

  return <div id="waitingbox">{pokeList}</div>;
}

export default WaitingList;
