import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import LocalUserContext from '../Context/LocalUserContext'


export const NavBar = props =>{
  

    const dataFromServer = useContext(LocalUserContext)?.dataFromServer
    const store = useContext(LocalUserContext)?.store

    

    const signInOrLogInClicked = element => {
        props.setModal({...props.modal, [element.target.lang] : true})
    }


    const logOutFunction = () => {
        props.setUser(null)
        props.setDataFromServer(null)
        store.removeItem('user')
    }

    return (
        <>
    <nav className='navbar navbar-dark navbar-expand-lg bg-primary'>
        
        <div className="navbar-brand">     
                    <div className="navbar-nav">
                        <NavLink 
                            exact={true} 
                            to={'/'} 
                            className="nav-item nav-link" 
                            aria-current="page" 
                            >Home
                        </NavLink>

                        <NavLink 
                            exact={true} 
                            to={'Search'} 
                            className="nav-item nav-link" 
                            >Pet Search
                        </NavLink>

                    { dataFromServer?.isAdmin && <NavLink
                        exact={true} 
                        to={'PetPageCreation'} 
                        className="nav-item nav-link" 
                        >PetPageCreation
                    </NavLink>}
                    </div>
                </div>

            {dataFromServer 
            
            ? 
            (
               
                <div>
                 <p>{dataFromServer.name}&nbsp;{dataFromServer.lastName}</p>
                 <div
                className="nav-item nav-link LogIn" 
                style={{cursor:"pointer",color: "blue"}}
                onClick={logOutFunction}
                lang={'LogOutSign'}
                aria-current="page" 
                >Log Out
            </div>
                </div>)               
            : <div className="navbar navbar-expand-lg navbar-light bg-light">
                  


                 

                    <div
                        className="nav-item nav-link LogIn" 
                        style={{cursor:"pointer",color: "blue"}}
                        onClick={signInOrLogInClicked}
                        lang={'LogInPage'}
                        aria-current="page" 
                        >Log In
                    </div>

                    <div
                        className="nav-item nav-link SignIn" 
                        style={{cursor:"pointer",color: "blue"}}
                        onClick={signInOrLogInClicked}
                        lang={'SignInPage'}
                        aria-current="page"
                        > Sign In
                    </div>

                </div>
            }
                
    </nav>
        </>
    )
}