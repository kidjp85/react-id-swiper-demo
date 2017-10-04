import React from 'react'
import ReactDOM from 'react-dom'
import { compose, withState, lifecycle } from 'recompose'

const Slide = ({ show, className, content }) =>
	<div className={className}>
		{content}<br />
		{show ? 'HAS CONTENT' : 'LOADING'}
	</div>

export default compose(
	withState('show', 'toggleShow', false),
	lifecycle({
		componentDidUpdate() {
			const { idx, bufferArr, show, toggleShow, swiper } = this.props
			if (bufferArr.includes(idx)) swiper.reLoop()

			if (!show && bufferArr.includes(idx)) {
				toggleShow(true)
				swiper.reLoop()
			}
		}
	})
)(Slide)