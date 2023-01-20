import React, { useState, useEffect } from 'react';
import Logo from "../../assets/logo.svg";
import styles from './Contacts.module.css';

const Contacts = ({ contacts, currentUser, changeChat }) => {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);


	useEffect(() => {
		if (currentUser) {
			// console.log(currentUser)
			setCurrentUserImage(currentUser.avatarImage);
			setCurrentUserName(currentUser.username);
		}
	}, [currentUser]);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact)
	}
	
	return (
		<>
			{
				currentUserImage && currentUserName && (
					<div className={styles.container}>
						<div className={styles.brand}>
							<img src={Logo} alt="logo" />
							<h3>snappy</h3>
						</div>
						<div className={styles.contacts}>
							{
								contacts.map((contact, index) => {
									return (
										<div className={`${styles.contact} ${index === currentSelected ? styles.selected : ""}`} 
											key={index} onClick={()=>changeCurrentChat(index, contact)} >
											<div className={styles.avatar}>
												<img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
											</div>

											<div className={styles.username}>
												<h3>{contact.username}</h3>
											</div>
										</div>
									)
								})
							}
						</div>
						<div className={styles.currentUser}>
							<div className={styles.avatar}>
								<img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
							</div>
							<div className={styles.username}>
								<h2>{currentUserName}</h2>
							</div>
						</div>

					</div>

				)
			}
		</>
	)
}

export default Contacts