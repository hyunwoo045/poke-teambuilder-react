import React, { useState } from "react";
import SampleChart from "./SampleChart";
import StatTable from "./StatTable";
import ListLoader from "./ListLoader";
import "./Style/SampleCreator.css";
import "./Style/ListLoader.css";

function SampleCreator(props) {
  const [mode, setMode] = useState("pokename");
  const [sampleData, setSampleData] = useState({
    curName: "",
    curDexnum: 0,
    curItem: "",
    curAbility: "",
    curMoves: ["", "", "", ""],
    evs: [0, 0, 0, 0, 0, 0],
    ivs: [31, 31, 31, 31, 31, 31],
  });
  const [fixedName, setFixedName] = useState();
  const [baseStat, setBaseStat] = useState([100, 100, 100, 100, 100, 100]);
  return (
    <div id="samplecreator">
      <button
        onClick={() => {
          if (fixedName === undefined) {
            alert("Choose Pokemon!!!");
            return;
          }
          const lastIdx = localStorage.getItem("idx");
          const newSample = {
            id: Number(lastIdx) + 1,
            name: sampleData.curName,
            dexnum: sampleData.curDexnum,
            item: sampleData.curItem,
            ability: sampleData.curAbility,
            moves: sampleData.curMoves,
            evs: sampleData.evs,
            ivs: sampleData.ivs,
          };
          const localData = localStorage.getItem("sample");
          const newArr = JSON.parse(localData);
          newArr.push(newSample);
          localStorage.setItem("sample", JSON.stringify(newArr));
          localStorage.setItem("idx", Number(lastIdx) + 1);
          props.onSetSamples(newArr);
        }}
      >
        박스에 저장하기
      </button>
      <SampleChart
        data={sampleData}
        onSetMode={(m) => {
          setMode(m);
        }}
        onChangeName={(val) => setSampleData({ ...sampleData, curName: val })}
        onChangeItem={(val) => setSampleData({ ...sampleData, curItem: val })}
        onChangeAbility={(val) =>
          setSampleData({ ...sampleData, curAbility: val })
        }
        onChangeMoves={(data) =>
          setSampleData({ ...sampleData, curMoves: data })
        }
      ></SampleChart>
      <StatTable
        basestat={baseStat}
        ivs={sampleData.ivs}
        evs={sampleData.evs}
        rvs={sampleData.rvs}
        onChangeEVS={(data) => setSampleData({ ...sampleData, evs: data })}
        onChangeIVS={(data) => setSampleData({ ...sampleData, ivs: data })}
      ></StatTable>
      <ListLoader
        mode={mode}
        data={sampleData}
        fixedName={fixedName}
        onSetData={(data) => setSampleData({ ...sampleData, ...data })}
        onSetNum={(num) => setSampleData({ ...sampleData, curDexnum: num })}
        onSetBasestat={(data) => setBaseStat(data)}
        onSetName={(name) => setFixedName(name)}
        onSetItem={(item) => setSampleData({ ...sampleData, curItem: item })}
        onSetAbility={(ability) =>
          setSampleData({ ...sampleData, curAbility: ability })
        }
        onSetMoves={(data) => setSampleData({ ...sampleData, curMoves: data })}
      ></ListLoader>
    </div>
  );
}

export default SampleCreator;
