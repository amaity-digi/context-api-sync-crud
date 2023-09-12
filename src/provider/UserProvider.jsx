import React, { useState } from 'react'
import { UserContext } from '../context/UserContext'

const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);

const addUsers = (user) => {
    setUsers([...users, user]);
}

const deleteUser = (id) => {
  setUsers(users.filter((user) => user.id !== id));
}

const updateUser = (id, name, age) => {
  const updatedValue = users.map((user) => {
    if(user.id === id){
      return {...user, name: name, age: age}
    }
    return user;
  })
  setUsers(updatedValue);
}

  return (
    <UserContext.Provider value={{users, addUsers, deleteUser, updateUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider