// useHandleUserSelection.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserselected, clearUserselected } from '../features/user/userSliceselected';

const useHandleUserSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedUser = async (userselected) => {
    try {
      const response = await axios.get(`http://localhost:5000/fetchuserinfo/${userselected}`);

      // Clear the current user selection
      dispatch(clearUserselected());

      // Set the new user selection
      dispatch(setUserselected(response.data.user));

      // Navigate to the profile page
      navigate('/singleprofile');
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  return handleSelectedUser;
};

export default useHandleUserSelection;
