import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { getExtraDoctorInforById } from '../../../services/userService';
import './DoctorExtraInfor.scss';
import NumericFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraDoctorInforById(this.props.doctorIdFromParent);
            if (res && res.error === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraDoctorInforById(this.props.doctorIdFromParent);
            if (res && res.error === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
            console.log('Check doctor extra infor', res.data);
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        console.log('Check render extra infor: ', this.state)
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-upper">
                    <div className="address-clinic"><FormattedMessage id="patient.extra-infor.text-address" /></div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className="detail-clinic">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div>
                            <div className="mini-price">
                                <FormattedMessage id="patient.extra-infor.price" />
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                    &&
                                    <NumericFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.value_Vi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                }
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                    &&
                                    //NumberFormat
                                    <NumericFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.value_En}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'USD'}
                                    />
                                }
                            </div>
                            <span className="show-hide-btn" onClick={() => this.showHideDetailInfor(true)}><FormattedMessage id="patient.extra-infor.more" /></span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className="price"><FormattedMessage id="patient.extra-infor.price" />
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                    &&
                                    <NumericFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.value_Vi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                }
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                    &&
                                    //NumberFormat
                                    <NumericFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.value_En}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'USD'}
                                    />
                                }
                            </div>
                            <div className="detail-price">Khám & Nội soi Tai Mũi họng 400.000đ</div>
                            <div className="note">
                                {extraInfor && extraInfor.note ? extraInfor.note : ''}
                            </div>
                            <div className="payment-methods">
                                {extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.value_Vi : ''}
                            </div>
                            <span className="show-hide-btn" onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor.hide" /></span>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);

