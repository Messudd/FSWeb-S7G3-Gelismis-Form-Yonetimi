import React, { useEffect } from "react";
import axios from "axios";
import { usersActions } from "../App";
import "./../style/usersForm.css";

const UsersForm = (props) => {
  const { userData, setUserData, usersDispatch, usersList , isDisable,updateMethod} = props;

  const handleFormChange = (e) => {
    const { name, type, value, checked } = e.target;
    setUserData({ ...userData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://reqres.in/api/users", userData)
      .then((res) => {
        res.data.id = Date.now();
        console.log("post-user-data : ", res.data);
        usersDispatch({
          type: usersActions.add,
          payload: res.data,
        });
        setUserData(res.data);
      })
      .catch((error) => console.log("SUNUCU - HATASI ", error));
  };

  useEffect(() => {
    console.log("user-data : ", userData);
  }, [userData]);

  useEffect(() => {
    console.log("users - list : ", usersList);
  }, [usersList]);

  return (
    <div className="user-form">
      <form onSubmit={handleFormSubmit}>
        <div className="name">
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            name="name"
            type="text"
            value={userData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="surname">
          <label htmlFor="surname">Surname :</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={userData.surname}
            onChange={handleFormChange}
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password :</label>
          <input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleFormChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
          className="terms"
        >
          <label htmlFor="terms">Term :</label>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked = {userData.terms}
            onChange={handleFormChange}
          />
        </div>
        <div className="buttons">
          {
            isDisable ?  <button type="submit">ADD</button> : <button type="submit" onClick={()=> updateMethod(userData)}>UPDATE</button>
          }
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
