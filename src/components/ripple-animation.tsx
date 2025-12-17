const RippleAnimation = () => (
    <div className="loader">
      <div className="box" style={{'--i': 1} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 2} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 3} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 4} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 5} as React.CSSProperties}></div>
    </div>
  );

export default RippleAnimation;
