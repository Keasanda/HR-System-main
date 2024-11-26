import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const JobTitle = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leaveDays, setLeaveDays] = useState({ annualLeave: 0, sickLeave: 0 });
  const [formData, setFormData] = useState({
    maritalStatus: "",
    contractType: "",
  });

  const leavePolicies = {
    juniorToMidLevel: { annualLeave: 15, sickLeave: 5 },
    midLevelToSenior: { annualLeave: 20, sickLeave: 10 },
    cLevelOrExecutive: { annualLeave: 30, sickLeave: 10 },
  };

  const getLeaveDays = (grade) => {
    switch (grade) {
      case "Junior to mid-level":
        return leavePolicies.juniorToMidLevel;
      case "Mid-level to Senior Level":
        return leavePolicies.midLevelToSenior;
      case "C-Level or Executive Level":
        return leavePolicies.cLevelOrExecutive;
      default:
        return { annualLeave: 0, sickLeave: 0 };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = [];

    // Validation logic (if any)

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setErrorMessages(errors);
      return;
    }

    setErrorMessages([]);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "contractType") {
      const leave = getLeaveDays(value);
      setLeaveDays(leave);
    }
  };

  return (
    <div className=" ">
      <Sidebar />
      <div className="container my-5" style={{ marginLeft: "20%" }}>
        <h2 className="mb-4">Job Information</h2>
        <form onSubmit={handleSubmit}>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <div className="mb-4">
            <label htmlFor="maritalStatus" className="form-label">
              Job Title
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Job Title</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Software Tester">Software Tester</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="UI/UX Developer">UI/UX Developer</option>
              <option value="Admin/HR">Admin/HR</option>
              <option value="CEO">CEO (Chief Executive Officer)</option>
              <option value="COO">COO (Chief Operating Officer)</option>
              <option value="CFO">CFO (Chief Financial Officer)</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="contractType" className="form-label">
              Job Grade
            </label>
            <select
              name="contractType"
              value={formData.contractType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Job Grade</option>
              <option value="C-Level or Executive Level">
                C-Level or Executive Level
              </option>
              <option value="Mid-level to Senior Level">
                Mid-level to Senior Level (Grade 6–8)
              </option>
              <option value="Junior to mid-level">
                Junior to mid-level (Grade 3–5)
              </option>
            </select>
          </div>

          {leaveDays.annualLeave > 0 && (
            <div className="mb-3">
              <span className="fw-bold">Annual Leave:</span> {leaveDays.annualLeave} days
              <span className="ms-3 fw-bold">Sick Leave:</span> {leaveDays.sickLeave} days
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobTitle;
