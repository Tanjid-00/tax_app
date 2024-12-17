import React, { useEffect, useState } from "react";
import style from "../styles/admin/users.module.css";

import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/authRoutes/users"
      ); // API Endpoint
      setUsers(response.data); // Save user data to state
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/authRoutes/users/${id}`);
      setUsers(users.filter((user) => user.userId !== id)); // Remove user from the list
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Info user handler
  const handleInfo = (id) => {
    console.log(`Info for user with ID: ${id}`);
    // Add info functionality here
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={style.container} id="wrapper">
      <div className={style.content} id="content">
        <h2 className={style.heading}>User Dashboard</h2>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <td className={style.index}>{index}</td>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td className={style.btnGrp}>
                  <button
                    className={style.deleteBtn}
                    onClick={() => handleDelete(user.userId)}
                  >
                    x
                  </button>
                  <button
                    className={style.infoBtn}
                    onClick={() => handleInfo(user.id)}
                  >
                    !
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
