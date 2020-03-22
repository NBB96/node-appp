import React, { Component } from 'react'
import PropType from 'prop-types'
import TextFieldGroup from '../../common/TextFieldGroup'
/** react-redux 的两个最主要功能
 *  connect: 用于从 UI 组件生成容器组件, 将两种组件连起来
 *  Provider: 可以让组件及子组件拿到state
 */
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../actions/authActions'

class Rigister extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        // console.log(newUser);

        //调用action
        this.props.registerUser(newUser, this.props.history)
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const { errors } = this.state;
        // const { user } = this.props.auth;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    type='email'
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                                />
                                <TextFieldGroup
                                    type='password'
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    type='password'
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Rigister.propTypes = {
    registerUser: PropType.func.isRequired,
    auth: PropType.object.isRequired,
    errors: PropType.object.isRequired
}


//将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Rigister))
