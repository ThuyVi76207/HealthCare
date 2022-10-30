import React, { Component } from 'react';
import './News.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllNews } from '../../../services/userService';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNews: []
        }
    }
    async componentDidMount() {
        let res = await getAllNews();
        console.log("Check New", res);
        if (res && res.errCode === 0) {
            this.setState({
                dataNews: res.data ? res.data : []
            })
        }
    }
    handleViewDeatailNews = (item) => {
        console.log('View infor:', item)
        if (this.props.history) {
            this.props.history.push(`/detail-news/${item.id}`);
        }

    }

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
        let { dataNews } = this.state;
        return (
            <div className='section-news'>
                <div className='news-container'>
                    <div className='news-header mt-5 mb-6'>
                        <h2 className='text-7xl text-center'><FormattedMessage id="homeheader.news" /></h2>
                    </div>
                    <div className='news-body'></div>
                    <Slider {...settings}>
                        {
                            dataNews && dataNews.length > 0 &&
                            dataNews.map((item, index) => {
                                return (

                                    <div className='mx-2'
                                        key={index}
                                        onClick={() => { this.handleViewDeatailNews(item) }}
                                    >
                                        <img className="img-news" src={item.image} alt='' />
                                        <div className='text-center mt-2'> {item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));