const Login = () => {
  return (
    <form className="login">
      <h3>Log In</h3>

      <label>Email address:</label>
      <input type="email" />
      <label>Password:</label>
      <input type="password" />

      <button>Log in</button>
    </form>
  );
};

export default Login;
