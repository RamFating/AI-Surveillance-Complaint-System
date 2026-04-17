import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const initialState = {
  email: "",
  password: ""
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await loginUser(form);
      localStorage.setItem("auth-session", JSON.stringify(response.data?.data || {}));
      navigate("/admin");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <article className="panel auth-card">
        <div className="panel__header">
          <span className="eyebrow">Secure Access</span>
          <h2>Login</h2>
          <p>Use the admin portal to manage complaints and monitor alerts.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field field--full">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
            />
          </label>

          <label className="field field--full">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          {error ? <div className="status-message status-message--error">{error}</div> : null}

          <div className="field field--full">
            <button className="button button--primary" type="submit" disabled={submitting}>
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Login;
