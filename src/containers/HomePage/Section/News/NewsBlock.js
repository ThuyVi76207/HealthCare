import React from "react";

export default function NewsBlock({image, text }) {
    return (
        <div className='mx-2'>
            <img src={image} alt='' />
            <div className=''>{text}</div>
        </div>
    )
}