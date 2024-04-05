import PropTypes from "prop-types";
import "./ToDoList.css";
import { Form } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { FaEdit, FaTrash, FaPlus, FaRegSave } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import { deleteTask, fetchTasks, updateTasks } from "../app/api/firebase";
import { UseAuth } from "../app/auth/auth";

const ToDoList = ({ data }) => {
  const { user } = UseAuth();
  const [taskInput, setTaskInput] = useState("");
  const [tasksData, setTasksData] = useState(data.tasks || []);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  const fetchAndUpdateTasks = async () => {
    try {
      const updatedTasks = await fetchTasks(user.id);
      setTasksData(updatedTasks.tasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    try {
      await updateTasks(user.id, [...tasksData, newTask]);
      setTaskInput("");
      fetchAndUpdateTasks();
    } catch (err) {
      throw new Error(err);
    }
  };

  const markTaskAsDone = async (taskId) => {
    const updatedTasks = tasksData.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    try {
      await updateTasks(user.id, updatedTasks);
      fetchAndUpdateTasks();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(user.id, taskId);
      fetchAndUpdateTasks();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleEditTask = async (taskId, newInput) => {
    const updatedTasks = tasksData.map((task) =>
      task.id === taskId ? { ...task, task: newInput } : task
    );

    try {
      await updateTasks(user.id, updatedTasks);
      setEditTaskId(null);
      fetchAndUpdateTasks();
    } catch (err) {
      throw new Error(err);
    }
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
          {tasksData.map((task, index) => (
            <li
              className={`todo--task ${
                editTaskId === task.id ? "lightblue" : "white"
              } `}
              key={index}
            >
              {editTaskId === task.id ? (
                <Form onSubmit={() => handleEditTask(task.id, editInputValue)}>
                  <input
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                    autoFocus
                    required
                  />
                </Form>
              ) : (
                <p
                  onClick={() => markTaskAsDone(task.id)}
                  className={task.done ? "task-done" : ""}
                >
                  {task.task}
                </p>
              )}
              <div className="todo--task-btns">
                {editTaskId === task.id ? (
                  <>
                    <button onClick={() => setEditTaskId(null)}>
                      <GrRevert />
                    </button>
                    <button
                      onClick={() => handleEditTask(task.id, editInputValue)}
                    >
                      <FaRegSave />
                    </button>
                  </>
                ) : (
                  <button
                    className={task.done ? "btn-task-done" : ""}
                    onClick={() => {
                      setEditTaskId(task.id);
                      setEditInputValue(task.task);
                    }}
                  >
                    <FaEdit />
                  </button>
                )}
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
