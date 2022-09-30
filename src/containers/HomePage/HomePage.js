import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Doctor from './Section/Doctor';
import Specialty from './Section/Specialty';
import News from './Section/News'

class HomePage extends Component {

    render() {
        return (
            <div >
                <HomeHeader />
                <Specialty />
                <Doctor />
                <News />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
