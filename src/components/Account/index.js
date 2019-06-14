import React from "react";

class Account extends React.Component {
    render() {
        return (
            <div>
                <form className="changePasswordForm">
                    <p className="changePasswordLabel">Change Password</p>
                    <label>Old password</label>
                    <input type="text" name="password"></input>
                    <label>New password</label>
                    <input type="password" name="password"></input>
                    <label>Confirm new password</label>
                    <input type="password" name="password"></input>
                    <button>Change your password</button>
                    <br/>
                </form>

                <form className="resetPasswordForm">
                    <p className="resetPasswordLabel">Reset Password</p>
                    <label>Email</label>
                    <input type="text" name="email"></input>
                    <button>Reset password</button>
                    <br/>
                </form>
            </div>
        )
    }
}


export default Account;