import React from "react";
import "./style.css";

function Button(props) {
  console.log(props);
  return (
    <div>
      <button className="button" type="button">
        Click
      </button>
    </div>
  );
}

export default Button;
