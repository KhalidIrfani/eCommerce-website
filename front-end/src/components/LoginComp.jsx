import React, { useState } from 'react'
import styles from '../../src/Style/style'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'

const LoginComp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`${server}/user/login-user`, {
            email,
            password
        }, { withCredentials: true }).then((res) => {
            toast.success('login Success!');
            navigate('/');
            window.location.reload()
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-cener py-12 sm:px-6 lg:px-8">
                <div className="sm:w-full sm:max-w-md sm:mx-auto">
                    <h2 className="mt-6 text-[2rem] font-extrabold text-gray-900 text-center">
                        Login to yor Account
                    </h2>
                </div>
                <div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="email" className='block text-gray-700 text-[1rem] font-medium'>Email</label>
                                <div className="mt-2">
                                    <input type="email" name='email' autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus-outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="password" className='block text-gray-700 text-[1rem] font-medium'>Password</label>
                                <div className="mt-2 relative">
                                    <input type={visible ? 'text' : 'password'} name='password' autoComplete='current-password' required value={password} onChange={(e) => setPassword(e.target.value)} className='apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus-outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                                    {
                                        visible ? <AiOutlineEye className='absolute right-2 top-2 cursor-pointer'
                                            size={25}
                                            onClick={() => setVisible(false)}
                                        /> : <AiOutlineEyeInvisible className='absolute right-2 top-2 cursor-pointer'
                                            size={25}
                                            onClick={() => setVisible(true)}
                                        />
                                    }

                                </div>
                            </div>

                            <div className={`${styles.noramlFlex} justify-between`}>
                                <div className={`${styles.noramlFlex}`}>
                                    <input type="checkbox" name='remember-me' id='remember-me' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ' />

                                    <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>Remember me</label>
                                </div>

                                <div className="">
                                    <a href=".forgot-password" className='text-blue-600 font-medium hover:text-blue-600'>Forgot your Password?</a>
                                </div>
                            </div>

                            <div className="">
                                <button type='submit' className='w-full h-10 border border-transparent rounded-md text-white bg-blue-600  hover:bg-blue-500 font-medium text-[1rem] justify-center'>Submit</button>
                            </div>
                            <div className="">
                                <div className={`${styles.noramlFlex} w-full`}>
                                    <h4>Not have any account?</h4>
                                    <Link to='/sign-up' className='text-blue-600 pl-2'>
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div >
                </div >
            </div >

        </>
    )
}

export default LoginComp