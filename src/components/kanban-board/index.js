import React, { useState } from "react";
import "./index.css";

function KanbanBoard() {
  const stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];

  const [tasks, setTasks] = useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);

  const [currentTask, setCurrentTask] = useState({});

  const handleInput = (e) => {
    const taskText = e.target.value;
    const newTask = { name: taskText, stage: 0 };
    setCurrentTask(newTask);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (currentTask.name !== "") {
      setTasks([...tasks, currentTask]);
      setCurrentTask({ name: "", stage: 0 });
    }
  };

  const deleteTask = (name) => {
    const filterTasks = tasks.filter((task) => task.name !== name);
    setTasks(filterTasks);
  };

  const incrementTask = (name) => {
    const newTasks = [...tasks];
    const taskIndex = tasks.findIndex((task) => task.name === name);
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      stage: newTasks[taskIndex].stage + 1,
    };
    setTasks(newTasks);
  };

  const decrementTask = (name) => {
    const newTasks = [...tasks];
    const taskIndex = tasks.findIndex((task) => task.name === name);
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      stage: newTasks[taskIndex].stage - 1,
    };
    setTasks(newTasks);
  };

  const stagesTasks = stagesNames.map(() => []);

  tasks.forEach((task) => {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  });

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <form onSubmit={addTask}>
          <input
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            value={currentTask.name}
            onChange={handleInput}
          />
          <button
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
          >
            Create task
          </button>
        </form>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => (
          <div className="card outlined ml-20 mt-0" key={i}>
            <div className="card-text">
              <h4>{stagesNames[i]}</h4>
              <ul className="styled mt-50" data-testid={`stage-${i}`}>
                {tasks.map((task, index) => (
                  <li className="slide-up-fade-in" key={`${i}${index}`}>
                    <div className="li-content layout-row justify-content-between align-items-center">
                      <span
                        data-testid={`${task.name
                          .split(" ")
                          .join("-")}-name`}
                      >
                        {task.name}
                      </span>
                      <div className="icons">
                        <button
                          className="icon-only x-small mx-2"
                          disabled={task.stage === 0}
                          data-testid={`${task.name
                            .split(" ")
                            .join("-")}-back`}
                          onClick={() => decrementTask(task.name)}
                        >
                          <i className="material-icons">arrow_back</i>
                        </button>

                        <button
                          className="icon-only x-small mx-2"
                          disabled={task.stage === 3}
                          data-testid={`${task.name
                            .split(" ")
                            .join("-")}-forward`}
                          onClick={() => incrementTask(task.name)}
                        >
                          <i className="material-icons">arrow_forward</i>
                        </button>

                        <button
                          className="icon-only danger x-small mx-2"
                          data-testid={`${task.name
                            .split(" ")
                            .join("-")}-delete`}
                          onClick={() => deleteTask(task.name)}
                        >
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
