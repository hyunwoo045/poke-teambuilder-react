import "./Style/SampleBox.css";
import WaitingList from "./WaitingList";
import Team from "./Team";
import React, { useState, useRef } from "react";

function SampleBox(props) {
  const localTeamlist = JSON.parse(localStorage.getItem("Teamlist"));
  const [dragging, setDragging] = useState(false);
  const [teamlist, setTeamlist] = useState(localTeamlist);
  const dragSample = useRef();
  const dragNode = useRef();

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragSample.current = null;
    dragNode.current = null;
    setDragging(false);
  };
  return (
    <div id="samplebox">
      {
        <WaitingList
          sampleData={props.samplelist}
          onSetSampleList={(data) => {
            props.onSetSampleList(data);
          }}
          onSetDragHandler={(target, params) => {
            dragSample.current = params;
            dragNode.current = target;
            dragNode.current.addEventListener("dragend", handleDragEnd);
            setTimeout(() => {
              setDragging(true);
            }, 0);
          }}
        ></WaitingList>
      }
      <div id="teamlist">
        {teamlist.map((item, grpIdx) => {
          return (
            <Team
              key={grpIdx}
              idx={grpIdx}
              data={item}
              isDragging={dragging}
              onHandleDragEnter={(target, params) => {
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
                    dragSample.current = params;
                    return newList;
                  });
                }
              }}
              onSetTeamList={(newList) => {
                props.onSetTeamList(newList);
              }}
            ></Team>
          );
        })}
      </div>
    </div>
  );
}
export default SampleBox;
