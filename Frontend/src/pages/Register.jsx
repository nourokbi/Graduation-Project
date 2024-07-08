import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Puff } from "react-loader-spinner";
import * as Yup from "yup";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const validationSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password should be 8 chars minimum."),
  confirmPassword: Yup.string().required("Please enter confirm password"),
});

export default function Register() {
  const { error, setErrorHandler } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(
        values.name,
        values.email,
        values.password,
        values.access,
        setErrorHandler
      );
      resetForm();
      navigate("/login");
    }
    setSubmitting(false);
  };

  return (
    <div className="register-container">
      <div className="bg-image login-bg"></div>
      <div className="container">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            access: "waiting",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="register-form">
                <h1>Register</h1>
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="name"
                      id="name"
                      name="name"
                      placeholder={"Enter your name"}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>
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
                </div>
                <div className="row">
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
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder={"Please confirm password"}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </div>
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
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
