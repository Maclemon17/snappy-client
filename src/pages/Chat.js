import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../assets/css/Chat.module.css';
import { useNavigate } from 'react-router-dom';
import { getProfileRoute, host, setAllUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/contacts/Contacts';
import Welcome from '../components/welcome/Welcome';
import ChatContainer from '../components/chat/ChatContainer';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Chat = () => {

	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);

	const token = localStorage.token;
	const navigate = useNavigate();
	const socket = useRef();

	const toastOptions = {
		position: "top-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark"
	}
	// console.log(socket, currentUser._id)

	// socket initialiation.....
	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser]);


	useEffect(() => {
		const fetchUser = async () => {
			if (!localStorage.snappyUser) {
				navigate("/login");
			} else {
				setCurrentUser(await JSON.parse(localStorage.snappyUser));
			}
			try {
				const responseData = await axios.get(getProfileRoute, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"Content-Type": "application/json"
					}
				});

				if (!responseData.data.status) {
					toast.error(responseData.data.message, toastOptions);
					localStorage.removeItem(token);

					setTimeout(() => {
						navigate('/login')
					}, 2000);
				} else {
					setCurrentUser(await responseData.data.userData);
					localStorage.setItem("snappyUser", JSON.stringify(responseData.data.userData));
				}

			} catch (error) {
				toast.error(error.message, toastOptions)
			}
		}

		fetchUser();
	}, []); // be like nah this be the problem


	useEffect(() => {
		const fetchContacts = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const { data } = await axios.get(`${setAllUsersRoute}/${currentUser._id}`);
					// console.log("DATA:",data.users);
					setContacts(data.users);
				} else {
					navigate("/setavatar")
				}
			}
		}


		fetchContacts();
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat)
	}

	return (
		<>
			<div className={styles.parentContainer}>
				<div className={styles.container}>
					<Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
					{
						currentChat === undefined ? (
							<Welcome currentUser={currentUser} />
						) : (
							<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
						)
					}
				</div>

			</div>
			<ToastContainer />
		</>
	)
}

export default Chat