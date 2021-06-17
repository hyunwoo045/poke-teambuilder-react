import "./Style/SampleBox.css";
import WaitingList from "./WaitingList";
import Team from "./Team";
import React, { useState, useRef } from "react";

function SampleBox(props) {
  const [dragging, setDragging] = useState(false);
  const dragSample = useRef();
  const dragNode = useRef();

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragSample.current = null;
    dragNode.current = null;
    setDragging(false);
  };

  const [teamlist, setTeamlist] = useState(
    JSON.parse(localStorage.getItem("Teamlist"))
  );
  let teamComponents = [];
  for (let i = 0; i < 6; i++) {
    teamComponents.push(
      <Team
        key={i}
        idx={i}
        data={teamlist[i]}
        isDragging={dragging}
        draggingNode={dragNode.current}
        draggingSample={dragSample.current}
        setTeamList={(target, params) => {
          const currentItem = dragSample.current;
          if (target !== dragNode.current) {
            setTeamlist((oldList) => {
              let newList = JSON.parse(JSON.stringify(oldList));
              if (currentItem.grpIdx === "sample") {
                let oldSampleList = Array.from(props.samplelist);
                newList[params.grpIdx].samples.splice(
                  params.itemIdx,
                  0,
                  oldSampleList.splice(currentItem.itemIdx, 1)[0]
                );
                props.onSetSampleList(oldSampleList);
                localStorage.setItem("sample", JSON.stringify(oldSampleList));
              } else {
                newList[params.grpIdx].samples.splice(
                  params.itemIdx,
                  0,
                  newList[currentItem.grpIdx].samples.splice(
                    currentItem.itemIdx,
                    1
                  )[0]
                );
              }
              localStorage.setItem("Teamlist", JSON.stringify(newList));
              dragSample.current = params;
              return newList;
            });
          }
        }}
      ></Team>
    );
  }
  return (
    <div id="samplebox">
      This is WaitingList
      {
        <WaitingList
          sampleData={props.samplelist}
          onSetSampleList={(data) => {
            props.onSetSampleList(data);
          }}
          onSetDragSample={(params) => {
            dragSample.current = params;
            console.log(dragSample.current);
          }}
          onSetDragNode={(node) => {
            dragNode.current = node;
            dragNode.current.addEventListener("dragend", handleDragEnd);
            setTimeout(() => {
              setDragging(true);
            });
          }}
        ></WaitingList>
      }
      <div id="teamlist">{teamComponents}</div>
    </div>
  );
}
export default SampleBox;
