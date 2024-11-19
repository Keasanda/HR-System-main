import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";
import Sidebar from "./Sidebar";
import BankingDetail from "./BankingDetail";
import Qualifications from "./Qualifications";
import JobTitle from "./JobTitle";
import "./EmployeeDetails.css"; // Custom CSS file for additional styling



const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        console.log(`Fetching employee details for ID: ${id}`);
        const response = await axios.get(
          `http://localhost:5239/api/employee/${id}`
        );
        console.log("Response:", response.data);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching employee details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  // Check if the logged-in user can view the employee details
  useEffect(() => {
    if (employee) {
      // Retrieve and parse user data from local storage
      const userData = JSON.parse(localStorage.getItem("user"));
      const userEmail = userData ? userData.userEmail : null; // Get userEmail from parsed object

      console.log("User Email from localStorage:", userEmail);
      console.log("Employee Email:", employee.email);

      // Compare emails
      if (userEmail && userEmail.trim() !== employee.email.trim()) {
        console.log("Email mismatch. Redirecting to home page.");
        navigate("/home"); // Redirect if emails do not match
      }
    }
  }, [employee, navigate]);

  const handleBankingDetailsSuccess = (data) => {
    console.log("Banking details saved successfully:", data);
    setActiveTab("banking");
  };

  const handleQualificationsSuccess = (data) => {
    console.log("Qualifications saved successfully:", data);
    setActiveTab("qualifications");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={EmployeeDetailsCSS.error}>{error}</div>;

  // Render nothing or a message if the employee data is not set
  if (!employee) return null;

  const handleJobTitleSuccess = (data) => {
    console.log("Qualifications saved successfully:", data);
    setActiveTab("qualifications");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={EmployeeDetailsCSS.error}>{error}</div>;

  // Render nothing or a message if the employee data is not set
  if (!employee) return null;

  return (
    <div >


      
      <div className={EmployeeDetailsCSS.leftSide}>
        <div className={EmployeeDetailsCSS.sidebar}>
          <Sidebar />
        </div>
      </div>

      <div className="employee-details-container">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/100" // Replace with actual image URL
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-details">
            <h2> <input
                      value={employee.name}  
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />  
                    
                  
                    
                    
                    </h2>
            <p>UI/UX Design Team</p>
            <p>Web Designer</p>
          
            <p> Employee ID :   <input
                      value={employee.employeeId}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />  </p> 
            
            <br></br>

            <p> Employee start date  :   <input
                      value={employee.startDate}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />  </p> 
          
          
          <p>Position</p>

          <p>Team</p>
          </div>
        </div>

        
 

    




          {activeTab === "profile" && (
            <>
              {/* Basic Details */}
              <div className={EmployeeDetailsCSS.section}>
  <h3>Basic Details</h3>
  <div className="details-grid">
    
      <p>Date of Birth:</p>
      <input
        value={new Date(employee.dateOfBirth).toLocaleDateString()}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
   
   
      <p>Gender:</p>
      <input
        value={employee.gender}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />


      <p>Marital Status:</p>
      <input
        value={employee.maritalStatus}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
 
      <p>Email:</p>
      <input
        value={employee.email}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
    
      <p>Identity Number:</p>
      <input
        value={employee.identityNumber}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />


  </div>
</div>









            </>
          )}
        </div>


        
      </div>



      
  

      <div className="employee-details-container">
      <div className="profile-header">
       
     
        <div className="details-grid">
      
  
 
 
 

    <p>Marital Status:</p>
    <input
      value={employee.maritalStatus}
      className={EmployeeDetailsCSS.inputField}
      readOnly
    />



<p>Address:</p>
      <input
        value={employee.physicalAddress}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />





<p>Employment Status:</p>
      <input
        value={employee.contractType}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />


<p>Tax :</p>
      <input
        value={employee.taxNumber}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />


</div>
       

    
 

    




          {activeTab === "profile" && (
            <>
              {/* Basic Details */}
             
 
  
  <div className="details-grid">
      
      <p>Qualification Type:</p>
      <input
        value={employee.qualificationType}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
   
   
      <p>Year Completed:</p>
      <input
        value={employee.yearCompleted}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
  
      <p>Institution :</p>
      <input
        value={employee.institution}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
  
  
  </div>











            </>
          )}
        </div>


        
      </div>





      <div className="employee-details-container">
      <div className="profile-header">
    


          {activeTab === "profile" && (
            <>
         
  
  <div className="details-grid">
      

   
      <p>Bank Name:</p>
      <input
        value={employee.bankName}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
  
      <p>Account type:</p>
      <input
        value={employee.accountType}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
  
      <p>Account Number</p>
      <input
        value={employee.accountNumber}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
    
      <p>Branch Code:</p>
      <input
        value={employee.branchCode}
        className={EmployeeDetailsCSS.inputField}
        readOnly
      />
  
  </div>











            </>
          )}
        </div>


        
      </div>








    </div>







 







  );
};

export default EmployeeDetails;
