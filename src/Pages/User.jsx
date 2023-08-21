import { useState, useEffect } from "react";
import { getTaskByUser, updateUser, deleteUser } from "../Utils";
import Tasks from "./Tasks";
import Posts from "./Posts";

const User = ({ user, handleDeletUser, handleUpdateUser, tasks, posts }) => {
  const [showAnotherComponent, setShowAnotherComponent] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [userTask, setUserTask] = useState([]);
  const [postsUsers, setPostsUsers] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [backgroundRed, setBackgroundRed] = useState(false);
  const [showOtherData, setShowOtherData] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    address: {
      zipcode: user.address.zipcode,
      city: user.address.city,
      street: user.address.street,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      let resp = await getTaskByUser(user.id);
      console.log("resp from fetch data user" + resp);
      setUserTask(resp);
      console.log("userTask" + userTask);
      setShowUser(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkIfUserTaskCompleted = async () => {
      console.log("userTask" + userTask);
      const allTaskIsCompleted = userTask.every((item) => {
        console.log("item" + item);
        return item.completed == true;
      });
      console.log("allTaskIsCompleted" + allTaskIsCompleted);
      setTaskCompleted(allTaskIsCompleted);
    };
    checkIfUserTaskCompleted();
  }, [userTask]);

  //checkIfUserTaskCompleted function

  const checkIfUserTaskCompleted = async () => {
    console.log("userTask" + userTask);
    const allTaskIsCompleted = userTask.every((item) => {
      console.log("item" + item);
      return item.completed == true;
    });
    console.log("allTaskIsCompleted" + allTaskIsCompleted);
    setTaskCompleted(allTaskIsCompleted);
  };

  // another userEffect hook to update the updatedFields state whenever the user prop changes.
  useEffect(() => {
    if (user && user.address) {
      setUpdatedFields({
        id: user.id,
        name: user.name,
        email: user.email,
        address: {
          zipcode: user.address.zipcode,
          city: user.address.city,
          street: user.address.street,
        },
      });
    }
  }, [user]);

  const handleCardClick = () => {
    console.log("handlecard");
    setBackgroundRed(!backgroundRed);
    setShowAnotherComponent(!showAnotherComponent);
    setShowOtherData(!showOtherData);
  };

  const handleMouseOver = () => {
    setShowOtherData(true);
  };
  const handleMouseLeave = () => {
    setShowOtherData(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("I am in the handle change function");
    console.log("updatedFields " + JSON.stringify.updatedFields);
    setUpdatedFields((prevFields) => ({ ...prevFields, [name]: value }));
  };
  const handleUpdateClick = () => {
    console.log("");
    handleUpdateUser(user.id, updatedFields);
  };
  const addTask = (obj) => {
    let updatedUserTask = [...userTask, obj];
    setUserTask[updatedUserTask];
  };
  const cardStyle = {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    backgroundColor: backgroundRed ? "orange" : "white",
  };

  const TasksStyle = {
    // border: "1px solid black",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "2px solid red",
    flex: 1,
    display: "flex",
    transition: "background-color 0.3s ease",
    flexDirection: "column",
  };

  const cardStyleHover = {
    backgroundColor: "lightgray",
  };

  return (
    <div style={{ display: "flex" }}>
      {showUser && (
        <div
          style={{
            ...cardStyle,
            border: taskCompleted ? "2px solid green" : "2px solid red",
            flex: 1,
          }}
          onClick={handleCardClick}
        >
          <h3>{user.name}</h3>
          ID:{" "}
          <input
            type="id"
            id="id"
            name="id"
            value={updatedFields?.id || ""}
            readOnly
          />
          <p>
            Name:{" "}
            <input
              type="text"
              id="name"
              name="name"
              value={updatedFields?.name || ""}
              onChange={handleChange}
            />
          </p>
          <p>
            {" "}
            Email:{" "}
            <input
              type="email"
              id="email"
              name="email"
              value={updatedFields?.email || ""}
              onChange={handleChange}
            />
          </p>
          <button
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            style={{ marginRight: "10px" }}
          >
            Other Data
          </button>
          <button
            onClick={handleUpdateClick}
            onMouseLeave={handleMouseLeave}
            style={{ marginRight: "10px" }}
          >
            Update
          </button>
          <button
            onClick={() => handleDeletUser(user.id)}
            onMouseLeave={handleMouseLeave}
            style={{ marginRight: "10px" }}
          >
            Delete
          </button>
          {showOtherData && (
            <>
              <p>
                {" "}
                zipcode:{" "}
                <input
                  type="zipcode"
                  id="zipcode"
                  name="zipcode"
                  value={updatedFields.address?.zipcode || ""}
                  onChange={handleChange}
                />
              </p>
              <p>
                {" "}
                city{" "}
                <input
                  type="city"
                  id="city"
                  name="city"
                  value={updatedFields.address?.city || ""}
                  onChange={handleChange}
                />
              </p>
              <p>
                {" "}
                street:{" "}
                <input
                  type="street"
                  id="street"
                  name="street"
                  value={updatedFields.address?.street || ""}
                  onChange={handleChange}
                />
              </p>
            </>
          )}
        </div>
      )}
      {showAnotherComponent && (
        <div style={TasksStyle}>
          {/* Display the additional data */}

          <div>
            <Tasks
              userId={user.id}
              cardStyle={cardStyle}
              userName={user.name}
              userTask={userTask}
              setUserTask={setUserTask}
              checkIfUserTaskCompleted={checkIfUserTaskCompleted}
              taskCompleted={taskCompleted}
              addTask={addTask}
              TasksStyle={TasksStyle}
            />
          </div>

          <Posts
            userId={user.id}
            cardStyle={cardStyle}
            userName={user.name}
            tasks={tasks}
            posts={posts}
            TasksStyle={TasksStyle}
          />
        </div>
      )}
    </div>
  );
};

export default User;
