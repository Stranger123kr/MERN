import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [form, setForm] = useState({});
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState([]);

  const FormData = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const FormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/demo", form);
      console.log(res.data);
      setUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/demo");
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserData();
  }, [update]);

  return (
    <>
      <form onSubmit={FormSubmit}>
        <label htmlFor="username">
          username
          <input
            type="text"
            name="username"
            autoComplete="off"
            onChange={FormData}
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          password
          <input
            type="text"
            name="password"
            autoComplete="off"
            onChange={FormData}
          />
        </label>
        <button>Submit</button>
      </form>

      <div className="container">
        {user.map((data) => (
          <div className="container" key={data._id}>
            <ul>
              <li>UserName : {data.username}</li>
              <li>PassWord : {data.password}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
