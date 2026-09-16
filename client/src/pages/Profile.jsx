import { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import api from "../api/api.js";

function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const body = { name };
      if (password) body.password = password;
      const res = await api.put("/users/profile", body);
      setUser(res.data);
      setMessage("Profile updated successfully.");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (!user) return <p style={{ padding: 40 }}>Please sign in to view your profile.</p>;

  return (
    <div className="profile-page">
      <div className="profile-avatar">{user.name?.[0]?.toUpperCase()}</div>
      <h1>{user.name}</h1>
      <p style={{ color: "#b3b3b3", marginBottom: 20 }}>{user.email}</p>

      {message && <div className="form-error" style={{ background: "#2ecc71" }}>{message}</div>}
      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password (leave blank to keep current)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
