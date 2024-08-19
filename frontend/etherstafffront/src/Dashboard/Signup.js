import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Worker');
  const [loading, setLoading] = useState(false);

  const styles = {
    borderRadius: '50%',
    position: 'relative',
    height: '117px',
    width: '117px',
    overflow: 'hidden',
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
    "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const genders = ["Male", "Female", "Non-binary", "Genderqueer", "Genderfluid", "Agender", "Pangender", "Bigender", "Two-spirit", "Other"];


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setRole('Worker');
    const formData = {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      address,
      dob,
      nationality,
      gender,
      password,
      role,
    };

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (firstName === "") {
      toast.error("Please Enter First Name");
      setLoading(false);
      return;
    }
    if (middleName === "") {
      toast.error("Please Enter Middle Name");
      setLoading(false);
      return;
    }
    if (lastName === "") {
      toast.error("Please Enter Last Name");
      setLoading(false);
      return;
    }
    if (email === "") {
      toast.error("Please Enter Email");
      setLoading(false);
      return;
    }
    if (phoneNumber === "") {
      toast.error("Please Enter Phone Number");
      setLoading(false);
      return;
    }
    if (address === "") {
      toast.error("Please Enter Address Information");
      setLoading(false);
      return;
    }
    if (dob === "") {
      toast.error("Please Enter Date of Birth");
      setLoading(false);
      return;
    }
    if (nationality === "") {
      toast.error("Please Enter Nationality");
      setLoading(false);
      return;
    }
    if (gender === "") {
      toast.error("Please Enter Gender");
      setLoading(false);
      return;
    }
    if (age < 18) {
      toast.error("You must be at least 18 years old");
      setLoading(false);
      return;
    }
    if (password === "") {
      toast.error("Please Enter Password");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const saveResponse = await fetch('http://localhost:5000/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save user data');
      }

      const result = await saveResponse.json();

      console.log(result);
      toast.success('User data saved successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error saving user data:', error);
      toast.error('Error saving user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <ToastContainer />
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-md-10 d-flex flex-column align-items-center justify-content-center">
                <br />
                <br />

                <div className="d-flex justify-content-center py-4">
                  <a href="/" className="logo d-flex align-items-center w-auto"><img src="assets/img/logo.png" alt="" className='text-center img-fluid' style={styles} /></a>
                </div>
                <br />
                <div className="card mb-3">
                  <div className="card-body">

                    <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    <p className="text-center small">Enter your details to create an account</p>

                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                      <div className="col-md-4">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="address" className="form-label">Contact/Home Address</label>
                        <textarea className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} ></textarea>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} min="1899-01-01" max="today" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="nationality" className="form-label">Nationality</label>
                        <select
                          className="form-control"
                          id="nationality"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          <option value="">Select Nationality</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select
                          className="form-control"
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          {genders.map((genderOption) => (
                            <option key={genderOption} value={genderOption}>
                              {genderOption}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='row'>
                        <div className="col-md-6">
                          <label htmlFor="password" className="form-label">New Password</label>
                          <input type="password" className="form-control" required={true} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                          <input type="password" className="form-control" required={true} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-12 mt-4">
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                          {loading && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          )}
                          Create Account
                        </button>
                        <p className="small mb-0 p-3">Already have an account? <a href="/login">Login here</a></p>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupForm;
