import React from "react";

import { FirebaseContext } from "../Firebase";
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    formSubmit(e, firebase) {
        e.preventDefault();
        firebase
            .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return firebase
                  .user(authUser.user.uid)
                  .set({
                    username: this.state.username,
                    email: this.state.email,
                  });
              })
            .then(() => {
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    error: null
                });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            });
    }

    render() {
        const isInvalidInput = 
            this.state.email === '' ||
            this.state.username === '' ||
            this.state.password === '';
        return (
            <div>
                <FirebaseContext.Consumer>
                    {firebase => (
                        <form onSubmit={e => {this.formSubmit(e, firebase)}}>
                        <p>Sign Up</p>
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleOnChange}
                        />
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleOnChange}
                        />
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleOnChange}
                        />
                        <button disabled={isInvalidInput}>Sign up</button>
                        {this.state.error && <p className="errorMessage" >{this.state.error.message}</p>}
                        <br/>
                        </form>
                        )
                    }
                </FirebaseContext.Consumer>
            </div>
        )
    }
}
const signUpPagewithRouter = withRouter(SignUp);


export default SignUp;
export { signUpPagewithRouter };