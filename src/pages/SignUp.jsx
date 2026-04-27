import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms & Conditions");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    // Tutaj dodaj faktyczną rejestrację (fetch do API)
    console.log("Registering", { fullName, email, password });
    // Po sukcesie możesz przekierować na stronę logowania:
    // navigate("/signin");
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

        <h1>Create Account</h1>
        <p>Join our curated world of intellectual discovery.</p>

        <form onSubmit={handleSubmit}>
          {/* Pełna nazwa */}
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-icon">
              <span>👤</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Leonardo da Vinci"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="leo@gallery.com"
                required
              />
            </div>
          </div>

          {/* Hasło */}
          <div className="form-group">
            <label>Password</label>
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

          {/* Checkbox regulaminu */}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms &amp; Conditions</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signin-btn">
            Sign Up →
          </button>
        </form>

        <div className="register-link" style={{ marginTop: "1.5rem" }}>
          Already have an account?
          <Link to="/signin">Sign In</Link>
        </div>

        {/* Opcjonalny "social proof" – możesz usunąć jeśli niepotrzebny */}
        <div className="social-proof">
          <div className="avatar-stack">
            <img
              className="avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApPCXyZGm18j6SwOxs9zVCPO-x-6-NB0iU3zX9Up98CKJ2DDCI0QCJpfxvT2XUTPBLUjLAfO9z--s1rQb40EK-yfDA9Avaa2v9TDdGoNGsJEEizwnTfVhkXg-jCSdaC7DYgWjDqpOD7B1VAXM2yrrg5z1zome66X88fLaVtaOzmLEZF8pumgo6GqaA35o-ef5w6wiWyLP1rIopPzpJUK4LniF_ljOQfTddffeVAbYEVaObNUglfdzoEDrSY7Gmcxkmf--8k4ZNjWs"
              alt="user"
            />
            <img
              className="avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0tDm9kKReUye3n6zF4Fo_J9XLww7p-ImZ30LWrIgCDty3vBfSWZe6ZwkiNCNycGTe-CD4DKVf0w_khqOnBKdkwxHYULfVQR2mDCiX8N3V516bQL_T5MO0q0LQm64BiagpZbzPwU8ZISTNKMq2P5XxvTMvMOxnN7dl6oK_APvNmt5CLAURY76jHRgPiV2alBY_UMakTHGFFG31MW_kR5JeT-uPJbD58clg5kxLQqoYHblGUQxHxoCvNlwI_8M7aPyzASkQG-K3Fu8"
              alt="user"
            />
            <img
              className="avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2GnLqhUoAkgCy1qMyesIbEGVfYez5GpbUw3vYuCVWo5ctEYO83K9xiY78wbIEbBKtU29JYtITKa0ggTVkmT3Lqai-dq5MRMt_TsOKgv34L4U_inrcRZ8cOUsm4O6SOpIRouTT3eyVPuOJ_wyi3zvHOmqRQ7hapqcnd5xjvDQNRUZgOP8ONjsdcXHaYhdDvKGmzDquBzRleDxboIIQd4AblNJGRSKALxzAQOnWouLjJHq9XjXkU3QW-OQQR3waWxVMNN8eP2n-eHo"
              alt="user"
            />
            <div className="avatar-count">+2k</div>
          </div>
          <p>Join 2,000+ Curators</p>
        </div>
      </div>
    </div>
  );
}
