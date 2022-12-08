import axios from "axios";
import React, { useEffect, useState } from "react";
import icon from "../asset/My path (10).svg";
import Button from "../components/button/Button";
import "./style.css";

function Layout() {
  const [crud, setCrud] = useState("");
  const getCrudApi = () => {
    axios.get("http://localhost:4000/api/v1/crud/").then((data) => {
      console.log(
        data.data.data[0].profilePic.data.data,
        data.data.data[0].profilePic.contentType
      );
      // const blob = new Blob(data.data.data[0].profilePic.data.data, {
      //   type: data.data.data[0].profilePic.contentType,
      // });
      // console.log(URL.createObjectURL(blob));
      const buffer = new Uint8Array(data.data.data[0].profilePic.data.data);
      console.log(buffer);
      setCrud("data:image/jpeg;base64," + buffer);
    });
  };
  useEffect(() => {
    getCrudApi();
  }, []);

  return (
    <div>
      {crud && <img src={crud} />}
      <Button name={"props"} onClick={(e) => fnClicking(e)} />
    </div>
  );
}

export default Layout;
