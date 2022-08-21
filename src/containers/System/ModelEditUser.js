import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModelEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            // gender: '',
            // roleId: '',
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'password',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
            })
        }
        console.log('componentDidMount', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleUserModal();
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        }, () => {
            console.log('check: ', this.state)
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className={'modal-container'} size="lg">
                <ModalHeader toggle={() => { this.toggle() }}>Edit user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} disabled
                                placeholder="Email" onChange={(event) => { this.handleOnChangeInput(event, "email") }} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} disabled
                                placeholder="Password" onChange={(event) => { this.handleOnChangeInput(event, "password") }} />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={this.state.firstName}
                                placeholder="First Name" onChange={(event) => { this.handleOnChangeInput(event, "firstName") }} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={this.state.lastName}
                                placeholder="Last Name" onChange={(event) => { this.handleOnChangeInput(event, "lastName") }} />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" name="address" value={this.state.address}
                                placeholder="1234 Main St" onChange={(event) => { this.handleOnChangeInput(event, "address") }} />
                        </div>
                    </div>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input type="text" className="form-control" name="phonenumber" value={this.state.phonenumber}
                                onChange={(event) => { this.handleOnChangeInput(event, "phonenumber") }} />
                        </div>
                        {/* <div className="input-container">
                            <label htmlFor="gender">Sex</label>
                            <select name="gender" className="form-select">
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                                <option value="2">Other...</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label htmlFor="role">Role</label>
                            <select name="role" className="form-select">
                                <option value="0">Admin</option>
                                <option value="1">Doctor</option>
                                <option value="2">Patient</option>
                            </select>
                        </div> */}
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleSaveUser() }}>Save</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);



