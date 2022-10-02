import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <table id="tableManageUser">
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>

                    <tr key={'index'}>
                        <td>{'item.firstName'}</td>
                        <td>{'item.lastName'}</td>
                        <td>{'item.email'}</td>
                        <td>{'item.address'}</td>
                        <td>{'item.phonenumber'}</td>
                        <td>
                            <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn-delete"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>

                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
