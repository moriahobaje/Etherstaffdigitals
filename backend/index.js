const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure the PostgreSQL pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432 // default PostgreSQL port
});


const nodemailer = require('nodemailer');
const crypto = require('crypto');


const bcrypt = require('bcrypt');

// Function to hash the password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Function to generate OTP
function generateOTP() {
    return crypto.randomBytes(3).toString('hex');
}

// Function to send email
async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        host: 'mail.supremecluster.com',
        port: 465,
        secure: true,
        auth: {
            user: 'mailserver@etherstaff.solutions',
            pass: 'Mails@ethersolutions12',
        },
    });


    let mailOptions = {
        from: 'mailserver@etherstaff.solutions',
        to: to,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(mailOptions);
}


const multer = require('multer');

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set destination folder for uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Set file name for uploaded files
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Endpoint to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const query = `
        SELECT * FROM Users
        WHERE email = $1 AND status = 'active'
    `;
    const values = [username];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            // Compare hashed password with provided password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Generate OTP
                const otp = generateOTP();

                // Save the OTP in the database
                const otpQuery = `
                    UPDATE Users
                    SET otp = $1
                    WHERE email = $2
                `;
                const otpValues = [otp, username];
                await client.query(otpQuery, otpValues);

                // Send OTP to user's email
                await sendEmail(username, 'Your OTP Code', `Your OTP code is ${otp}`);

                // Return authenticated user information
                const { id, email, role, first_name, middle_name, last_name, phone_number, address, dob } = user;
                res.status(200).json({ authenticated: true, user: { id, email, role, first_name, middle_name, last_name, phone_number, address, dob }, otpSent: true });
            } else {
                // Passwords do not match
                res.status(401).json({ authenticated: false });
            }
        } else {
            // User not found
            res.status(401).json({ authenticated: false });
        }

        client.release();
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).send('Error authenticating user');
    }
});


// Endpoint to verify OTP

app.post('/verify-otp', async (req, res) => {
    const { otp, username } = req.body;

    const query = `
        SELECT id, email, role, first_name, middle_name, last_name, phone_number, address, dob, nationality, gender 
        FROM Users
        WHERE otp = $1 AND email = $2`;

    const values = [otp, username];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rows.length > 0) {
            // User authenticated successfully
            const { id, email, role, first_name, middle_name, last_name, phone_number, address, dob, nationality, gender } = result.rows[0];
            res.status(200).json({ authenticated: true, user: { id, email, role, first_name, middle_name, last_name, phone_number, address, dob, nationality, gender }, otpValid: true });
        } else {
            // User not found or invalid OTP
            res.status(401).json({ authenticated: false });
        }
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ error: 'Error authenticating user' });
    }
});

// password hashed error on reset fix first thing 
// Endpoint to handle reset password
app.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    const otp = generateOTP();

    try {
        const hashedPassword = await hashPassword(otp);

        const client = await pool.connect();

        // Save the OTP in the database
        const passwordQuery = `
            UPDATE Users
            SET password = $1
            WHERE email = $2
        `;
        const passwordValues = [hashedPassword, email];
        await client.query(passwordQuery, passwordValues);

        client.release();

        // Send OTP to user's email
        await sendEmail(email, 'Your Password Reset To', `Your password reset to ${otp}`);

        res.status(200).json({ message: 'Reset code sent to your email.', success: true });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'Error resetting password. Please try again later.', success: false });
    }
});


// Endpoint to update user data
app.put('/updateUserData/:id', upload.single('profilePicture'), async (req, res) => {
    const userId = req.params.id;
    const {
        firstName, middleName, lastName, phoneNumber, email, address, dob, role, nationality, gender
    } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    const updateQuery = `
      UPDATE Users
      SET 
        first_name = $1,
        middle_name = $2,
        last_name = $3,
        phone_number = $4,
        email = $5,
        address = $6,
        dob = $7,
        role = $8,
        nationality = $9,
        gender = $10,
        profile_picture = $11
      WHERE id = $12
      RETURNING *
    `;

    const values = [
        firstName, middleName, lastName, phoneNumber, email, address, dob, role, nationality, gender, profilePicture, userId
    ];

    try {
        const client = await pool.connect();
        const result = await client.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error updating user data:', err);
        res.status(500).send('Error updating user data');
    }
});

