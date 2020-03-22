import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropType from 'prop-types'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
        }
        // console.log(newUser);
        this.props.loginUser(newUser)

    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container">
                <div className="login">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">登录</h1>
                            <p className="lead text-center">用正确的账号登录</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type='email'
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    type='password'
                                    placeholder="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropType.func.isRequired,
    auth: PropType.object.isRequired,
    errors: PropType.object.isRequired
}

//将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
