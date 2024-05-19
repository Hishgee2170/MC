import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/check";
import Link from "next/link";

const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false);
  const API_DATABASE = "http://localhost:2000/addTask"; // Correct endpoint to fetch tasks
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const { query } = router;
  const [userData, setUserData] = useState({});
  const [taskName, setTaskName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  useEffect(() => {
    if (query) {
      setUserData(query);
      console.log(query);
    }
  }, [query]);
  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        `${API_DATABASE}?userId=${userData.customer_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newData = await response.json();
      setTasks(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addTask = async () => {
    handleClick();
    try {
      const response = await fetch("http://localhost:2000/addTask", {
        // Correct endpoint for adding tasks
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          employeeId,
          userId: userData.customer_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newdata = await response.json();
      setTasks(newdata);
      console.log("newTask:", newdata);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Tasks Section */}
      {showAlert && (
        <Alert
          className="absolute left-[40%]"
          ikon={<CheckIcon fontSize="inherit" />}
          severity="success"
        >
          Sent task
        </Alert>
      )}
      <div className="tasks1">
        <h2>Tasks</h2>
        <h1>Add task</h1>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div className="task-item" key={index}>
              <span>EmployeeID: {task.employee_id}</span>
              <span>Task Name: {task.name}</span>
            </div>
          ))}
        </div>
        <div className="task-item">
          <section className="task-form-section">
            <form
              className="task-form"
              onSubmit={(e) => {
                e.preventDefault();
                addTask();
              }}
            >
              <div className="task-list">
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <div className="logout-button">
                  <button onClick={addTask} type="submit">
                    Add Task
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* Employee Information Section */}
      <div className="employee-info">
        <img
          width="100"
          height="100"
          src="https://s.hdnux.com/photos/51/23/24/10827008/4/ratio3x2_450.jpg"
          alt="Naruto"
        />
        <div className="text-left w-full max-w-xs">
          <p>
            <strong>User ID:</strong> {userData.customer_id}
          </p>
          <p>
            <strong>Name:</strong> {userData.firstname}
          </p>
          <p>
            <strong>Surname:</strong> {userData.lastname}
          </p>
          <p>
            <strong>Email:</strong> {userData.gmail}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone_number}
          </p>
        </div>
        <Link href={"../"}>
          <div className="logout-button">
            <button type="button">Logout</button>
          </div>
        </Link>
      </div>

      {/* Company Notices Section */}
      <div className="company-notices">
        <h2>Company Notices</h2>
        <ul>
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index}>Notice {index + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
