import React, { useState } from 'react';
import styles from './ChatInput.module.css';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");


    const showPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (e, emoji) => {
        console.log('emoji clicked', emoji, e.emoji);
        let message = msg;
        message += e.emoji;
        setMsg(message);
    }

    const sendChat = (e) => {
        e.preventDefault();

        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttonContainer}>
                    <div className={styles.emoji}>
                        <BsEmojiSmileFill onClick={showPicker} />
                        {
                            showEmojiPicker && <EmojiPicker className={styles.EmojiPickerReact} onEmojiClick={handleEmojiClick} />
                        }
                    </div>
                </div>

                <form className={styles.inputContainer} onSubmit={(e) => sendChat(e)}>
                    <input type="text" 
                        placeholder='Type your message here' 
                        value={msg}
                        onChange={(e)=>setMsg(e.target.value)} 
                    />
 
                    <button className={styles.submit} >
                        <IoMdSend />
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatInput