import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDortors: [],
            hasOldData: false,
        }
    }


    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDortors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDortors: dataSelect
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
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        console.log('Save handle', hasOldData)
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.error === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdow,
                description: markdown.description,
                hasOldData: true
            })

        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        console.log('Check: ', res);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        console.log("thisState: ", this.state)
        return (
            <div className='my-[25px]'>
                <h2 className='text-center text-[30px] font-semibold mb-8'>TẠO THÊM THÔNG TIN BÁC SĨ </h2>
                <div className='flex justify-around my-[40px]'>
                    <div className='w-[40%]'>
                        <label className='my-[5px]'>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDortors}
                        />
                    </div>
                    <div className='form-group w-[50%]'>
                        <label className='my-[5px]'>Thông tin giới thiệu</label>
                        <textarea className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />
                <div className='m-3'>
                    <button onClick={() => this.handleSaveContentMaskdown()}
                        className={`p-1 ${hasOldData ? 'bg-orange-500' : 'border hover:bg-slate-400'}`}>
                        {
                            hasOldData ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
