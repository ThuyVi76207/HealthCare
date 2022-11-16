import React, { Component } from 'react';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from "react-router";
import { connect } from 'react-redux';


class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log("Check Specialty", res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    handleViewDeatailSpecialty = (item) => {
        console.log('View infor:', item)
        if (this.props.history) {
            this.props.history.push(`/detail-speacilty/${item.id}`);
        }

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        let { dataSpecialty } = this.state;


        return (
            <div className='section-specialty'>
                <div className='share-container'>
                    <div className='specialty-header'>
                        <span className='tilte-spec text-center'><FormattedMessage id="homeheader.specialties" /></span>
                        <button className='text-center bg-zinc-300 p-2'><FormattedMessage id="homeheader.see" /></button>
                    </div>
                    <div className='specialty-body'></div>
                    <Slider {...settings}>
                        {
                            dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='specialty-customize'
                                        key={index}
                                        onClick={() => { this.handleViewDeatailSpecialty(item) }}
                                    >
                                        <img className='img-sp' src={item.image} alt='' />
                                        <div className='text-specialty'>
                                            {/* <FormattedMessage id="homeheader.musculoskeletal" /> */}
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

        //getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));