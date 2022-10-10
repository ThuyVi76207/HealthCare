import React, { Component } from 'react';
import { connect } from "react-redux";
import MaiLayout from '../../../layouts/MaiLayout';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';

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
            console.log('Res:', res)

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {


        let { detailDoctor } = this.state;
        console.log('DetailDoctor:', detailDoctor)
        return (
            <>
                <MaiLayout>
                    <div className='doctor-detail-container'>
                        <div className='intro-doctor'>
                            <div
                                className='content-left'
                                style={{ backgroundImage: `url(${detailDoctor.image})` }}>

                            </div>
                            <div className='content-right'>
                                <div className='up'>Phos giaso suw</div>
                                <div className='down'>
                                    {detailDoctor.MarkDown && detailDoctor.MarkDown.description
                                        &&
                                        <span>
                                            {detailDoctor.MarkDown.description}
                                        </span>}
                                </div>
                            </div>
                        </div>
                        <div className='schedule-doctor'>

                        </div>
                        <div className='detail-infor-doctor'>

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
        DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

