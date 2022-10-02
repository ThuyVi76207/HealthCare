
import Navbar from "../containers/Navbar/Navbar";

import React from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from "../store/actions";
import { Component } from "react";
import Footer from "../containers/Footer/Footer";
class MaiLayout extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event : actions
        return language;

    }
    
    render() {
        let language = this.props.language;
        const onChangeLanguage = this.changeLanguage;
        return (
        <>
            <Navbar onchangeLanguage = {onChangeLanguage} language = {language}/>
            
            <main>{this.props.children}</main>
            <Footer />
        </>
    )

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

export default connect(mapStateToProps, mapDispatchToProps)(MaiLayout);;