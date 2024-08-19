import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNumber: '',
        emailAddress: '',
        dateOfBirth: '',
        maritalStatus: '',
        nationality: '',
        addressType: '',
        streetNumber: '',
        streetName: '',
        landmark: '',
        country: '',
        cityProvince: '',
        postalCode: '',
        jobFunctionCategory: '',
        documents: [],
        preferredOccupationSector: '',
        preferredHospital: '',
        yearsOfExperience: '',
        workMode: '',
        nmcPin: '',
        documentType: '',
        documentIssuanceDate: '',
        documentStatus: 'Pending approval',
        licenseId: '',
        documentExpiryDate: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDocumentUpload = (event) => {
        const files = event.target.files;
        // Handle file upload logic here, if needed
        console.log(files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <main className="main">
            {/* Page Title */}
            <div className="page-title" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.jpg)' }}>
                <div className="container position-relative">
                    <h1>Sign Up</h1>
                    <p>Enter your details to sign up.</p>
                </div>
            </div>
            {/* End Page Title */}

            {/* Signup Section */}
            <section id="signup" className="signup section">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <form onSubmit={handleSubmit} className="php-email-form card p-3" data-aos="fade-up" data-aos-delay="200">
                                <div className="row gy-4">
                                    {/* Basic Details */}
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="tel" className="form-control" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" name="emailAddress" placeholder="Email Address" value={formData.emailAddress} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" className="form-control" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="maritalStatus" placeholder="Marital Status" value={formData.maritalStatus} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleInputChange} required />
                                    </div>
                                    {/* Address Details */}
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="addressType" placeholder="Address Type" value={formData.addressType} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="streetNumber" placeholder="Street Number" value={formData.streetNumber} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="streetName" placeholder="Street Name" value={formData.streetName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="cityProvince" placeholder="City/Province" value={formData.cityProvince} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} />
                                    </div>
                                    {/* Job Details */}
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="jobFunctionCategory" placeholder="Job Function Category" value={formData.jobFunctionCategory} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="preferredOccupationSector" placeholder="Preferred Occupation Sector" value={formData.preferredOccupationSector} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="preferredHospital" placeholder="Preferred Hospital" value={formData.preferredHospital} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" className="form-control" name="yearsOfExperience" placeholder="Years of Experience" value={formData.yearsOfExperience} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <select className="form-control" name="workMode" value={formData.workMode} onChange={handleInputChange} required>
                                            <option value="">Select Work Mode</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="nmcPin" placeholder="NMC PIN" value={formData.nmcPin} onChange={handleInputChange} />
                                    </div>
                                    {/* Document Details */}
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="documentType" placeholder="Document Type" value={formData.documentType} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" className="form-control" name="documentIssuanceDate" placeholder="Document Issuance Date" value={formData.documentIssuanceDate} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="documentStatus" placeholder="Document Status" value={formData.documentStatus} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="licenseId" placeholder="License ID" value={formData.licenseId} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" className="form-control" name="documentExpiryDate" placeholder="Document Expiry Date" value={formData.documentExpiryDate} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="file" className="form-control" name="documents" multiple onChange={handleDocumentUpload} />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className='btn btn-success'>Sign Up</button>
                                        <Link to="/login" className='btn btn-getstarted'>Already have an account? Log In</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Signup Section */}
        </main>
    );
};

export default SignUpPage;
