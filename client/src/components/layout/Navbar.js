import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { logout } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
class Navbar extends Component {

    LogOut(e) {
        e.preventDefault();
        this.props.clearCurrentProfile()
        this.props.logout()
    }

    render() {

        const { isAuthenticated, user } = this.props.auth

        const guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/register'>注册</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">登录</Link>
                </li>
            </ul>
        )

        const authLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                        评论
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.LogOut.bind(this)} style={{ cursor: 'pointer' }}>
                        <img className="rounded-circle" style={{ width: '25px', marginRight: '5px' }} src={user.avatar} alt="" />
                        登出
                    </a>
                </li>
            </ul>
        )
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">NBB</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profiles"> 开发者 </Link>
                                </li>
                            </ul>
                            {
                                isAuthenticated ? authLink : guestLink
                            }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logout: PropType.func.isRequired,
    auth: PropType.object.isRequired,
}

//将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout, clearCurrentProfile })(Navbar);