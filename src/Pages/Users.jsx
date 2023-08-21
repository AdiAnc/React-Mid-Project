import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll, getTaskByUser, updateUser, deleteUser } from "../Utils";
import User from "./User";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TASKS_URL = "https://jsonplaceholder.typicode.com/todos";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [addComponent, setAddComponent] = useState(false);
  const [textInputName, setTextInputName] = useState("");
  const [textInputEmail, setTextInputEmail] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [defultUser, setDefulteUser] = useState({
    id: "null",
    name: "null",
    email: "null",
    address: { zipcode: "null", city: "null", street: "null" },
  });
  //retrive the users fron the ws
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAll(USERS_URL);
      setUsers(data);
    };
    fetchData();
    console.log("users " + users);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAll(TASKS_URL);
      setTasks(data);
    };
    fetchData();
    console.log("tasks " + tasks);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAll(POSTS_URL);
      setPosts(data);
    };
    fetchData();
    console.log("posts " + posts);
  }, []);

  // search if the word from the screen match to mail or name and set the result in the setSearchResult
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    const searchUser = users.filter((item) => {
      if (
        item.email.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm)
      ) {
        return true;
      } else {
        return false;
      }
    });
    setSearchResult(searchUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search logic or API request with the searchTerm
    console.log("Search term:", searchTerm);
  };

  const handleDeletUser = (id) => {
    console.log("delete user " + id);
    deleteUser(USERS_URL, id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleUpdateUser = (id, obj) => {
    console.log("i am in the handleUpdateUser function in the user comp" + id);
    console.log("obj ");
    console.log(JSON.stringify(obj));
    updateUser(id, obj, USERS_URL);
    // Find the index of the user in the array
    const userIndex = users.findIndex((user) => user.id === id);
    const searchIndex = searchResult.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      // Create a new array with the updated user
      const updatedUsers = [...users];
      updatedUsers[userIndex] = obj;
      // Set the state with the updated array
      setUsers(updatedUsers);
    }
    if (searchIndex !== -1) {
      const updatedSearchResult = [...searchResult];
      updatedSearchResult[searchIndex] = obj;
      setSearchResult(updatedSearchResult);
    }
  };

  const displayAddComponent = () => {
    setAddComponent(!addComponent);
  };

  const handleTextChangeName = (event) => {
    setTextInputName(event.target.value);
  };
  const handleTextChangeEmail = (event) => {
    setTextInputEmail(event.target.value);
  };

  const handleAddClick = () => {
    // Create a new user object with updated name and email
    const newUser = {
      ...defultUser, // Copy the existing properties from defultUser
      name: textInputName, // Update the name
      email: textInputEmail, // Update the email
    };

    // Set the updated user object as the new defultUser
    setDefulteUser(newUser);

    // Now you can update your users array with the new user
    const newUpdatedUsers = [...users, newUser];
    setUsers(newUpdatedUsers);

    // Clear the input fields and perform any other necessary actions
    setTextInputEmail("");
    setTextInputName("");
    displayAddComponent();
    F;
  };

  const handleCancelClick = () => {
    displayAddComponent();
  };

  return (
    <>
      <h2>Users</h2>
      <div >
        
          <div style={{ 
          
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center', margin: '10px'}} >

          <div  style={{ marginRight: "10px" }}>Search:  </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            />
            </div>



        

        
          <div></div><button onClick={() => displayAddComponent()} style={{margin: '10px'}}>Add</button>

          {addComponent && (
          <div style={{ fontWeight: "bold" ,border: "1px solid balck" }}>
              <div style={{ fontWeight: "bold" }}>Add User </div>
              <div>
                
              <p>
                {" "}
                Name:
                <input
                  type="text"
                  value={textInputName}
                  onChange={handleTextChangeName}
                  placeholder="Enter a title"
                  />
              </p>

              <p>
                {" "}
                Email:
                <input
                  type="text"
                  value={textInputEmail}
                  onChange={handleTextChangeEmail}
                  placeholder="Enter a title"
                  />
              </p>

                  </div>
              <button onClick={handleAddClick}>Add</button>
              <br></br>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          )}
          
          <ul>
          {searchTerm.length == 0 &&
            users.map((user, index) => {
              return (
                <User
                  key={index}
                  user={user}
                  handleDeletUser={handleDeletUser}
                  handleUpdateUser={handleUpdateUser}
                  tasks={tasks}
                  posts={posts}
                />
              );
            })}

          {searchTerm.length > 0 &&
            searchResult.map((user, index) => {
              return (
                <User
                  key={index}
                  user={user}
                  handleDeletUser={handleDeletUser}
                  handleUpdateUser={handleUpdateUser}
                  tasks={tasks}
                  posts={posts}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Users;
