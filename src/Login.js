import React, { useState } from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from '@mui/material';
import {auth, provider} from "./firebase"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error) => alert(error.message))
    }
  return (
    <div className='bg-white h-[100vh] w-[100vw] grid place-items-center'>
    <div className='text-center bg-white p-24 shadow'>
        <WhatsAppIcon className='m-5 w-[25px]' />
        <div>
            <h1 className='text-3xl font-extrabold'>Sign in</h1>
        </div>
        <div className='text-inherit text-white mt-5'>
        <Button className="text-white" onClick={signIn} >Sign in with Google</Button>
        </div>
     </div>
     </div>
  )
}

export default Login
