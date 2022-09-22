import './NavbarStyle.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils";

const Navbar = () => {
    return (
        <div>
            <div className='navbar-up'>

                <div className='header-up'>
                    <h2>Logo</h2>
                    <div className='content-item'>
                        <i className='fa fa-envelope'></i>
                        <div className='text-item'>healthcare@gmail.com</div>
                    </div>

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
                        <div className='text-item'><FormattedMessage id="login.login" /></div>
                    </div>
                </div>
            </div>
            <div className='navbar-down'>
                <div className='header-down'>
                    <div className='left-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.homepage" /></b></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.onlinemedica" /></b></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.forum" /></b></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="homeheader.healthnews" /></b></div>
                        </div>

                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className='fas fa-question-circle'></i>
                            <FormattedMessage id="homeheader.contact" />
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default Navbar


