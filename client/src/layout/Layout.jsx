import axios from "axios";
import React, { useEffect, useState } from "react";
import icon from "../asset/My path (10).svg";
import Button from "../components/button/Button";
import "./style.css";

function Layout() {
  const [crud, setCrud] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const getCrudApi = async () => {
    axios.get("http://localhost:4000/api/v1/crud/").then(async (data) => {
      console.log(data.data.data);

      setCrud(data.data.data);
    });
  };
  useEffect(() => {
    getCrudApi();
  }, []);

  return (
    <div>
      {profileImg && (
        <div className="profile_img_div">
          <div className="profile_img_cancel">
            <span
              onClick={() => {
                setProfileImg("");
              }}
            >
              X
            </span>
          </div>
          <div className="profile_img_image">
            <img src={profileImg} alt="profileimg" />
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Profile Image</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {crud ? (
            crud.map((data, i) => (
              <tr key={i + 2}>
                <td>{i + 1}</td>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
                <td
                  style={{
                    cursor: "pointer",
                    color: "rgb(0,0,0,0.5)",
                    fontStyle: "italic",
                  }}
                  onClick={() => setProfileImg(data.profilePic)}
                >
                  View Image
                </td>
                <td>
                  <Button name="Edit" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>no record found....</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Layout;
