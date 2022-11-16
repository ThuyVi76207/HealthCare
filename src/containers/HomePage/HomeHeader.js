import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage/HomeHeader.scss';
import logo from '../../assets/logoH.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import BgImg from "../../assets/img_background.jpg";

import { changeLanguageApp } from "../../store/actions"
import Navbar from '../Navbar/Navbar';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event : actions

    }

    render() {

        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='mask'>
                    <img className='into-img' src={BgImg} alt="BgImg" />
                </div>

                <div className='nav-bar'>

                    <div className='change-language'>
                        <div className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN /</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>
                <div className='content-up'>
                    <div className='title1'><FormattedMessage id="homeheader.title1" /></div>
                    <div className='title2'><FormattedMessage id="homeheader.title2" /></div>
                    <div className='search'>
                        <i className='fas fa-search'></i>
                        <input type='text' placeholder="Tìm từ khóa khám bệnh" />
                    </div>
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
