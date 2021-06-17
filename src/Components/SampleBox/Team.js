import React from "react";
import Dex from "../data/pokedex";

function Team(props) {
  const grpIdx = props.idx;
  const handleDragEnter = (e, params) => {
    props.setTeamList(e.target, params);
  };

  return (
    <div
      className="team"
      key={props.idx}
      onDragEnter={
        props.isDragging && !props.data.length
          ? (e) => handleDragEnter(e, { grpIdx, itemIdx: 0 })
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
          >
            <img
              className="sample-img"
              src={"regular/" + Dex[item.name]["name"] + ".png"}
              alt=""
            ></img>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Team;
