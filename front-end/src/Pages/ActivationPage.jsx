import React, { useEffect, useState } from 'react'
import { server } from '../server'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token
          });
          console.log(res.data.message)
        } catch (error) {
          console.log(error.response.data.message)
          setError(true)
        }
      }
      activationEmail()
    }
  },[])
  return (
    <div>
      {
        error ? (
          <p>your token is expired</p>
        ) : (
          <p>Your account has been created successfully</p>
        )
      }
    </div>
  )
}

export default ActivationPage