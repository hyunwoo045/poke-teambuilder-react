import React from "react";
import Dex from "../../../../data/pokedex";
import Items from "../../../../data/items";
import Movelist from "../../../../data/movelist";
import Learnset from "../../../../data/learnset";
import "./Listloader.css";

function Listloader(props) {
  const getPokeList = (name) => {
    const getPokeContent = (pokename) => {
      const ability = Dex[pokename]["abilities"];
      const statLabel = ["HP", "A", "B", "C", "D", "S"];
      const baseStats = Object.values(Dex[pokename]["baseStats"]);
      return (
        <li
          key={pokename}
          className="listloader-result"
          onClick={() => {
            props.onSetSample("name", pokename);
          }}
        >
          <span className="result-pokeicon">
            <img src={"regular/" + Dex[pokename]["name"] + ".png"} alt=""></img>
          </span>
          <span className="result-pokename">{pokename}</span>
          <span className="result-types">
            {Dex[pokename]["types"].map((item, itemIdx) => (
              <img
                src={"type_sprites/" + item + ".png"}
                alt=""
                key={itemIdx}
              ></img>
            ))}
          </span>
          <span className="result-ability">
            {ability["1"] === undefined ? (
              <div>{ability["0"]}</div>
            ) : (
              <div>
                <div>{ability["0"]}</div>
                <div>{ability["1"]}</div>
              </div>
            )}
          </span>
          <span className="result-hiddenability">
            {ability["H"] === undefined ? "-" : ability["H"]}
          </span>
          {statLabel.map((title, idx) => (
            <span className="result-pokestat" key={title}>
              <div>{title}</div>
              <div>{baseStats[idx]}</div>
            </span>
          ))}
        </li>
      );
    };
    if (name === "") {
      return (
        <li className="listloader-result">
          <span className="result-err">Search Pokemon!</span>
        </li>
      );
    }
    let nameList = Object.keys(Dex);
    let result = [];
    for (let i = 0; i < nameList.length; i++) {
      if (nameList[i].startsWith(name)) {
        result.push(getPokeContent(nameList[i]));
      }
    }
    return <div id="sample-listloader-pokename">{result}</div>;
  };

  const getItemList = (item) => {
    const getItemContent = (itemname) => {
      const itemData = Items[itemname];
      return (
        <li
          className="listloader-result"
          key={itemname}
          onClick={() => {
            props.onSetSample("item", itemname);
          }}
        >
          <span className="result-itemname">{itemname}</span>
          <span className="result-itemname-eng">{itemData["english"]}</span>
          <span className="result-itemname-jap">{itemData["japanese"]}</span>
        </li>
      );
    };
    let itemList = Object.keys(Items);
    let result = [];
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].includes(item)) {
        result.push(getItemContent(itemList[i]));
      }
    }
    return <div id="sample-listloader-itemname">{result}</div>;
  };
  const getAbilityList = (ability) => {
    const getAbilityContent = (pokename) => {
      const curAbility = Dex[pokename]["abilities"];
      return (
        <div id="sample-listloader-ability">
          <li
            className="listloader-result"
            onClick={() => {
              props.onSetSample("ability", curAbility["0"]);
            }}
          >
            <span className="result-ability-category">일반 특성 1</span>
            <span className="result-ability-name">{curAbility["0"]}</span>
          </li>
          <li
            className="listloader-result"
            onClick={() => {
              curAbility["1"] !== undefined
                ? props.onSetSample("ability", curAbility["1"])
                : props.onSetSample("ability", "-");
            }}
          >
            <span className="result-ability-category">일반 특성 2</span>
            <span className="result-ability-name">
              {curAbility["1"] === undefined ? "-" : curAbility["1"]}
            </span>
          </li>
          <li
            className="listloader-result"
            onClick={() => {
              curAbility["H"] !== undefined
                ? props.onSetSample("ability", curAbility["H"])
                : props.onSetSample("ability", "-");
            }}
          >
            <span className="result-ability-category">숨겨진 특성</span>
            <span className="result-ability-name">
              {curAbility["H"] === undefined ? "-" : curAbility["H"]}
            </span>
          </li>
        </div>
      );
    };
    if (props.isProper === false) {
      return (
        <div id="sample-listloader-ability">
          <li className="listloader-result">Not Proper Pokename</li>
        </div>
      );
    }
    return getAbilityContent(props.curSample.name);
  };
  const getLearnset = (name) => {
    if (!props.isProper) {
      return (
        <div id="sample-listloader-learnset">
          <li className="listloader-result">Not Proper Pokename</li>
        </div>
      );
    }
    const getLearnSetContent = (movename, Idx) => {
      const curMove = Movelist[movename];
      return (
        <li
          className="listloader-result"
          key={movename}
          onClick={() => {
            props.onSetMove(movename, Idx);
          }}
        >
          <span className="result-move-name">{movename}</span>
          <span className="result-move-type">
            {
              <img
                src={"type_sprites/" + curMove["타입"] + ".png"}
                alt=""
              ></img>
            }
          </span>
          <span className="result-move-category">
            <img src={"type_sprites/" + curMove["분류"] + ".png"} alt=""></img>
          </span>
          <span className="result-move-damage">
            <div>위력</div>
            <div>{curMove["위력"]}</div>
          </span>
          <span className="result-move-accuracy">
            <div>명중률</div>
            <div>{curMove["명중률"]}</div>
          </span>
          <span className="result-move-pp">
            <div>PP</div>
            <div>{curMove["pp"]}</div>
          </span>
          <span className="result-move-priority">
            <div>우선도</div>
            <div>{curMove["우선도"]}</div>
          </span>
        </li>
      );
    };
    let result = [];
    let learnset = Object.values(Learnset[name]);
    const moveIdx = props.curMode.split("-")[1];
    for (let i = 0; i < learnset.length; i++) {
      if (learnset[i].includes(props.curSample.moves[moveIdx])) {
        result.push(getLearnSetContent(learnset[i], moveIdx));
      }
    }
    return <div id="sample-listloader-movelist">{result}</div>;
  };
  return (
    <div id="sample-listloader">
      {props.curMode === "name"
        ? getPokeList(props.curSample.name)
        : props.curMode === "item"
        ? getItemList(props.curSample.item)
        : props.curMode === "ability"
        ? getAbilityList(props.curSample.ability)
        : props.curMode.startsWith("move")
        ? getLearnset(props.curSample.name)
        : null}
    </div>
  );
}

export default Listloader;
