import React from 'react'
import '../Style/Login.css'
import { Button } from '@material-ui/core/'
import { auth , provider} from '../firebase'
import { useStateValue } from '../REDUX/StateProvider'
import { actionTypes } from '../REDUX/Reducer'

function Login() {

    const [{}, dispatch] = useStateValue()
    
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
                    alt='WhatsApp'
                />
                <div className='login-text'>
                    <h1>Sign In to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
