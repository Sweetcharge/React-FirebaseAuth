import React from "react";
import "../form-style.css";

import { Link, withRouter } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from "../../constants/routes";

class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e, firebase) {
        e.preventDefault();
        firebase
            .doSignInWithEmailAndPassword(this.state.email, this.state.password)
            .then(authenticatedUser => {
                this.setState({
                    email: '',
                    password: '',
                    error: null
                })
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const isInvalidInput = 
            this.state.email === '' ||
            this.state.password === '';
        return (
            <div className="SignIn">
                <FirebaseContext.Consumer>
                {firebase => 
                    (
                        <div>
                            <form onSubmit={e => (this.formSubmit(e, firebase))}>
                                <p className="formTitle">Sign in</p>
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}
                                />
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleOnChange}
                                />
                                <button disabled={isInvalidInput}>Sign in</button>
                                <br/>
                                {this.state.error && <p className="errorMessage" >{this.state.error.message}</p>}
                                <Link className="sign-in-forgot-link" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
                            </form>
                            <p className="sign-in-signup-title">Don't have an account? 
                            <Link className="sign-in-signup-link"to={ROUTES.SIGN_UP}> Sign up</Link>
                            </p>
                        </div>
                    )
                }
                </FirebaseContext.Consumer>
            </div>
        )
    }
}

const signInWithRouter = withRouter(SignIn);

export default SignIn;
export { signInWithRouter };