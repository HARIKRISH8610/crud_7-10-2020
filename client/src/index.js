import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout/Layout";

let container = null;
document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("app");
    ReactDOM.render(<Layout />, container);
  }
});
