import React from "react";
import { getTaskByUser } from "../Utils";
import { useState, useEffect } from "react";

const Tasks = ({
  userId,
  userName,
  userTask,
  setUserTask,
  checkIfUserTaskCompleted,
  TasksStyle,
}) => {
  const [addComponent, setAddComponent] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [showTasks, setShowTasks] = useState(true);

  const markTaskCompleted = (index) => {
    const updatedTasks = [...userTask];
    updatedTasks[index].completed = true;
    setUserTask(updatedTasks);
    checkIfUserTaskCompleted();
  };

  const displayAddComponent = () => {
    setAddComponent(!addComponent);
    setShowTasks(!showTasks);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleAddClick = () => {
    const newUpdatedTask = [
      ...userTask,
      { title: textInput, completed: false },
    ];
    setUserTask(newUpdatedTask);
    setTextInput("");
    displayAddComponent();
  };

  const handleCancelClick = () => {
    displayAddComponent();
  };

  return (
    <div>
      {userId && (
        <div>
          <ul>
            <button onClick={() => displayAddComponent()}>Add</button>
            {addComponent && (
              <div style={TasksStyle}>
                <div style={{ fontWeight: "bold" }}>Add Task - {userName} </div>

                <p>
                  {" "}
                  Title:
                  <input
                    type="text"
                    value={textInput}
                    onChange={handleTextChange}
                    placeholder="Enter a title"
                  />
                </p>
                <button onClick={handleAddClick}>Add</button>
                <br></br>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            )}

            {showTasks && (
              <div>
                <div style={{ fontWeight: "bold" }}>Todos - {userName} </div>
                {userTask.map((task, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        border: "1px solid purple",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px" }}>
                        Title: {task.title}
                      </div>
                      <div>
                        Completed: {task.completed ? "Yes" : "No"}
                        {!task.completed && (
                          <div>
                            <button onClick={() => markTaskCompleted(index)}>
                              Mark Completed
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tasks;
