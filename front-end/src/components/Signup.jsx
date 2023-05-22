import React, { useState } from 'react'
import styles from '../../src/Style/style'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { Link} from 'react-router-dom'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [avatar, setAvatar] = useState(null)
    // const navigate = useNavigate()

    const handleFileInput = (event) => {
        const file = event.target.files[0]
        setAvatar(file)
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        const config = {headers: {  "Content-Type": "multipart/form-data"  }
        }
        const newForm = new FormData();
        newForm.append('file', avatar);
        newForm.append('name', name);
        newForm.append('email', email);
        newForm.append('password', password)
        axios.post(`${server}/user/create-user`, newForm, config).then((res) => {
            if (res.data.success === true) {
               toast.success(res.data.message);
               setName("");
               setEmail("");
               setPassword("");
               setAvatar()
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
        })
    };
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-cener py-6 sm:px-6 lg:px-8">
                <div className="sm:w-full sm:max-w-md sm:mx-auto">
                    <h2 className="text-[2rem] font-extrabold text-gray-900 text-center">
                        Register as new user
                    </h2>
                </div>
                <div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handlerSubmit}>
                            <div className="">
                                <label htmlFor="name" className='block text-gray-700 text-[1rem] font-medium'>Name</label>
                                <div className="mt-2">
                                    <input type="text" name='text' autoComplete='name' required value={name} onChange={(e) => setName(e.target.value)} className='apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus-outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                                </div>
                            </div>
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
                            <div>
                                <lable htmlFor='avatar' className="block text-sm font-medium text-gray-700">
                                </lable>

                                <div className="mt-2 flex item-center">
                                    <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                        {
                                            avatar ? (
                                                <img src={URL.createObjectURL(avatar)}
                                                    alt="avatar" className='h-full w-full object-cover rounded-full' />
                                            ) :
                                                (
                                                    <RxAvatar className='h-8 w-8' />
                                                )
                                        }
                                    </span>

                                    <label htmlFor="file-input" className='ml-5 item-center justify-center px-4 py-2 border border-gray-200 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-500 text-sm'>
                                        <span>Upload file</span>
                                        <input type="file" name='avatar' id='file-input' accept='.jpg, .png, .jpeg' onChange={handleFileInput} className='sr-only' />
                                    </label>
                                </div>
                            </div>

                            <div className="">
                                <button type='submit' className='w-full h-10 border border-transparent rounded-md text-white bg-blue-600  hover:bg-blue-500 font-medium text-[1rem] justify-center'>Submit</button>
                            </div>
                            <div className="">
                                <div className={`${styles.noramlFlex} w-full`}>
                                    <h4>Already have an account?</h4>
                                    <Link to='/login' className='text-blue-600 pl-2'>
                                        Sign In
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

export default Signup