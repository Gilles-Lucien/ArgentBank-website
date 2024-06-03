import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "./authSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });


  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(form));
  };

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchUserProfile(auth.token)).then((response) => {
        if (response.type === "auth/fetchUserProfile/rejected") {
          console("Failed to fetch user profile");
        } else {
          if (form.rememberMe) {
            localStorage.setItem("token", auth.token);
          }
          navigate("/user");

        }
      });
    }
    if (auth.error) {
      alert("Idenfitiant ou mot de passe incorrect");
    }
  }, [auth.token, auth.error, dispatch, navigate, form.rememberMe]);

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
            value={form.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" name="rememberMe" checked={form.rememberMe} onChange={handleCheckboxChange} />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button" type="submit">
          Sign In
        </button>
      </form>
    </section>
  );
}
