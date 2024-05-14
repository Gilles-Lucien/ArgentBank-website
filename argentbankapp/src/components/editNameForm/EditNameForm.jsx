export function EditNameForm() {
  return (
    <form className="form-edit-name">
      <div className="input-wrapper">
        <label htmlFor="userName">User name</label>
        <input type="text" id="userName" name="userName" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" />
      </div>
      <div className="button-wrapper">
        <button type="cancel">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
