import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDetails from "../components/UserDetails";

function Home() {
  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [backup, setBackup] = useState([]);
  const location = useLocation();

  const handleChange = (value) => {
    if (value === "") {
      setUsers(backup);
      return;
    }
    const searchedUser = backup.filter((user) => {
      return user.username.toLowerCase().indexOf(value) === -1 ? false : true;
    });
    setUsers(searchedUser);
  };

  const handleSetUsers = (data) => {
    setUsers(data);
  };

  useEffect(() => {
    if (location.state) {
      return;
    }
    fetch(API)
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
        setUsers(data);
        setBackup(data);
      });
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setUsers(data);
    setBackup(data);
  }, []);

  // console.log("backup data:", backup);

  return (
    <div className="home">
      <header className="navbar">
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search Users"
        />
        <Link to="/addUser">
          <button>Add User</button>
        </Link>
      </header>
      <div className="users">
        <div className="user-details table-heading">
          <p>User Id</p>
          <p>UserName</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Company Name</p>
          <p>Actions</p>
        </div>
        {users?.map((user) => {
          return (
            <UserDetails
              key={user.id}
              user={user}
              handleSetUsers={handleSetUsers}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
