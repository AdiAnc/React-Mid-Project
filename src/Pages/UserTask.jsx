import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAll, getItem } from '../Utils'


const User = () =>{
  const {id} = useParams({})
  const [user, setUser] = useState({})
  const USERS_URL = 'https://jsonplaceholder.typicode.com/users'; 

  useEffect(()=> {
    const fetchData = async() =>{
      const {data} = await getItem(USERS_URL , id)
      setUser(data)
    }; fetchData();
  },[]);

  return (
    <>
  
   <div>
    ID :  {user.id}
    Name : {user.name}
    Email :  {user.email}
   </div>
  


    </>
  );}

export default User;