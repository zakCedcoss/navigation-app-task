import React from "react";
import { Link } from "react-router-dom";

function UserDetails({ user, handleSetUsers }) {
  const handleClick = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const newData = data.filter((item) => item.id !== user.id);
    if (newData) {
      localStorage.setItem("data", JSON.stringify(newData));
      handleSetUsers(newData);
    }
  };

  return (
    <div className="user-details">
      <p>{user.id}</p>
      <p>
        <Link to={`/${user.id}`}>{user.username}</Link>
      </p>
      <p>{user.email}</p>
      <p>{user.phone.split(" ")[0]}</p>
      <p>{user.company.name}</p>
      <p style={{ cursor: "pointer" }} onClick={handleClick}>
        ❌
      </p>
    </div>
  );
}

export default UserDetails;
