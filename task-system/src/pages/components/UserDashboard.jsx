import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({});
  const [taskName, setTaskName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [taskExplanation, setTaskExplanation] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const API_DATABASE = "http://localhost:2000/addTask";
  const API_DATABASE_EMPLOYEE_DATA = "http://localhost:2000/getEmployeeName";
  const API_DATABASE_PULL_TASKS = "http://localhost:2000/pullTasks";
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query) {
      setUserData(query);
      console.log(query);
    }
  }, [query]);

  useEffect(() => {
    if (userData.customer_id) {
      getData();
    }
  }, [userData]);

  useEffect(() => {
    getEmployeeName();
  }, []);

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const getEmployeeName = async () => {
    try {
      const response = await fetch(API_DATABASE_EMPLOYEE_DATA, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const employeeData = await response.json();
      setEmployeeData(employeeData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `${API_DATABASE_PULL_TASKS}?userId=${userData.customer_id}`,
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
      const response = await fetch(API_DATABASE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          employeeId,
          userId: userData.customer_id,
          taskExplanation,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newdata = await response.json();
      setTasks((prevTasks) => [...prevTasks, newdata]);
      setTaskName("");
      setEmployeeId("");
      setTaskExplanation("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    console.log("task changed");
  }, [tasks]);

  return (
    <div className="dashboard-container">
      {showAlert && (
        <Alert
          className="absolute left-[40%]"
          icon={<CheckIcon fontSize="inherit" />}
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
              <span>Employee ID: {task.employee_id}</span>
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
                <select
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                >
                  <option value="" disabled>
                    Select Employee
                  </option>
                  {employeeData.map((el, i) => (
                    <option
                      className="text-[black]"
                      key={i}
                      value={el.employee_id}
                    >
                      {el.firstname}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <textarea
                  type="text"
                  placeholder="Task Explanation"
                  value={taskExplanation}
                  className="h-[200px]"
                  onChange={(e) => setTaskExplanation(e.target.value)}
                />
                <div className="logout-button">
                  <button type="submit">Add Task</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

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
