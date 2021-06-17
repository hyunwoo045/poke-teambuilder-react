function getHoverSampleData(data) {
  const getMovesContent = (moves) => {
    return (
      <div className="sample-moves">
        {moves.map((name, idx) => (
          <div key={idx} className="sample-move">
            - {name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="sample-tooltip">
      <div>
        {data.name} @{data.item}
      </div>
      <div>특성: {data.ability}</div>
      <div>
        {data.evs.map((name, i) => {
          if (i !== 5) return <span key={i}>{name}-</span>;
          else return <span key={i}>{name}</span>;
        })}
      </div>
      <div>{getMovesContent(data.moves)}</div>
    </div>
  );
}
export default getHoverSampleData;
