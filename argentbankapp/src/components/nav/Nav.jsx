import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../loginForm/authSlice";

export function Nav() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.avif"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle" />
            {`${user.firstName} ${user.lastName}`}
          </Link>
          <i className="fa fa-power-off" onClick={handleLogout}/>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
