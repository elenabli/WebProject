import {useField} from "../hooks/useField";

const GoalForm = () => {
  const goal = useField("text");

  return (
    <form className="create">
      <h3>Add a New Goal</h3>

      <label>Text:</label>
      <input {...goal} className="" />
      <button>Add Goal</button>
    </form>
  );
};

export default GoalForm;
