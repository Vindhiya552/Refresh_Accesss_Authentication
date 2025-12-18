import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";

function OrgEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    code: "",
    domain: "",
    contactEmail: "",
    isActive: true,
  });

  //console.log("id", id);

  useEffect(() => {
    api.get("/Organisation").then((res) => {
      const org = res.data.find((o) => o._id === id);
      if (org) setForm(org);
      console.log(org);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.patch(`/Organisation/${id}`, form);
    alert("Updated successfully!");
    navigate("/OrganisationList");
  };

  return (
    <div className="edit-container">
      <h2>Edit Organisation</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />{" "}
        <br />
        <br />
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <br />
        <input name="domain" value={form.domain} onChange={handleChange} />{" "}
        <br />
        <br />
        <input
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
        />{" "}
        <br />
        {/* <br />
        <label>
          Active:
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
        </label>
        <br /> */}
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default OrgEdit;
