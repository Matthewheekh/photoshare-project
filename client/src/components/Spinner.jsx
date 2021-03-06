import React from 'react'
import { Circles } from 'react-loader-spinner'


const Spinner = ({ message }) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <Circles
                type="Circles"
                color="#00BFFF"
                eight={50}
                width={200}
                className="m-5"
            />
            <p className='text-center text-lg px-2 m-5'>{message}</p>
        </div>
    )
}

export default Spinner
