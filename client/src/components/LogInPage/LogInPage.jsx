import axios from 'axios'
import React, { useContext, useState } from 'react'
import LocalUserContext from '../Context/LocalUserContext'



const data = {
    email: 'v@gmail.com',
    password: 'qqqqqq'
}

const style = {
    border: null
}

export const LogInPage = props => {

    const [globalData, setGlobalData] = useState(data)
    const [borderValidation, setBorderValidation] = useState(style)
    const store = useContext(LocalUserContext).store


    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,6})*$/


    const onSubmit = event => {

        if (!globalData.email.match(emailValidation)) {
            setBorderValidation({ border: '1px solid red' })
            return
        }
        setGlobalData(data)
        event.preventDefault()
        axios.post('/api/auth/LogIn', JSON.stringify(globalData), {
            headers: { "Content-Type": "application/json" }
        })
            .then(e => {
                store.setItem('user', {
                    _id: e.data.userId,
                    token : e.data.token
                })
                props.setDataFromServer(e.data.user)
                props.setModal(props.modal)
            })

    }

    const handlerChange = event => {
        setGlobalData({ ...globalData, [event.target.name]: event.target.value })
    }

    const emailValidationChecker = event => {
        handlerChange(event)
        event.target.value.match(emailValidation) && setBorderValidation({ border: null })

    }

    return (
        <div className='container pt-4 LogInPage'>
            <button type="button"
                className="btn btn-primary delete"
                onClick={() => props.setModal(props.modal)}>X</button>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email"
                            style={borderValidation}
                            onChange={emailValidationChecker}
                            name={'email'}
                            value={globalData.email}
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Email"
                        />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password"
                            name={'password'}
                            value={globalData.password}
                            onChange={handlerChange}
                            className="form-control"
                            id="inputPassword1"
                            placeholder="Password" />
                    </div>
                </div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}>Log In
                    </button>
            </form>
        </div>

    )

}