// Endpoint to update user password
app.put('/updateUserPassword/:id', async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    // Example of hashing the password (you should use a secure password hashing library like bcrypt)
    const hashedPassword = hashPassword(newPassword);

    const updateQuery = `
        UPDATE Users
        SET 
            password = $1
        WHERE id = $2
        RETURNING *
    `;

    const values = [
        hashedPassword,
        userId
    ];

    try {
        const client = await pool.connect();
        const result = await client.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error updating user password:', err);
        res.status(500).send('Error updating user password');
    }
});


// Endpoint to update or insert residential address
app.put('/updateResidentialAddress/:id', upload.single('proofOfAddressFile'), async (req, res) => {
    const userId = req.params.id;
    const {
        country,
        postCode,
        residentialAddress,
        addressFrom,
        proofOfAddress
    } = req.body;

    // Check if proofOfAddressFile exists in req.file
    const proofOfAddressFile = req.file ? req.file.path : null;

    const updateQuery = `
        INSERT INTO worker_information (userid, country, postcode, residential_address, start_date_living, proof_of_address, proof_of_address_file)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (userid)
        DO UPDATE SET
            country = EXCLUDED.country,
            postcode = EXCLUDED.postcode,
            residential_address = EXCLUDED.residential_address,
            start_date_living = EXCLUDED.start_date_living,
            proof_of_address = EXCLUDED.proof_of_address,
            proof_of_address_file = EXCLUDED.proof_of_address_file
        RETURNING *;
    `;

    const values = [
        userId,
        country,
        postCode,
        residentialAddress,
        addressFrom,
        proofOfAddress,
        proofOfAddressFile
    ];

    console.log(values);
    try {
        const client = await pool.connect();
        const result = await client.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error updating or inserting residential address:', err);
        res.status(500).send('Error updating or inserting residential address');
    }
});


// Endpoint to update or insert employment information
app.put('/updateEmploymentInformation/:id', upload.single('cvFile'), async (req, res) => {
    const userId = req.params.id;
    const {
        workerType,
        skills,
        employmentType,
        payrollReferenceNumber,
        umbrellaCompanyName
    } = req.body;
    const cvFile = req.file ? req.file.path : null;

    // Parse the skills string back to an array
    let parsedSkills;
    try {
        parsedSkills = JSON.parse(skills);
    } catch (error) {
        return res.status(400).send('Invalid skills format');
    }

    const updateQuery = `
      INSERT INTO worker_information (
          userid, 
          worker_type, 
          skills, 
          employment_type, 
          payroll_reference_number, 
          umbrella_company_name,
          cv_file
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (userid)
      DO UPDATE SET
          worker_type = EXCLUDED.worker_type,
          skills = EXCLUDED.skills,
          employment_type = EXCLUDED.employment_type,
          payroll_reference_number = EXCLUDED.payroll_reference_number,
          umbrella_company_name = EXCLUDED.umbrella_company_name,
          cv_file = EXCLUDED.cv_file
      RETURNING *;
    `;

    const values = [
        userId,
        workerType,
        parsedSkills,
        employmentType,
        payrollReferenceNumber,
        umbrellaCompanyName,
        cvFile
    ];

    try {
        const client = await pool.connect();
        const result = await client.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error updating or inserting employment information:', err);
        res.status(500).send('Error updating or inserting employment information');
    }
});

