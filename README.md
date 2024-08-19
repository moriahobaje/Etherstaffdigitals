# etherstaffdigitals

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/kencert/etherstaffdigitals.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/kencert/etherstaffdigitals/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***


## Name


## Description
In a quest and drive to improve business operations, turnaround time across processes and address customer related issues swiftly, Etherstaff LTD UK which is one of the leading Recruiting institutions in the United Kingdom has embarked on a Digital Transformation Journey of the healthcare recruitment platform which is expected to revolutionize the way healthcare professionals and institutions interact ensuring efficiency, accuracy, and accessibility. This platform leverages advanced digital technologies to streamline the recruitment process, empowering healthcare staff to manage their credentials independently while providing hospitals with a dynamic interface to post and manage job vacancies.

## FUNCTIONAL REQUIREMENTS
This application will have three interfaces which are: 
    • Customer interface
    • Administration Interface
    • Agency Interface:

## Customer Interface Requirements listing
REQ ID
REQUIREMENT
DESCRIPTION
BR-BC-01
Dashboard Management
System should possess an intuitive dashboard that gives clear insight into Customer operations.
At a glance the dashboard should show the following in a presentable format.
Welcome Note to the Customer (Applicant)

Documentation: % Incomplete, %Complete,
Job profile: Shows Job history of the customer


Profile Management
The solution should ensure customer can upload/remove their profile picture in the specified size 
BR-BC-02
Customer Management
System should allow a customer to provide their basic details which include.
First Name
Middle Name
Last Name
Mobile Number (Country Code | Number)
Email Address
Date of birth (DD-MM-YYYY)
Marital Status
Nationality
System should ensure a customer can capture their Address details: 
Address Type (Residential/ Office)
Street Number
Street Name
Landmark
Country
City/Province


Document Management
System should ensure a customer can select preferred Job function category and upload all required documentation (Multiple record allowed)
Document Type 
Document Issuance Date
Document Status (Pending approval by default)
License ID
Document Expiry date
Upload button




System should ensure a customer can capture their educational history stating the following: (Multiple record allowed)
Name of institution
Course of Study
Start Date
End date
Class of Degree
GPA




System should ensure a customer can select their skills from the Skill inventory




System should ensure there is a proper integration with relevant databases/data sources and other relevant third-party applications for a seamless end to end process and accurate verifications of Document/certification
BR-BC-03
Reference Management
System should provide an interface where customer can provide Reference to support their application:
Reference Name
Reference Email address
Comments
This reference request should be routed automatically to the refers.
System should provide option to notify the customer
BR-BC-04
Location settings
System should provide an option for a customer to turn on location or allow system to pick the exact location automatically.
System should allow a user to provide a distance range in Km or miles to guide Job search result engine to process records based on the distance range
BR-BC-05
Work Schedule Management
Work Schedule Management is very important as it shows clearly the availability of customer in a week. System should ensure a customer can capture their availability by specifying preferred days, Start time and End. This will also help the system to match customers to jobs that best match their preferences.
BR-BC-06
Job Listing portal
System should provide an interface that shows job listing in the format below.
Job ID
Job title
Job description
Location
Start date.
Deadline
System should give option to Apply to jobs.
System should give customers option to filter available jobs by
Job Category (health, IT, Manufacturing)
Location




System should always fetch/update newly created Job listings/vacancies on the application at intervals. This can be achieved by a script or configuration
BR-BC-07
Time Sheet Management
Time Sheet Management: is a practice of monitoring and analyzing employee timesheets and time tracking (recorded work hours). System should give an interface that allow users to capture their work hours for a given day


Notifications Management
System should provide a function where a user can activate/deactivate in app notification


SLA REQUIREMENTS
For optimum service delivery and Increase customer satisfaction, the system is expected to send reminders to actors with unverified tasks on their queue. Reminders/notification are sent to the users after the configurable duration has elapsed.
Please see glossary section for email notification sample
REQ ID
REQUIREMENT
REQUIREMENT DESCRIPTION
BR-CG-22
System should Send email trigger to Admin on unverified tasks
This trigger should be sent to Admin (Ether staff UK) if task status remains as awaiting or pending verification for 30mins.
BR-CG-23
System should Send email notification to Head of Operations (HOP), Admin
This trigger should be sent to HOP (put Admin in copy), if task status remains unverified after 1 hour.
BR-CG-24
System should send email notification to Director, HOP, and Admin	
This trigger should be sent to Director, (while putting the HOP, Admin in copy) if task status remains unverified after 1-hour 30mins.




## Administration User Interface Business Requirement Listing
REQ ID
REQUIREMENT
DESCRIPTION
BR-CG-31
User Management



