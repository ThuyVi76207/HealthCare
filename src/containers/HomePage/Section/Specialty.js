import React, { Component } from 'react';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


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
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };


        return (
            <div className='section-specialty'>
                <div className='share-container'>
                    <div className='specialty-header'>
                        <span className='tilte-spec text-center'><FormattedMessage id="homeheader.specialties" /></span>
                        <button className='text-center bg-zinc-300 p-2'><FormattedMessage id="homeheader.see" /></button>
                    </div>
                    <div className='specialty-body'></div>
                    <Slider {...settings}>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={osteoarthritisImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.musculoskeletal" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={mentalityImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.mentality" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={dermatologyImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.dermatology" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={covidImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.covid" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={mentalImg} />
                            <div className='text-specialty'><FormattedMessage id="homeheader.mental" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={digestImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.digest" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={medicalImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.medical" /></div>
                        </div>
                        <div className='specialty-customize'>
                            <img className='img-sp' src={pediatricImg} alt='' />
                            <div className='text-specialty'><FormattedMessage id="homeheader.pediatric" /></div>
                        </div>
                    </Slider>
                </div>
            </div>


        );
    }

}


export default Specialty;