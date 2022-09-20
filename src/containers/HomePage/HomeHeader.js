import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage/HomeHeader.scss';
import logo from '../../assets/logoH.png';
import {FormattedMessage} from 'react-intl';
import {LANGUAGES} from "../../utils";

import {changeLanguageApp} from "../../store/actions"

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event : actions
    }

    render() {

        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='header-logo'>
                            <img className='header-img' src={logo} />
                        </div>
                        <div className='header-content'>
                            <div className='header-up'>
                                <div className='content-item'>
                                    <i className='fa fa-envelope'></i>
                                    <div className='text-item'>healthcare@gmail.com</div>
                                </div>
                                <div className='content-item'>
                                    <i className='fa fa-phone'></i>
                                    <div className='text-item'>0123456894</div>
                                </div>
                                <div className='content-item'>
                                    <i className='fa fa-registered'></i>
                                    <div className='text-item'><FormattedMessage id="homeheader.register"/></div>
                                </div>
                                <div className='content-item'>
                                    <i className='fa fa-user'></i>
                                    <div className='text-item'><FormattedMessage id="login.login"/></div>
                                </div>
                            </div>
                            <div className='header-down'>
                                <div className='left-content'>
                                    <div className='child-content'>
                                        <div><b><FormattedMessage id="homeheader.homepage"/></b></div>                                      
                                    </div>
                                    <div className='child-content'>
                                        <div><b><FormattedMessage id="homeheader.onlinemedica"/></b></div>                                       
                                    </div>
                                    <div className='child-content'>
                                    <div><b><FormattedMessage id="homeheader.forum"/></b></div>                                
                                    </div>
                                    <div className='child-content'>
                                    <div><b><FormattedMessage id="homeheader.healthnews"/></b></div>                                      
                                    </div>

                                </div>
                                <div className='right-content'>
                                    <div className='support'>
                                        <i className='fas fa-question-circle'></i>
                                        <FormattedMessage id="homeheader.contact"/>
                                    </div>
                                    <div className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                                    <div className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
{/* 
                        <div className='left-content'>
                            
                        </div> */}                        
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="homeheader.title1"/></div>
                        <div className='title2'><FormattedMessage id="homeheader.title2"/></div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='Tim tu khoa kham benh' />
                        </div>
                    </div>
                    {/* <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className='far fa-hospital'></i></div>
                                <div className='text-child'>Kham từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                <div className='text-child'>Kham tu xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                <div className='text-child'>Kham tong quat</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-microscope'></i></div>
                                <div className='text-child'>Xet nghiem y hoc</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                <div className='text-child'>Suc khoa tinh than</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-tooth'></i></div>
                                <div className='text-child'>Kham nha khoa</div>
                            </div>
                        </div>
                    </div> */}
                    
                </div>
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
