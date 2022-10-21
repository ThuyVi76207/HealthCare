import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import NumericFormat from 'react-number-format';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from "../../../../utils";
import Select from 'react-select';
import { postPatientBooking, postSendSMS } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Paypal from '../../../../components/Paypal/Paypal';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
            isShowLoading: false,
            isShowPaypal: false,
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.value_Vi : item.value_En;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} - ${date}`
        }
        return ''
    }

    buidDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} - ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} - ${dataTime.doctorData.lastName}`
            return name;
        }
        return ''
    }

    handleConfirmBooking = async () => {

        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buidDoctorName(this.props.dataTime)


        this.setState({
            isShowLoading: true,
            isShowPaypal: true,
        })

        let res = await postPatientBooking({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        await postSendSMS({
            phoneNumber: this.state.phoneNumber,
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a appointment success!!')
            this.props.closeBookingModal()
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error('Booking a appointment failure!!')
            this.setState({
                isShowLoading: false
            })
        }
    }

    render() {
        let { isOpenModel, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }

        console.log('dataTime', dataTime)



        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Waiting just a little...!!!!!!!!'
                >
                    <Modal isOpen={isOpenModel}
                        className={'booking-modal-container'} size="lg" centered>
                        <div className="booking-modal-content">
                            <div className="booking-modal-header">
                                <span className="left"><FormattedMessage id="patient.booking.title" /></span>
                                <span className="right"
                                    onClick={closeBookingModal}
                                ><i className="fa fa-times"></i></span>
                            </div>
                            <div className="booking-modal-body">
                                <div className="doctor-infor">
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataTime={dataTime}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking.fullName" /></label>
                                        <input className="form-control"
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking.phoneNumber" /></label>
                                        <input className="form-control" placeholder="+84..."
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking.email" /></label>
                                        <input className="form-control"
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking.address" /></label>
                                        <input className="form-control"
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label><FormattedMessage id="patient.booking.reason" /></label>
                                        <textarea className="form-control"
                                            value={this.state.reason}
                                            onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                        ></textarea>
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking.birthday" /></label>
                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker}
                                            className="form-control"
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking.gender" /></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleOnChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="booking-modal-footer">

                                <button className="btn-booking-confirm"
                                    onClick={() => this.handleConfirmBooking()}
                                ><FormattedMessage id="patient.booking.btn-Submit" /></button>


                                <button className="btn-booking-cancel"
                                    onClick={closeBookingModal}><FormattedMessage id="patient.booking.btn-Cancel" />
                                </button>

                            </div>
                        </div>
                    </Modal>

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

