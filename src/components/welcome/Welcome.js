import React, { useState, useEffect } from 'react';
import Robot from "../../assets/robot.gif";
import styles from "./Welcome.module.css";

const Welcome = ({ currentUser }) => {
  const [username, setUsername] = useState(undefined);

 
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username)
    }

  }, [currentUser])

  return (
    <>
      <div className={styles.container}>
        <img src={Robot} alt="robot" />

        <h1>Welcome, <span>{username}!</span></h1>
        <h3>Please select a chat to start messaging!</h3>
      </div>
    </>
  )
}

export default Welcome