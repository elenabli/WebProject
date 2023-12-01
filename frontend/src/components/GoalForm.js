
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import {useField} from "../hooks/useField";

const GoalForm = () => {
  const goalText = useField("text");
    const { fetchData } = useFetch("https://api.example.com/goals", "POST");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = { text: goalText.value };
      await fetchData(data);
      goalText.reset();
    };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>
      <label>Text:</label>
      <input {...goalText} className="" />
      <button>Add Goal</button>
    </form>
  );
};

export default GoalForm;
