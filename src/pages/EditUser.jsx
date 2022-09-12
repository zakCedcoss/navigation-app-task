import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateEmail, validatePhone } from "../utils/vailidation";

function EditUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [newData, setNewData] = useState([]);
  // error messages
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data.length > 0) {
      const foundData = data.find((item) => item.id === Number(params.id));
      setName(foundData.name);
      setUsername(foundData.username);
      setEmail(foundData.email);
      setPhone(foundData.phone);
      setCompany(foundData.company?.name);
    }
  }, []);

  useEffect(() => {
    if (newData.length !== 0 && !isError) {
      localStorage.setItem("data", JSON.stringify(newData));
      navigate("/");
      setIsError(false);
    }
  }, [newData, isError]);

  console.log(isError);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nameError &&
      !usernameError &&
      !emailError &&
      !phoneError &&
      !companyError
    ) {
      setIsError(false);
      const d = JSON.parse(localStorage.getItem("data"));
      const data = d.filter((item) => item.id !== Number(params.id));
      const updatedInput = {
        name,
        username,
        email,
        phone,
        company: { name: company },
        id: Number(params.id),
      };
      if (data) {
        const newData = [...data, updatedInput];
        setNewData(newData);
      }

      setName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setCompany("");
    } else {
      setIsError(true);
    }
  };

  const handlePhoneChange = (value) => {
    const val = value.trim();
    const error = validatePhone(val);
    setPhoneError(error);
    setPhone(val);
  };

  const handleEmailChange = (value) => {
    const val = value.trim();
    const error = validateEmail(val);
    setEmailError(error);
    setEmail(val);
  };

  const handleNameChange = (value) => {
    const val = value.trim();
    console.log(val);
    setName(val);
    let error = "";
    if (val.length === 0) {
      error = "Length should not be empty";
    }
    setNameError(error);
  };

  const handleUsernameChange = (value) => {
    const val = value.trim();
    console.log(val);
    setUsername(val);
    let error = "";
    if (val.length === 0) {
      error = "Length should not be empty";
    }
    setUsernameError(error);
  };

  const handleCompanyChange = (value) => {
    const val = value.trim();
    console.log(val);
    setCompany(val);
    let error = "";
    if (val.length === 0) {
      error = "Length should not be empty";
    }
    setCompanyError(error);
  };

  return (
    <>
      <form className="add-user" onSubmit={handleSubmit}>
        <h1>Edit User</h1>
        <label>
          <span>Name :</span>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <span>{nameError}</span>
        </label>
        <label>
          <span>Username :</span>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
          <span>{usernameError}</span>
        </label>
        <label>
          <span>Email :</span>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <span>{emailError}</span>
        </label>
        <label>
          <span>Phone :</span>
          <input
            type="tel"
            name="phone"
            value={phone}
            placeholder="Enter your phone"
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          <span>{phoneError}</span>
        </label>
        <label>
          <span>Company Name :</span>
          <input
            type="text"
            name="company"
            value={company}
            placeholder="Enter your company name"
            onChange={(e) => handleCompanyChange(e.target.value)}
          />
          <span>{companyError}</span>
        </label>
        <button type="submit">Update User</button>
      </form>
      {isError && (
        <span className="error">Please fill all the details correctly !!!</span>
      )}
    </>
  );
}

export default EditUser;
