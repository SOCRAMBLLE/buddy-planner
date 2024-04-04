import PropTypes from "prop-types";
import "./ToDoList.css";
import { Form } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ToDoList = ({ data }) => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(data.tasks || []);
  console.log("tasks:", tasks);
  const handleChange = (event) => {
    const { value } = event.target;
    setTaskInput(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTask = {
      id: nanoid(),
      task: taskInput,
      done: false,
      createdAt: new Date().toISOString(),
    };

    console.log("the task", newTask, " was submited");
    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
  };
  return (
    <div className="todo--container">
      <Form
        onChange={handleChange}
        className="todo--new-task"
        onSubmit={handleSubmit}
      >
        <input
          value={taskInput}
          name="task"
          type="text"
          placeholder="New task..."
          required
        />
        <button>
          <FaPlus />
        </button>
      </Form>
      <div className="todo--tasks-container">
        <ul>
          {tasks.map((task, index) => (
            <li className="todo--task" key={index}>
              <p>{task.task}</p>
              <div className="todo--task-btns">
                <button>
                  <FaEdit />
                </button>
                <button>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ToDoList.propTypes = {
  data: PropTypes.object,
};

export default ToDoList;
