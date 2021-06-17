import React, { useState } from "react";
import Dex from "../data/pokedex";
import getHoverSampleData from "./getHoverSampleData";

function Team(props) {
  const grpIdx = props.idx;
  const [isHover, setIsHover] = useState(-1);
  const handleDragEnter = (e, params) => {
    props.onHandleDragEnter(e.target, params);
  };
  const handleHoverEnter = (i) => {
    setIsHover(i);
  };
  const handleHoverLeave = () => {
    setIsHover(-1);
  };
  return (
    <div
      className="team"
      key={props.idx}
      onDragEnter={
        props.isDragging && !props.data.length
          ? (e) => handleDragEnter(e, { grpIdx: grpIdx, itemIdx: 0 })
          : null
      }
    >
      {props.data.title}
      <div className="samplebox-team">
        {props.data.samples.map((item, itemIdx) => (
          <span
            key={itemIdx}
            className="sample"
            onDragEnter={
              props.isDragging
                ? (e) => handleDragEnter(e, { grpIdx, itemIdx })
                : null
            }
            onMouseEnter={() => {
              handleHoverEnter(itemIdx);
            }}
            onMouseLeave={() => {
              handleHoverLeave();
            }}
            onClick={(e) => {
              e.stopPropagation();
              let newSampleList = Array.from(props.data.samples);
              newSampleList.splice(itemIdx, 1);
              let oldTeamlist = JSON.parse(localStorage.getItem("Teamlist"));
              oldTeamlist[grpIdx].samples = newSampleList;
              props.onSetTeamList(oldTeamlist);
              localStorage.setItem("Teamlist", JSON.stringify(oldTeamlist));
            }}
          >
            <img
              className="sample-img"
              src={"regular/" + Dex[item.name]["name"] + ".png"}
              alt=""
            ></img>
            {isHover === itemIdx && getHoverSampleData(item)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Team;
