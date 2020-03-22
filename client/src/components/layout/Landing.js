import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropType from 'prop-types'

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">开发者</h1>
                                <p className="lead">
                                    更多内容
              </p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">注册</Link>
                                <Link to="/login" className="btn btn-lg btn-light">登录</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Landing.propTypes = {
    auth: PropType.object.isRequired,
}

//将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(Landing)
