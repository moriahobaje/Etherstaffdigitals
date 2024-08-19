import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './Allagents';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import useMobileNavToggle from './useMobileNavToggledash';
import { useDispatch } from 'react-redux';
import { clearUserselected } from '../features/user/userSliceselected';
const ViewAgents = () => {
  useMobileNavToggle();
  const dispatch = useDispatch();
  dispatch(clearUserselected());;
  const loggedInUser = useSelector(state => state.user.user); 
  const loggedInUserselected = useSelector(state => state.user.userselected);
  console.log('Dashboard Component - loggedInUser:', loggedInUser);
  console.log('Dashboard Component - loggedInUserselected:', loggedInUserselected);
  useEffect(() => {    

    const dashboardStyles = [
      "Dashboard/assets/vendor/bootstrap/css/bootstrap.min.css",
      "Dashboard/assets/vendor/bootstrap-icons/bootstrap-icons.css",
      "Dashboard/assets/vendor/boxicons/css/boxicons.min.css",
      "Dashboard/assets/vendor/quill/quill.snow.css",
      "Dashboard/assets/vendor/quill/quill.bubble.css",
      "Dashboard/assets/vendor/remixicon/remixicon.css",
      "Dashboard/assets/vendor/simple-datatables/style.css",
      "Dashboard/assets/css/style.css"
    ];

    const dashboardScripts = [
      "Dashboard/assets/vendor/apexcharts/apexcharts.min.js",
      "Dashboard/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "Dashboard/assets/vendor/chart.js/chart.umd.js",
      "Dashboard/assets/vendor/echarts/echarts.min.js",
      "Dashboard/assets/vendor/quill/quill.js",
      "Dashboard/assets/vendor/simple-datatables/simple-datatables.js",
      "Dashboard/assets/vendor/tinymce/tinymce.min.js",
      "Dashboard/assets/vendor/php-email-form/validate.js",
      "Dashboard/assets/js/main.js"
    ];

    dashboardStyles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    dashboardScripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    });

    const toggleButton = document.querySelector('.toggle-sidebar-btn');
    const body = document.querySelector('body');

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        body.classList.toggle('toggle-sidebar');
      });
    }

    return () => {
      dashboardStyles.forEach(href => {
        const links = document.head.querySelectorAll(`link[href="${href}"]`);
        links.forEach(link => link.remove());
      });

      dashboardScripts.forEach(src => {
        const scripts = document.body.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach(script => script.remove());
      });

      if (toggleButton) {
        toggleButton.removeEventListener('click', () => {
          body.classList.toggle('toggle-sidebar');
        });
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default ViewAgents;
