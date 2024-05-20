import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const EmployeeLogin = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const API_DATABASE = "http://localhost:2000/EmployeesLogin";
  const router = useRouter();

  const checkUser = async () => {
    try {
      const response = await fetch(API_DATABASE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("newData:", data);
      if (data) {
        router.push({
          pathname: "./EmplooyDashboard",
          query: {
            employeeId: data.user.employee_id,
            firstName: data.user.firstname,
            lastName: data.user.lastname,
            email: data.user.gmail,
            phone: data.user.phone_number,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Employee's Login</h2>
        <div className="flex flex-col gap-4">
          <input
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={gmail}
            type="email"
            onChange={(e) => setGmail(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
          />
        </div>
        <div className="form-options">
          <Link href="#" className="text-sm text-purple-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        <button
          onClick={checkUser}
          className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 rounded-md mt-6"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          Not a member?
          <Link href="../components/EmployeeSignUp">
            <div className="text-purple-500 hover:underline">Signup now</div>
          </Link>
          <Link href="../">
            <div className="text-purple-500 hover:underline">Choose Role</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
