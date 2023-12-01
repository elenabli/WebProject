// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useFetch from "../hooks/useFetch";

const GoalDetails = ({ goal }) => {
  const { fetchData } = useFetch("/api/goals", "DELETE");

  const handleDel = async () => {
    await fetchData(null, goal._id);

    // reload page to show updated goals
    window.location.reload();
  };

  return (
    <div className="goal-details">
      <h4>{goal.text}</h4>
      <p>
        {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDel}>
        delete
      </span>
    </div>
  );
};

export default GoalDetails;
