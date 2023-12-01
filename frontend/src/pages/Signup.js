import { useSignup } from "../hooks/useSignup";
import { useField } from "../hooks/useField";

const Signup = () => {
  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const url = "api/users/register";

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    await signup(obj, url);
    name.onChange({ target: { value: "" } });
    email.onChange({ target: { value: "" } });
    password.onChange({ target: { value: "" } });
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Name:</label>
      <input {...name} />
      <label>Email address:</label>
      <input {...email} />
      <label>Password:</label>
      <input {...password} />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
