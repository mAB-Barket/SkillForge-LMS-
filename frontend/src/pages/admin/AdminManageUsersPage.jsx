import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../services/courseService';

const AdminManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      const data = await deleteUser(id);
      setMessage(data.message);
      setError('');
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      setMessage('');
    }
  };

  return (
    <section className="page-section">
      <h2 className="section-heading">Manage Users</h2>
      <p className="section-subtitle">Monitor user roles and remove accounts when required.</p>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive table-shell">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminManageUsersPage;
