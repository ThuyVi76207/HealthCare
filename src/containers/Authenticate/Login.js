import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import e from 'cors';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        // this.setState({
        //     errMessage: ''
        // })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password);
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.errMessage
                    })
                }
            }
            console.log('Error message', e.response);
        }

    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="form-login">
                            <h3 className="heading"><b>????ng nh???p</b></h3>
                            {/* <p className="desc">????ng nh???p ????? s??? d???ng d???ch v???</p> */}
                            <div className="spacer"></div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" placeholder="demo@gmail.com"
                                    value={this.state.email} onChange={(e) => this.handleOnChangeEmail(e)} className="form-control" />
                                <span className="form-message"></span>
                            </div>

                            <div className="form-group">
                                <label className="form-label">M???t kh???u</label>
                                <div className="input-password">
                                    <input id="password" name="password" autoComplete="on" type={this.state.isShowPassword ? 'text' : 'password'} placeholder="Nh???p m???t kh???u"
                                        value={this.state.password} onChange={(e) => this.handleOnChangePassword(e)} className="form-control"
                                        onKeyDown={(event) => this.handleKeyDown(event)}
                                    />
                                    <span onClick={() => { this.handleShowPassword() }}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span>

                                </div>

                                <span className="col-12 error" style={{ color: 'red' }}>{this.state.errMessage}</span>
                            </div>

                            <div className="forgot-password col-4">
                                <span>Qu??n m???t kh???u?</span>
                            </div>

                            <button className="form-submit" onClick={() => { this.handleLogin() }}>????ng nh???p</button>

                            <div className="col-12 md-3 text-center other-login">
                                <span className="login-with">????ng nh???p v???i</span>
                            </div>
                            <div className="auth-form__socials">
                                <a href="" className="auth-form__socials--facebook btn btn--size-s btn--with-icon">
                                    <i className="auth-form__social-face fab fa-facebook-f"></i>
                                </a>
                                <a href="" className="auth-form__socials--gg btn btn--size-s btn--with-icon">
                                    <i className="auth-form__social-google fab fa-google"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
