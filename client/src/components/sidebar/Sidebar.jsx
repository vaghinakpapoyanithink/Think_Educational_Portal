import React from 'react'
import './styles/styles.scss'
import blenderIcon from '../../assets/images/blender.png'
import webIcon from '../../assets/images/web.png'
import scratchIcon from '../../assets/images/scratch.png'

export default function Sidebar() {
	return (
		<div className='sidebar'>
			<ul>
				<li className='active'>
					<a href='#'>
						<img src={webIcon} alt='Course 1' /> Վեբ ծրագրավորում
					</a>
				</li>
				<li>
					<a href='#'>
						<img src={blenderIcon} alt='Course 2' /> 3d մոդելավորում
					</a>
				</li>
				<li>
					<a href='#'>
						<img src={scratchIcon} alt='Course 3' /> scratch
					</a>
				</li>
			</ul>
		</div>
	)
}
