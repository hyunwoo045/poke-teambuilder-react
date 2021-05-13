import React from "react";
import Dex from "./data/pokedex";
import ItemList from "./data/items";
import MoveList from "./data/movelist";
import LearnSet from "./data/learnset";

function ListLoader(props) {
  const getPokeContent = (name) => {
    const dexnum = Dex[name]["num"];
    const type = Dex[name]["types"];
    let types = [];
    for (let i = 0; i < type.length; i++) {
      types.push(
        <img src={"type_sprites/" + type[i] + ".png"} alt="" key={i}></img>
      );
    }
    const abilities = Dex[name]["abilities"];
    let ability = [];
    if (abilities["1"] !== undefined) {
      ability = (
        <div>
          <div>{abilities["0"]}</div>
          <div>{abilities["1"]}</div>
        </div>
      );
    } else {
      ability = abilities["0"];
    }
    let hiddenAbility = "-";
    if (abilities["H"] !== undefined) {
      hiddenAbility = abilities["H"];
    }
    const statLabel = ["HP", "A", "B", "C", "D", "S"];
    const basestat = Object.values(Dex[name]["baseStats"]);
    let statResult = [];
    for (let i = 0; i < 6; i++) {
      statResult.push(
        <span className="pokestat" key={i}>
          <div>
            <div>{statLabel[i]}</div>
            <div>{basestat[i]}</div>
          </div>
        </span>
      );
    }

    return (
      <li
        className="result"
        key={name}
        onClick={() => {
          props.data.curName = name;
          props.data.curDexnum = dexnum;
          props.onSetData(props);
          props.onSetName(name);
          props.onSetBasestat(basestat);
        }}
      >
        <span className="pokename">{name}</span>
        <span className="poketype">{types}</span>
        <span className="pokeability">{ability}</span>
        <span className="pokehiddenability">{hiddenAbility}</span>
        {statResult}
      </li>
    );
  };

  const getItemContent = (name) => {
    const engname = ItemList[name]["english"];
    const japname = ItemList[name]["japanese"];
    return (
      <li
        className="result"
        key={name}
        onClick={() => {
          props.onSetItem(name);
        }}
      >
        <span className="itemname">{name}</span>
        <span className="itemname-eng">{engname}</span>
        <span className="itemname-jap">{japname}</span>
      </li>
    );
  };

  const getAbilityContent = (name) => {
    let abilityone = Dex[name]["abilities"]["0"];
    let abilitytwo = Dex[name]["abilities"]["1"];
    if (abilitytwo === undefined) {
      abilitytwo = "-";
    }
    let abilityhidden = Dex[name]["abilities"]["H"];
    if (abilityhidden === undefined) {
      abilityhidden = "-";
    }
    let res = [];
    let categoryLabel = ["일반 특성1", "일반 특성2", "숨겨진 특성"];
    let abilityNames = [abilityone, abilitytwo, abilityhidden];
    for (let i = 0; i < 3; i++) {
      res.push(
        <li
          className="result"
          key={i}
          onClick={() => {
            props.onSetAbility(abilityNames[i]);
          }}
        >
          <span className="abilitycategory">{categoryLabel[i]}</span>
          <span className="abilityname">{abilityNames[i]}</span>
        </li>
      );
    }
    return res;
  };

  const getMoveContent = (name, idx) => {
    const type = MoveList[name]["타입"];
    const category = MoveList[name]["분류"];
    const damage = MoveList[name]["위력"];
    const accuracy = MoveList[name]["명중률"];
    const ppoint = MoveList[name]["pp"];
    const priority = MoveList[name]["우선도"];
    return (
      <li
        className="result"
        key={name}
        onClick={() => {
          let data = props.data.curMoves;
          data[idx] = name;
          props.onSetMoves(data);
        }}
      >
        <span className="movename">{name}</span>
        <span className="movetype">
          <img src={"type_sprites/" + type + ".png"} alt=""></img>
        </span>
        <span className="movecategory">
          <img src={"type_sprites/" + category + ".png"} alt=""></img>
        </span>
        <span className="movedamage">
          <div>위력</div>
          <div>{damage}</div>
        </span>
        <span className="moveaccuracy">
          <div>명중률</div>
          <div>{accuracy}</div>
        </span>
        <span className="movepp">
          <div>PP</div>
          <div>{ppoint}</div>
        </span>
        <span className="moveprior">
          <div>우선도</div>
          <div>{priority}</div>
        </span>
      </li>
    );
  };
  const renderList = () => {
    let result = [];
    if (props.mode === "pokename") {
      if (props.data.curName === "") {
        return (
          <li result="result">
            <span className="err">포켓몬을 고르세요</span>
          </li>
        );
      }
      let nameList = Object.keys(Dex);
      for (let i = 0; i < nameList.length; i++) {
        if (nameList[i].startsWith(props.data.curName)) {
          result.push(getPokeContent(nameList[i]));
        }
      }
    } else if (props.mode === "item") {
      // if (props.data.curItem === "") {
      //   return <li className="result"></li>;
      // }
      let itemList = Object.keys(ItemList);
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].includes(props.data.curItem)) {
          result.push(getItemContent(itemList[i]));
        }
      }
    } else if (props.mode === "ability") {
      if (props.fixedName === undefined) {
        return (
          <li result="result">
            <span className="err">포켓몬을 먼저 고르세요</span>
          </li>
        );
      }
      result = getAbilityContent(props.fixedName);
    } else if (props.mode.startsWith("move")) {
      if (props.fixedName === undefined) {
        return (
          <li result="result">
            <span className="err">포켓몬을 먼저 고르세요</span>
          </li>
        );
      }
      let movelist = Object.values(LearnSet[props.fixedName]);
      const moveIndex = props.mode.split("-")[1];
      for (let i = 0; i < movelist.length; i++) {
        if (movelist[i].includes(props.data.curMoves[moveIndex])) {
          result.push(getMoveContent(movelist[i], moveIndex));
        }
      }
    }
    return result;
  };

  return <div id="listloader">{renderList()}</div>;
}

export default ListLoader;
