import React, { Component } from 'react';
import { connect } from "react-redux";
import MaiLayout from '../../../layouts/MaiLayout';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.error === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {


        let { detailDoctor } = this.state;
        let { laguage } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.value_Vi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.value_En}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        console.log('DetailDoctor:', detailDoctor)
        return (
            <>
                <MaiLayout>
                    <div className='doctor-detail-container'>
                        <div className='intro-doctor'>
                            <div
                                className='content-left'
                                style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                            </div>
                            <div className='content-right'>
                                <div className='up'>
                                    {laguage === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className='down'>
                                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                        &&
                                        <span>
                                            {detailDoctor.Markdown.description}
                                        </span>}
                                </div>
                            </div>
                        </div>
                        <div className='schedule-doctor'>

                        </div>
                        <div className='detail-infor-doctor'>
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                            }
                        </div>
                        <div className='comment-doctor'>

                        </div>
                    </div>
                </MaiLayout>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        laguage: state.app.laguage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

