import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
import axiosInstance from '../axiosConfig.js'

const ChatContext = createContext()

const socket = io('http://localhost:5000', {
	transports: ['websocket', 'polling'],
})
socket.on('connect', () => {
	console.log('Connected to server')
})

export const ChatProvider = ({ children, courseId }) => {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const fetchMessages = async () => {
			const res = await axiosInstance.get(`/chat/messages/${courseId}`)
			setMessages(res.data)
		}

		fetchMessages()

		socket.emit('joinCourse', courseId)

		socket.on('receiveMessage', message => {
			setMessages(prevMessages => [...prevMessages, message])
		})

		return () => {
			socket.emit('leaveCourse', courseId)
			socket.off('receiveMessage')
		}
	}, [courseId])

	const sendMessage = message => {
		socket.emit('sendMessage', { ...message, courseId })
	}

	return (
		<ChatContext.Provider value={{ messages, sendMessage }}>
			{children}
		</ChatContext.Provider>
	)
}

export default ChatContext
