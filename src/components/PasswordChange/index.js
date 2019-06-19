import React from "react";
import "../form-style.css"

import { FirebaseContext } from "../Firebase";

class PasswordChange extends React.Component {
    constructor() {
        super()
        this.state = {
            passwordOne: '',
            passwordTwo: '',
            error: null
        }
        this.formSubmit = this.formSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    formSubmit(e, firebase) {
        e.preventDefault();
        if(this.state.passwordOne != this.state.passwordTwo) {
            alert("Passwords are different, try again");
        } else {
            firebase.doPasswordUpdate(this.state.passwordOne)
            .then(() => {
                this.setState({
                    passwordOne: '',
                    passwordTwo: '',
                    error: null
                }) 
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
        }
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const isInvalidInput = 
            this.state.passwordOne == '' ||
            this.state.passwordTwo == '' ||
            this.state.passwordOne != this.state.passwordTwo;
        return (
            <div className="PasswordChange">
                <FirebaseContext.Consumer>
                    {firebase => (
                        <form onSubmit={e => (this.formSubmit(e, firebase))}>
                            <p className="formTitle">Change Password</p>
                            <label>New password</label>
                            <input 
                                type="password" 
                                name="passwordOne"
                                value={this.state.passwordOne}
                                onChange={this.handleOnChange}
                            />
                            <label>Confirm new password</label>
                            <input 
                                type="password" 
                                name="passwordTwo"
                                value={this.state.passwordTwo}
                                onChange={this.handleOnChange}
                            />
                            <button disabled={isInvalidInput}>Change password</button>
                            <br/>
                            {this.state.error && <p className="errorMessage" >{this.state.error.message}</p>}
                        </form>
                    )}
                </FirebaseContext.Consumer>
            </div>
        )
    }
}

export default PasswordChange;