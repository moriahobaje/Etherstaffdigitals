import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupAgent = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessregistrationnumber, setbusinessregistrationnumber] = useState('');
  const [alsoknownas, setalsoknownas] = useState('');
  const [officeaddress, setofficeaddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postcode, setpostcode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Agent');
  const [profilePicture, setprofilePicture] = useState('Agent');
  const [statusagent, setstatusagent] = useState('Agent');
  const [loading, setLoading] = useState(false);

  const styles = {
    borderRadius: '50%',
    position: 'relative',
    height: '117px',
    width: '117px',
    overflow: 'hidden',
  };


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setRole('Agent');
    setstatusagent('Active');
    setprofilePicture();
    const formData = {
      businessName,
      businessregistrationnumber,
      alsoknownas,
      officeaddress,
      phoneNumber,
      postcode,
      password,
      role,
      profilePicture,
      statusagent
    };

    // const today = new Date();
    // const birthDate = new Date(postcode);
    // let age = today.getFullYear() - birthDate.getFullYear();
    // const monthDifference = today.getMonth() - birthDate.getMonth();

    // if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    //   age--;
    // }

    if (businessName === "") {
      toast.error("Please Enter Business Name");
      setLoading(false);
      return;
    }
    if (businessregistrationnumber === "") {
      toast.error("Please Enter Business Registration Number");
      setLoading(false);
      return;
    }
    if (officeaddress === "") {
      toast.error("Please Enter Office Address");
      setLoading(false);
      return;
    }
    if (phoneNumber === "") {
      toast.error("Please Enter Phone Number");
      setLoading(false);
      return;
    }
    if (postcode === "") {
      toast.error("Please Enter Date of Birth");
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
      const saveResponse = await fetch('http://localhost:5000/saveUserDataagent', {
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

                    <h5 className="card-title text-center pb-0 fs-4">Agency Basic Information</h5>
                    <p className="text-center small">Enter your details to create an account</p>

                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                      <div className="col-md-6">
                        <label htmlFor="businessName" className="form-label">Business Name</label>
                        <input type="text" className="form-control" id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="businessregistrationnumber" className="form-label">Business Registration Number</label>
                        <input type="text" className="form-control" id="businessregistrationnumber" value={businessregistrationnumber} onChange={(e) => setbusinessregistrationnumber(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="alsoknownas" className="form-label">Also Known As</label>
                        <input type="text" className="form-control" id="alsoknownas" value={alsoknownas} onChange={(e) => setalsoknownas(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </div>
                      <div className='row'>
                        <div className="col-md-6">
                          <label htmlFor="officeaddress" className="form-label">Office Address</label>
                          <input type="text" className="form-control" id="officeaddress" value={officeaddress} onChange={(e) => setofficeaddress(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="postcode" className="form-label">Agency Post Code</label>
                          <input type="text" className="form-control" id="postcode" value={postcode} onChange={(e) => setpostcode(e.target.value)} />
                        </div>
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
                      <div className="col-12">
                        <button type="submit" className="col-lg-4 col-sm-12 mt-4 btn btn-primary w-100" disabled={loading}>
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

export default SignupAgent;
