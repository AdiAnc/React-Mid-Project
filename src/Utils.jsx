import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// retrive the user from the 
export const getAll = (url) => axios.get(url);

export const updateUser = (id , obj, url ) => axios.put(`${url}/${id}`, obj);

export const deleteUser = (url, id) =>{
  console.log("delet from the function")
  axios.delete(`${url}/${id}`);
} 


export const deletePost = (url, id) =>{
  console.log("delet task")
  axios.delete(`${url}/${id}`);
} 

export const getItem = (url, id) => axios.get(`${url}/${id}`)

export const getTaskByUser = async(id) =>{
  let res = await axios.get('https://jsonplaceholder.typicode.com/todos?userId=' + id);
  return res.data;
}


export const getPostsByUserId = async(userId)=> {
  let res = await axios.get('https://jsonplaceholder.typicode.com/posts?userId' + userId);
  return res.data;
};