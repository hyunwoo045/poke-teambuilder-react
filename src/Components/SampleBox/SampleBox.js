import "./Style/SampleBox.css";
import WaitingList from "./WaitingList";
import Team from "./Team";
import React, { useState, useRef } from "react";

function SampleBox(props) {
  const [dragging, setDragging] = useState(false);
  const dragSample = useRef();
  const dragNode = useRef();
  const [curGrpIdx, setGrpIdx] = useState("sample");
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
        setTeamList={(sample, Idx) => {
          const currentItem = sample;
          console.log(currentItem);
          console.log(curGrpIdx);
          setTeamlist((oldList) => {
            let newList = JSON.parse(JSON.stringify(oldList));
            if (curGrpIdx === "sample") {
              let oldSampleList = Array.from(props.samplelist);
              newList[Idx].samples.splice(
                0,
                0,
                oldSampleList.splice(currentItem.i, 1)[0]
              );
              props.onSetSampleList(oldSampleList);
              localStorage.setItem("sample", JSON.stringify(oldSampleList));
            }
            // } else {
            //   newList[Idx].samples.splice(
            //     Idx,
            //     0,
            //     newList[curGrpIdx].samples.splice(currentItem.i, 1)[0]
            //   );
            // }
            return newList;
          });
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
          onSetGrpIdx={(Idx) => {
            setGrpIdx(Idx);
          }}
        ></WaitingList>
      }
      <div id="teamlist">{teamComponents}</div>
    </div>
  );
}
export default SampleBox;
