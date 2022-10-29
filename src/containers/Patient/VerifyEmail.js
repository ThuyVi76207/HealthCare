import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBooking } from "../../services/userService";
import Navbar from "../Navbar/Navbar";
import './VerifyEmail.scss';
import ThankImg from '../../assets/Thank.jpg';
import Paypal from '../../components/Paypal/Paypal';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParam = new URLSearchParams(this.props.location.search)
            let token = urlParam.get('token');
            let doctorId = urlParam.get('doctorId')
            let res = await postVerifyBooking({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                {/* <Navbar />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>
                            Loading...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <>
                                    <div className="info-booking">Xác nhận lịch hẹn thành công</div>
                                    <div className="info-booking">Cảm ơn bạn vì đã sử dụng dịch vụ của chúng tôi!!</div>
                                    <div className="image-thank">
                                        <img className="thank-you" src={ThankImg} alt="" />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="info-booking">Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                                    <div className="image-thank">
                                        <img className="thank-you" src={ThankImg} alt="" />
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div> */}
                <div className='w-[40%] m-auto py-[285px]'>
                    <Paypal />
                </div>

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

