import React, { Component } from 'react';
import { connect } from "react-redux";
import MaiLayout from '../../../layouts/MaiLayout';
import './ManagerSpecialty.scss';
import { LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManagerSpecialty extends Component {



    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        return (
            <MaiLayout>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Quản lý chuyên khoa</div>
                    <div className='btn-add-new-specialty'>
                        <button>Add new</button>
                    </div>
                    <div className='all-specialty'>

                    </div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                    // onChange={this.handleEditorChange}
                    // value={this.state.contentMarkdown}
                    />
                </div>
            </MaiLayout>
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

