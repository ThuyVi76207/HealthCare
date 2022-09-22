import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/specialty/viem-khop.jpg";





class Specialty extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span> Chuyên khoa phổ biến</span>
                        <button>xem thêm</button>
                    </div>
                    <div className='specialty-body'></div>
                    <Slider {...settings}>
                        <div className='specialty-body'>
                            <img src={specialtyImg} />
                            <div>Cơ xuong khơp 1</div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={specialtyImg} />
                            <div>Cơ xuong khơp 2</div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={specialtyImg} />
                            <div>Cơ xuong khơp 3</div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={specialtyImg} />
                            <div>Cơ xuong khơp 4</div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={specialtyImg} />
                            <div>Cơ xuong khơp 5</div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={specialtyImg} />
                            <div>Cơ xuong khơp 6</div>
                        </div>
                    </Slider>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
