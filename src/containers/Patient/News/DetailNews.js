import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailNews.scss';
import MaiLayout from '../../../layouts/MaiLayout';
import { getAllNewsById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from "../../../utils";
import { convertDateToDateTime } from "../../../functions/index"

class DetailNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailNews: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllNewsById({
                id: id,
                location: 'ALL'
            });

            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailNews: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllNewsById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailNews: res.data,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailNews, listProvince } = this.state;
        let { language } = this.props;
        console.log('detailNews', this.state)
        let imageBase64 = '';
        if (dataDetailNews.image) {
            imageBase64 = new Buffer(dataDetailNews.image, 'base64').toString('binary');
        }
        let createDate = convertDateToDateTime(dataDetailNews.createdAt);
        let updateDate = convertDateToDateTime(dataDetailNews.updatedAt);
        return (
            <MaiLayout>
                <div className='detail-news-container'>
                    <div className='detail-news-body'>
                        {dataDetailNews && !_.isEmpty(dataDetailNews)
                            &&
                            (
                                <>
                                    <h2 className='title-new'>{dataDetailNews.name}</h2>
                                    <div className='flex mt-2 text-gray-400'><FormattedMessage id="admin.news.created-at" />
                                        <p className='px-2'>{createDate}</p><FormattedMessage id="admin.news.updated-at" /><p className='px-2'>{updateDate}</p>
                                    </div>

                                    <div
                                        className='content'
                                        style={{ backgroundImage: `url(${imageBase64})` }}>

                                    </div>

                                    <div dangerouslySetInnerHTML={{ __html: dataDetailNews.descriptionHTML }}></div>
                                </>
                            )


                        }
                    </div>
                </div>

            </MaiLayout>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailNews);