Solution must provide an interface where the admin user can create other category of users such as Back-office users
Solution must capture the following information during user creation.
Username
First name
Middle name
Last name
Employee ID
Email address
Contact/Home address
Phone number
Roles/permission
Solution must provide the functionality to modify existing user’s information
Solution must provide the functionality to Activate/disable users
Solution should provide a means to authenticate the created users with the existing Active directory 
System should show list of users already profiled on the application
BR-CG-32
Access Management
Access management is broadly categorized into Role management and Permissions.
System should allow an admin user to create/assign roles
System should allow an admin user to modify an existing role
System should allow an admin user to assign permission to role
System should allow an admin user to delete only a role that has not been assigned to a user
System should allow a user to Inquire on an existing role
System should allow creation, modifications and deletion of permissions
System should always show list of permissions not in use by the user
System should not allow a single user to have a dual role (Checker and Maker)
BR-CG-33
Configuration management
The configuration management section would be categorized into 3 sub-levels;
Code Management
System settings
Maker-checker settings
System should provide a code-management menu where entities (Code types) with dynamic values(codes) are properly managed. This entities value can be added, Modified or deleted. Examples of code types include.
Document Type/Category
Decline Document reasons
System should not allow duplicate code type/code configuration


Job Portal Management
This interface will be responsible for managing Job uploads from different Hospital agency. The admin user can either approve or reject the upload. Once the upload is approved, Job listings are made available on the customer interface. This interface would also show Approval history of all Job uploads


Report Management
Reports are generated for the different activities on the application; this can render the life cycle of all identified processes at a glance for management and statistical information insights can be evaluated which can inform sound business decisions. System should give option to generate reports in different format, CSV, PDF, EXCEL




Document Management
This interface will be responsible for verifying and managing all documents submitted by a customer. The admin user can either Approve or reject the documentation here by specifying a rejection reason
BR-CG-34
Others
In case of failure, system should not display invalid password as an error message rather it should be Invalid user ID or Password
Account Lock out.	
Maximum Login attempts before locking out should be configurable.
System should allow administrator to unlock all account after N minute
               Information Management	
All Personally Identifiable Information (PII) and confidential information should be stored in encrypted format on the database.	


 Session Management	
If any logged-in session is inactive for more than a predefined period, password protected screen savers should be activated, and the screen saver should be uniform throughout across all users
Admin user should be able to set the maximum inactive period(minutes/Seconds) for a user before session timeout is triggered.
		
Cryptography
System must not show password in clear text when a user is entering the password.	
System should not store password in the database or in application code in clear text, System should ensure that sensitive data are encrypted in the database.	
Should not allow system commands calls from user interface.
                  Communication security	
System should not allow URL redirection to untrusted (non-HTTPS) site (System should not allow URL redirection from HTTP to HTTPS within a session/web page)
System should allow configuration of upload file format type, size


Solution should provide a section where maker-checker settings can be toggle on or off for the various operations on the application
BR-CG-35
System Job Management
This interface would be responsible for managing system background jobs. (If Any) Jobs can be initiated and stopped here. Jobs that were stopped because of any anomaly can be triggered to resume operation also.


System should capture the following.
Job name
Escalation time (Expected run time)
Status of Job
Action button (Start /Stop button)
BR-CG-37
Audit log Management
Audit log is essential on the application has it provides information who has accessed the system and what operations he/she has performed during a given period
Audit Log Recording
Systems shall provide enough audit log data to support incident investigation, user monitoring and comprehensive audits.
System should capture the following.
Time the event occurred.
The User ID associated with the event.
Username
IP address
Domain
The program/command used to initiate the event
Security Event Logging
System should create logs that can be used to monitor activities that can affect network, system or application security.
	System should log all Intrusion activity as follows.
Failed login attempts with an invalid User ID
Failed login attempts with a valid User ID (password guessing attempts)
Failed password changes attempt
Attempts to use privileges that have not been authorized
System Activity log
System should log all administration activity which includes.
Modifications
Additions
Deletions
Deactivation
Activation
System should log all system activities and anomalies.
System Start-up time
System Shut-down time.
Logons and errors
System processes and performance
System resources utilization
System should log all user activities at the system access level	System should log.
User IDs
Logon date/time
Logoff date/time
Password change date/time
Applications invoked.
Attempted access to unauthorized data
 Alteration to critical
Date that the message was generated.
Time that the message was generated.
The host that generated the message on system files  
Log Protection
System logs must be rolled (a new log activated, the old log saved) rather than being overwritten (the same log is used again, losing data)
System log files should be kept confidential and must be protected such that no individual can modify or delete the logs.
System should not allow unauthorized user(s) to have access to audit logs
Log Retention
System should be capable of retaining Log files for a defined period to accomplish audit purpose
Clock synchronization
System should ensure system time is accurate and precise to aid integrity in the audit log generated



## Support
cheruiyotkenedy@gmail.com, cheruiyotkenedy@yahoo.com, kenedy.cheruiyot@etherstaff.solutions

## Roadmap

Plan Develop Test Deploy


## Authors and acknowledgment
Kenedy Cheruiyot


## License
TBD

## Project status
Initialisation