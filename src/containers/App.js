import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import HomePage from './HomePage/HomePage';
import { path } from '../utils'
import Doctor from '../routes/Doctor';
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Authenticate/Login';
import Header from './Header/Header';
import System from '../routes/System';
import VerifyEmail from './Patient/VerifyEmail';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import ContactContent from './Navbar/ContactContent';
import RoomContent from './VideoCall3/RoomContent.js';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import Paypal from '../components/Paypal/Paypal';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
    "client-id": "AXGWIbw1YJre4l-GsPxWgxjhQC-2b6M8c9-p8lXJ2A0yTOtEPSkEFHNqGBK9zesH0a7AJ6YphVuusxJW",
    currency: "USD",
    intent: "capture",
    // "data-client-token": "abc123xyz==",
}; // Thường cái này xử lý ở backend tránh lộ securitykey với client key dễ bị hack

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {

        return (
            <Fragment>
                <PayPalScriptProvider options={initialOptions}>
                    {/* <Paypal /> */}

                    <Router history={history}>
                        <div className="main-container">

                            {/* {this.props.isLoggedIn && <Header />} */}

                            <div className="content-container">
                                {/* <CustomScrollbars style={{ height: "720px", width: "100%" }}> */}
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path='/contact' component={ContactContent}></Route>
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    <Route path='/room' component={RoomContent}></Route>
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path='/payment/paypal' component={Paypal} />

                                </Switch>
                                {/* </CustomScrollbars> */}
                            </div >

                            {/* <ToastContainer
                                className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                closeButton={<CustomToastCloseButton />}
                            /> */}
                            < ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                            {/* Same as */}
                            < ToastContainer />
                        </div >
                    </Router >
                </PayPalScriptProvider>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);