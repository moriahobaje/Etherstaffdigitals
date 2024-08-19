import { useLayoutEffect } from 'react';

const useMobileNavToggledash = () => {
    useLayoutEffect(() => {
        // Sidebar toggle functionality
        const checkSidebarBtn = () => {
            const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
            if (toggleSidebarBtn) {
                toggleSidebarBtn.addEventListener('click', () => {
                    document.querySelector('body').classList.toggle('toggle-sidebar');
                });
            } else {
                console.error('toggleSidebarBtn not found in the document.');
            }
        };

        // Check for the sidebar button periodically to ensure it is found
        const sidebarBtnInterval = setInterval(() => {
            checkSidebarBtn();
        }, 100);

        // Clear interval once the button is found
        checkSidebarBtn();

        return () => {          

            clearInterval(sidebarBtnInterval);
        };
    }, []);
};

export default useMobileNavToggledash;
