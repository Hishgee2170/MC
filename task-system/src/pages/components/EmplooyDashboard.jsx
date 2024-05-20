import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [employeeData, setEmployeeData] = useState({});
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [open, setOpen] = useState(false); // Define the state for the modal visibility
  const API_DATABASE = "http://localhost:2000/EmployeeTasks";

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setEmployeeData(query);
    }
  }, [query]);

  const handleClick = (task) => {
    setSelectedTask(task);
    setOpen(true); // Open the modal when a task is clicked
  };

  const closeModal = () => {
    setOpen(false); // Close the modal
  };

  const getTasks = async () => {
    try {
      const response = await fetch(
        `${API_DATABASE}?employee_id=${query.employeeId}`,
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

      const tasks = await response.json();
      console.log("newData:", tasks);
      setEmployeeTasks(tasks);
    } catch (error) {
      console.error("Error:", error);
      setEmployeeTasks([]);
    }
  };

  useEffect(() => {
    if (query.employeeId) {
      getTasks();
    }
  }, [query.employeeId]);

  return (
    <div className="dashboard-container grid grid-cols-2 gap-20 p-20 bg-gradient-to-r from-blue-500 to-blue-700 font-sans">
      <div className="tasks">
        <h2 className="sticky top-0 bg-white px-4 py-2 border-b border-gray-300">
          Tasks
        </h2>
        <div className="task-list overflow-y-auto">
          {employeeTasks?.map((el, index) => (
            <div
              key={index}
              onClick={() => handleClick(el)}
              className="task-item block py-2 px-4 hover:bg-blue-300 cursor-pointer"
            >
              <div>{el.name}</div>
              <div>{el.task_id}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="employee-info flex flex-col justify-center items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/318/271/large_2x/user-profile-icon-free-vector.jpg"
          alt="Employee Photo"
          className="rounded-full mb-4"
          width="100"
          height="100"
        />
        <p className="text-left w-full max-w-xs mb-2">
          <strong>Employee ID:</strong> {employeeData.employeeId}
        </p>
        <p className="text-left w-full max-w-xs mb-2">
          <strong>Name:</strong> {employeeData.firstName}
        </p>
        <p className="text-left w-full max-w-xs mb-2">
          <strong>Surname:</strong> {employeeData.lastName}
        </p>
        <p className="text-left w-full max-w-xs mb-2">
          <strong>Email:</strong> {employeeData.email}
        </p>
        <p className="text-left w-full max-w-xs mb-2">
          <strong>Phone:</strong> {employeeData.phone}
        </p>
        <Link href="../">
          <div className="logout-button mt-auto">
            <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md">
              Logout
            </button>
          </div>
        </Link>
      </div>

      <div className="company-notices col-span-2">
        <h2 className="sticky top-0 bg-white px-4 py-2 border-b border-gray-300">
          Company Notices
        </h2>
        <ul className="max-h-48 overflow-y-auto">
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded-md my-2">
              Notice {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {selectedTask && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedTask.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {selectedTask.task_id}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
