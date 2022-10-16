import React, { Component } from 'react';
import './About.scss';
import { FormattedMessage } from 'react-intl';

class About extends Component {



    render() {

        return (
            <div className='bg-about'>
                <h2 className='text-center text-7xl text-black pt-14'>HCARE VIDEO</h2>
                <div className='flex p-24'>
                    <div className='content-about-left'>
                        <iframe className='' width="100%" height="400px"
                            src="https://www.youtube.com/embed/nAgCrYrmH3I"
                            title="The Future Of Hospitals - The Medical Futurist"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-about-right'>
                        <h2>HCARE</h2><FormattedMessage id="homeheader.Health-Care" />
                    </div>
                </div>
            </div>
        );
    }

}

export default About;