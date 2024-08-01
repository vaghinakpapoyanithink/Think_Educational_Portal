import React, { useContext } from 'react'
import { ChatProvider } from '../../contexts/ChatContext'
import { useParams } from 'react-router-dom'
import Chat from '../../components/chat/Chat.jsx'
import UserContext from '../../contexts/UserContext'

export default function Stream() {
	const { user } = useContext(UserContext)
	const { courseId: urlCourseId } = useParams()

	let courseId
	if (urlCourseId) {
		courseId = urlCourseId
	} else if (user?.courses.length === 1) {
		courseId = user?.courses[0]?._id
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
