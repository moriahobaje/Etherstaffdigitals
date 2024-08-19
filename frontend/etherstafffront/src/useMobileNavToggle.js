import { useLayoutEffect } from 'react';

const useMobileNavToggle = () => {
    useLayoutEffect(() => {
        function toggleScrolled() {
            const selectBody = document.querySelector('body');
            const selectHeader = document.querySelector('#header');
            if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
            window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
        }

        document.addEventListener('scroll', toggleScrolled);
        window.addEventListener('load', toggleScrolled);

        const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
        function mobileNavToggle() {
            console.log('Mobile navigation toggle button clicked!');
            document.querySelector('body').classList.toggle('mobile-nav-active');
            mobileNavToggleBtn.classList.toggle('bi-list');
            mobileNavToggleBtn.classList.toggle('bi-x');
        }

        if (mobileNavToggleBtn) {
            mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
        } else {
            console.error('mobileNavToggleBtn not found in the document.');
        }

        document.querySelectorAll('#navmenu a').forEach(navmenu => {
            navmenu.addEventListener('click', () => {
                if (document.querySelector('.mobile-nav-active')) {
                    mobileNavToggle();
                }
            });
        });

        document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
            navmenu.addEventListener('click', function (e) {
                if (document.querySelector('.mobile-nav-active')) {
                    e.preventDefault();
                    this.parentNode.classList.toggle('active');
                    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
                    e.stopImmediatePropagation();
                }
            });
        });
       
        return () => {
            if (mobileNavToggleBtn) {
                mobileNavToggleBtn.removeEventListener('click', mobileNavToggle);
            }

            document.querySelectorAll('#navmenu a').forEach(navmenu => {
                navmenu.removeEventListener('click', () => {
                    if (document.querySelector('.mobile-nav-active')) {
                        mobileNavToggle();
                    }
                });
            });

            document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
                navmenu.removeEventListener('click', function (e) {
                    if (document.querySelector('.mobile-nav-active')) {
                        e.preventDefault();
                        this.parentNode.classList.toggle('active');
                        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
                        e.stopImmediatePropagation();
                    }
                });
            });
        };
    }, []);
};

export default useMobileNavToggle;
