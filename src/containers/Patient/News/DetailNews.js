import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailNews.scss';
import MaiLayout from '../../../layouts/MaiLayout';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
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

            // let resProvince = await getSettingService('PROVINCE')

            if (res && res.errCode === 0) {
                //     let data = res.data;
                //     let arrDoctorId = [];
                //     if (data && !_.isEmpty(res.data)) {
                //         let arr = data.doctorSpecialty;
                //         if (arr && arr.length > 0) {
                //             arr.map(item => {
                //                 arrDoctorId.push(item.doctorId)
                //             })
                //         }
                //     }

                //     let dataProvince = resProvince.data;
                //     if (dataProvince && dataProvince.length > 0) {
                //         dataProvince.unshift({
                //             createAt: null,
                //             keyMap: "ALL",
                //             type: "PROVINCE",
                //             value_En: "ALL",
                //             value_Vi: "Toàn quốc"
                //         })
                //     }

                this.setState({
                    dataDetailNews: res.data,
                    // arrDoctorId: arrDoctorId,
                    // listProvince: dataProvince
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
                // let data = res.data;
                // let arrDoctorId = [];
                // if (data && !_.isEmpty(res.data)) {
                //     let arr = data.doctorSpecialty;
                //     if (arr && arr.length > 0) {
                //         arr.map(item => {
                //             arrDoctorId.push(item.doctorId)
                //         })
                //     }
                // }
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
                                    <div className='flex mt-2 text-gray-400'>Đã tạo lúc:
                                        <p className='px-2'>{createDate}</p> - cập nhật lúc: <p className='px-2'>{updateDate}</p>
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
                    {/* <div className='province-specialty'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)} className='province-specialty-btn'>
                            {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.value_Vi : item.value_En}
                                    </option>
                                )
                            })}
                        </select>
                    </div> */}

                    {/* {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='pt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowDetailInfor={true}
                                            />
                                        </div>
                                    </div>
                                    <div className='pt-content-right'>
                                        <div className='doctor-schdule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>
                                </div>

                            )
                        })
                    } */}
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

