import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/User";
import { TokenContext } from "../context/Token";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const response = await fetch(process.env.REACT_APP_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
        <h1>Register</h1>
        <form className="mt-4" onSubmit={register}>
          <div className="mb-3">
            <label htmlFor="register-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="register-name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="register-email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="register-password"
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

export default Register;
