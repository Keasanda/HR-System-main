import React, { useState, useEffect } from "react";
import { Container, Table, Button, Dropdown } from "react-bootstrap"; // Import Dropdown
import HomeCSS from "./AdminDashboard.module.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaArrowLeft, FaArrowRight, FaEllipsisV } from "react-icons/fa"; // Importing icons

const AdminDashboard = () => {
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
          <h2 className={HomeCSS.pageTitle}>Admin Dashboard</h2>
          <div className={HomeCSS.tableControls}>
            <Button
              variant="success"
              className={HomeCSS.addButton}
              onClick={() => navigate("/add-employee")}
            >
              + Add User
            </Button>
          </div>

          <div className={HomeCSS.contentContainer}>
            <div className={HomeCSS.tableWrapper}>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className={HomeCSS.error}>{error}</div>
              ) : (
                <Table bordered hover responsive className={HomeCSS.userTable}>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Identity Number</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Join Date</th>
                      <th>Role</th>
                      <th>Job Title</th>
                      <th>Job Grade</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((employee) => (
                      <tr key={employee.identityNumber}>
                        <td>
                          <img
                            src={employee.url}
                            alt={`${employee.name} ${employee.surname}`}
                            className={HomeCSS.employeeImage}
                          />
                          {employee.name} {employee.surname}
                        </td>
                        <td>{employee.identityNumber}</td>
                        <td>{employee.email}</td>
                        <td>{employee.gender}</td>
                        <td>{new Date(employee.startDate).toLocaleString()}</td>
                        <td>{employee.role}</td>
                        <td>{employee.jobTitle}</td>
                        <td>{employee.jobGrade}</td>
                        <td>
                        <Dropdown>
    <Dropdown.Toggle
        variant="secondary"
        id={`action-dropdown-${employee.identityNumber}`}
    >
        <FaEllipsisV /> {/* Using the dropdown icon here */}
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item
            className={HomeCSS.Item} // Applying the HomeCSS.Item class
            onClick={() => handleActionSelect("Edit", employee)}
        >
            Edit
        </Dropdown.Item>
        <Dropdown.Item
            className={HomeCSS.Item} // Applying the HomeCSS.Item class
            onClick={() => handleActionSelect("AcceptLeave", employee)}
        >
            Accept Leave
        </Dropdown.Item>
        <Dropdown.Item
            className={HomeCSS.Item} // Applying the HomeCSS.Item class
            onClick={() => handleActionSelect("Suspend", employee)}
        >
            Suspend
        </Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>

            {/* Pagination always at the bottom */}
            <div className={HomeCSS.paginationWrapper}>
              <div className={HomeCSS.pagination}>
                <Button
                  variant="outline-primary"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={HomeCSS.pageButton}
                >
                  <FaArrowLeft />
                </Button>
                <span className={HomeCSS.pageNumber}>Page {currentPage}</span>
                <Button
                  variant="outline-primary"
                  disabled={indexOfLastRow >= filteredEmployees.length}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={HomeCSS.pageButton}
                >
                  <FaArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
