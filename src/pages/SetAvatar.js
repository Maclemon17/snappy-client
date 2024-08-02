import axios from 'axios';
import { Buffer } from 'buffer';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../assets/css/Avatar.module.css';
import { setAvatarRoute } from '../utils/APIRoutes';

const SetAvatar = () => {
    // Multi avatar api
    const api = "https://api.multiavatar.com/45678945";
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.snappyUser);
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });


            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("snappyUser", JSON.stringify(user));
                navigate("/")
            } else {
                toast.error("Error setting avatar, try again", toastOptions);
            }
        }

    };

    useEffect(() => {
        const fetchAvatar = async () => {
            const data = [];

            for (let i = 0; i < 4; i++) {
                try {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
    
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                    
                } catch (err) {
                    toast.error(`${err.message}: Unable to fetch avatar, try again`);
                    console.log(err.message)
                }
            }
            setAvatars(data)
            setIsLoading(false);
        }

        if (!localStorage.snappyUser) {
            navigate("/login")
        } else {
            fetchAvatar()
        }

    }, [])


    return (
        <>
            {
                isLoading ?
                    <div className={styles.container}>
                        <img src={require("../assets/loader.gif")} alt="loader" />
                    </div> :
                    <div className={styles.container}>
                        <div className={styles.titleContainer}>
                            <h1>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className={styles.avatars}>
                            {
                                avatars.map((avatar, index) => {
                                   
                                    return (
                                        <div key={index} className={`${styles.avatar} ${selectedAvatar === index ? styles.selected : ""}`}>
                                            <img src={`data:image/svg+xml;base64,${avatar}`}
                                                alt="avatar"
                                                onClick={() => setSelectedAvatar(index)} />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <button className={styles.submitBtn} onClick={() => setProfilePicture()}>Set as Profle Picture</button>
                    </div>

            }
            <ToastContainer />
        </>
    )
}

export default SetAvatar