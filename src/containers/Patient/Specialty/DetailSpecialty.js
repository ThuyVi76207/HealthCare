import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import MaiLayout from '../../../layouts/MaiLayout';
import DoctorSchedule from '../Doctor/DoctorSchedule'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [22, 23, 24, 25, 26, 27, 28]
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { arrDoctorId } = this.state;
        return (
            <MaiLayout>
                <div></div>
                {
                    arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <DoctorSchedule
                                doctorIdFromParent={item}
                                key={index}
                            />
                        )
                    })
                }

            </MaiLayout>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

