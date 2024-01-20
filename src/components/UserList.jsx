import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>List of Users</h2>
      <Link to='/users/add' className='button is-primary mb-2'>
        Add New
      </Link>
      <div className='table-container'>
        <table className='table is-striped is-hoverable is-fullwidth' style={{ overflowX: 'scroll' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className='is-flex-mobile'>
                    <Link to={`/users/edit/${user.uuid}`} className='button is-small is-info mr-2'>
                      Edit
                    </Link>
                    <button onClick={() => deleteUser(user.uuid)} className='button is-small is-danger'>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
