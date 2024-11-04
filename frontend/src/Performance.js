import React, { useState, useEffect } from "react";
import { Container, Table, Button, Dropdown } from "react-bootstrap"; // Import Dropdown
import HomeCSS from "./AdminDashboard.module.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaArrowLeft, FaArrowRight, FaEllipsisV } from "react-icons/fa"; // Importing icons

const Performance = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5239/api/Employee");
        setEmployees(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching employees."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleActionSelect = (action, employee) => {
    // Implement your action logic here
    console.log(
      `Action: ${action} for Employee: ${employee.name} ${employee.surname}`
    );
  };

  return (
    <div className={HomeCSS.container}>
      <div className={HomeCSS.leftSide}>
        <Sidebar />
      </div>

      <div className={HomeCSS.rightSide}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Container fluid>
          <h2 className={HomeCSS.pageTitle}>Company's Statistics</h2>
          

          
            

           
          
        </Container>
      </div>
    </div>
  );
};

export default Performance;
