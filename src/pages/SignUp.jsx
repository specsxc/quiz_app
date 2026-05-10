import { useState, useActionState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUpNewUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const fullName = formData.get("fullname");
      const password = formData.get("password");
      const agreeTerms = formData.get("terms");
      const accountType = "Player";

      if (!fullName || !email || !password) {
        return new Error("Please fill in all fields");
      }
      if (!agreeTerms) {
        return new Error("You must agree to the Terms & Conditions");
      }
      if (password.length < 6) {
        return new Error("Password must be at least 6 characters");
      }

      const {
        success,
        data,
        error: signUpError,
      } = await signUpNewUser(email, password, fullName, accountType);

      if (signUpError) {
        return new Error(signUpError);
      }
      if (success && data?.session) {
        toast.success("Registration successful!");
        navigate("/");
        return null;
      }
      return null;
    },
    null,
  );

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

        <form
          action={submitAction}
          aria-label="Sign up form"
          aria-describedby="form-description"
        >
          {/* Pełna nazwa */}
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <div className="input-icon">
              <span>👤</span>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Leonardo da Vinci"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="leo@gallery.com"
                required
                autoComplete="email"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Hasło */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <span>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                required
                disabled={isPending}
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
              name="terms"
              required
              disabled={isPending}
            />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms &amp; Conditions</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          {error && <div className="error-message">{error.message}</div>}

          <button type="submit" className="signin-btn" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign Up →"}
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
          <p>Join 2,000+ Players</p>
        </div>
      </div>
    </div>
  );
}
