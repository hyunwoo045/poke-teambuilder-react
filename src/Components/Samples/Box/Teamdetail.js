import Dex from "../../../data/pokedex";
import "./Teamdetail.css";

function Teamdetail(group) {
  return (
    <div className="box-group-detail">
      {group.samples.map((sample, idx) => (
        <div className="box-group-detail-gridbox" key={idx}>
          <div className="box-group-detail-sprite">
            <div>
              <img
                src={"regular/" + Dex[sample.name]["name"] + ".png"}
                alt=""
              ></img>
            </div>
            <div>{sample.name}</div>
          </div>
          <div className="box-group-detail-info">
            <div>{"@" + sample.item}</div>
            <div>
              {sample.evs.map((value, idx) => (
                <span key={idx}>{idx !== 5 ? value + "-" : value}</span>
              ))}
            </div>
            <div>
              {sample.moves.map((move, idx) => (
                <div key={idx}>{"- " + move}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Teamdetail;
