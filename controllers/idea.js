import Idea from "../models/idea.js";
import ideaValidator from "../validators/idea.js";

async function getIdeas(req, res) {
  try {
    const ideas = await Idea.find({ author: req.user.id });
    res.send(ideas);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

async function createIdea(req, res) {
  // validation
  const { value, error } = ideaValidator(req.body);
  if (error) return res.status(400).json({ error: error.message });

  // create idea
  try {
    const idea = new Idea({ author: req.user.id, ...value });
    await idea.save();
    res.json(idea);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

async function deleteIdea(req, res) {
  // delete idea
  try {
    await Idea.findByIdAndDelete(req.params.ideaId);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

export { getIdeas, createIdea, deleteIdea };
