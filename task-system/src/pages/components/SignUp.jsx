import Link from "next/link";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const API_DATABASE = "http://localhost:2000/SignUp";
  const [showWarning, setShowWarning] = useState(false);
  const registerUser = async () => {
    try {
      const response = await fetch(`${API_DATABASE}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newData = await response.json();
      console.log("newData:", newData);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  function checkingInformation() {
    if (
      password === confirmPassword &&
      firstName !== "" &&
      lastName !== "" &&
      email !== ""
    ) {
      registerUser();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
    }
  }
  return (
    <div className="signup-container">
      {showWarning && (
        <Alert className="absolute left-[40%] top-[10px]" severity="error">
          Tanii oruulsan data buruu bn.
        </Alert>
      )}
      <div className="signup-form-wrapper">
        <h2>Sign Up Form</h2>
        <div className="flex flex-col gap-4">
          <input
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
          />
          <input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
          />
        </div>
        <button
          onClick={checkingInformation}
          className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 rounded-md mt-6"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already a member?{" "}
          <Link href="../components/Login" legacyBehavior>
            <div className="text-purple-500 hover:underline">Login here</div>
          </Link>
        </p>
      </div>
    </div>
  );
}
