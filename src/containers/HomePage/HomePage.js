import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MaiLayout from '../../layouts/MaiLayout';
import BannerImg1 from '../../assets/Banner/Banner1.jpg';
import BannerImg2 from '../../assets/Banner/Banner2.png';

import "../HomePage/HomePageStyle.scss"
import SearchBox from '../../components/Search/SearchBox';
import Doctor from './Section/Doctor';
import Specialty from './Section/Specialty';
import News from './Section/News';
import About from './Section/About';
import ChatMessager from '../../components/ChatMessager/ChatMessager';

class HomePage extends Component {

    // handleAfterChange = (event, slick, currentSlide) => {
    // }

    render() {
        let settings = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            //afterChange: this.handleAfterChange
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };
        return (
            <MaiLayout>
                <div className='pt-[2px] home-sl'>
                    <Slider {...settings}>
                        <div className=''>
                            <img className='img-home' src={BannerImg1} alt='' />
                        </div>
                        <div className=''>
                            <img className='img-home' src={BannerImg2} alt='' />
                        </div>
                    </Slider>
                    <SearchBox />
                    <Specialty />
                    <Doctor />
                    <News />
                    <About />
                    <ChatMessager />
                </div>


            </MaiLayout>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
