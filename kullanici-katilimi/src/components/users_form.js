import React, { useEffect, useState } from "react";
import axios from "axios";
import { usersActions } from "../App";
import * as Yup from 'yup';
import "./../style/usersForm.css";

const UsersForm = (props) => {
  const { userData, setUserData, usersDispatch, usersList , isDisable,updateMethod} = props;
  const form_erors = {name: '',surname:'',email: '',password: '', terms: false};
  const [isFormValid , setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState(form_erors);
  
  const formSchema = Yup.object().shape({
    name: Yup.string().required('isim gerekli !').min(3,'en az 3 karakter olamalı !'),
    surname: Yup.string().required('soyad gerekli !'),
    email: Yup.string().email('@admin.com formatında olmalı !').required('E-posta adresi gerekli !'),
    password: Yup.string().required('sifre - gerekli !').min(10,'en az 10 karakter !'),
    terms:Yup.boolean().oneOf([true],'Kabul ediniz !')
  });

  const handleFormChange = (e) => {
    const { name, type, value, checked } = e.target;
    const control = (type === "checkbox" ? checked : value);
    setUserData({ ...userData, [name]: control});
    Yup.reach(formSchema,name)
    .validate(control)
    .then((valid) => {
      setFormErrors({...formErrors, [name]: ''});
    })
    .catch((err) => {
      setFormErrors({...formErrors, [name] : err.errors[0]});
    })

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
    formSchema
    .isValid(userData)
    .then((valid) => setFormValid(valid));
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
          {(!!formErrors.name) && <span style={{color:'red',fontSize:'12px'}}>{formErrors.name}</span>} 
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
          {(!!formErrors.surname) && <span style={{color:'red',fontSize:'12px'}}>{formErrors.surname}</span>} 
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
          {(!!formErrors.email) && <span style={{color:'red',fontSize:'12px'}}>{formErrors.email}</span>} 
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
         {(!!formErrors.password) && <span style={{color:'red',fontSize:'12px'}}>{formErrors.password}</span>} 
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
          {(!!formErrors.terms) && <span style={{color:'red',fontSize:'12px'}}>{formErrors.terms}</span>} 
        </div>
        <div className="buttons">
          {
            isDisable ?  <button disabled = {!isFormValid} type="submit">ADD</button> : <button type="button" onClick={()=> updateMethod(userData)}>UPDATE</button>
          }
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
