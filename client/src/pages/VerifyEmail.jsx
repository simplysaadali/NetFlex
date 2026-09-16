import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await verifyEmail(email, otp);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Verify Email</h1>
        <p style={{ color: "#aaa", marginBottom: "1rem" }}>
          Enter the 6-digit OTP sent to <strong>{email || "your email"}</strong>.
        </p>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!location.state?.email && (
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
