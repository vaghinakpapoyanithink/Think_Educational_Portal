import React, { useContext, useState, useEffect, useRef } from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './style/style.scss'

const Chat = ({ courseId }) => {
	const { messages, sendMessage } = useContext(ChatContext)
	const { user } = useContext(UserContext)
	const [content, setContent] = useState('')
	const editorRef = useRef(null)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		const editor = new Quill(editorRef.current, {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ list: 'ordered' }],
					['link'],
					['clean'],
				],
			},
		})

		editor.on('text-change', () => {
			setContent(editor.root.innerHTML)
		})

		return () => {
			editor.off('text-change')
		}
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		if (content.trim() && user) {
			sendMessage({ sender: user.username, content, timestamp: new Date() })
			setContent('')
			editorRef.current.querySelector('.ql-editor').innerHTML = '' // clear the editor
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
							<span
								className='text'
								dangerouslySetInnerHTML={{ __html: msg.content }}
							/>
							<span className='timestamp'>{formatTime(msg.timestamp)}</span>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<form onSubmit={handleSubmit} className='message-form'>
				<div ref={editorRef} className='editor' />
				<button className='send' type='submit'>
					Send
				</button>
			</form>
		</div>
	)
}

export default Chat
