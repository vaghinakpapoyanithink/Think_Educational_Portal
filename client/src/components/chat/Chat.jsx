import React, { useContext, useState, useEffect, useRef } from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import './style/style.scss'

const Chat = ({ courseId }) => {
	const { messages, sendMessage } = useContext(ChatContext)
	const { user } = useContext(UserContext)
	const [content, setContent] = useState('')
	const messagesEndRef = useRef(null)

	const handleSubmit = e => {
		e.preventDefault()
		if (content.trim() && user) {
			sendMessage({ sender: user.username, content, timestamp: new Date() })
			setContent('')
		}
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const formatTime = timestamp => {
		const date = new Date(timestamp)
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	return (
		<div className='chat-container'>
			<div className='messages'>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`message ${
							msg.sender === user.username ? 'sent' : 'received'
						}`}
					>
						<div className='message-content'>
							<strong className='sender'>{msg.sender}:</strong>
							<span className='text'>{msg.content}</span>
							<span className='timestamp'>{formatTime(msg.timestamp)}</span>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<form onSubmit={handleSubmit} className='message-form'>
				<input
					type='text'
					value={content}
					onChange={e => setContent(e.target.value)}
					placeholder='Type a message...'
				/>
				<button type='submit'>Send</button>
			</form>
		</div>
	)
}
export default Chat
