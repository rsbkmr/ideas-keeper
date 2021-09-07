import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/User";
import { TokenContext } from "../context/Token";
import { IdeaContext } from "../context/Idea";
import IdeaForm from "../components/IdeaForm";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);
  const [ideas, setIdeas] = useContext(IdeaContext);

  useEffect(() => {
    if (user) {
      fetch(process.env.REACT_APP_URL + "/ideas", {
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => setIdeas(data));
    }
  }, [user, token]);

  const deleteIdea = (ideaId) => {
    fetch(process.env.REACT_APP_URL + "/ideas/" + ideaId, {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
      },
    });
    setIdeas(ideas.filter((item) => item._id !== ideaId));
  };

  return (
    <div>
      <Navbar />
      {/* if not authenticated */}
      {!user && (
        <div className="bg-light p-5 text-center">
          <div className="container">
            <h1 className="text-center">A fullstack app to store your ideas</h1>
            <Link to="/login" className="btn btn-primary m-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary m-2">
              Register
            </Link>
          </div>
        </div>
      )}
      {/* if authenticated */}
      {user && (
        <div className="container mt-3">
          <h1>{user.name}</h1>
          <IdeaForm />
          <ul className="list-group">
            {ideas.length
              ? ideas.map((idea) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={idea._id}
                  >
                    {idea.idea}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteIdea(idea._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))
              : "No ideas yet"}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
