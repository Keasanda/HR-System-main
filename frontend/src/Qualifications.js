
import React, { useState, useEffect } from "react";
import axios from "axios";
import QualificationsCSS from "./Qualifications.module.css";

const Qualifications = () => {
  const [qualificationType, setQualificationType] = useState(localStorage.getItem('qualificationType') || '');
  const [yearCompleted, setYearCompleted] = useState(localStorage.getItem('yearCompleted') || '');
  const [institution, setInstitution] = useState(localStorage.getItem('institution') || '');

  useEffect(() => {
    localStorage.setItem('qualificationType', qualificationType);
    localStorage.setItem('yearCompleted', yearCompleted);
    localStorage.setItem('institution', institution);
  }, [qualificationType, yearCompleted, institution]);

  const handleSubmit = async () => {
    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    const completeFormData = {
      employeeDto: {
        ...formData,
        qualificationType,
        yearCompleted: new Date(yearCompleted).toISOString(), 
        institution,
      },
    };
  
    try {
      await axios.post("http://localhost:5239/api/employee", completeFormData);
      alert("All data submitted successfully!");
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response && error.response.data) {
        console.error("Validation errors:", error.response.data.errors);
      }
    }
  };
  
  

  return (
    <div className={QualificationsCSS.container}>
      <h2>Qualifications</h2>

      <form >
       
        <input
          type="text"
          placeholder="Qualification Type"
          value={qualificationType}
          onChange={(e) => setQualificationType(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Year Completed"
          value={yearCompleted}
          onChange={(e) => setYearCompleted(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />
       
      </form>
    </div>
  );
};

export default Qualifications;
