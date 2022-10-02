import React, { Component } from 'react';
import './Doctor.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import osteoarthritisImg from "../../../assets/doctor/co-xuong-khop.jpg";
import mentalityImg from "../../../assets/doctor/tam-ly.jpg";
import dermatologyImg from "../../../assets/doctor/da-lieu.jpeg";
import covidImg from "../../../assets/doctor/covid.jpg";
import mentalImg from "../../../assets/doctor/suc-khoe-tam-than.jpg";
import digestImg from "../../../assets/doctor/tieu-hoa.jpg";
import medicalImg from "../../../assets/doctor/noi-khoa.jpg";
import pediatricImg from "../../../assets/doctor/khoa-nhi.jpg";






class Doctor extends Component {



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
            <div className='section-doctor'>
                <div className='share-container'>
                    <div className='doctor-header my-5'>
                        <span className='tilte-spec text-center'><FormattedMessage id="homeheader.doctors" /></span>
                        <button className='text-center bg-zinc-300 p-2'><FormattedMessage id="homeheader.see" /></button>
                    </div>
                    <div className='doctor-body'></div>
                    <Slider {...settings}>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={osteoarthritisImg} alt='' />
                            <div className='text-doctor'>Thạc sĩ, Bác sĩ <b>Mai Duy Linh</b><p>Cơ Xương Khớp</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={mentalityImg} alt='' />
                            <div className='text-doctor'>Bác sĩ Chuyên khoa II <b>Trần Minh Khuyên</b><p>Tư vấn, trị liệu tâm lý</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={dermatologyImg} alt='' />
                            <div className='text-doctor'>Thạc sĩ, Bác sĩ <b>Nguyễn Ngọc Trai</b><p>Da liễu</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={covidImg} alt='' />
                            <div className='text-doctor'>Bác sĩ Chuyên khoa I <b>Lâm Thùy Nga</b><p>Tư vấn F0 Covid-19, Nội tổng quát, Nội thần kinh</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={mentalImg} />
                            <div className='text-doctor'>Thạc sĩ, Bác sĩ <b>Lê Tấn Lợi</b><p>Sức khỏe tâm thần, Nội thần kinh</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={digestImg} alt='' />
                            <div className='text-doctor'>Tiến sĩ, Bác sĩ <b>Nguyễn Thị Út</b><p>Nội tiêu hóa</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={medicalImg} alt='' />
                            <div className='text-doctor'>Bác sĩ Chuyên khoa II <b>Phạm Thị Bích Loan</b><p>Nội khoa</p></div>
                        </div>
                        <div className='doctor-customize'>
                            <img className='rounded-full m-auto' style={{height:"140px", width:"140px"}} src={pediatricImg} alt='' />
                            <div className='text-doctor'>Bác sĩ Chuyên khoa II <b>Phạm Thị Minh Hà</b><p>Nhi Khoa</p></div>
                        </div>
                    </Slider>
                </div>
            </div>


        );
    }

}

export default Doctor;
