import React from 'react'
import './../style/form_preview.css';

const FormPreview = ({previewData,deleteMethod,setterPreview})  => {


  return (
    <div className='parent'>
      {
        previewData &&  <div className = 'preview'>
            <p>Created- AT : <span>{previewData.createdAt}</span></p>
            <p>Name : <span>{previewData.name}</span></p>
            <p>Surname : <span>{previewData.surname}</span></p>
            <p>Email : <span>{previewData.email}</span></p>
            <p>ID : <span>{previewData.id}</span></p>
            <p>Password : <span>{previewData.password}</span></p>
            <p>Term : <span>{previewData.terms.toString()}</span></p>
            <div className="button-group">
                <button onClick={()=> {deleteMethod(previewData.id)}}>Delete</button>
                <button onClick={() => setterPreview()}>New User or Update</button>
            </div>
        </div>
      }
    </div>  
  )
}

export default FormPreview;