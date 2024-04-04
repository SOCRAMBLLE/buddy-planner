import PropTypes from "prop-types";
import "./ToDoList.css";
import { Form } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { deleteTask, updateTasks } from "../app/api/firebase";
import { UseAuth } from "../app/auth/auth";

const ToDoList = ({ data }) => {
  const { user } = UseAuth();
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
    try {
      await updateTasks(user.id, tasks);
      setTaskInput("");
      return console.log("success");
    } catch (err) {
      throw new Error(err);
    }
  };

  const markTaskAsDone = (taskId) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            done: !task.done,
            createdAt: new Date().toISOString(),
          }; // Atualiza a data de criação ao concluir
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(user.id, taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      return console.log("delete success");
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleEditTask = async (taskId) => {
    const newvalue = event.target.value;
    console.log(newvalue);
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
              <p
                onClick={() => markTaskAsDone(task.id)}
                className={task.done ? "task-done" : ""}
              >
                {task.task}
              </p>
              <div className="todo--task-btns">
                <button>
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>
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
