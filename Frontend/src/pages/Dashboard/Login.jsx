// import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Puff } from "react-loader-spinner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password should be 8 chars minimum."),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values, {setSubmitting}) => {  
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
      setSubmitting(false);
    }, 400);

  }

  return (
    <div className="login-container">
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
                <button
                  type="submit"
                  className="login-btn"
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
                    <a href="/dashboard/signup"> Request account </a>
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
