import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";

const SignUp = () => {
  const API_DATABASE = "http://localhost:2000/SignUp";
  const [showWarning, setShowWarning] = useState(false);

  const registerUser = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(`${API_DATABASE}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newData = await response.json();
      console.log("newData:", newData);
      resetForm();
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="signup-container">
      {showWarning && (
        <Alert className="absolute left-[40%] top-[10px]" severity="error">
          Tanii oruulsan data buruu bn.
        </Alert>
      )}
      <div className="signup-form-wrapper">
        <h2>Sign Up Form</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={registerUser}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <Field
                name="firstName"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500"
              />
              <Field
                name="lastName"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500"
              />
              <Field
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <Field
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              <Field
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 rounded-md mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          Already a member?{" "}
          <Link href="../components/Login" legacyBehavior>
            <div className="text-purple-500 hover:underline">Login here</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
