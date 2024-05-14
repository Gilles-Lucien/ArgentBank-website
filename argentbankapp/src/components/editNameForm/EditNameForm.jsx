import { useSelector } from "react-redux";

export function EditNameForm() {
const user = useSelector((state) => state.auth.user);

  return (
    <form className="form-edit-name">
      <div className="input-wrapper">
        <label htmlFor="userName">User name</label>
        <input type="text" id="userName" name="userName" />
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
