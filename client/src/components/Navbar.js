import { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { TokenContext } from "../context/Token";
import { UserContext } from "../context/User";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Ideas Keeper
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/register">
                  Register
                </NavLink>
              </li>
            )}
            {user && (
              <div className="navbar-text mx-2">Welcome {user.name}</div>
            )}
            {user && (
              <button className="btn btn-sm btn-light" onClick={logout}>
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
