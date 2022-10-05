import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
        }
    }


    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
        console.log('Save handle', this.state)
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {

        return (
            <div className='my-[25px]'>
                <h2 className='text-center text-[30px] font-semibold mb-8'>TẠO THÊM THÔNG TIN BÁC SĨ </h2>
                <div className='flex justify-around my-[40px]'>
                    <div className='w-[40%]'>
                        <label className='my-[5px]'>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
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
                <MdEditor style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange} />
                <div className='m-3'>
                    <button onClick={() => this.handleSaveContentMaskdown()} className='bg-orange-500 p-1'>Lưu thông tin</button>
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        featchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
