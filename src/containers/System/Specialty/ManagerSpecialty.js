import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagerSpecialty.scss';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManagerSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,

        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                image: base64,

            })
        }
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty success!!')
            this.setState({
                name: '',
                image: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Something wrong...')
            console.log('>>>> Checktoast', res)
        }
        console.log('>>> Checkstate', this.state)
    }


    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'><FormattedMessage id="admin.manage-specialty.title" /></div>
                {/* <div className='btn-add-new-specialty'>
                    <button>Add new</button>
                </div> */}
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label className='mb-[5px] text-[1.1rem] font-medium'><FormattedMessage id="admin.manage-specialty.name" /></label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='mb-[5px] text-[1.1rem] font-medium'><FormattedMessage id="admin.manage-specialty.image" /></label>
                        <input className='form-control-file block text-[14px] m-[5px]'
                            type='file' onChange={(event) => this.handleOnChangeImage(event, 'image')}
                        />
                    </div>
                    <div className='col-12 mt-[15px]'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 btn-save-specialty'>
                        <button onClick={() => this.handleSaveNewSpecialty()}>Lưu</button>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        laguage: state.app.laguage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);

