import React, { Component } from 'react';
import './News.scss';
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
import NewsBlock from './News/NewsBlock';


class News extends Component {



    render() {
        let settings = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-news'>
                <div className='news-container'>
                    <div className='news-header mt-5 mb-6'>
                        <h2 className='text-7xl text-center'><FormattedMessage id="homeheader.news" /></h2>
                    </div>
                    <div className='news-body'></div>
                    <Slider {...settings}>
                        <NewsBlock image={osteoarthritisImg} text={"Xét nghiệm nội tiết bao nhiêu tiền? Xét nghiệm nội tiết thường bao gồm những xét nghiệm lẻ có giá giao động từ 100.000 - 200.000đ"} />
                        <NewsBlock image={osteoarthritisImg} text={"Xét nghiệm nội tiết bao nhiêu tiền? Xét nghiệm nội tiết thường bao gồm những xét nghiệm lẻ có giá giao động từ 100.000 - 200.000đ"} />
                        <NewsBlock image={osteoarthritisImg} text={"Xét nghiệm nội tiết bao nhiêu tiền? Xét nghiệm nội tiết thường bao gồm những xét nghiệm lẻ có giá giao động từ 100.000 - 200.000đ"} />
                        <NewsBlock image={osteoarthritisImg} text={"Xét nghiệm nội tiết bao nhiêu tiền? Xét nghiệm nội tiết thường bao gồm những xét nghiệm lẻ có giá giao động từ 100.000 - 200.000đ"} />
                    </Slider>
                </div>
            </div>


        );
    }

}

export default News;