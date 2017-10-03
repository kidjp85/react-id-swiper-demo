import React from 'react';
import { compose, withProps, withState, defaultProps, lifecycle, withHandlers } from 'recompose'
import Swiper from 'react-id-swiper';
import slides from './common/demo-data';
import Text from './common/test';

const bufferCircularArray = (arr, currentIndex, buffer) => {
	let showNum = buffer * 2 + 1;
	const total = arr.length
	showNum = Math.min(total, showNum);
	
	return Array(showNum).fill().map((_, idx) => {
  	const n = idx - buffer + currentIndex;
    return arr[((n % total) + total) % total];
  });
}

const CenteredSlide = ({ toggle, id, show, toggleBufferArr, bufferArr, buffer, toggleLoadedArr, loadedArr, renderItem }) => {
  const params = {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true,
    onInit: swiper => console.log(swiper.activeIndex),
    onSlideChangeEnd: swiper => {
      console.log(swiper.realIndex)
      const currentArr = bufferCircularArray(slides, swiper.realIndex, buffer)
      const ids = currentArr.map(a => a.id)
      toggleBufferArr(currentArr)
      toggleLoadedArr(ids)
    }
  }

  console.log('BUFFER_ARR:', bufferArr)
  console.log('LOADED_ARR:', loadedArr)

  return(
    <Swiper {...params}>
      {slides.map(renderItem)}
    </Swiper>
  )
};

export default compose(
  defaultProps({
    buffer: 2
  }),
  withState('bufferArr', 'toggleBufferArr', []),
  withState('loadedArr', 'toggleLoadedArr', []),
  withState('show', 'toggle', false),
  withHandlers({
    renderItem: ({ loadedArr }) => item => {
      const show = loadedArr.includes(item.id)

      console.log(show, item.id)

      return  <Text show={show} key={item.id} className="demo-slide" content={item.title} />
    }
  }),
  lifecycle({
    componentDidMount() {
      const { toggleBufferArr, buffer } = this.props
      toggleBufferArr(bufferCircularArray(slides, 0, buffer))
    }
  })
)(CenteredSlide)