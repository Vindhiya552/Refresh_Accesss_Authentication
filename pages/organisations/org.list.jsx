import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

function OrgList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await api.get("/Organisation");
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await api.delete(`/Organisation/${_id}`);
    alert("Deleted successfully");
    loadData(); // refresh list
    navigate("/OrganisationList");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No organisation data found.</p>

        <button className="logout-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2 className="list-header">All Organisations</h2>
      <button
        className="add-btn"
        onClick={() => navigate("/OrganisationRegister")}
      >
        ➕ Add New
      </button>

      <table className="org-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Domain</th>
            <th>Email</th>
            <th>Action</th>
            {/* <th>Active</th> */}
          </tr>
        </thead>

        <tbody>
          {data.map((org) => (
            <tr key={org._id}>
              <td>{org.name}</td>
              <td>{org.code}</td>
              <td>{org.domain}</td>
              <td>{org.contactEmail}</td>
              {/* <td>{org.isActive ? "Yes" : "No"}</td> */}

              <td>
                <button
                  onClick={() => navigate(`/OrganisationEdit/${org._id}`)}
                >
                  Edit
                </button>

                <button onClick={() => handleDelete(org._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrgList;
