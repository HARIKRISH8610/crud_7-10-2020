import React from "react";
import "./style.css";

function Button(props) {
  console.log(props);
  const { name, className, type, onClick } = props;
  return (
    <div>
      <button
        className={"button" + " " + className}
        type={type || "button"}
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
