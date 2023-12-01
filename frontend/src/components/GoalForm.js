import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const GoalForm = () => {
  const [goal, setGoal] = useState("");
  const { fetchData } = useFetch("https://api.example.com/goals", "POST");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { text: goal };
    await fetchData(data);
    setGoal("");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>
      <label>Text:</label>
      <input
        type="text"
        className=""
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button>Add Goal</button>
    </form>
  );
};

export default GoalForm;
