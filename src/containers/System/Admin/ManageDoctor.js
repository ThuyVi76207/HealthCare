import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from "../../../services/userService";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from 'draft-js';
// import './ManageDoctor.scss';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            // contentMarkdown: EditorState.createEmpty(),
            selectedDoctor: '',
            description: '',
            listDortors: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.value_Vi} VNĐ`;
                    let labelEn = `${item.value_En} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.value_Vi}`;
                    let labelEn = `${item.value_En}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDortors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDortors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }

    handleSaveContentMaskdown = () => {
        let hasOldData = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPayment: this.state.selectedPayment.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectSpecialty.value
        })
        console.log('Save handle', hasOldData)

    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state;

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.error === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '', note = '', paymentId = '',
                priceId = '', provinceId = '', selectedPrice = '',
                selectedPayment = '', selectedProvince = ''

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                });
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                });
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                });

                console.log('check selected', selectedProvince, selectedPayment, selectedPrice)
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince
            })
            console.log('Check:', res.data)
            console.log('Check html', res.data.Markdown.contentHTML)
            console.log('Check Mark', res.data.Markdown.contentMarkdown)
            console.log('Check des', res.data.Markdown.description)

        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: ''
            })
        }
        console.log('Check: ', res.data.Doctor_Infor);
    };

    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    // onEditorStateChange = ({ text }) => {
    //     this.setState({
    //         contentMarkdown: text,
    //     });
    // };


    render() {
        let { hasOldData, listSpecialty } = this.state;
        console.log('check run to render', this.state)
        return (
            <div className='my-[25px]'>
                <h2 className='text-center text-[30px] font-semibold mb-8'><FormattedMessage id="admin.manage-doctor.title" /></h2>
                <div className='flex justify-around my-[40px]'>
                    <div className='w-[40%]'>
                        <label className='my-[5px]'><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDortors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.value-doctor" />}
                        />
                    </div>
                    <div className='form-group w-[50%]'>
                        <label className='my-[5px]'><FormattedMessage id="admin.manage-doctor.infor" /></label>
                        <textarea className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                {/* <div className='h-[500px] w-[95%] m-auto border border-gray-400'>
                    <Editor

                        contentMarkdown={this.state.contentMarkdown}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.state.onEditorStateChange}

                    />
                </div> */}

                <div className="more-infor-extra row">
                    <div className="col-4 form-group mb-[15px]">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group mb-[15px]">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-payment" />}
                            name="selectedPayment"
                        />
                    </div>

                    <div className="col-4 form-group mb-[15px]">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-provice" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-4 form-group mb-[15px]">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>

                    <div className="col-4 form-group mb-[15px]">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>

                    <div className="col-4 form-group mb-[15px]">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                    <div className="col-4 form-group mb-[15px]">
                        <label className='mb-2'><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectSpecialty"
                        />

                    </div>
                </div>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />

                <div className='mt-[25px] ml-[34px]'>
                    <button onClick={() => this.handleSaveContentMaskdown()}
                        className={`p-1 ${hasOldData === true ? 'bg-orange-500' : 'border hover:bg-slate-400'}`}>
                        {
                            hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                        }
                    </button>
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
