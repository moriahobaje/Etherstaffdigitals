import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { clearUserselected, setUserselected } from '../features/user/userSliceselected';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [users, setUsers] = useState([]);
  const [userscount, setUsersCount] = useState(0);
  const [usersActive, setUsersActive] = useState(0);
  const [usersInactive, setUsersInactive] = useState(0);

  const loggedInUser = useSelector(state => state.user.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // Function to format date to UK time format
  const formatDateToUKTime = (dateString) => {
    const date = new Date(dateString); // Assuming dateString is in ISO format
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'Europe/London', // Set to UK time zone
    };
    return date.toLocaleDateString('en-GB', options);
  };

  // Handle user selection
  const handleselecteduser = async (userselected) => {
    try {
      // Fetch user info
      const response = await axios.get(`http://localhost:5000/fetchuserinfo/${userselected}`);

      // Pass the fetched user data to the `singleprofile` route
      navigate('/singleprofile', { state: { user: response.data.user } });
    } catch (err) {
      console.error('Error handling user selection:', err);
      // Optionally, handle error state or notify the user
    }
  };

  // Fetch data from your API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        const fetchedUsers = response.data; // response is an array of users

        // Fetch profile pictures for each user
        const usersWithPictures = await Promise.all(
          fetchedUsers.map(async (user) => {
            const pictureResponse = await axios.get(`http://localhost:5000/fetchprofilepicture/${user.id}`);
            const pictureData = pictureResponse.data[0];
            return {
              ...user,
              profilePictureUrl: pictureData.profile_picture,
            };
          })
        );

        setUsers(usersWithPictures);

        // setUsers(fetchedUsers);
        setUsersCount(fetchedUsers.length);

        // Count active and inactive users
        const activeUsers = fetchedUsers.filter(user => user.status === 'active').length;
        const inactiveUsers = fetchedUsers.filter(user => user.status !== 'active').length;

        setUsersActive(activeUsers);
        setUsersInactive(inactiveUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>
      <section className="section dashboard">
        <h1 className='p-2'>Welcome back, {loggedInUser.first_name}</h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* Sales Card */}
              <div className="col-xxl-4 col-md-4">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people-fill"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{userscount}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Sales Card */}

              {/* Revenue Card */}
              <div className="col-xxl-4 col-md-4">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Active Users</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-check-circle-fill"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{usersActive}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Revenue Card */}

              {/* Customers Card */}
              <div className="col-xxl-4 col-xl-4">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Inactive Users</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-ban"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{usersInactive}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Customers Card */}

              {/* Recent Users */}
              <div className="container-fluid">
                <div className="row">
                  {users.map((user, index) => (
                    <div className="col-12 mb-2" key={index}>
                      <div className="card">
                        <div className="card-body p-0">
                          <div className="row g-0">
                            {/* Profile Picture */}
                            <div className="col-md-3 col-sm-12 d-flex align-items-center justify-content-center">
                              <img
                                src={user.profilePictureUrl ? `http://localhost:5000/${user.profilePictureUrl}` : '/Dashboard/assets/img/profile-img.jpg'} // Fallback to a default image if no URL
                                className="rounded-circle"
                                alt={`${user.first_name} ${user.last_name}`}
                                style={{ height: '150px', width: '150px' }}
                              />
                              <div className="text-end p-3">
                                <button
                                  onClick={() => handleselecteduser(user.id)}
                                  className="btn btn-primary "
                                ><i className='bi bi-eye'></i>
                                  
                                </button>
                              </div>
                            </div>
                            {/* User Info */}
                            <div className="col-md-4">
                              <div className="card-body">
                                <h5 className="card-title">{`${user.first_name} ${user.middle_name} ${user.last_name}`}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">#{user.id}</h6>
                                <div className="row">
                                  <div className="col-12 mb-2">
                                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                                    <p className="card-text"><strong>Mobile Number:</strong> {user.phone_number}</p>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="card-body">
                                <div className="row p-3">
                                  <div className="col-12 mb-2">
                                    <p className="card-text"><strong>Address:</strong> {user.address}</p>
                                    <p className="card-text"><strong>Role:</strong> {user.role}</p>
                                    <p className="card-text"><strong>Date Created:</strong> {formatDateToUKTime(user.created_at)}</p>
                                    <p className="card-text"><strong>Status:</strong> {user.status}</p>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End Recent Users */}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
