import React from 'react'

import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { client } from '../client'

import video from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        const { name, googleId, imageUrl } = response.profileObj;
        const doc = {
            _id: googleId,
            _type: 'user',
            username: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    }
    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={video}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center bg-blackOverlay top-0 bottom-0 left-0 right-0'>
                    <div className='p-5'>
                        <img src={logo} alt="logo" width="130px" />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                                <button
                                    typeof='button'
                                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg outline-none cursor-pointer'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className='mr-4' />
                                    {process.env.GOOGLE_CLIENT_ID}
                                    Sign in with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
