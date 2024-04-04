import { useLoaderData } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import ToDoList from "../../components/ToDoList";
import "./Tasks.css";
import { fetchTasks } from "../../app/api/firebase";

export const Loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  try {
    const tasks = await fetchTasks(userID);
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

const Tasks = () => {
  const data = useLoaderData();
  return (
    <PageMotion>
      <ToDoList data={data} />
    </PageMotion>
  );
};

export default Tasks;
