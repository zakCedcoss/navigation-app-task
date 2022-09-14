import React from "react";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

function UserDetails({ user, handleSetUsers }) {
  const handleClick = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const newData = data.filter((item) => item.id !== user.id);
    if (newData) {
      localStorage.setItem("data", JSON.stringify(newData));
      handleSetUsers(newData);
    }
  };

  function modifyPhone(phone) {
    let modifiedPhone = phone.split(/[\s-()\.]/);
    modifiedPhone = modifiedPhone.filter((num) => !isNaN(Number(num)));
    return modifiedPhone;
  }

  return (
    <div className="user-details">
      <p>{user.id}</p>
      <p>
        <Link to={`/${user.id}`} title={user.name}>
          {user.username}
        </Link>
      </p>
      <p>{user.email}</p>
      <p>{modifyPhone(user.phone)}</p>
      <p>{user.company.name}</p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Link to={`/${user.id}`}>
          <FaUserEdit />
        </Link>
        <span className="delete" onClick={handleClick}>
          <AiTwotoneDelete />
        </span>
      </p>
    </div>
  );
}

export default UserDetails;
