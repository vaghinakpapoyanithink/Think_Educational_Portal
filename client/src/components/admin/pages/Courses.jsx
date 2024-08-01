import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../axiosConfig.js'
import onlineIcon from '../../../assets/images/online-learning.png'
import offlineIcon from '../../../assets/images/teacher 2.png'

export default function Courses() {
	const [courses, setCourses] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		fetchCourses()
	}, [])

	const fetchCourses = async () => {
		try {
			const response = await axiosInstance.get('/course/all')
			setCourses(response.data)
		} catch (error) {
			console.error('Error fetching courses:', error)
		}
	}

	const handleFilterChange = e => {
		setFilter(e.target.value)
	}

	const filteredCourses = courses.filter(course =>
		course.courseName.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<div className='courses-container'>
			<h1>Courses</h1>
			<div>
				<Link to='/admin/create-course' className='add-course'>
					<button>Add Course</button>
				</Link>
				<input
					type='text'
					placeholder='Filter by course name or instructor'
					value={filter}
					onChange={handleFilterChange}
				/>
			</div>
			<ul>
				{filteredCourses.map(course => (
					<Link key={course._id} to={`/admin/courses/${course._id}`}>
						<li>
							<div>
								<strong>{course.courseName}</strong>
							</div>
							<div>
								{course.courseType === 'online' ? (
									<img src={onlineIcon} alt='online' />
								) : (
									<img src={offlineIcon} alt='offline' />
								)}
							</div>
						</li>
					</Link>
				))}
			</ul>
		</div>
	)
}
