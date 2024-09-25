import "./Wave.scss";
function Wave({ topColor, bottomColor }) {
  return (
    <div
      className="Wave"
      style={{
        "--top-color": `${topColor}`,
        "--bottom-color": `${bottomColor}`,
      }}
    >
      <div
        className="top"
        //! Here we encounter a very very weird error. The next two lines are identical but the first line works just fine and if you comment the first one and uncomment the second one, we run into errors!!!
        style={{ color: `${topColor}` }}
        // style={{ color ∶ `${topColor}`}}
      ></div>
      <div className="bottom"></div>
    </div>
  );
}

export default Wave;
