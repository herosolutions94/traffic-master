import React from 'react'

const Rating = ({ rating }) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<i className="fa fa-star" key={i}></i>)
        } else {
            stars.push(<i className="fa fa-star-o" key={i}></i>)
        }
    }

  return (
    <>
        {stars}
    </>
  )
}

export default Rating