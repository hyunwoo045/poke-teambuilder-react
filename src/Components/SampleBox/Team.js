import React from "react";
import Dex from "../data/pokedex";

function Team(props) {
  const handleDragEnter = (e, teamIdx) => {
    if (e.target !== props.draggingNode) {
      props.setTeamList(props.draggingSample, teamIdx);
    }
  };

  let pokeList = [];
  // for (let i = 0; i < props.data.samples.length; i++) {
  //   let curName = props.data.samples[i].name;
  //   pokeList.push(
  //     <span key={i} className="sample" onClick={(e) => {}}>
  //       <img
  //         className="sample-img"
  //         src={"regular/" + Dex[curName]["name"] + ".png"}
  //         alt=""
  //       ></img>
  //     </span>
  //   );
  // }
  return (
    <div
      className="team"
      key={props.idx}
      onDragEnter={
        props.isDragging ? (e) => handleDragEnter(e, props.idx) : null
      }
    >
      {props.data.title}
      <div className="samplebox-team">{pokeList}</div>
    </div>
  );
}

export default Team;
