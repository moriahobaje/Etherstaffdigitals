import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import MainContent from './Pages/MainContent';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import ServicesPage from './Pages/ServicesPage';
import PricingPage from './Pages/PricingPage';
import NotFoundPage from './Pages/NotFoundPage';
import LoginPage from './Dashboard/LoginPage';
import SignupPage from './Dashboard/Signup';
import SignupFormAgent from './Dashboard/Signupagent';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Dashboard/ProfilePage';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor } from './store'; // Import your persisted store and persistor

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profilesingle from './Dashboard/SingleProfile';
import ViewAgents from './Dashboard/Viewagents';
import ViewWorkers from './Dashboard/ViewWorkers';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';

const App = () => {
  // const [selectedUser, setSelectedUser] = useState(null);
  // const loggedInUserselected = useSelector(state => state.user.userselected);
  // console.log(loggedInUserselected);
  return (
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/singleprofile" element={<ProtectedRoute><Profilesingle /></ProtectedRoute>} />
          {/* <Route path="/singleprofile" element={<ProtectedRoute><Profilesingle selectedUser={selectedUser} /></ProtectedRoute>} />      */}
          <Route path="/ViewAgents" element={<ProtectedRoute><ViewAgents /></ProtectedRoute>} />
          <Route path="/ViewWorkers" element={<ProtectedRoute><ViewWorkers /></ProtectedRoute>} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
        <ToastContainer />
      </PersistGate>
    </Router>
  );
};

const DefaultLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupagent" element={<SignupFormAgent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
