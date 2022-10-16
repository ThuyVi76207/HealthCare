import './NavbarStyle.scss';
import React, { useEffect, useRef } from "react";
import { LANGUAGES } from '../../utils';

import { FormattedMessage } from 'react-intl';
import LogoImg from '../../assets/Hcare.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ onchangeLanguage, language }) => {
    const changeLanguage = (language) => {
        onchangeLanguage(language);
    }

    const [start, setStart] = useState(false);
    // const secRef = useRef();
    useEffect(() => {
        // Define the on-scroll callback
        const callback = function () {
            // const secTop = secRef.current.offsetTop;
            if (window.scrollY >= 100) {
                setStart(true);
            }
            else {
                setStart(false);
            }
        };

        // Attach the callback after the component mounts
        window.addEventListener("scroll", callback);

        // Detach the callback before the component unmounts
        return () => window.removeEventListener("scroll", callback);
    }, []);
    console.log(start)

    return (
        <div className='navbar-common'>
            <div className='navbar-up'>
                <div className='header-up'>
                    <img className='h-[3.125rem]' src={LogoImg} />
                    <a href="mailto:healthcare@gmail.com" className='content-item'>
                        <i className='fa fa-envelope'></i>
                        <div className='text-item'>healthcare@gmail.com<h3></h3></div>
                    </a>

                    <a href="tel:0123456894" className='content-item'>
                        <i className='fa fa-phone'></i>
                        <div className='text-item'>0123456894</div>
                    </a>
                    <div className='content-item'>
                        <i className='fa fa-registered'></i>
                        <div className='text-item'><FormattedMessage id="homeheader.register" /></div>
                    </div>
                    <div className='content-item'>
                        <i className='fa fa-user'></i>
                        <div className='text-item'><FormattedMessage id="homeheader.login" /></div>
                    </div>
                </div>
            </div>
            <div className={start ? 'navbar-down sticky' : 'navbar-down'} id='menuHeader'>
                <div className='header-down'>
                    <div className='left-content'>
                        <div className='child-content'>
                            <Link to={"/home"}><b><FormattedMessage id="homeheader.homepage" /></b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to="#"><b><FormattedMessage id="homeheader.onlinemedica" /></b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to="#"><b><FormattedMessage id="homeheader.forum" /></b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to="#"><b><FormattedMessage id="homeheader.healthnews" /></b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to={"/contact"}><b><FormattedMessage id="homeheader.contact" /></b></Link>
                        </div>

                    </div>
                    <div className='change-language'>
                        <i className='text-[20px]'>
                            <ion-icon name="earth-outline"></ion-icon>
                        </i>

                        <div className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}><span onClick={() => changeLanguage(LANGUAGES.VI)}>VN /</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'}><span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Navbar


