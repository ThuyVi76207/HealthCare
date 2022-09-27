import React, { Component } from 'react';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import osteoarthritisImg from "../../../assets/specialty/co_xuong_khop.png";
import mentalityImg from "../../../assets/specialty/tam-ly.jpg";
import dermatologyImg from "../../../assets/specialty/da-lieu.jpg";
import covidImg from "../../../assets/specialty/tu-van-f0.jpg";
import mentalImg from "../../../assets/specialty/suc-khoe-tam-than.png";
import digestImg from "../../../assets/specialty/tieu-hoa.jpg";
import medicalImg from "../../../assets/specialty/noi-khoa.jpg";
import pediatricImg from "../../../assets/specialty/nhi-khoa.jpg";






class Specialty extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header my-5'>
                        <span className='tilte-spec text-center'><FormattedMessage id="homeheader.specialties" /></span>
                        <button className='text-center bg-zinc-300 p-2'><FormattedMessage id="homeheader.see" /></button>
                    </div>
                    <div className='specialty-body'></div>
                    <Slider {...settings}>
                        <div className='specialty-customize'>
                            <img src={osteoarthritisImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.musculoskeletal" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={mentalityImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.mentality" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={dermatologyImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.dermatology" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={covidImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.covid" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={mentalImg} />
                            <div className='text-specialty'><FormattedMessage id="homeheader.mental" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={digestImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.digest" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={medicalImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.medical" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img src={pediatricImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.pediatric" /></div>
                        </div>
                    </Slider>
                </div>
            </div>


        );
    }

}


export default Specialty;
