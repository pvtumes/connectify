import { useState } from "react";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [animating, setAnimating] = useState(false);

  const quotes = {
    login: {
      title: "Welcome Back!",
      text: "Sign in to continue your journey with us and access all your personalized features and content.",
    },
    signup: {
      title: "Join Our Community",
      text: "Create an account to unlock all features, track your progress, and connect with others on the platform.",
    },
  };

  const toggleForm = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimating(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      isLogin,
      userType,
      rememberMe,
    });
  };

  // Social icons components remain the same
  const GoogleIcon = () => (
    <svg className="auth-social-icon" viewBox="0 0 24 24">
      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="auth-social-icon" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg className="auth-social-icon" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <div className="auth-container">
      <div className={`auth-wrapper ${animating ? "auth-animating" : ""}`}>
        <div className={`auth-panel ${isLogin ? "auth-login" : "auth-signup"}`}>
          {/* Left Panel - Welcome Content */}
          <div className="auth-content-panel">
            <div className="auth-content-wrapper">
              <h1 className="auth-welcome-text">
                {isLogin ? quotes.login.title : quotes.signup.title}
              </h1>
              <p className="auth-welcome-subtext">
                {isLogin ? quotes.login.text : quotes.signup.text}
              </p>
              <div className="auth-decoration">
                <div className="auth-shape auth-shape-1"></div>
                <div className="auth-shape auth-shape-2"></div>
                <div className="auth-shape auth-shape-3"></div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="auth-form-panel">
            <div className="auth-form-container">
              <h2 className="auth-form-title">
                {isLogin ? "USER LOGIN" : "USER SIGNUP"}
              </h2>

              {!isLogin && (
                <div className="auth-user-type-toggle">
                  <div className="auth-toggle-container">
                    <button
                      type="button"
                      className={`auth-toggle-btn ${
                        userType === "student" ? "active" : ""
                      }`}
                      onClick={() => setUserType("student")}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      className={`auth-toggle-btn ${
                        userType === "employer" ? "active" : ""
                      }`}
                      onClick={() => setUserType("employer")}
                    >
                      Employer
                    </button>
                    <button
                      type="button"
                      className={`auth-toggle-btn ${
                        userType === "admin" ? "active" : ""
                      }`}
                      onClick={() => setUserType("admin")}
                    >
                      Admin
                    </button>
                  </div>
                  <p className="auth-toggle-info">Signing up as: {userType}</p>
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="auth-input-group">
                    <span className="auth-input-icon">👤</span>
                    <input
                      type="text"
                      className="auth-input-field"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                )}

                <div className="auth-input-group">
                  <span className="auth-input-icon">✉️</span>
                  <input
                    type="email"
                    className="auth-input-field"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    type="password"
                    className="auth-input-field"
                    placeholder="Password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="auth-input-group">
                    <span className="auth-input-icon">🔒</span>
                    <input
                      type="password"
                      className="auth-input-field"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                )}

                <div className="auth-form-options">
                  <div className="auth-remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="auth-checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="rememberMe" className="auth-checkbox-label">
                      Remember
                    </label>
                  </div>

                  {isLogin && (
                    <a href="#" className="auth-forgot-password">
                      Forgot password?
                    </a>
                  )}
                </div>

                <button type="submit" className="auth-submit-btn">
                  {isLogin ? "LOGIN" : "SIGNUP"}
                </button>

                <div className="auth-social-login">
                  <div className="auth-social-divider">
                    <span>OR</span>
                  </div>
                  <div className="auth-social-buttons">
                    <button
                      type="button"
                      className="auth-social-btn auth-google-btn"
                    >
                      <GoogleIcon />
                      <span>{isLogin ? "Login" : "Sign up"} with Google</span>
                    </button>
                    <div className="auth-social-row">
                      <button
                        type="button"
                        className="auth-social-btn auth-linkedin-btn"
                      >
                        <LinkedInIcon />
                        <span>LinkedIn</span>
                      </button>
                      <button
                        type="button"
                        className="auth-social-btn auth-github-btn"
                      >
                        <GitHubIcon />
                        <span>GitHub</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="auth-toggle-form">
                <p className="auth-toggle-text">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    className="auth-toggle-link"
                    onClick={toggleForm}
                  >
                    {isLogin ? " Sign up" : " Login"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
