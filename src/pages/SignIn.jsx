import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");

      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);

      if (signInError) {
        return new Error(signInError);
      }
      if (success && data?.session) {
        toast.success("Successfully signed in!");
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

        <h1>Sign In</h1>
        <p>Enter your credentials to access tons of quizzes.</p>

        <form action={submitAction}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <span>📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "signin-error" : undefined}
                disabled={isPending}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="input-icon">
              <span>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                required
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "signin-error" : undefined}
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

          <button
            type="submit"
            className="signin-btn"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "Signing in..." : "Sign In →"}
          </button>

          {error && (
            <div id="signin-error" role="alert" className="error-message">
              {error.message}
            </div>
          )}
        </form>

        <div className="divider">Or continue with</div>

        <div className="social-buttons">
          <button className="social-btn">
            <FcGoogle />
            Google
          </button>
          <button className="social-btn">
            <span>
              <FaFacebook className="social-icon facebook" />
            </span>
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