// Endpoint to update or insert Travel & Other Information
app.put('/updatePassportVisaDBSInfo/:id', upload.fields([
    { name: 'passportFile', maxCount: 1 },
    { name: 'visaFile', maxCount: 1 },
    { name: 'nationalInsuranceFile', maxCount: 1 },
    { name: 'dbsFile', maxCount: 1 }
]), async (req, res) => {
    const userId = req.params.id;
    const {
        passportNumber,
        issuedCountry,
        visaType,
        maxWeeklyHours,
        cosCompanyName,
        nationalInsuranceNumber,
        shareCode,
        dbsCertificateNumber,
        conviction
    } = req.body;

    // Retrieve file paths if files were uploaded
    const passportFile = req.files['passportFile'] ? req.files['passportFile'][0].path : null;
    const visaFile = req.files['visaFile'] ? req.files['visaFile'][0].path : null;
    const nationalInsuranceFile = req.files['nationalInsuranceFile'] ? req.files['nationalInsuranceFile'][0].path : null;
    const dbsFile = req.files['dbsFile'] ? req.files['dbsFile'][0].path : null;

    const updateQuery = `
        INSERT INTO worker_information (
            userid,
            passport_number,
            country_issued,
            visa_type,
            minimum_weekly_hours,
            company_name_for_cos,
            national_insurance_number,
            share_code,
            dbs_certificate_number,
            convicted,
            passport_file,
            visa_file,
            national_insurance_file,
            dbs_file
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (userid)
        DO UPDATE SET
            passport_number = EXCLUDED.passport_number,
            country_issued = EXCLUDED.country_issued,
            visa_type = EXCLUDED.visa_type,
            minimum_weekly_hours = EXCLUDED.minimum_weekly_hours,
            company_name_for_cos = EXCLUDED.company_name_for_cos,
            national_insurance_number = EXCLUDED.national_insurance_number,
            share_code = EXCLUDED.share_code,
            dbs_certificate_number = EXCLUDED.dbs_certificate_number,
            convicted = EXCLUDED.convicted,
            passport_file = EXCLUDED.passport_file,
            visa_file = EXCLUDED.visa_file,
            national_insurance_file = EXCLUDED.national_insurance_file,
            dbs_file = EXCLUDED.dbs_file
        RETURNING *;
    `;

    const values = [
        userId,
        passportNumber,
        issuedCountry,
        visaType,
        maxWeeklyHours,
        cosCompanyName,
        nationalInsuranceNumber,
        shareCode,
        dbsCertificateNumber,
        conviction === 'Yes' ? true : false, // Convert string to boolean
        passportFile,
        visaFile,
        nationalInsuranceFile,
        dbsFile
    ];

    try {
        const client = await pool.connect();
        const result = await client.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error updating or inserting Travel & Other information:', err);
        res.status(500).send('Error updating or inserting Travel & Other information');
    }
});

// Endpoint to update or insert Travel & Other Information
app.put('/updateTravelOtherInfo/:id', upload.single('drivingLicenceFile'), async (req, res) => {
    const userId = req.params.id;
    const {
        preferredTravelDistance,
        hasDrivingLicence
    } = req.body;

    // Check if drivingLicenceFile exists in req.file
    const drivingLicenceFile = req.file ? req.file.path : null;

    const updateQuery = `
        INSERT INTO worker_information (
            userid,
            preferred_travel_distance,
            has_driving_license,
            driving_licence_file
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (userid)
        DO UPDATE SET
            preferred_travel_distance = EXCLUDED.preferred_travel_distance,
            has_driving_license = EXCLUDED.has_driving_license,
            driving_licence_file = EXCLUDED.driving_licence_file
        RETURNING *;
    `;

    const values = [
        userId,
        preferredTravelDistance,
        hasDrivingLicence === 'Yes' ? true : false, // Convert string to boolean
        drivingLicenceFile
    ];
    console.log(values);
    try {
        const client = await pool.connect();
        const result = await client.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error updating or inserting Travel & Other information:', err);
        res.status(500).send('Error updating or inserting Travel & Other information');
    }
});

// Route to fetch profilepicture
app.get('/fetchprofilepicture/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT profile_picture FROM users WHERE id = $1', [userId]);
        client.release();

        res.status(200).json(result.rows); // Return the fetched rows as JSON response
    } catch (err) {
        console.error('Error fetching profile picture:', err);
        res.status(500).send('Error fetching profile picture');
    }
});

