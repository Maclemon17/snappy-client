import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import styles from './Logout.module.css'

const Logout = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        await localStorage.removeItem("snappyUser");
        await localStorage.removeItem("token");

        navigate('/login');
    }
    return (
        <button className={styles.logout} onClick={handleClick}>
            <BiPowerOff />
        </button>
    )
}

export default Logout