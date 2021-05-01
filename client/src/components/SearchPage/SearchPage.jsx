import React from 'react'


export const SearchPage = props => {

    return(
        <div className='container pt-4'>
            <select class="form-select" 
                    aria-label="Default select example">
            <option selected>Open this pet menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>
        </div>
        
    )

}