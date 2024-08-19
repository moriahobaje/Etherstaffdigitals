// src/Dashboard/Dashboard.js
import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './Profilesinglepage';
import Footer from './Footer';
// import { useSelector } from 'react-redux';

const Profilesingle = () => {

  // const loggedInUserselected = useSelector(state => state.user.userselected);
  // console.log(loggedInUserselected);

  useEffect(() => {
    // Dynamically load the styles for Dashboard
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

    // Clean up styles and scripts when component unmounts
    return () => {
      dashboardStyles.forEach(href => {
        const links = document.head.querySelectorAll(`link[href="${href}"]`);
        links.forEach(link => link.remove());
      });

      dashboardScripts.forEach(src => {
        const scripts = document.body.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach(script => script.remove());
      });
    };
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Profilesingle;
