export function EditNameForm() {
  return (
    <form className="form-edit-name">
      <label htmlFor="userName">User name</label>
      <input type="text" id="userName" name="userName" />
      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" name="lastName" />
      <button type="submit">Submit</button>
    </form>
  );
}
