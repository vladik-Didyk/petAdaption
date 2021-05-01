import axios from 'axios'
import React, { useState } from 'react'
import Admin from '../HOC/Admin'


const petData = {
  
  Type: 'cat',
  Name: 'Paro',
  Adoption_Status: {
    isAdoption: false,
    isReturned: false,
  },
  Picture: {},
  Height: 2,
  Weight: 2,
  Color: 'red',
  Bio: '2',
  Hypoallergenic: false,
  dietary_restrictions: 'e',
  breed_of_animal: 'sfinks',

  
}
const Picture_container_File = {
  name : ''
}
const new_obj = {
  name : 'alex',
  last_name: 'Shalom',
  log_f: function(data) {console.log( this.name, this.last_name)},
  log_e: (data) =>console.log( this),
}


const PetPageCreation = props => {
  
  const [petConfiguration, setPetConfiguration] = useState(petData)
  const [serverRes, setServerRes] = useState(null)
  
  const handlerChange = ({ target }) => {
    console.log(petConfiguration)
    setPetConfiguration({ ...petConfiguration, [target.name]: target.value })
  }
  const handlerChangeToNumber = ({ target }) => {
    setPetConfiguration({ ...petConfiguration, [target.name]: +target.value })
  }


  const onClickAdoptionStatus = ({ target }) => {
    setPetConfiguration({
      ...petConfiguration, Adoption_Status: {
        ...petConfiguration.Adoption_Status,
        [target.name]: target.checked
      }
    })
  }

  const onClickHypoallergenic = ({ target }) => {
    setPetConfiguration({
      ...petConfiguration,
      [target.name]: target.checked
    })
  }

  const uploadPicture = event => {
console.log(event.target.files[0]);

    setPetConfiguration({
      ...petConfiguration,
      [event.target.name]: event.target.files[0]
    })
  }
  

  const handlerSubmit = event => {

    if (!petConfiguration.Type.trim() ||
      !petConfiguration.Name.trim() ||
      !petConfiguration.Height ||
      !petConfiguration.Weight ||
      !petConfiguration.dietary_restrictions.trim() ||
      !petConfiguration.breed_of_animal.trim()) return 

    
      axios.post('/api/created/PetConfiguration' , JSON.stringify(petConfiguration) ,{
        headers : {"Content-Type" : "application/json"}
    })
  }


  return (<div className='container pt-4'>

    <input type="text"
      className="form-control"
      name='Type'
      value={petConfiguration.Type}
      onChange={handlerChange}
      aria-label="Text input with checkbox"
      placeholder='Type'
    />
    <input type="text"
      className="form-control"
      name='breed_of_animal'
      value={petConfiguration.breed_of_animal}
      onChange={handlerChange}
      aria-label="Text input with checkbox"
      placeholder='Breed of animal'
    />
    <input type="text"
      className="form-control"
      name='Name'
      value={petConfiguration.Name}
      onChange={handlerChange}
      aria-label="Text input with checkbox"
      placeholder='Name'
    />

    

    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Upload
        </span>
      </div>
      <div className="custom-file">
        <input type="file"
          className="custom-file-input"
          id="inputGroupFile01"
          name='Picture'
          onChange={uploadPicture}
        />
        <label className="custom-file-label"
          htmlFor="inputGroupFile01">Upload picture
        </label>
      </div>
    </div>

    <input type="number"
      className="form-control"
      aria-label="Text input with checkbox"
      name='Height'
      value={petConfiguration.Height}
      onChange={handlerChangeToNumber}
      placeholder='Height'
    />
    <input type="number"
      className="form-control"
      aria-label="Text input with checkbox"
      name='Weight'
      value={petConfiguration.Weight}
      onChange={handlerChangeToNumber}
      placeholder='Weight'
    />
    <input type="text"
      className="form-control"
      aria-label="Text input with checkbox"
      name='Color'
      value={petConfiguration.Color}
      onChange={handlerChange}
      placeholder='Color'
    />
    <input type="text"
      className="form-control"
      aria-label="Text input with checkbox"
      name='Bio'
      value={petConfiguration.Bio}
      onChange={handlerChange}
      placeholder='Bio'
    />
  <div  style={{
        display:'flex'
                }}>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input type="checkbox"
            aria-label="Checkbox for following text input"
            name='Hypoallergenic'
            value={petConfiguration.Hypoallergenic}
            onClick={onClickHypoallergenic}
          /> &nbsp; Hypoallergenic
        </div>
      </div>
    </div>

    <input type="text"
      className="form-control"
      name='dietary_restrictions'
      value={petConfiguration.dietary_restrictions}
      onChange={handlerChange}
      aria-label="Text input with checkbox" 
      placeholder='Dietary restrictions'
    />

    </div>
  <div style={{display:'flex', 
              }}>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input type="checkbox"
            name='isAdoption'
            value={petConfiguration.isAdoption}
            onClick={onClickAdoptionStatus}
            aria-label="Checkbox for following text input"
          /> &nbsp; isAdoption
        </div>
      </div>
    </div>
    <img src=""></img>

    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input type="checkbox"
            name='isReturned'
            value={petConfiguration.isReturned}
            onClick={onClickAdoptionStatus}
            aria-label="Checkbox for following text input"
          /> &nbsp; isReturned
        </div>
      </div>
    </div>
    </div>
    <br />
    <button
      className="btn btn-primary"
      type="submit"
      onClick={handlerSubmit}
    >Submit
    </button>

  </div>)

}


export default Admin(PetPageCreation)