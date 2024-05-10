import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Account } from "../../components/account/Account";

export function User() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  if (!token) {
    navigate("/sign-in");
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
      <Account />
      <Account />
    </main>
  );
}
