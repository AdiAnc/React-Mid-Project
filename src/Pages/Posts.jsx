import React from "react";
import { getPostsByUserId } from "../Utils";
import { useState, useEffect } from "react";

const Posts = ({ userId, userName, TasksStyle }) => {
  const [postsUsers, setPostsUsers] = useState([]);
  const [addComponent, setAddComponent] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [textInputTitle, setTextInputTitle] = useState("");
  const [textInputBody, setTextInputBody] = useState("");

  const USERS_URL = "https://jsonplaceholder.typicode.com/posts";
  //retrive the users fron the ws
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostsByUserId(userId);
      console.log("data psost " + data);
      setPostsUsers(data);
    };
    fetchData();
    console.log("setPostsUsers " + postsUsers);
  }, []);

  const cancelTask = (id) => {
    console.log("delete task " + id);
    const updatedPost = postsUsers.filter((post) => post.id !== id);
    setTasksUsers(updatedPost);
  };

  const displayAddComponent = () => {
    setAddComponent(!addComponent);
    setShowPosts(!showPosts);
  };

  const handletextInputTitleChange = (event) => {
    setTextInputTitle(event.target.value);
  };

  const handletextInputBodyChange = (event) => {
    setTextInputBody(event.target.value);
  };

  const handleAddClick = () => {
    const newPostsUsers = [
      ...postsUsers,
      { title: textInputTitle, body: textInputBody },
    ];
    setPostsUsers(newPostsUsers);
    setTextInputTitle("");
    setTextInputBody("");
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
            <div style={{ fontWeight: "bold" }}>Posts - {userName} </div>
            <button onClick={() => displayAddComponent()}>Add</button>

            {addComponent && (
              <div style={TasksStyle}>
                <div style={{ fontWeight: "bold" }}>Add Post - {userName} </div>

                <p>
                  {" "}
                  Title:
                  <input
                    type="text"
                    value={textInputTitle}
                    onChange={handletextInputTitleChange}
                    placeholder="Enter a title"
                  />
                </p>

                <p>
                  {" "}
                  Body:
                  <input
                    type="text"
                    value={textInputBody}
                    onChange={handletextInputBodyChange}
                    placeholder="Enter a title"
                  />
                </p>

                <button onClick={handleAddClick}>Add</button>
                <br></br>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            )}

            {postsUsers.map((post, index) => {
              return (
                <div
                  key={index}
                  style={{ border: "1px solid green", marginBottom: "10px" }}
                >
                  <div style={{ marginRight: "10px" }}>Title: {post.title}</div>
                  <div>
                    Body : {post.body}
                    <div>
                      <button onClick={() => cancelTask(post.id)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Posts;
