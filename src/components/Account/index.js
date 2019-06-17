import React from "react";

import PwForgetWithFirebase from "../PasswordForget";
import PasswordChange from "../PasswordChange";

class Account extends React.Component {
    render() {
        return (
            <div>
                <PasswordChange />
                <PwForgetWithFirebase />
            </div>
        )
    }
}


export default Account;