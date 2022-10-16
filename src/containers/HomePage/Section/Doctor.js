import React, { Component } from 'react';
import './Doctor.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router"

class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = (doctor) => {
        console.log('View infor:', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }


    render() {
        console.log("data:", this.props.topDoctorsRedux)
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props
        //arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-doctor'>
                <div className='share-container'>
                    <div className='doctor-header my-5'>
                        <span className='tilte-spec text-center'><FormattedMessage id="homeheader.doctors" /></span>
                        <button className='text-center bg-zinc-300 p-2'><FormattedMessage id="homeheader.see" /></button>
                    </div>
                    <div className='doctor-body'></div>
                    <Slider {...settings}>
                        {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName}`;
                            let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`;
                            return (
                                <div className='doctor-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                    <img className='doctor-image rounded-full m-auto' style={{ height: "140px", width: "140px", backgroundImage: `url(${imageBase64})` }} alt='' />
                                    <div className='text-doctor'><b>{language === LANGUAGES.VI ? nameVi : nameEn}</b><p>Cơ Xương Khớp</p></div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
        //getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
//export default Doctor;