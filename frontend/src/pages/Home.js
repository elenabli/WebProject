import React, { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import GoalDetails from "../components/GoalDetails";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, fetchData } = useFetch("api/goals", "GET");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="home">
      <div className="goals">
        {data &&
          data.map((goal, index) => <GoalDetails key={index} goal={goal} />)}
      </div>
      <GoalForm />
    </div>
  );
};

export default Home;
