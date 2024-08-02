import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatContainer.module.css';
import Logout from '../logout-btn/Logout';
import ChatInput from '../chat-input/ChatInput';
import Messages from '../messages/Messages';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../../utils/APIRoutes';

const ChatContainer = ({ currentChat, currentUser, socket }) => {
	const [messages, setMessages] = useState([]);
	const [receivedMessages, setReceivedMessages] = useState(null);
	const scrollRef = useRef();


	// GET MESSAGES IN DATABASE
	useEffect(() => {
		const getMessages = async () => {
			const allMesssages = await axios.post(getAllMessagesRoute, {
				from: currentUser._id,
				to: currentChat._id,
			});
			// console.log(allMesssages.data);
			setMessages(allMesssages.data.projectedMessages);
		}

		getMessages();
	}, [currentChat]);

	// GET REceived messages
	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-receive", (msg) => {
				console.log(msg);
				setReceivedMessages({ fromSelf: false, message: msg });
			});
		}
	},);

	// update the messge real-time to the UI by appending to the messages state
	useEffect(() => {
		receivedMessages && setMessages((prev) => [...prev, receivedMessages]);
	}, [receivedMessages]);

	// Auto scroll chats
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
	}, [messages]);


	const handleSendMsg = async (msg) => {
		await axios.post(sendMessageRoute, {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		}).then((data) => {
			console.log(data)
		}).catch((err) => {
			console.log(err)
		});

		// emit send-msg event || send message to a user
		socket.current.emit("send-msg", {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		});

		// store the messages
		const chatMessages = [...messages];
		chatMessages.push({ fromSelf: true, message: msg });
		setMessages(chatMessages)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.chatHeader}>
					<div className={styles.userDetails}>
						<div className={styles.avatar}>
							<img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
						</div>
						<div className={styles.username}>
							<h3>{currentChat.username}</h3>
						</div>
					</div>

					<Logout />
				</div>

				{/* <Messages /> */}

				<div className={styles.chatMessages} >
					{
						messages.map((message, index) => {
							console.log(message)
							return (
								<div key={index} ref={scrollRef}>
									<div className={`${styles.message} ${message.fromSelf ? styles.sended : styles.received}`}>
										<div className={styles.content}>
											<p>{message.message}</p>
											<small>{message.time}</small>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>

				<ChatInput handleSendMsg={handleSendMsg} />
			</div>
		</>
	)
}

export default ChatContainer