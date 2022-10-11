import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="address-clinic"><FormattedMessage id="" />Địa chỉ khám</div>
                    <div className="name-clinic"><FormattedMessage id="" />Phòng khám đa khoa HeathCare</div>
                    <div className="detail-clinic"><FormattedMessage id="" />891 Nguyễn Kiệm, phường 3, Gò Vấp, TP.HCM</div>
                </div>
                <div className="content-down">
                    <div className="price"><FormattedMessage id="" />GIÁ KHÁM: </div>
                    <div className="detail-price"><FormattedMessage id="" />Khám & Nội soi Tai Mũi họng 400.000đ</div>
                    <div className="include"><FormattedMessage id="" />Đã bao gồm nội soi Tai Mũi họng</div>
                    <div className="payment-methods"><FormattedMessage id="" />Bệnh viện có thanh toán bằng hình thức tiền mặt và quẹt thẻ</div>
                </div>
                <div className="content-extra">
                    <div className="extra-price"><FormattedMessage id="" />GIÁ DỊCH VỤ LIÊN QUAN:</div>
                    <div className="detail-extra-price"><FormattedMessage id="" />Đo nhĩ lượng</div>
                    <div className="value-extra-price"><FormattedMessage id="" />150.000đ</div>
                    <div className="extra-infor"><FormattedMessage id="" />Theo chỉ định của bác sĩ</div>
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

