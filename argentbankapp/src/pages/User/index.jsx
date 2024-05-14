import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Account } from "../../components/account/Account";
import { useEffect, useState } from "react";
import { EditNameForm } from "../../components/editNameForm/EditNameForm";


export function User() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditButtonClick = () => setIsEditing(true);
  const handleCancelButtonClick = () => setIsEditing(false);

 useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user ? user.userName : ""}
        </h1>
        {isEditing ? <><EditNameForm />  <button className="edit-button" onClick={handleCancelButtonClick}>Cancel</button></> : <button className="edit-button" onClick={handleEditButtonClick}>Edit Name</button>}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
      <Account />
      <Account />
    </main>
  );
}
