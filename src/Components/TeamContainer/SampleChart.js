import React from "react";

function SampleChart(props) {
  let moveArr = [];
  for (let i = 0; i < 4; i++) {
    moveArr.push(
      <input
        type="text"
        placeholder="기술"
        id={"move-" + i}
        key={i}
        value={props.data.curMoves[i]}
        onClick={(e) => {
          props.onSetMode(e.target.id);
        }}
        onChange={(e) => {
          let data = Array.from(props.data.curMoves);
          data[i] = e.target.value;
          props.onChangeMoves(data);
        }}
      ></input>
    );
  }
  return (
    <div id="samplechart">
      <div id="samplechart-left">
        <div id="samplechart-left-top">
          <div id="sampleimg">
            <img src={"sprites/" + props.data.curDexnum + ".jpg"} alt=""></img>
          </div>
        </div>
        <div id="samplechart-left-bottom">
          <input
            id="sample-pokename"
            type="text"
            placeholder="이름"
            value={props.data.curName}
            onClick={() => {
              props.onSetMode("pokename");
            }}
            onChange={(e) => {
              props.onChangeName(e.target.value);
            }}
          ></input>
          <input
            id="sample-item"
            type="text"
            placeholder="도구"
            value={props.data.curItem}
            onClick={() => {
              props.onSetMode("item");
            }}
            onChange={(e) => {
              props.onChangeItem(e.target.value);
            }}
          ></input>
          <input
            id="sample-ability"
            type="text"
            placeholder="특성"
            value={props.data.curAbility}
            onClick={() => {
              props.onSetMode("ability");
            }}
            onChange={(e) => {
              props.onChangeAbility(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div id="samplechart-right">{moveArr}</div>
    </div>
  );
}
export default SampleChart;
