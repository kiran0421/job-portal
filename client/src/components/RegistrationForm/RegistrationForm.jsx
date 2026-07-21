import { useState } from "react";
import "../../styles/_index.scss";
import "./RegistrationForm.scss";

// ---- Validation rules ----
const NAME_REGEX = /^[A-Za-z ]{1,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  phone: "",
};

function validateField(field, value, formValues) {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (!NAME_REGEX.test(value))
        return "Name must be up to 15 letters only (no numbers/symbols)";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      if (!EMAIL_REGEX.test(value)) return "Enter a valid email address";
      return "";

    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";

    case "confirmPassword":
      if (!value) return "Please retype your password";
      if (value !== formValues.password) return "Passwords do not match";
      return "";

    case "dob":
      if (!value) return "Date of birth is required";
      return "";

    case "phone":
      if (!value) return "Phone number is required";
      if (!PHONE_REGEX.test(value)) return "Phone number must be exactly 10 digits";
      return "";

    default:
      return "";
  }
}

function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((field) => {
    const message = validateField(field, values[field], values);
    if (message) errors[field] = message;
  });
  return errors;
}

export default function RegistrationForm() {
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    // live-validate only fields the user already interacted with
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, nextValues),
      }));
    }

    // keep confirmPassword in sync when password changes
    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField(
          "confirmPassword",
          nextValues.confirmPassword,
          nextValues
        ),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, values),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validateAll(values);
    setErrors(allErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      dob: true,
      phone: true,
    });

    if (Object.keys(allErrors).length === 0) {
      setSubmitted(true);
      console.log("Registration submitted:", values);
    } else {
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setValues(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const fieldClass = (field) =>
    `form-control${errors[field] && touched[field] ? " form-control-error" : ""}`;

  return (
    <div className="registration-form-wrapper">
      <div className="card p-7 registration-card">
        <h3 className="mb-2">Registration Form</h3>
       

        {submitted && (
          <div className="registration-success mb-5">
            Registration successful.
          </div>
        )}

        <form noValidate onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group mb-5">
            <label htmlFor="name" className="form-label">
              Full Name <span className="required-mark">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={15}
              className={fieldClass("name")}
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <div className="form-error">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="form-group mb-5">
            <label htmlFor="email" className="form-label">
              Email <span className="required-mark">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={fieldClass("email")}
              placeholder="enter your Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <div className="form-error">{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group mb-5">
            <label htmlFor="password" className="form-label">
              Password <span className="required-mark">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={fieldClass("password")}
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group mb-5">
            <label htmlFor="confirmPassword" className="form-label">
              Retype Password <span className="required-mark">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={fieldClass("confirmPassword")}
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="form-error">{errors.confirmPassword}</div>
            )}
          </div>

          {/* DOB + Phone side by side */}
          <div className="row" style={{ "--gap": "1rem" }}>
            <div className="col-6 form-group mb-5">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className={fieldClass("dob")}
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.dob && touched.dob && (
                <div className="form-error">{errors.dob}</div>
              )}
            </div>

            <div className="col-6 form-group mb-5">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={10}
                className={fieldClass("phone")}
                placeholder="Phone Number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone && (
                <div className="form-error">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="registration-actions mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button type="button" className="btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}