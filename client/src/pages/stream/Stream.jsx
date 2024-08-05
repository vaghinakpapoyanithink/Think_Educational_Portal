import React from 'react'
import { ChatProvider } from '../../contexts/ChatContext'
import Chat from '../../components/chat/Chat.jsx'
import { useParams } from 'react-router-dom'

export default function Stream() {
	const { id } = useParams()
	const urlCourseId = id
	let courseId
	if (urlCourseId) {
		courseId = urlCourseId
	} else {
		return <div>No course selected</div>
	}
	return (
		<ChatProvider courseId={courseId}>
			<div className='stream-container'>
				<Chat courseId={courseId} />
			</div>
		</ChatProvider>
	)
}
