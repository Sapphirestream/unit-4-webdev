import { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "" || username.trim() === "") {
      console.log("Needs Username and Password");
      return;
    }

    //const url = "https://socialmtn.devmountain.com";
    const url = "http://localhost:4000";
    const body = { username, password };

    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
        const { token, exp, userId } = res.data;
        authCtx.login(token, exp, userId);
      })
      .catch((err) => {
        console.log(err);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          placeholder="Username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <input
          className="form-input"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button className="form-btn" type="submit">
          {register ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        className="form-btn"
        type="button"
        onClick={() => {
          setRegister(!register);
        }}
      >
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
