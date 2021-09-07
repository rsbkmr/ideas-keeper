import { useContext, useState } from "react";
import { TokenContext } from "../context/Token";
import { IdeaContext } from "../context/Idea";

function IdeaForm() {
  const [idea, setIdea] = useState("");
  const [token, setToken] = useContext(TokenContext);
  const [ideas, setIdeas] = useContext(IdeaContext);

  const addIdea = async (e) => {
    e.preventDefault();
    console.log(idea);

    fetch(process.env.REACT_APP_URL + "/ideas", {
      method: "POST",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIdeas([data, ...ideas]);
      });
  };

  return (
    <form onSubmit={addIdea}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          id="idea-form"
          onChange={(e) => setIdea(e.target.value)}
          value={idea}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}

export default IdeaForm;
