import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/User";
import { TokenContext } from "../context/Token";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch(process.env.REACT_APP_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // validation
    const data = await response.json();
    if (data.error) return setError(data.error);

    setUser(data.user);
    setToken(data.token);
    history.push("/");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <h1>Login</h1>
        <form className="mt-4" onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="login-email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="login-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <p className="text-danger">{error}</p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
