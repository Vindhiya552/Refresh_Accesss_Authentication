import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import api from "../../Services/api";

function OrganisationRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    code: "",
    domain: "",
    contactEmail: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    if (!form.name || !form.code) {
      alert("Name and Code are required!");
      return false;
    }
    // Code: alphanumeric + hyphen, 2–20 chars
    const codeOk = /^[A-Za-z0-9-]{2,20}$/.test(form.code);
    if (!codeOk) {
      alert("Code must be 2-20 characters, only letters, numbers, or hyphen.");
      return false;
    }
    if (form.contactEmail) {
      const emailOk = /\S+@\S+\.\S+/.test(form.contactEmail);
      if (!emailOk) {
        alert("Contact Email is invalid!");
        return false;
      }
    }
    // (Optional) basic domain check
    if (form.domain) {
      const domainOk = /^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.domain);
      if (!domainOk) {
        alert("Domain looks invalid (e.g., acme.com).");
        return false;
      }
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        name: form.name.trim(),
        code: form.code.trim(),
        domain: form.domain.trim() || undefined,
        contactEmail: form.contactEmail.trim() || undefined,
        isActive: "true",
      };

      const response = await api.post("/Organisation", payload);

      //   await createOrganisation(payload);
      console.log(response.data);
      //console.log(responsey.status);
      alert("Organisation created successfully!");
      navigate("/OrganisationList");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.message || "Creation failed";
      alert(msg);
      console.log(msg);
    } finally {
      setLoading(false);
    }
  }

  const handleHome = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );

      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <h1>Create Organisation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Organisation Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="code"
          placeholder="Enter short code (e.g., ACME)"
          value={form.code}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="domain"
          placeholder="Domain (e.g., acme.com)"
          value={form.domain}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email (e.g., hr@acme.com)"
          value={form.contactEmail}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* <label>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label> */}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Organisation"}
        </button>
        <button type="button" disabled={loading} onClick={handleHome}>
          Home
        </button>
      </form>
    </>
  );
}

export default OrganisationRegister;
