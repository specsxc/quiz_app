import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    // Tutaj podmień na prawdziwe logowanie (np. fetch do API)
    console.log("Logging in", { email, password });
    // Po udanym logowaniu przekieruj na stronę główną:
    // navigate("/");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <div className="logo-icon">
            <span>🎨</span>
          </div>
          <h2>Quizzical</h2>
          <p>Curating your intellectual journey.</p>
        </div>

        <h1>Sign In</h1>
        <p>Enter your credentials to access your gallery.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-header">
              <label>Password</label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="input-icon">
              <span>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signin-btn">
            Sign In →
          </button>
        </form>

        <div className="divider">Or continue with</div>

        <div className="social-buttons">
          <button className="social-btn">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAIlx5qr--8YrbVHN3DHVB9Dwz1lAK_2wnCjt3PODdzLT_9_ZCDdFQTaTthAzjrpV9w-BfMiV_1Xz7SS9lGuBMZCnsyj18Or2sCfaUU4hbocvf7Sz1lbYmjrmJNuUD2lsjZ6wUFMKpeF5QxYn1daCse90kJqlQW6awDIqwKpunctF7eRYADNIf1oAXf5_hsb36haoWtZ2n80eU9XQQmJo488hhI8wRDiD_VPqQNO9exKPUvphc80CrkThqyJrwASIdxasbWw7kGe4"
              alt="Google"
            />
            Google
          </button>
          <button className="social-btn">
            <span>📘</span>
            Facebook
          </button>
        </div>

        <div className="register-link">
          Don't have an account?
          <Link to="/SignUp">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
