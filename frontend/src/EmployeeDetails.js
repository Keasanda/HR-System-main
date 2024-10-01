import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EmployeeDetailsCSS from './EmployeeDetails.module.css'; // Create this CSS module
import Sidebar from './Sidebar';
import BankingDetail from './BankingDetail';

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBankingForm, setShowBankingForm] = useState(false); // State to toggle the banking form

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        console.log(`Fetching employee details for ID: ${id}`);
        const response = await axios.get(`http://localhost:5239/api/employee/${id}`);
        console.log('Response:', response.data);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'An error occurred while fetching employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleBankingDetailsSuccess = (data) => {
    console.log('Banking details saved successfully:', data);
    setShowBankingForm(false); // Hide the banking form after submission
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={EmployeeDetailsCSS.error}>{error}</div>;

  return (
    <div className={EmployeeDetailsCSS.container}>
      <div className={EmployeeDetailsCSS.leftSide}>
        <div className={EmployeeDetailsCSS.sidebar}>
          <Sidebar />
        </div>
      </div>
      
      <div className={EmployeeDetailsCSS.content}>
        <div className={EmployeeDetailsCSS.profileHeader}>
          {/* Profile Picture and Basic Info */}
          <div className={EmployeeDetailsCSS.profileInfo}>
            <div className={EmployeeDetailsCSS.profilePicture}>
              <img
                src={employee.url} // Assuming url is a property in employee object
                alt={`${employee.name} ${employee.surname}`}
                className={EmployeeDetailsCSS.employeeImage}
              />
            </div>
            <div>
              <h2>{employee.name} {employee.surname}</h2>
              <p>{employee.position || 'Position Not Available'}</p>
              <p>{employee.level || 'Level Not Available'}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className={EmployeeDetailsCSS.tabs}>
            <button>Profile Info</button>
            <button onClick={() => setShowBankingForm(!showBankingForm)}>Banking Details</button>
            <button>Qualifications</button>
            <button>Job Title</button>
            <button>Reports</button>
          </div>
        </div>

        <div className={EmployeeDetailsCSS.details}>
          {showBankingForm ? (
            <BankingDetail appUserId={employee.appUserId} onSuccess={handleBankingDetailsSuccess} />
          ) : (
            <>
              {/* Basic Details */}
              <div className={EmployeeDetailsCSS.section}>
                <h3>Basic Details</h3>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Identity Number:</strong> {employee.identityNumber}</p>
                <p><strong>Date of Birth:</strong> {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {employee.gender}</p>
                <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
              </div>

              {/* Employment Details */}
              <div className={EmployeeDetailsCSS.section}>
                <h3>Employment Details</h3>
                <p><strong>Contract Type:</strong> {employee.contractType}</p>
                <p><strong>Start Date:</strong> {new Date(employee.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(employee.endDate).toLocaleDateString()}</p>
                <p><strong>Tax Number:</strong> {employee.taxNumber}</p>
                <p><strong>Salary:</strong> {employee.salary}</p>
                <p><strong>Physical Address:</strong> {employee.physicalAddress}</p>
                <p><strong>Postal Address:</strong> {employee.postalAddress}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;