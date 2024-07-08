// import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Puff } from "react-loader-spinner";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password should be 8 chars minimum."),
});

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, error, setErrorHandler } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(
          values.email,
          values.password,
          setErrorHandler
        );
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="login-container">
      {isLoggedIn && <Navigate to="/" replace={true} />}
      <div className="bg-image login-bg"></div>
      <div className="container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder={"Enter your email"}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-field">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder={"Enter your password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="show-password-button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button
                  type="submit"
                  className="login-btn green-analyze-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Puff
                      visible={true}
                      height="30"
                      width="30"
                      color="#4fa94d"
                      ariaLabel="puff-loading"
                    />
                  ) : null}
                  Login
                </button>
                <div className="not-register">
                  <p>
                    {`Don't have an account yet?`}
                    <a href="/register"> Request account </a>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
