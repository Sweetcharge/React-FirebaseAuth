import React from "react";

class PasswordForget extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <p className="forgotPasswordLabel">Forgot password</p>
                    <label>Email</label>
                    <input type="text" name="email"></input>
                    <label>Username</label>
                    <input type="text" name="username"></input>
                    <button>Retrieve password</button>
                    <br/>
                </form>
            </div>
        )
    }
}


export default PasswordForget;