import { useEffect, useReducer, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import UsersForm from "./components/users_form";
import UsersList from "./components/usersList";
import FormPreview from "./components/formPreview";
import axios from "axios";
import "./App.css";

const userInitial = {
  name: "",
  surname: "",
  email: "",
  password: "",
  terms: false,
};

export const usersActions = Object.freeze({
  add: "ADD",
  delete: "DELETE",
  update: "UPDATE",
});

const usersListReducer = (state, action) => {
  switch (action.type) {
    case usersActions.add:
      if (action.payload) {
        if (state.length === 0) {
          return [...state, action.payload];
        } else {
          if (
            state.filter(
              (item) =>
                item.email === action.payload.email ||
                item.password === action.payload.password
            ).length > 0
          ) {
            alert("Bu email veya sifre listede zaten mevcut !");
          } else {
            return [...state, action.payload];
          }
        }
      }
    case usersActions.delete:
      return state.filter((item) => item.id !== action.payload);
    case usersActions.update:
      const updateState = [...state];
      const index = updateState
        .map((content) => content.name)
        .indexOf(action.payload.name);
      updateState.splice(index, 1);
      updateState.splice(index, 0, action.payload);
      return updateState;
    default:
      return [];
  }
};

function App() {
  const [userData, setUserData] = useState(userInitial);
  const [previewData, setPreviewData] = useState(null);
  const [usersList, usersDispatch] = useReducer(usersListReducer, []);
  const [isDisable, setIsDisable] = useState(true);

  const history = useHistory();

  const deleteMethod = (ID) => {
    usersDispatch({
      type: usersActions.delete,
      payload: ID,
    });
    history.push("/");
  };

  const setterPreview = () => {
    setUserData({ ...previewData });
    setIsDisable(!isDisable);
    history.push("/");
  };

  const updateMethod = async (veri) => {
    await axios
      .post("https://reqres.in/api/users", veri)
      .then((res) => {
        res.data.id = Date.now();
        console.log("post-user-data : ", res.data);
        usersDispatch({
          type: usersActions.update,
          payload: res.data,
        });
        setUserData(res.data);
      })
      .catch((error) => console.log("SUNUCU - HATASI ", error));
  };

  useEffect(() => {
    console.log("preview-data : ", previewData);
  }, [previewData]);

  useEffect(() => {
    console.warn("disable : ", isDisable);
  }, [isDisable]);

  return (
    <>
      <Switch>
        <Route path="/preview/:id">
          <FormPreview
            previewData={previewData}
            deleteMethod={deleteMethod}
            setterPreview={setterPreview}
          />
        </Route>

        <Route path="/" exact>
          <header>
            <div className="nav">
              <h1>
                React - Form <span> Application</span>
              </h1>
            </div>
          </header>
          <main>
            <section>
              <div className="left-side">
                <UsersForm
                  userData={userData}
                  setUserData={setUserData}
                  usersDispatch={usersDispatch}
                  usersList={usersList}
                  isDisable={isDisable}
                  updateMethod={updateMethod}
                />
              </div>
              {
                (usersList.length>0) && (<div className="right-side">
                  <UsersList
                  usersList={usersList}
                  setPreviewData={setPreviewData}
                />
              </div>)
              }
              
            </section>
          </main>
        </Route>
      </Switch>
    </>
  );
}
export default App;
