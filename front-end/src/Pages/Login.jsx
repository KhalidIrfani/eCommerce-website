import React, { useEffect } from 'react'
import LoginComp from '../components/LoginComp'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.user)
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <div>
                <LoginComp />
            </div>
        </>
    )
}

export default Login