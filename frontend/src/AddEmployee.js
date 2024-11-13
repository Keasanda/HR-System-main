import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import styles from "./AddEmployee.module.css";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";




const AddEmployee = () => {

  const [imageSelected, setImageSelected] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    // Retrieve data from local storage on component mount
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : {
      name: "",
      surname: "",
      email: "",
      identityNumber: "",
      passportNumber: "",
      dateOfBirth: "",
      gender: "",
      taxNumber: "",
      maritalStatus: "",
      physicalAddress: "",
      postalAddress: "",
      salary: "",
      contractType: "",
      startDate: "",
      endDate: "",
      url: "",
      passwordHash: "",

   
    };
  });

  const handleNext = () => {
    localStorage.setItem("formData", JSON.stringify(formData)); // Store data in LocalStorage
    navigate('/add-banking-detail', { state: { formData } }); // Previous approach (optional)
  };


  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const errors = {};
  
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.surname) errors.surname = "Surname is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.identityNumber)
      errors.identityNumber = "Identity Number is required.";
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
    
      const errors = {};
    
      if (!formData.name) errors.name = "Name is required.";
      if (!formData.surname) errors.surname = "Surname is required.";
      if (!formData.email) errors.email = "Email is required.";
      if (!formData.identityNumber)
        errors.identityNumber = "Identity Number is required.";
      if (!formData.passportNumber)
        errors.passportNumber = "Passport Number is required.";
      if (!formData.taxNumber) {
        errors.taxNumber = "Tax Number is required.";
      } else if (formData.taxNumber.length !== 10) {
        errors.taxNumber = "Tax Number must be exactly 10 digits long.";
      }
      if (!formData.salary) errors.salary = "Salary is required.";
      if (!formData.contractType)
        errors.contractType = "Employment Status is required.";
      if (!formData.startDate) errors.startDate = "Start Date is required.";
      if (!formData.physicalAddress)
        errors.physicalAddress = "Physical Address is required.";
      if (!formData.postalAddress)
        errors.postalAddress = "Postal Address is required.";
      if (!formData.passwordHash) errors.passwordHash = "Password is required.";
    
      if (Object.keys(errors).length > 0) {
        setLoading(false);
        setErrorMessages(errors);
        return;
      }
    
      setErrorMessages([]);
    
      // Prepare form data to send, excluding `endDate` if it’s empty
      const dataToSend = { ...formData };
      if (!dataToSend.endDate) {
        delete dataToSend.endDate;
      }
    
      // Send request based on whether imageSelected is provided
      if (imageSelected) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageSelected);
        uploadFormData.append("upload_preset", "wywylbfz");
    
        axios
          .post("https://api.cloudinary.com/v1_1/drgxphf5l/image/upload", uploadFormData)
          .then((response) => {
            const imageUrl = response.data.secure_url;
    
            return axios.post("http://localhost:5239/api/employee", {
              ...dataToSend,
              url: imageUrl,
            });
          })
          .then((response) => {
            console.log("Data successfully sent to backend:", response.data);
            setImageUrls((prev) => [...prev, formData.url]);
            setLoading(false);
            setSuccessMessage("Employee added successfully!");
            resetForm();
          })
          .catch((error) => handleError(error));
      } else {
        axios
          .post("http://localhost:5239/api/employee", dataToSend)
          .then((response) => {
            console.log("Data successfully sent to backend:", response.data);
            setLoading(false);
            setSuccessMessage("Employee added successfully!");
            resetForm();
          })
          .catch((error) => handleError(error));
      }
    };
    
    // Helper function to reset the form fields
    const resetForm = () => {
      setFormData({
        name: "",
        surname: "",
        email: "",
        identityNumber: "",
        passportNumber: "",
        dateOfBirth: "",
        gender: "",
        taxNumber: "",
        maritalStatus: "",
        physicalAddress: "",
        postalAddress: "",
        salary: "",
        contractType: "",
        startDate: "",
        endDate: "",
        url: "",
        passwordHash: "",


        bankName : "",
        accountType : "",
        accountNumber : "" ,
        branchCode : "" ,
  
        qualificationType : "" ,
  
        yearCompleted : "" ,
  
        institution : ""


      });
    };
    
    // Helper function to handle errors
    const handleError = (error) => {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        setErrorMessages([error.response.data]);
      } else {
        console.error("Error sending data:", error);
        setErrorMessages(["An unexpected error occurred."]);
      }
    };
    
    if (!formData.taxNumber) {
      errors.taxNumber = "Tax Number is required.";
    } else if (formData.taxNumber.length !== 10) {
      errors.taxNumber = "Tax Number must be exactly 10 digits long.";
    }
    if (!formData.salary) errors.salary = "Salary is required.";
    if (!formData.contractType)
      errors.contractType = "Employment Status is required.";
    if (!formData.startDate) errors.startDate = "Start Date is required.";
    if (!formData.physicalAddress)
      errors.physicalAddress = "Physical Address is required.";
    if (!formData.postalAddress)
      errors.postalAddress = "Postal Address is required.";
    if (!formData.passwordHash) errors.passwordHash = "Password is required.";
  
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setErrorMessages(errors);
      return;
    }
  
    setErrorMessages([]);
  
    // Prepare form data to send, excluding `endDate` if it’s empty
    const dataToSend = { ...formData };
    if (!dataToSend.endDate) {
      delete dataToSend.endDate;
    }
  
    // Send request based on whether imageSelected is provided
    if (imageSelected) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageSelected);
      uploadFormData.append("upload_preset", "wywylbfz");
  
      axios
        .post("https://api.cloudinary.com/v1_1/drgxphf5l/image/upload", uploadFormData)
        .then((response) => {
          const imageUrl = response.data.secure_url;
  
          return axios.post("http://localhost:5239/api/employee", {
            ...dataToSend,
            url: imageUrl,
          });
        })
        .then((response) => {
          console.log("Data successfully sent to backend:", response.data);
          setImageUrls((prev) => [...prev, formData.url]);
          setLoading(false);
          setSuccessMessage("Employee added successfully!");
          resetForm();
        })
        .catch((error) => handleError(error));
    } else {
      axios
        .post("http://localhost:5239/api/employee", dataToSend)
        .then((response) => {
          console.log("Data successfully sent to backend:", response.data);
          setLoading(false);
          setSuccessMessage("Employee added successfully!");
          resetForm();
        })
        .catch((error) => handleError(error));
    }
  };
  
  // Helper function to reset the form fields
  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      email: "",
      identityNumber: "",
      passportNumber: "",
      dateOfBirth: "",
      gender: "",
      taxNumber: "",
      maritalStatus: "",
      physicalAddress: "",
      postalAddress: "",
      salary: "",
      contractType: "",
      startDate: "",
      endDate: "",
      url: "",
      passwordHash: "",


      bankName : "",
      accountType : "",
      accountNumber : "" ,
      branchCode : "" ,

      qualificationType : "" ,

      yearCompleted : "" ,

      institution : ""

    });
  };
  
  // Helper function to handle errors
  const handleError = (error) => {
    setLoading(false);
    if (error.response && error.response.status === 409) {
      setErrorMessages([error.response.data]);
    } else {
      console.error("Error sending data:", error);
      setErrorMessages(["An unexpected error occurred."]);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "identityNumber" && value.length === 13) {
      const year = parseInt(value.substring(0, 2), 10);
      const month = parseInt(value.substring(2, 4), 10);
      const day = parseInt(value.substring(4, 6), 10);
      const genderCode = parseInt(value.substring(6, 10), 10);

      const currentYear = new Date().getFullYear() % 100;
      const fullYear = year <= currentYear ? 2000 + year : 1900 + year;

      const dateOfBirth = `${fullYear}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      const gender = genderCode < 5000 ? "Female" : "Male";

      setFormData({
        ...formData,
        identityNumber: value,
        dateOfBirth,
        gender,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (




    <div className={styles.parentContainer}>
      <div className={styles.leftSide}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
       {/* Freely positioned title container */}
  <div className={styles.titleContainer}>
    <h2 className={styles.pageTitle}>Employee Form</h2>
  </div>

  <div className={styles.box}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Success message */}
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}

  {/* Error messages */}
  {errorMessages.length > 0 && (
    <div className={styles.errorMessage}>
      {errorMessages.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  )}




          {/* Row 1: Name & Surname */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              {errorMessages.name && (
                <div className={styles.errorMessage}>{errorMessages.name}</div>
              )}{" "}
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="surname" className={styles.label}>
                Surname
              </label>
              {errorMessages.surname && (
                <div className={styles.errorMessage}>
                  {errorMessages.surname}
                </div>
              )}{" "}
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 2: Email & Identity Number */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              {errorMessages.email && (
                <div className={styles.errorMessage}>{errorMessages.email}</div>
              )}{" "}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
            <label htmlFor="identityNumber" className={styles.label}>
              Identity Number
            </label>
            <input
              type="text"
              name="identityNumber"
              id="identityNumber"
              placeholder="Identity Number"
              value={formData.identityNumber}
              onChange={handleInputChange}
              className={styles.inputField}
              disabled={formData.passportNumber !== ""}
            />
          </div>
          </div>

          {/* Row 3: Passport Number & Date of Birth */}
          <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="passportNumber" className={styles.label}>
              Passport Number
            </label>
            <input
              type="text"
              name="passportNumber"
              placeholder="Passport Number"
              value={formData.passportNumber}
              onChange={handleInputChange}
              className={styles.inputField}
              disabled={formData.identityNumber !== ""}
            />
          </div>
        

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Date Of Birth
              </label>
              {errorMessages.dateOfBirth && (
                <div className={styles.errorMessage}>
                  {errorMessages.dateOfBirth}
                </div>
              )}{" "}
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={styles.inputField}
                readOnly
              />
            </div>
          </div>

          {/* Row 4: Gender & Tax Number */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Gender
              </label>
              {errorMessages.gender && (
                <div className={styles.errorMessage}>
                  {errorMessages.gender}
                </div>
              )}{" "}
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="maritalStatus" className={styles.label}>
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className={styles.inputField}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widow">Widow</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
          </div>

          {/* Row 5: Marital Status & Salary */}
          <div className={styles.formRow}>
          <div className={styles.inputGroup}>
  <label htmlFor="name" className={styles.label}>
    Employment Status
  </label>
  {errorMessages.contractType && (
    <div className={styles.errorMessage}>
      {errorMessages.contractType}
    </div>
  )}
  <select
    name="contractType"
    value={formData.contractType}
    onChange={handleInputChange}
    className={styles.inputField}
  >
    <option value="">Select Employment Status</option>
    <option value="Permanent">Permanent</option>
    <option value="Temporal">Temporal</option>
  </select>
</div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Tax Number
              </label>
              {errorMessages.taxNumber && (
                <div className={styles.errorMessage}>
                  {errorMessages.taxNumber}
                </div>
              )}{" "}
              <input
                type="text"
                name="taxNumber"
                placeholder="Tax Number"
                value={formData.taxNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 6: Contract Type & Start Date */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Start Date
              </label>
              {errorMessages.startDate && (
                <div className={styles.errorMessage}>
                  {errorMessages.startDate}
                </div>
              )}{" "}
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
  <label htmlFor="endDate" className={styles.label}>
    End Date
  </label>
  {errorMessages.endDate && (
    <div className={styles.errorMessage}>
      {errorMessages.endDate}
    </div>
  )}
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleInputChange}
    className={styles.inputField}
    disabled={formData.contractType === 'Permanent'} // Disable when "Permanent" is selected
  />
</div>
          </div>

          {/* Address Rows: Physical and Postal */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="physicalAddress" className={styles.label}>
                Physical Address
              </label>
              {errorMessages.physicalAddress && (
                <div className={styles.errorMessage}>
                  {errorMessages.physicalAddress}
                </div>
              )}
              <input
                type="text"
                name="physicalAddress"
                placeholder="Physical Address"
                value={formData.physicalAddress}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="postalAddress" className={styles.label}>
                Postal Address
              </label>
              {errorMessages.postalAddress && (
                <div className={styles.errorMessage}>
                  {errorMessages.postalAddress}
                </div>
              )}
              <input
                type="text"
                name="postalAddress"
                placeholder="Postal Address"
                value={formData.postalAddress}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>
          {/* Salary and Password Fields */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="salary" className={styles.label}>
                Salary
              </label>
              {errorMessages.salary && (
                <div className={styles.errorMessage}>
                  {errorMessages.salary}
                </div>
              )}
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="passwordHash" className={styles.label}>
                Password
              </label>
              {errorMessages.passwordHash && (
                <div className={styles.errorMessage}>
                  {errorMessages.passwordHash}
                </div>
              )}
              <input
                type="password"
                name="passwordHash"
                placeholder="Password"
                value={formData.passwordHash}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* File upload */}
          <div className={styles.uploadContainer}>
            <label htmlFor="fileUpload" className={styles.customFileUpload}>
              <FontAwesomeIcon icon={faCloudUploadAlt} />
              <span>Upload Image</span>
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={(event) => setImageSelected(event.target.files[0])}
              className={styles.fileInput}
            />
          </div>

         
  <button type="submit" className={styles.submitButton} disabled={loading}>
    {loading ? "Submitting..." : "Save"}
  </button>



 {/* existing form code... */}
 <button onClick={handleNext} className={styles.nextButton}>
        Next
      </button>




</form>

        {/* Display uploaded images */}
        <div className={styles.imageContainer}>
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              className={styles.uploadedImage}
              cloudName="drgxphf5l"
              publicId={url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default AddEmployee;