import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientDoctor, postSendPrescription } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from "../../../utils";
import PrescriptionModal from './PrescriptionModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleBtnSubmit = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closePrescriptionModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendPrescription = async (dataFromModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendPrescription({
            email: dataFromModal.email,
            imageBase64: dataFromModal.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if (res && res.errCode === 0) {
            toast.success('Send prescription successfull!!')
            await this.getDataPatient();
            this.closePrescriptionModal();
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error('Something went wrong!!')
            console.log(res)
            this.setState({
                isShowLoading: false
            })
        }
    }

    handleBtnSend = () => {

    }

    render() {
        console.log(this.state)
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Waiting just a little...!!!!!!!!'
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            Quản lý bệnh nhân
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-6 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate[0]}
                                />
                            </div>
                            <div className="col-12 mt-5 table-manage-patient">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ tên</th>
                                            <th>Địa chỉ</th>
                                            {/* <th>Giới Tính</th> */}
                                            <th>Số điện thoại</th>
                                            <th>Action</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0
                                            ? dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.value_Vi : item.timeTypeDataPatient.value_En
                                                //let gender = language === LANGUAGES.VI ? item.patientData.genderData.value_Vi : item.patientData.genderData.value_En
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        {/* <td>{gender}</td> */}
                                                        <td>{item.patientData.phonenumber}</td>
                                                        <td>
                                                            <button className="btn btn-primary"
                                                                onClick={() => this.handleBtnSubmit(item)}
                                                            >Xác nhận</button>
                                                            <button className="btn btn-danger ms-2"
                                                                onClick={() => this.handleBtnSend()}
                                                            >Xóa</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6">Không có dữ liệu khám vào ngày này</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <PrescriptionModal
                        isOpenModel={isOpenRemedyModal}
                        dataModal={dataModal}
                        closePrescriptionModal={this.closePrescriptionModal}
                        sendPrescription={this.sendPrescription}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

