import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import LocalUserContext from '../Context/LocalUserContext'


const Admin = Component => props => {



if (!props.dataFromServer?.isAdmin) return <Redirect to="/"/>

  return <Component {...props}/>
  
}
export default Admin