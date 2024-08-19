import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useMobileNavToggle from './useMobileNavToggledash';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Accordion } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Collapsible from 'react-collapsible';

const Profile = () => {
    useMobileNavToggle();
    const loggedInUser = useSelector(state => state.user.user);


    const Arrow = ({ isOpen }) => (
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
    );

    const [activeTab, setActiveTab] = useState('profiletab');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [worker_verified, setWorkerVerified] = useState('');

    const [show, setShow] = useState(false);
    const [passportNumber, setPassportNumber] = useState('');
    const [issuedCountry, setIssuedCountry] = useState('');
    const [visaType, setVisaType] = useState('');
    const [maxWeeklyHours, setMaxWeeklyHours] = useState('');
    const [cosCompanyName, setCosCompanyName] = useState('');
    const [nationalInsuranceNumber, setNationalInsuranceNumber] = useState('');
    const [shareCode, setShareCode] = useState('');
    const [dbsCertificateNumber, setDBSCertificateNumber] = useState('');
    const [conviction, setConviction] = useState('');

    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const [addressFrom, setAddressFrom] = useState('');
    const [duration, setDuration] = useState('');
    const [proofOfAddress, setProofOfAddress] = useState(null);
    const [proofOfAddressUrl, setProofOfAddressUrl] = useState(null);

    const [profilepicture, setProfilepicture] = useState(null);
    const [email, setemail] = useState(null);
    const [fullname, setfullname] = useState(null);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleShow = async () => {
        setShow(true);
        if (workerId) {
            try {
                const response = await axios.get(`http://localhost:5000/fetchfullinformation/${workerId}`);
                const data = response.data[0];

                if (data) {
                    // console.log(data);

                    setemail(data.email);
                    const fullName = [data.first_name, data.middle_name, data.last_name].filter(Boolean).join(' ');
                    setfullname(fullName)
                    setCountry(data.country);
                    setPostCode(data.postcode);
                    setResidentialAddress(data.residential_address);
                    setAddressFrom(formatDateyyyy_mm_dd(data.start_date_living));

                    const profilePictureUrl = data.profile_picture ? `http://localhost:5000/${data.profile_picture}` : 'Dashboard/assets/img/profile-img.jpg';
                    setProfilepicture(profilePictureUrl);
                    const startDateLiving = new Date(data.start_date_living);
                    const currentDate = new Date();
                    const diffTime = Math.abs(currentDate - startDateLiving);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const years = Math.floor(diffDays / 365);
                    const months = Math.floor((diffDays % 365) / 30);
                    const days = diffDays % 30;
                    setDuration(`${years} years ${months} months ${days} days`);
                    setProofOfAddress(data.proof_of_address);
                    setProofOfAddressUrl(data.proof_of_address_file);
                    setWorkerType(data.worker_type);
                    setSkills(data.skills);
                    setEmploymentType(data.employment_type);
                    setPayrollReferenceNumber(data.payroll_reference_number);
                    setUmbrellaCompanyName(data.umbrella_company_name);
                    setPassportNumber(data.passport_number);
                    setIssuedCountry(data.country_issued);
                    setVisaType(data.visa_type);
                    setMaxWeeklyHours(data.minimum_weekly_hours);
                    setCosCompanyName(data.company_name_for_cos);
                    setNationalInsuranceNumber(data.national_insurance_number);
                    setShareCode(data.share_code);
                    setDBSCertificateNumber(data.dbs_certificate_number);
                    setConviction(data.convicted);
                    setPreferredTravelDistance(data.preferred_travel_distance);
                    setHasDrivingLicence(data.has_driving_license);
                    setDrivingLicenceFile(data.driving_licence_file);
                    setWorkerVerified(data.worker_verified);
                }
            } catch (error) {
                console.error('Error fetching worker information:', error);
            }
        }
    };

    const styles = {
        cardHeader: {
            backgroundColor: '#f1f1f1',
            padding: '10px',
            color: 'black',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #ddd',
            marginBottom: '5px',
            borderRadius: '15px',
        },
        cardcontent: {
            backgroundColor: '#fff',
            color: 'black',
            padding: '5px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #ddd',
            marginBottom: '5px',
            fontSize: '14px'
        },
        collapsibleContent: {
            backgroundColor: 'lightgray',
            padding: '10px',
            border: '1px solid #ddd',
            borderTop: 'none',
        }
    };

    const [formData, setFormData] = useState({
        firstName: loggedInUser.first_name,
        middleName: loggedInUser.middle_name,
        lastName: loggedInUser.last_name,
        phoneNumber: loggedInUser.phone_number,
        email: loggedInUser.email,
        address: loggedInUser.address,
        dob: loggedInUser.dob,
        role: loggedInUser.role,
        nationality: loggedInUser.nationality,
        gender: loggedInUser.gender
    });



    // console.log(profilepicture);

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

    const workerTypes = [
        "Care Worker",
        "Healthcare Assistant",
        "Occupational Therapist",
        "Pharmacist",
        "Registered General Nurse",
        "Registered Mental Health Nurse",
        "Rehabilitation Worker",
        "Residential Support Worker",
        "Senior Care Assistant",
        "Senior Support Worker",
        "Social Worker",
        "Support Worker"
    ];

    const handleAddressFromChange = (e) => {
        const fromDate = new Date(e.target.value);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;
        setDuration(`${years} years ${months} months ${days} days`);
        setAddressFrom(e.target.value);
    };

    const handleFileUpload = (e) => {
        setProofOfAddress(e.target.files[0]);
    };

    const handleFileUploadprofile = (e) => {
        setProfilepicture(e.target.files[0]);
    }

    const handleSubmitResidentialAddress = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('country', country);
        formData.append('postCode', postCode);
        formData.append('residentialAddress', residentialAddress);
        formData.append('addressFrom', addressFrom);
        formData.append('proofOfAddressFile', proofOfAddress);

        try {
            const response = await axios.put(`http://localhost:5000/updateResidentialAddress/${loggedInUser.id}`, formData);
            console.log('Residential address updated successfully:', response.data);
            toast.success('Residential address updated successfully');
        } catch (error) {
            console.error('Error updating residential address:', error);
            toast.error('Error updating residential address');
        }
    };

    const handleWorkerTypeChange = (e) => {
        setWorkerType(e.target.value);
    };


    // Employment Information State
    const [workerType, setWorkerType] = useState('');
    const [workerId, setWorkerId] = useState('');
    const [skills, setSkills] = useState([]);
    const [employmentType, setEmploymentType] = useState('');
    const [payrollReferenceNumber, setPayrollReferenceNumber] = useState('');
    const [umbrellaCompanyName, setUmbrellaCompanyName] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [passportFile, setPassportFile] = useState(null);
    const [visaFile, setVisaFile] = useState(null);
    const [dbsFile, setDBSFile] = useState(null);
    const [nifFile, setNIFFile] = useState(null);

    const handleCvFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handlepassportFileChange = (e) => {
        setPassportFile(e.target.files[0]);
    };
    const handlevisaFileChange = (e) => {
        setVisaFile(e.target.files[0]);
    };

    const handlenifFileChange = (e) => {
        setNIFFile(e.target.files[0]);
    };
    const handledbfFileChange = (e) => {
        setDBSFile(e.target.files[0]);
    };

    const handleSkillsChange = (e) => {
        const selectedSkills = Array.from(e.target.selectedOptions, option => option.value);
        setSkills(selectedSkills);
    };

    const handleEmploymentTypeChange = (e) => {
        setEmploymentType(e.target.value);
    };

    // Handle form submission
    const handleSubmitEmploymentInformation = async (e) => {
        e.preventDefault();

        const employmentData = new FormData();
        employmentData.append('workerType', workerType);
        employmentData.append('skills', JSON.stringify(skills));
        employmentData.append('employmentType', employmentType);
        employmentData.append('payrollReferenceNumber', payrollReferenceNumber);
        employmentData.append('umbrellaCompanyName', umbrellaCompanyName);
        if (cvFile) {
            employmentData.append('cvFile', cvFile);
        }

        try {
            const response = await axios.put(`http://localhost:5000/updateEmploymentInformation/${loggedInUser.id}`, employmentData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Employment information updated successfully:', response.data);
            toast.success('Employment information updated successfully');
        } catch (error) {
            console.error('Error updating employment information:', error);
            toast.error('Error updating employment information');
        }
    };



    // Handle form submission
    const handleSubmitPassportVisaDBSInfo = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('passportNumber', passportNumber);
        formData.append('issuedCountry', issuedCountry);
        formData.append('visaType', visaType);
        formData.append('maxWeeklyHours', maxWeeklyHours);
        formData.append('cosCompanyName', cosCompanyName);
        formData.append('nationalInsuranceNumber', nationalInsuranceNumber);
        formData.append('shareCode', shareCode);
        formData.append('dbsCertificateNumber', dbsCertificateNumber);
        formData.append('conviction', conviction);

        // Append files
        if (document.getElementById('passportdocument').files[0]) {
            formData.append('passportFile', document.getElementById('passportdocument').files[0]);
        }
        if (document.getElementById('visadocument').files[0]) {
            formData.append('visaFile', document.getElementById('visadocument').files[0]);
        }
        if (document.getElementById('nationalinsurancedocument').files[0]) {
            formData.append('nationalInsuranceFile', document.getElementById('nationalinsurancedocument').files[0]);
        }
        if (document.getElementById('dbsdocument').files[0]) {
            formData.append('dbsFile', document.getElementById('dbsdocument').files[0]);
        }

        try {
            const response = await axios.put(`http://localhost:5000/updatePassportVisaDBSInfo/${loggedInUser.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Passport, Visa & DBS information updated successfully:', response.data);
            toast.success('Passport, Visa & DBS information updated successfully');
        } catch (error) {
            console.error('Error updating Passport, Visa & DBS information:', error);
            toast.error('Error updating Passport, Visa & DBS information');
        }
    };


    // Handle input changes
    const handlePassportNumberChange = (e) => {
        setPassportNumber(e.target.value);
    };

    const handleIssuedCountryChange = (e) => {
        setIssuedCountry(e.target.value);
    };

    const handleVisaTypeChange = (e) => {
        setVisaType(e.target.value);
    };

    const handleMaxWeeklyHoursChange = (e) => {
        setMaxWeeklyHours(e.target.value);
    };

    const handleCosCompanyNameChange = (e) => {
        setCosCompanyName(e.target.value);
    };

    const handleNationalInsuranceNumberChange = (e) => {
        setNationalInsuranceNumber(e.target.value);
    };

    const handleShareCodeChange = (e) => {
        setShareCode(e.target.value);
    };

    const handleDBSCertificateNumberChange = (e) => {
        setDBSCertificateNumber(e.target.value);
    };

    const handleConvictionChange = (e) => {
        setConviction(e.target.value);
    };

    const [preferredTravelDistance, setPreferredTravelDistance] = useState('');
    // const [hasDrivingLicence, setHasDrivingLicence] = useState('');
    const [drivingLicenceFile, setDrivingLicenceFile] = useState(null);

    // Handle form submission
    const handleSubmitTravelOtherInfo = async (e) => {
        e.preventDefault();

        // const travelOtherInfoData = {
        //     preferredTravelDistance,
        //     hasDrivingLicence,
        //     drivingLicenceFile,
        // };

        const formData = new FormData();
        formData.append('preferredTravelDistance', preferredTravelDistance);
        formData.append('hasDrivingLicence', hasDrivingLicence);
        if (drivingLicenceFile) {
            formData.append('drivingLicenceFile', drivingLicenceFile);
        }

        try {
            const response = await axios.put(`http://localhost:5000/updateTravelOtherInfo/${loggedInUser.id}`, formData);
            console.log('Travel & Other information updated successfully:', response.data);
            toast.success('Travel & Other information updated successfully');
        } catch (error) {
            console.error('Error updating Travel & Other information:', error);
            toast.error('Error updating Travel & Other information');
        }
    };

    // Handle input changes
    const handlePreferredTravelDistanceChange = (e) => {
        setPreferredTravelDistance(e.target.value);
    };

    const [hasDrivingLicence, setHasDrivingLicence] = useState('');

    const handleDrivingLicenceChange = (e) => {
        setHasDrivingLicence(e.target.value);
    };

    const handleDrivingLicenceFileChange = (e) => {
        setDrivingLicenceFile(e.target.files[0]);
    };


    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        renewPassword: ''
    });

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, renewPassword } = passwordData;

        if (newPassword !== renewPassword) {
            toast.error('New passwords do not match');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/updateUserPassword/${loggedInUser.id}`, {
                currentPassword,
                newPassword
            });
            console.log('Password updated successfully:', response.data);
            toast.success('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Error updating password');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }
            if (profilepicture) {
                data.append('profilePicture', profilepicture);
            }
            const response = await axios.put(`http://localhost:5000/updateUserData/${loggedInUser.id}`, data);
            console.log('User data updated successfully:', response.data);
            toast.success('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Error updating user data');
        }
    };





    const headerStyle = {
        backgroundColor: '#3ec1d5',
        borderRadius: '10px',
        padding: '6px',
        fontSize: '20px',
        cursor: 'pointer',
    };
    const bodystyle = {
        backgroundColor: 'white',
        color: 'black',
        padding: '29px',
        fontSize: '18px',
    }


    const [contactName, setContactName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [primaryContactNumber, setPrimaryContactNumber] = useState('');
    const [secondaryContactNumber, setSecondaryContactNumber] = useState('');

    const [vaccinationName, setVaccinationName] = useState('');
    const [vaccinationDate, setVaccinationDate] = useState('');

    const handleSubmitcontactform = async (e) => {
        e.preventDefault();

        const emergencyContactData = {
            contactName,
            relationship,
            primaryContactNumber,
            secondaryContactNumber,
        };

        try {
            const response = await axios.post('http://localhost:5000/addEmergencyContact', emergencyContactData);
            console.log('Emergency contact added successfully:', response.data);
            toast.success('Emergency contact added successfully');
        } catch (error) {
            console.error('Error adding emergency contact:', error);
            toast.error('Error adding emergency contact');
        }
    };

    //select from worker information
    useEffect(() => {
        const fetchWorkerInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fetchworkerinformation/${loggedInUser.id}`);
                const response2 = await axios.get(`http://localhost:5000/fetchprofilepicture/${loggedInUser.id}`);
                const data = response.data[0];
                const data2 = response2.data[0];

                if (data) {
                    // setWorkerInfo(data);
                    // console.log(data);
                    setCountry(data.country);
                    setPostCode(data.postcode);
                    setCvFile(data.cv_file);
                    setPassportFile(data.passport_file);
                    setVisaFile(data.visa_file)
                    setNIFFile(data.national_insurance_file);
                    setDBSFile(data.dbs_file);
                    setResidentialAddress(data.residential_address);
                    setAddressFrom(formatDateyyyy_mm_dd(data.start_date_living));

                    const startDateLiving = new Date(data.start_date_living);

                    // Calculate duration
                    const currentDate = new Date();
                    const diffTime = Math.abs(currentDate - startDateLiving);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const years = Math.floor(diffDays / 365);
                    const months = Math.floor((diffDays % 365) / 30);
                    const days = diffDays % 30;
                    setDuration(`${years} years ${months} months ${days} days`);
                    setProofOfAddress(data.proof_of_address);
                    setProofOfAddressUrl(data.proof_of_address_file);
                    const profilePictureUrl = data2.profile_picture ? `http://localhost:5000/${data2.profile_picture}` : 'Dashboard/assets/img/profile-img.jpg';
                    setProfilepicture(profilePictureUrl);
                    // console.log(data.proof_of_address_file);
                    setWorkerType(data.worker_type);
                    setWorkerId(data.worker_id);
                    setSkills(data.skills);
                    setEmploymentType(data.employment_type);
                    setPayrollReferenceNumber(data.payroll_reference_number);
                    setUmbrellaCompanyName(data.umbrella_company_name);

                    setPassportNumber(data.passport_number);
                    setIssuedCountry(data.country_issued);
                    setVisaType(data.visa_type);
                    setMaxWeeklyHours(data.minimum_weekly_hours);
                    setCosCompanyName(data.company_name_for_cos);
                    setNationalInsuranceNumber(data.national_insurance_number);
                    setShareCode(data.share_code);
                    setDBSCertificateNumber(data.dbs_certificate_number);
                    setConviction(data.convicted);


                    setPreferredTravelDistance(data.preferred_travel_distance);
                    setHasDrivingLicence(data.has_driving_license);
                    setDrivingLicenceFile(data.driving_licence_file);

                    setWorkerVerified(data.worker_verified);


                }
            } catch (error) {
                console.error('Error fetching worker information:', error);
            }
        };

        if (loggedInUser && loggedInUser.id) {
            fetchWorkerInfo();
        }
    }, [loggedInUser]);

    const formatDateyyyy_mm_dd = (dateString) => {
        const parts = dateString.split('T'); // Split the date string by 'T'
        if (parts.length === 2) {
            const datePart = parts[0];
            const dateParts = datePart.split('-');
            if (dateParts.length === 3) {
                const year = dateParts[0];
                const month = dateParts[1];
                const day = dateParts[2];
                return `${year}-${month}-${day}`; // Return as yyyy-MM-dd
            } else {
                console.error('Invalid date format:', datePart);
                return '';
            }
        } else {
            console.error('Invalid ISO 8601 date format:', dateString);
            return '';
        }
    };

    return (
        <main id="main" className="main">
            <style>
                {`
          .arrow {
            transition: transform 0.3s ease;
          }

          .arrow.up {
            transform: rotate(180deg);
          }
        `}
            </style>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <b
                        className={`nav-link ${activeTab === 'profiletab' ? 'active' : ''}`}
                        onClick={() => handleTabClick('profiletab')}
                    >
                        Profile
                    </b>
                </li>
                <li className="nav-item">
                    <b
                        className={`nav-link ${activeTab === 'documentstab' ? 'active' : ''}`}
                        onClick={() => handleTabClick('documentstab')}
                    >
                        Documents
                    </b>
                </li>
                <li className="nav-item">
                    <b
                        className={`nav-link ${activeTab === 'certificatestab' ? 'active' : ''}`}
                        onClick={() => handleTabClick('certificatestab')}
                    >
                        Certificates
                    </b>
                </li>
                <li className="nav-item">
                    <b
                        className={`nav-link ${activeTab === 'emergencytab' ? 'active' : ''}`}
                        onClick={() => handleTabClick('emergencytab')}
                    >
                        Emergency
                    </b>
                </li>
                <li className="nav-item">
                    <b
                        className={`nav-link ${activeTab === 'vaccinationtab' ? 'active' : ''}`}
                        onClick={() => handleTabClick('vaccinationtab')}
                    >
                        Vaccinations
                    </b>
                </li>

            </ul>


            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'profiletab' ? 'active' : 'fade'}`} id="profiletab">
                    <div className="pagetitle m-3">
                        <h1>Profile</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </nav>
                    </div>
                    <section className="section profile">
                        <div className="row">
                            <div className="col-xl-3 col-sm-12">
                                <div className="card">
                                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                        <img src={profilepicture} alt="Profile" className="rounded-circle" />
                                        <h2>{loggedInUser.first_name} {loggedInUser.last_name}</h2>
                                        <span>{loggedInUser.email}</span>
                                        <span>{loggedInUser.phone_number}</span>
                                        <h3 style={{ color: worker_verified === 'verified' ? 'green' : 'red' }}>
                                            Verification: {worker_verified}
                                        </h3>
                                        <div className="text-center">
                                            <button type="submit" onClick={handleShow} className="btn  btn-outline-warning rounded-pill ">View Compliance</button>
                                        </div>


                                        <Modal show={show} onHide={handleClose} size="xl">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Worker Compliance Overview</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-sm-12'>
                                                        <div className='row'>
                                                            <div className='col-lg-6 col-sm-12'>
                                                                <img src={profilepicture} alt="Profile" className="col-12 rounded-circle text-center" />
                                                                <br />
                                                                <p className='m-4'>{fullname}</p>
                                                                <p className='m-4'>{email}</p>
                                                                <p className='m-4'>{workerType}</p>
                                                            </div>
                                                            <div className='col-lg-6 col-sm-12'>
                                                                <div style={styles.cardHeader}>Compliance Details</div>
                                                                <p style={styles.cardcontent}>DBS Number: {dbsCertificateNumber}</p>
                                                                <p style={styles.cardcontent}>Served Convictions: {conviction}</p>
                                                                <p style={styles.cardcontent}>National Insurance: {nationalInsuranceNumber}</p>
                                                                <p style={styles.cardcontent}>Visa Type: {visaType}</p>
                                                                <p style={styles.cardcontent}>Maximum Weekly Hours: {maxWeeklyHours}</p>
                                                            </div>
                                                        </div>
                                                        <div className='card p-2 text-danger text-center' style={{ display: 'flex', justifyContent: 'stretch' }}>
                                                            <p><i className='bi bi-info-circle'>{" "}</i><b>Compliance Checklist incomplete</b></p>
                                                        </div>
                                                        <div style={styles.cardHeader}>
                                                            Skills
                                                        </div>
                                                        <div className='p-2'>
                                                            {skills.map((skill, index) => (
                                                                <p key={index}>{skill}</p>
                                                            ))}
                                                        </div>

                                                        <div style={styles.cardHeader}>
                                                            Regulatory settings
                                                        </div>
                                                        <Collapsible
                                                            trigger={
                                                                <div style={styles.cardHeader} onClick={() => setIsOpen3(!isOpen3)}>
                                                                    Worker Documents <Arrow isOpen={isOpen3} />
                                                                </div>
                                                            }
                                                        >
                                                            <div style={styles.collapsibleContent}>
                                                                <div className='p-2 m-2'>
                                                                    <div className='row'>
                                                                        <div className='col'>Document Name</div>
                                                                        <div className='col'>File Status</div>
                                                                        <div className='col'>View</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>CV</div>
                                                                        <div className='col'>{cvFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{cvFile && (
                                                                            <a href={`http://localhost:5000/${cvFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>DBS Certificate</div>
                                                                        <div className='col'>{dbsFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{dbsFile && (
                                                                            <a href={`http://localhost:5000/${dbsFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Passport Document</div>
                                                                        <div className='col'>{passportFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{passportFile && (
                                                                            <a href={`http://localhost:5000/${passportFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>National Insurance Document</div>
                                                                        <div className='col'>{nifFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{nifFile && (
                                                                            <a href={`http://localhost:5000/${nifFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Proof of Address Document</div>
                                                                        <div className='col'>{proofOfAddressUrl && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{proofOfAddressUrl && (
                                                                            <a href={`http://localhost:5000/${proofOfAddressUrl}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Visa / Work Permit Proof</div>
                                                                        <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{visaFile && (
                                                                            <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Reference Proof <p>*** Still to do ***</p></div>
                                                                        <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{visaFile && (
                                                                            <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </Collapsible>
                                                        <Collapsible
                                                            trigger={
                                                                <div style={styles.cardHeader} onClick={() => setIsOpen4(!isOpen4)}>
                                                                    Education and Training <Arrow isOpen={isOpen4} />
                                                                </div>
                                                            }
                                                        >
                                                            <div style={styles.collapsibleContent}>
                                                                <div className='p-2 m-2' >
                                                                    <div className='row'>
                                                                        <div className='col'>Document Name</div>
                                                                        <div className='col'>File Status</div>
                                                                        <div className='col'>View</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>CV</div>
                                                                        <div className='col'>{cvFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{cvFile && (
                                                                            <a href={`http://localhost:5000/${cvFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>DBS Certificate</div>
                                                                        <div className='col'>{dbsFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{dbsFile && (
                                                                            <a href={`http://localhost:5000/${dbsFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Passport Document</div>
                                                                        <div className='col'>{passportFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{passportFile && (
                                                                            <a href={`http://localhost:5000/${passportFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>National Insurance Document</div>
                                                                        <div className='col'>{nifFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{nifFile && (
                                                                            <a href={`http://localhost:5000/${nifFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Proof of Address Document</div>
                                                                        <div className='col'>{proofOfAddressUrl && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{proofOfAddressUrl && (
                                                                            <a href={`http://localhost:5000/${proofOfAddressUrl}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Visa / Work Permit Proof</div>
                                                                        <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{visaFile && (
                                                                            <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                    <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                        <div className='col'>Reference Proof <p>*** Still to do ***</p></div>
                                                                        <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                                                                        <div className='col'>{visaFile && (
                                                                            <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                                                                <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                                                            </a>
                                                                        )}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Collapsible>
                                                    </div>
                                                    <div className='col-lg-6 col-sm-12'>
                                                        Complicance Checklist
                                                        <hr />
                                                        <div>
                                                            <Collapsible
                                                                trigger={
                                                                    <div style={styles.cardHeader} onClick={() => setIsOpen1(!isOpen1)}>
                                                                        General Compliance <Arrow isOpen={isOpen1} />
                                                                    </div>
                                                                }
                                                            >
                                                                <div style={styles.collapsibleContent}>
                                                                    <div className='p-2 m-2' >
                                                                        <div className='row'>
                                                                            <div className='col'>.</div>
                                                                            <div className='col'>Compliance</div>
                                                                            <div className='col'>Checked By</div>
                                                                            <div className='col'>Mandatory</div>
                                                                        </div>
                                                                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                            <div className='col'><div className='col'>{cvFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div></div>
                                                                            <div className='col'>CV/Staff Profile </div>
                                                                            <div className='col'>*** NOT YET </div>
                                                                            <div className='col'><b className='btn btn-success'>Mandatory</b></div>
                                                                        </div>
                                                                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                            <div className='col'><div className='col'>{dbsFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div></div>
                                                                            <div className='col'>DBS Document  </div>
                                                                            <div className='col'>*** NOT YET </div>
                                                                            <div className='col'><b className='btn btn-success'>Mandatory</b></div>
                                                                        </div>
                                                                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                            <div className='col'><div className='col'>{profilepicture && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div></div>
                                                                            <div className='col'>Photo ID </div>
                                                                            <div className='col'>*** NOT YET </div>
                                                                            <div className='col'><b className='btn btn-success'>Mandatory</b></div>
                                                                        </div>
                                                                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                                                                            <div className='col'><div className='col'>{proofOfAddressUrl && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div></div>
                                                                            <div className='col'>Proof of current address </div>
                                                                            <div className='col'>*** NOT YET </div>
                                                                            <div className='col'><b className='btn btn-success'>Mandatory</b></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Collapsible>

                                                            <Collapsible
                                                                trigger={
                                                                    <div style={styles.cardHeader} onClick={() => setIsOpen2(!isOpen2)}>
                                                                        Client Specific Compliance <Arrow isOpen={isOpen2} />
                                                                    </div>
                                                                }
                                                            >
                                                                <div style={styles.collapsibleContent}>
                                                                    <p>Information To Follow Here</p>

                                                                </div>
                                                            </Collapsible>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-9 col-sm-12">
                                <div className="card">
                                    <div className="card-body pt-3">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header style={headerStyle}><b>Overview</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <h5 className="card-title">Profile Details</h5>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Full Name</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.first_name} {loggedInUser.last_name}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Email</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.email}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Role</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.role}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Phone</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.phone_number}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Date of Birth</div>
                                                        <div className="col-lg-9 col-md-8">{formatDate(loggedInUser.dob)}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Address</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.address}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Nationality</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.nationality}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Address</div>
                                                        <div className="col-lg-9 col-md-8">{loggedInUser.gender}</div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header style={headerStyle}><b>Edit Profile</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <form onSubmit={handleSubmitForm}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="firstName" className="col-md-4 col-lg-3 col-form-label">First Name</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="firstName" type="text" className="form-control" id="firstName" defaultValue={loggedInUser.first_name} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="middleName" className="col-md-4 col-lg-3 col-form-label">Middle Name</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="middleName" type="text" className="form-control" id="middleName" defaultValue={loggedInUser.middle_name} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="lastName" className="col-md-4 col-lg-3 col-form-label">Last Name</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="lastName" type="text" className="form-control" id="lastName" defaultValue={loggedInUser.last_name} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="email" type="email" className="form-control" id="email" defaultValue={loggedInUser.email} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="phone" type="text" className="form-control" id="phone" defaultValue={loggedInUser.phone_number} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="dob" className="col-md-4 col-lg-3 col-form-label">Date of Birth</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="dob" type="text" className="form-control" id="dob" defaultValue={loggedInUser.dob} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="address" type="text" className="form-control" id="address" defaultValue={loggedInUser.address} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="nationality" className="col-md-4 col-lg-3 col-form-label">Nationality</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="nationality" type="text" className="form-control" id="nationality" defaultValue={loggedInUser.nationality} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="gender" className="col-md-4 col-lg-3 col-form-label">Gender</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="gender" type="text" className="form-control" id="gender" defaultValue={loggedInUser.gender} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="profilepicture" className="col-md-4 col-lg-3 col-form-label">Profile Picture</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input type="file" className="form-control" id="profilepicture" onChange={handleFileUploadprofile} />
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn  btn-outline-primary rounded-pill ">Save Changes</button>
                                                        </div>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header style={headerStyle}><b>Change Password</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <form onSubmit={handleSubmitPasswordChange}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="currentPassword" type="password" className="form-control" id="currentPassword" onChange={handlePasswordChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="newPassword" type="password" className="form-control" id="newPassword" onChange={handlePasswordChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="renewPassword" type="password" className="form-control" id="renewPassword" onChange={handlePasswordChange} />
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn  btn-outline-primary rounded-pill ">Change Password</button>
                                                        </div>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header style={headerStyle}><b>Residential Address Information</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <span>***** To confirm details to have here ***** In compliance with Children's Services regulations, it is mandatory to provide a record of your residential addresses for the past five years, along with corresponding proof. If you have not resided at the same address throughout the last five years, please include details of your previous residences below.
                                                    </span>
                                                    <br />
                                                    <br />
                                                    <form onSubmit={handleSubmitResidentialAddress}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <select
                                                                    className="form-control"
                                                                    id="country"
                                                                    value={country}
                                                                    onChange={(e) => setCountry(e.target.value)}
                                                                >
                                                                    <option value="">Select Country</option>
                                                                    {countries.map((country) => (
                                                                        <option key={country} value={country}>
                                                                            {country}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="postCode" className="col-md-4 col-lg-3 col-form-label">PostCode</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input type="text" className="form-control" id="postCode" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="residentialAddress" className="col-md-4 col-lg-3 col-form-label">Residential Address</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input type="text" className="form-control" id="residentialAddress" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="addressFrom" className="col-md-4 col-lg-3 col-form-label">How long have you been in this address (From)</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input type="date" className="form-control" id="addressFrom" value={addressFrom} onChange={handleAddressFromChange} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="duration" className="col-md-4 col-lg-3 col-form-label">Duration</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input type="text" className="form-control" id="duration" value={duration} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="proofOfAddress" className="col-md-4 col-lg-3 col-form-label">Proof of Address</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input type="file" className="form-control" id="proofOfAddress" onChange={handleFileUpload} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-md-8 col-lg-9 offset-md-4 offset-lg-3">
                                                                <p>** Please note when you upload a new file it will replace the existing file.</p>
                                                                {proofOfAddressUrl && (
                                                                    <a href={`http://localhost:5000/${proofOfAddressUrl}`} target="_blank" rel="noopener noreferrer">
                                                                        View Proof of Address
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn  btn-outline-primary rounded-pill ">Save Changes</button>
                                                        </div>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header style={headerStyle}><b>Employment Information</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <form onSubmit={handleSubmitEmploymentInformation}>
                                                        <div className="row mb-3">

                                                            <label htmlFor="workerType" className="col-md-4 col-lg-3 col-form-label">Worker Type</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <select
                                                                    className="form-control"
                                                                    id="workerType"
                                                                    value={workerType}
                                                                    onChange={handleWorkerTypeChange}
                                                                >
                                                                    <option value="">Select Worker Type</option>
                                                                    {workerTypes.map((type, index) => (
                                                                        <option key={index} value={type}>{type}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label htmlFor="skills" className="col-md-4 col-lg-3 col-form-label">Skills</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <select multiple className="form-select" id="skills" value={skills} onChange={handleSkillsChange}>
                                                                    <option value="Care Certificate">Care Certificate</option>
                                                                    <option value="PEG feeding tubes">PEG feeding tubes</option>
                                                                    <option value="Elderly">Elderly</option>
                                                                    <option value="Dementia">Dementia</option>
                                                                    <option value="Catheters">Catheters</option>
                                                                    <option value="Driving">Driving</option>
                                                                    <option value="Mandatory Training">Mandatory Training</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label className="col-md-4 col-lg-3 col-form-label">Worker Employment Type</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="employmentType" id="paye" value="PAYE" checked={employmentType === 'PAYE'} onChange={handleEmploymentTypeChange} />
                                                                    <label className="form-check-label" htmlFor="paye">
                                                                        PAYE
                                                                    </label>
                                                                    {/* Input for Payroll Reference Number */}
                                                                    <input type="text" className="form-control mt-2" id="payrollReferenceNumber" value={payrollReferenceNumber} onChange={(e) => setPayrollReferenceNumber(e.target.value)} placeholder="Payroll Reference Number" />
                                                                </div>
                                                                <div className="form-check mt-2">
                                                                    <input className="form-check-input" type="radio" name="employmentType" id="umbrella" value="Umbrella Company" checked={employmentType === 'Umbrella Company'} onChange={handleEmploymentTypeChange} />
                                                                    <label className="form-check-label" htmlFor="umbrella">
                                                                        Umbrella Company
                                                                    </label>
                                                                    {/* Input for Company Name */}
                                                                    <input type="text" className="form-control mt-2" id="umbrellaCompanyName" value={umbrellaCompanyName} onChange={(e) => setUmbrellaCompanyName(e.target.value)} placeholder="Company Name" />
                                                                </div>
                                                                <div className="col p-2">
                                                                    <label>CV File</label>
                                                                    <input type="file" className="form-control" id="cvdocument" onChange={handleCvFileChange} />
                                                                </div>
                                                                {cvFile && (
                                                                    <a href={`http://localhost:5000/${cvFile}`} target="_blank" rel="noopener noreferrer">
                                                                        View CV File
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-outline-primary rounded-pill">Save Employment Information</button>
                                                        </div>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header style={headerStyle}><b>Passport, Visa & DBS Information</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <form onSubmit={handleSubmitPassportVisaDBSInfo}>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="passportNumber" className="col-form-label">Passport Number</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="passportNumber" value={passportNumber} onChange={handlePassportNumberChange} />
                                                                </div>
                                                                <div className="col p-2">
                                                                    <label>Passport File</label>
                                                                    <input type="file" className="form-control" id="passportdocument" onChange={handlepassportFileChange} />
                                                                    {passportFile && (
                                                                        <a href={`http://localhost:5000/${passportFile}`} target="_blank" rel="noopener noreferrer">
                                                                            View Passport File
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="issuedCountry" className="col-form-label">Issued Country</label>
                                                                <div className="col">
                                                                    <select className="form-select" id="issuedCountry" value={issuedCountry} onChange={handleIssuedCountryChange}>
                                                                        <option value="">Select Issued Country</option>
                                                                        {countries.map((country) => (
                                                                            <option key={country} value={country}>
                                                                                {country}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="visaType" className="col-form-label">Visa Type</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="visaType" value={visaType} onChange={handleVisaTypeChange} />
                                                                </div>
                                                                <div className="col p-2">
                                                                    <label>Visa File</label>
                                                                    <input type="file" className="form-control" id="visadocument" onChange={handlevisaFileChange} />
                                                                    {visaFile && (
                                                                        <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                                                            View Visa File
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="maxWeeklyHours" className="col-form-label">Maximum Weekly Hours</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="maxWeeklyHours" value={maxWeeklyHours} onChange={handleMaxWeeklyHoursChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="cosCompanyName" className="col-form-label">Company Name (COS Document)</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="cosCompanyName" value={cosCompanyName} onChange={handleCosCompanyNameChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="nationalInsuranceNumber" className="col-form-label">National Insurance Number</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="nationalInsuranceNumber" value={nationalInsuranceNumber} onChange={handleNationalInsuranceNumberChange} />
                                                                </div>
                                                                <div className="col p-2">
                                                                    <label>National Insurance File</label>
                                                                    <input type="file" className="form-control" id="nationalinsurancedocument" onChange={handlenifFileChange} />
                                                                    {nifFile && (
                                                                        <a href={`http://localhost:5000/${nifFile}`} target="_blank" rel="noopener noreferrer">
                                                                            View National Insurance File
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="shareCode" className="col-form-label">Share Code</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="shareCode" value={shareCode} onChange={handleShareCodeChange} />
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="dbsCertificateNumber" className="col-form-label">DBS Certificate Number</label>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" id="dbsCertificateNumber" value={dbsCertificateNumber} onChange={handleDBSCertificateNumberChange} />
                                                                </div>
                                                                <div className="col p-2">
                                                                    <label>DBS File</label>
                                                                    <input type="file" className="form-control" id="dbsdocument" onChange={handledbfFileChange} />
                                                                    {dbsFile && (
                                                                        <a href={`http://localhost:5000/${dbsFile}`} target="_blank" rel="noopener noreferrer">
                                                                            View DBS File
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="col-6">
                                                                <label htmlFor="conviction" className="col-form-label">Is there Any Conviction?</label>
                                                                <div className="col">
                                                                    <select className="form-select" id="conviction" value={conviction} onChange={handleConvictionChange}>
                                                                        <option value="">Select Yes or No</option>
                                                                        <option value="Yes">Yes</option>
                                                                        <option value="No">No</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-center mt-3">
                                                            <button type="submit" className="btn  btn-outline-primary rounded-pill">Save Information</button>
                                                        </div>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="6">
                                                <Accordion.Header style={headerStyle}><b>Travel & Other Information</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <form onSubmit={handleSubmitTravelOtherInfo}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="preferredTravelDistance" className="col-md-4 col-lg-3 col-form-label">Preferred Travel Distance (KM)</label>                                                    <div className="col-md-8 col-lg-9">
                                                                <input type="text" className="form-control" id="preferredTravelDistance" value={preferredTravelDistance} onChange={handlePreferredTravelDistanceChange} />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label htmlFor="hasDrivingLicence" className="col-md-4 col-lg-3 col-form-label">Does this worker have a driving licence?</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <select className="form-select" id="hasDrivingLicence" value={hasDrivingLicence} onChange={handleDrivingLicenceChange}>
                                                                    <option value="">Select Yes or No</option>
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {hasDrivingLicence === 'Yes' && (
                                                            <div className="row mb-3">
                                                                <label htmlFor="drivingLicence" className="col-md-4 col-lg-3 col-form-label">Upload Driving Licence</label>
                                                                <div className="col-md-8 col-lg-9">
                                                                    <input type="file" className="form-control" id="drivingLicence" onChange={handleDrivingLicenceFileChange} />

                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="row mb-3">
                                                            <div className="col-md-8 col-lg-9 offset-md-4 offset-lg-3">
                                                                <p>** Please note when you upload a new file it will replace the existing file.</p>
                                                                {drivingLicenceFile && (
                                                                    <a href={`http://localhost:5000/${drivingLicenceFile}`} target="_blank" rel="noopener noreferrer">
                                                                        View Driving Licence
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="text-center">
                                                            <button type="submit" className="btn  btn-outline-primary rounded-pill">Save Information</button>
                                                        </div>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="7">
                                                <Accordion.Header style={headerStyle}><b>Submit Refereces</b></Accordion.Header>
                                                <Accordion.Body style={bodystyle}>
                                                    <form>
                                                    </form>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            {/* Add more Accordion items here if needed */}
                                        </Accordion>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'documentstab' ? 'active' : 'fade'}`} id="documentstab">

                    <div className="pagetitle m-3">
                        <h1>Documents</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Documents</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='card p-2 m-2'>
                        <p>Documents and Proof</p>
                        <div className='row'>
                            <div className='col'>Document Name</div>
                            <div className='col'>Expiry date</div>
                            <div className='col'>Status</div>
                            <div className='col'>File Status</div>
                            <div className='col'>View</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>CV</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{cvFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{cvFile && (
                                <a href={`http://localhost:5000/${cvFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>DBS Certificate</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{dbsFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{dbsFile && (
                                <a href={`http://localhost:5000/${dbsFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>Passport Document</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{passportFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{passportFile && (
                                <a href={`http://localhost:5000/${passportFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>National Insurance Document</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{nifFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{nifFile && (
                                <a href={`http://localhost:5000/${nifFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>Proof of Address Document</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{proofOfAddressUrl && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{proofOfAddressUrl && (
                                <a href={`http://localhost:5000/${proofOfAddressUrl}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>Visa / Work Permit Proof</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{visaFile && (
                                <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>Reference Proof <p>*** Still to do ***</p></div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{visaFile && (
                                <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'certificatestab' ? 'active' : 'fade'}`} id="certificatestab">
                    <div className="pagetitle m-3">
                        <h1>Certificates</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Certificates</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='card p-2 m-2'>
                        <p>Certificates</p>
                        <div className='row'>
                            <div className='col'>Document Name</div>
                            <div className='col'>Expiry date</div>
                            <div className='col'>Status</div>
                            <div className='col'>File Status</div>
                            <div className='col'>View</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>Certificate 1</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{visaFile && (
                                <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                        <div className='row' style={{ border: 'solid', borderRadius: '10px' }}>
                            <div className='col'>Certificate 2</div>
                            <div className='col'></div>
                            <div className='col'></div>
                            <div className='col'>{visaFile && (<i className='bx bx-check-circle' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>)}</div>
                            <div className='col'>{visaFile && (
                                <a href={`http://localhost:5000/${visaFile}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-show' style={{ fontSize: '24px', color: '#0dcaf0' }}></i>
                                </a>
                            )}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'emergencytab' ? 'active' : 'fade'}`} id="emergencytab">
                    <div className="pagetitle m-3">
                        <h1>Emergency</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Emergency</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='card m-3 p-3'>
                        <form onSubmit={handleSubmitcontactform}>
                            <div className="row mb-3">
                                <label htmlFor="contactName" className="col-md-4 col-lg-3 col-form-label">Emergency Contact Name</label>
                                <div className="col-md-8 col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactName"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="relationship" className="col-md-4 col-lg-3 col-form-label">Relationship</label>
                                <div className="col-md-8 col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="relationship"
                                        value={relationship}
                                        onChange={(e) => setRelationship(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="primaryContactNumber" className="col-md-4 col-lg-3 col-form-label">Primary Contact Number</label>
                                <div className="col-md-8 col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="primaryContactNumber"
                                        value={primaryContactNumber}
                                        onChange={(e) => setPrimaryContactNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="secondaryContactNumber" className="col-md-4 col-lg-3 col-form-label">Secondary Contact Number</label>
                                <div className="col-md-8 col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="secondaryContactNumber"
                                        value={secondaryContactNumber}
                                        onChange={(e) => setSecondaryContactNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Add Emergency Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'vaccinationtab' ? 'active' : 'fade'}`} id="vaccinationtab">
                    <div className="pagetitle m-3">
                        <h1>Vaccinations</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Vaccinations</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='card m-3 p-3'>
                        <form onSubmit={handleSubmitcontactform}>
                            <div className="row mb-3">
                                <label htmlFor="vaccinationName" className="col-md-4 col-lg-3 col-form-label">Vaccination Name</label>
                                <div className="col-md-8 col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="vaccinationName"
                                        value={vaccinationName}
                                        onChange={(e) => setVaccinationName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="vaccinationDate" className="col-md-4 col-lg-3 col-form-label">Vaccination Date</label>
                                <div className="col-md-8 col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="vaccinationDate"
                                        value={vaccinationDate}
                                        onChange={(e) => setVaccinationDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Add Vaccination</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default Profile;
