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
        let hasOldData = this.state;
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
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
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
                hasOldData: false
            })
        }

    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    // onEditorStateChange = ({ text }) => {
    //     this.setState({
    //         contentMarkdown: text,
    //     });
    // };


    render() {
        let { hasOldData } = this.state;
        console.log("thisState: ", this.state.hasOldData)
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
                {/* <div className='h-[500px] w-[95%] m-auto border border-gray-400'>
                    <Editor

                        contentMarkdown={this.state.contentMarkdown}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.state.onEditorStateChange}

                    />
                </div> */}

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
