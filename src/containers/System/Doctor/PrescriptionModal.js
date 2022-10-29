import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './PrescriptionModal.scss';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import { LANGUAGES, CommonUtils } from "../../../utils";
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';

class PrescriptionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSendPrescription = () => {
        this.props.sendPrescription(this.state)
    }

    render() {
        let { isOpenModel, closePrescriptionModal, dataModal, sendPrescription } = this.props;
        return (
            <Modal isOpen={isOpenModel} toggle={closePrescriptionModal} centered>
                <ModalHeader toggle={closePrescriptionModal}>Gửi đơn thuốc</ModalHeader>
                <ModalBody>
                    <div className="col-6 form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" value={this.state.email}
                            onChange={(event) => this.handleEmailChange(event)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Chọn đơn thuốc</label>
                        <input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3 bg-orange-500 border-none hover:bg-orange-600" onClick={() => this.handleSendPrescription()}>Save</Button>{' '}
                    <Button className="px-3 bg-gray-400 border-none hover:bg-gray-600" onClick={closePrescriptionModal}>Close</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);