// Route to fetch user info by id
app.get('/fetchuserinfo/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT id, email, role, first_name, middle_name, last_name, phone_number, address, dob, nationality, gender FROM users WHERE id = $1', [userId]);
        client.release();

        if (result.rows.length > 0) {            
            const { id, email, role, first_name, middle_name, last_name, phone_number, address, dob, nationality, gender } = result.rows[0];
            res.status(200).json({ user: { id, email, role, first_name, middle_name, last_name, phone_number, address, dob, nationality, gender }, otpValid: true });
        } else {            
            res.status(401).json({ authenticated: false });
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Error fetching user' });
    }

});

// Route to fetch worker information
app.get('/fetchworkerinformation/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM worker_information WHERE userid = $1', [userId]);
        client.release();

        res.status(200).json(result.rows); // Return the fetched rows as JSON response
    } catch (err) {
        console.error('Error fetching worker information:', err);
        res.status(500).send('Error fetching worker information');
    }
});

// Route to fetch full information
app.get('/fetchfullinformation/:id', async (req, res) => {
    const workerid = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT wi.*, u.*
             FROM worker_information wi
             JOIN users u ON wi.userid = u.id
             WHERE wi.worker_id = $1`,
            [workerid]
        );
        client.release();

        res.status(200).json(result.rows); // Return the fetched rows as JSON response
    } catch (err) {
        console.error('Error fetching full user information:', err);
        res.status(500).send('Error fetching full user information');
    }
});

// Endpoint to delete user data
app.delete('/deleteUserData/:id', async (req, res) => {
    const userId = req.params.id;

    const deleteQuery = `
        DELETE FROM Users
        WHERE id = $1
        RETURNING *
    `;

    try {
        const client = await pool.connect();
        const result = await client.query(deleteQuery, [userId]);
        res.status(200).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error deleting user data:', err);
        res.status(500).send('Error deleting user data');
    }
});

// Function to insert data into Users table
app.post('/saveUserData', async (req, res) => {
    const {
        firstName, middleName, lastName, phoneNumber, email, address, dob, nationality, gender, password, role
    } = req.body;

    try {
        // Hash the password before inserting into the database
        const hashedPassword = await hashPassword(password);

        const insertQuery = `
            INSERT INTO Users (
                first_name, middle_name, last_name, phone_number, email, address, dob, nationality, gender, password, role
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;

        const values = [
            firstName, middleName, lastName, phoneNumber, email, address, dob, nationality, gender, hashedPassword, role
        ];

        const client = await pool.connect();
        const result = await client.query(insertQuery, values);
        res.status(201).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send('Error saving user data');
    }
});


// { "":
//     "Meneja Database Africa", 
//     "businessregistrationnumber":
//     "324234324324", 
//     "alsoknownas":
//     "MDA", 
//     "officeaddress":
//     "Mombasa", 
//     "phoneNumber":
//     "3243243432", 
//     "postcode":
//     "0230llas", 
//     "password":
//      "pass", 
//      "role": 
//      "Agent" }


// Function to insert data into Agents table
app.post('/saveUserDataagent', async (req, res) => {
    const {
        businessName, businessregistrationnumber, alsoknownas, officeaddress, postcode, password, role,profilePicture,status
    } = req.body;

    try {
        // Hash the password before inserting into the database
        const hashedPassword = await hashPassword(password);

        const insertQuery = `
            INSERT INTO Users (
                first_name, middle_name, last_name, phone_number, email, address, dob, nationality, gender, password, role
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;

        const values = [
            businessName, businessregistrationnumber, alsoknownas, officeaddress, postcode, hashedPassword, role,profilePicture,status
        ];

        const client = await pool.connect();
        const result = await client.query(insertQuery, values);
        res.status(201).json(result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send('Error saving user data');
    }
});

// Route to fetch all users
app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Users');
        res.status(200).json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
    }
});

// Route to fetch all agents
app.get('/fetchagents', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM Users where role = 'Agent' `);
        res.status(200).json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching agents:', err);
        res.status(500).send('Error fetching agents');
    }
});
app.get('/fetchworkers', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM Users where role = 'Worker' `);
        res.status(200).json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching agents:', err);
        res.status(500).send('Error fetching agents');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
