import React from 'react';
import { useHistory } from 'react-router-dom';
import './../style/users_list.css';


const UsersList = ({usersList,setPreviewData}) => {

  const history = useHistory();

  const goDetail = (param,content) => {
    history.push(`/preview/${param}`);
    setPreviewData(content);
  }

  
  return (
   <div className="users-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Password</th>
          <th>Created-AT</th>
          <th>Term</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {
          usersList.map((item,index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.createdAt}</td>
              <td>{item.terms.toString()}</td>
              <td className='detail' onClick={()=> goDetail(item.id,item)}>Detail</td>
            </tr>
          ))
        }
      </tbody>
    </table>
   </div>
  )
}

export default UsersList;