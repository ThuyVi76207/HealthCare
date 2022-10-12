import React, { Component } from 'react';
import { connect } from "react-redux";
import MaiLayout from '../../../layouts/MaiLayout';
import './ManagerSpecialty.scss';
import { LANGUAGES } from '../../../utils';

class ManagerSpecialty extends Component {



    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {



        return (
            <>
                <MaiLayout>

                </MaiLayout>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        laguage: state.app.laguage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);

