import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(loginUser({ email, password }));
  };

  if (auth.token) {
    navigate("/user");
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" name="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button" type="submit">Sign In</button>
      </form>
    </section>
  );
}
