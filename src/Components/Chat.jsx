import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Style/Chat.css'
import { Avatar, IconButton } from '@material-ui/core/'
import { useStateValue } from '../REDUX/StateProvider'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import db from '../firebase'
import firebase from 'firebase'

function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessage] = useState([])
    const [{ user }, dispatch] = useStateValue()

    useEffect(() => {
        if (roomId) {
            db.collection('Rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name))

            db.collection('Rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessage(snapshot.docs.map(doc => doc.data()
                ))
            })
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 2000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        // console.log('you typed >>>>', input)
        db.collection('Rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h5>{roomName}</h5>

                    <p>
                        last seen{" "}
                     {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__reciver'}`}>
                        <span className='chat__name'>{message.name}</span><br />
                        {message.message}
                        <span className='chat__timstamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a massage' />
                    <button onClick={sendMessage} type='submit'></button>
                    {/* <Send /> */}
                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat
