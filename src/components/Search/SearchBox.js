import '../Search/SearchBoxStyle.scss';
import { FormattedMessage } from 'react-intl';

export default function SearchBox() {
    return (
        <div className='content-up'>
            <div className='title1'><FormattedMessage id="homeheader.title1" /></div>
            <div className='title2'><FormattedMessage id="homeheader.title2" /></div>
            <div className='search'>
                <i className='pl-1'>
                    <ion-icon name="search-outline"></ion-icon>
                </i>
                <input type='text' placeholder='Tim tu khoa kham benh' />
            </div>
        </div>
    )
}