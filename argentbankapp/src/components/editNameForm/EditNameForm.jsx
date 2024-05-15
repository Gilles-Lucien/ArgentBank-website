import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserName } from "../../components/loginForm/authSlice";


export function EditNameForm({ onSuccess }) {
const user = useSelector((state) => state.auth.user);
const token = useSelector((state) => state.auth.token);
const [userName, setUserName] = useState(user.userName);
const dispatch = useDispatch();

const handleUserNameChange = (e) => setUserName(e.target.value);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await dispatch(updateUserName({ token, userName }));
    alert('Successfully updated user name');
    onSuccess();
  } catch (error) {
    console.error('Failed to update user name', error);
  }
};


  return (
    <form className="form-edit-name" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="userName">User name</label>
        <input type="text" id="userName" name="userName" value={userName} onChange={handleUserNameChange} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={user.firstName} disabled />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={user.lastName} disabled />
      </div>
      <div className="button-wrapper">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
