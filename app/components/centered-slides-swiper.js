import React from 'react'
import { compose, withProps, withState, defaultProps, lifecycle, withHandlers } from 'recompose'
import Swiper from 'react-id-swiper'
import slides from './common/demo-data'
import Text from './common/test'

const bufferCircularArray = (arr, currentIndex, buffer) => {
	let showNum = buffer * 2 + 1
	const total = arr.length
	showNum = Math.min(total, showNum)
	
	return Array(showNum).fill().map((_, idx) => {
  	const n = idx - buffer + currentIndex
    return arr[((n % total) + total) % total]
  })
}

const CenteredSlide = ({ toggle, id, show, toggleBufferArr, bufferArr, buffer, idxArr, renderItem, toggleSwiper, swiper }) => {
  const params = {
    pagination: '.swiper-pagination',
    slidesPerView: 5,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true,
    shouldSwiperUpdate: true,
    loopAdditionalSlides: 1,
    onInit: swiper => {
      const bufferArr = bufferCircularArray(idxArr, swiper.realIndex, buffer)
      toggleBufferArr(bufferArr)
      toggleSwiper(swiper)
    },
    onSlideChangeEnd: swiper => {
      const bufferArr = bufferCircularArray(idxArr, swiper.realIndex, buffer)
      toggleBufferArr(bufferArr)
    }
  }

  return(
    <Swiper {...params}>
      {slides.map(renderItem)}
    </Swiper>
  )
}

export default compose(
  defaultProps({
    buffer: 2
  }),
  withProps(props => ({
    idxArr: Array(slides.length).fill().map((e,i) => i)
  })),
  withState('swiper', 'toggleSwiper', null),
  withState('bufferArr', 'toggleBufferArr', []),
  withState('show', 'toggle', false),
  withHandlers({
    renderItem: ({ bufferArr, swiper }) => (item, idx) => {
      return <Text bufferArr={bufferArr} idx={idx} key={item.id} className="demo-slide" content={item.title} swiper={swiper}/>
    }
  }),
  lifecycle({
    componentDidMount() {
      const { toggleBufferArr, buffer, idxArr, swiper } = this.props
      toggleBufferArr(bufferCircularArray(idxArr, 0, buffer))
    }
  })
)(CenteredSlide)