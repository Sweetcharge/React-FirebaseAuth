import React from "react";

import { FirebaseContext } from "../Firebase";


class PasswordForget extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            error: null
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmit(e, firebase) {
        e.preventDefault();
        firebase.doPasswordReset(this.state.email)
            .then(() => {
                this.setState({
                    email: '',
                    error: null
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    render() {
        const isInvalidInput = 
            this.state.email === '';
        return (
            <div>
                <FirebaseContext.Consumer>
                    {firebase => (
                        <form onSubmit={e => (this.formSubmit(e, firebase))}>
                            <p className="forgotPasswordLabel">Forgot password</p>
                            <label>Email</label>
                            <input 
                                type="text" 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleOnChange}
                            />
                            <button>Retrieve password</button>
                            <br/>
                            {this.state.error && <p className="errorMessage" >{this.state.error.message}</p>}
                        </form>
                    )}
                </FirebaseContext.Consumer>
            </div>
        )
    }
}

export default PasswordForget;
