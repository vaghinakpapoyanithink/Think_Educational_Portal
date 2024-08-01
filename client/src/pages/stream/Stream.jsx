import React, { useContext } from 'react'
import { ChatProvider } from '../../contexts/ChatContext'
import Chat from '../../components/chat/Chat.jsx'
import UserContext from '../../contexts/UserContext'

export default function Stream() {
	const { user } = useContext(UserContext)

	const courseId = user?.courses[0]?._id

	if (!courseId) {
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
