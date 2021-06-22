import React, { useState, useRef } from "react";
import Dex from "../../../data/pokedex";
import "./Box.css";
import Teamdetail from "./Teamdetail";

function Box(props) {
  const [dragging, setDragging] = useState(false);
  const [hoverGrp, setHoverGrp] = useState(-1);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const [detailIdx, setDetailIdx] = useState(-1);
  const dragSample = useRef();
  const dragNode = useRef();

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragSample.current = null;
    dragNode.current = null;
    setDragging(false);
  };
  const handleDragStart = (e, params) => {
    dragSample.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, params) => {
    const currentItem = dragSample.current;
    if (e.target !== currentItem) {
      let newList = Array.from(props.boxData);
      newList[params.grpIdx].samples.splice(
        params.idx,
        0,
        newList[currentItem.grpIdx].samples.splice(currentItem.idx, 1)[0]
      );
      props.setData(newList);
    }
    dragSample.current = params;
  };
  const handleHoverEnter = (params) => {
    setHoverGrp(params.grpIdx);
    setHoverIdx(params.idx);
  };
  const handleHoverLeave = () => {
    setHoverGrp(-1);
    setHoverIdx(-1);
  };
  const getHoverContent = (sample) => {
    return (
      <div className="box-sample-tooltip">
        <div>
          {sample.name} @{sample.item}
        </div>
        <div>특성: {sample.ability}</div>
        <div>
          {sample.evs.map((value, idx) => {
            return (
              <span
                key={idx}
                className={
                  sample.character.high === idx
                    ? "box-sample-nature-high"
                    : sample.character.low === idx
                    ? "box-sample-nature-low"
                    : "box-sample-nature"
                }
              >
                {idx !== 5 ? value + "-" : value}
              </span>
            );
          })}
        </div>
        <div>
          {sample.moves.map((name, idx) => (
            <div key={idx}> - {name} </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="sample-box">
      <button
        id="box-button-savelocal"
        onClick={() => {
          localStorage.setItem("data-sample", JSON.stringify(props.boxData));
        }}
      >
        로컬에 저장하기
      </button>

      {props.boxData.map((group, grpIdx) => (
        <div
          key={grpIdx}
          className={
            grpIdx === 0
              ? "sample-box-container-waiting"
              : "sample-box-container-group"
          }
        >
          <div className="box-title">{group.title}</div>
          {detailIdx === grpIdx ? (
            Teamdetail(group)
          ) : (
            <div
              className={grpIdx === 0 ? "box-waiting" : "box-group"}
              onDragEnter={
                dragging && !group.samples.length
                  ? (e) => handleDragEnter(e, { grpIdx, idx: 0 })
                  : null
              }
            >
              {group.samples.map((sample, idx) => (
                <div
                  className="box-sample"
                  key={idx}
                  onDragStart={(e) => handleDragStart(e, { grpIdx, idx })}
                  onDragEnter={
                    dragging ? (e) => handleDragEnter(e, { grpIdx, idx }) : null
                  }
                  onMouseEnter={() => {
                    handleHoverEnter({ grpIdx, idx });
                  }}
                  onMouseLeave={() => {
                    handleHoverLeave();
                  }}
                >
                  <img
                    src={"regular/" + Dex[sample.name]["name"] + ".png"}
                    alt=""
                  ></img>
                  {hoverGrp === grpIdx && hoverIdx === idx
                    ? getHoverContent(sample)
                    : null}
                </div>
              ))}
            </div>
          )}
          {grpIdx !== 0 ? (
            <div className="box-sample-btndetail">
              {detailIdx === grpIdx ? (
                <button
                  onClick={() => {
                    setDetailIdx(-1);
                  }}
                >
                  간단히 보기
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDetailIdx(grpIdx);
                  }}
                >
                  자세히 보기
                </button>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Box;
