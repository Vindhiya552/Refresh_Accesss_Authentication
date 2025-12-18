import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //  Check empty fields
      if (!form.name || !form.email || !form.password || !form.cpassword) {
        alert("All fields are required!");
        return;
      }

      //  Check email
      if (!form.email.endsWith("@gmail.com")) {
        alert("Email must end with @gmail.com");
        return;
      }

      //  Check password match
      if (form.password !== form.cpassword) {
        alert("Password and Confirm Password do not match!");
        return;
      }

      //  Send to API
      const response = await api.post("/user", form);
      alert("User Registered Successfully!");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Error in registration!");
    }
  };

  return (
    <>
      <h1>Register User</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          value={form.cpassword}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
