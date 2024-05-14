import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "./authSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchUserProfile(auth.token)).then((response) => {
        if (response.type === "auth/fetchUserProfile/rejected") {
          alert("Failed to fetch user profile");
        } else {
          if (rememberMe) {
            localStorage.setItem("token", auth.token);
          }
          navigate("/user");

        }
      });
    }
    if (auth.error) {
      alert("Idenfitiant ou mot de passe incorrect");
    }
  }, [auth.token, auth.error, dispatch, navigate, rememberMe]);

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" name="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button" type="submit">
          Sign In
        </button>
      </form>
    </section>
  );
}
