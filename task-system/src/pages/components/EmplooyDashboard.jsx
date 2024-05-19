import React, { useState, useEffect } from "react";
import mockdata from "@/pages/mockdata";
import Modal from "./Modal";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [employeeData, setEmployeeData] = useState({});
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query) {
      setEmployeeData(query);
      console.log(query);
    }
  }, [query]);

  const handleClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="dashboard-container grid grid-cols-2 gap-20 p-20 bg-gradient-to-r from-blue-500 to-blue-700 font-sans">
      <div className="tasks">
        <h2 className="sticky top-0 bg-white px-4 py-2 border-b border-gray-300">
          Tasks
        </h2>
        <div className="task-list overflow-y-auto">
          {mockdata.map((el, index) => (
            <a
              key={index}
              onClick={() => handleClick(el)}
              href="#"
              className="task-item"
            >
              <span>{el.name}</span>
              <span>{el.id}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="employee-info flex flex-col justify-center items-center">
        <img
          src="naruto.jpg"
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

      {selectedTask && <Modal task={selectedTask} onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
