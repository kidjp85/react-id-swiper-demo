import React from 'react'

export default ({ show, className, content }) =>
	<div className={className}>
		{content}<br />
		{show ? 'HAS CONTENT' : 'LOADING'}
	</div>