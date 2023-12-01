const Signup = () => {
  return (
    <form className="signup">
      <h3>Sign Up</h3>
      <label>Name:</label>
      <input type="text" />
      <label>Email address:</label>
      <input type="email" />
      <label>Password:</label>
      <input type="password" />

      <button>Sign up</button>
    </form>
  );
};

export default Signup;
