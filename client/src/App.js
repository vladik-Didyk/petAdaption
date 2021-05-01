import { Route, Switch } from 'react-router-dom';
import { Homepage } from './components/Homepage/Homepage'
import { MyPetsPage } from './components/MyPetsPage/MyPetsPage'
import { SearchPage } from './components/SearchPage/SearchPage'
import { PetPage } from './components/PetPage/PetPage'
import { NavBar } from './components/NavBar/NavBar'
import { SignInPage } from './components/SignInPage/SignInPage'
import { LogInPage } from './components/LogInPage/LogInPage'
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import localforage from 'localforage'
import LocalUserContext from './components/Context/LocalUserContext'
import axios from 'axios';
import PetPageCreation from './components/PetPageCreation/PetPageCreation'


const modalIsOpen = {
  SignInPage: false,
  LogInPage: false
}

const style = {
  content: {
    backgroundColor: 'transparent',
    border: 'none',
  }
}

const store = localforage.createInstance({
  name: 'userDate'
});


// const All = {
//   log : function(){console.log(this.name);}
// }
function App() {
  const [modal, setModal] = useState(modalIsOpen)
  const [user, setUser] = useState(null)
  const [dataFromServer, setDataFromServer] = useState(null)



  useEffect(() => {
    store.getItem('user')
    .then(res=>{
      setUser(res);
    })    
  }, [])
  


  useEffect(()=>{
  user && axios.post('/api/auth/authorization', JSON.stringify(user),{
  headers: {
    "Content-Type": "application/json",
    "Authorization" : 'Bearer ' + user.token
  }
  })
  .then(element => {setDataFromServer(element.data) })
  },[user])




  return (

    <div className="container pt-4">
      <LocalUserContext.Provider value={{store,dataFromServer}}>
        <NavBar modal={modalIsOpen}
          setModal={setModal} 
          dataFromServer={dataFromServer}
          setDataFromServer={setDataFromServer}
          user={user}
          setUser={setUser}
         />

        <Modal style={style}
            isOpen={modal.SignInPage}
            ariaHideApp={false}>
          <SignInPage modal={modalIsOpen}
            setModal={setModal}
            LogInPage={setModal} />

        </Modal>
        <Modal style={style}
            isOpen={modal.LogInPage}
            ariaHideApp={false}>
          <LogInPage 
            modal={modalIsOpen}
            setModal={setModal}
            setDataFromServer={setDataFromServer}
          />
        </Modal>

        <Switch>
        { dataFromServer?.isAdmin && 
        <Route path={`/PetPageCreation`} 
        component={(props)=> 
        <PetPageCreation 
        {...props} 
        dataFromServer={dataFromServer}/>}/>}
          <Route path={`/MyPets`} component={MyPetsPage} />
          <Route path={`/Search`} component={SearchPage} />
          <Route path={`/PetPage/:id?`} component={PetPage} />
          <Route exact path={`/`} component={Homepage} />
        </Switch>

      </LocalUserContext.Provider>
    </div>
  )

}






export default App


