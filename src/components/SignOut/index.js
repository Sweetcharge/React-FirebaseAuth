import React from "react";
import { FirebaseContext } from '../Firebase';
import { withRouter } from 'react-router-dom';

import * as ROUTES from "../../constants/routes";

class SignOut extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.SignOut = this.SignOut.bind(this);
    }

    SignOut(e, firebase) {
        e.preventDefault;
        firebase
            .doSignOut()
            .then(authUser => {
                this.props.history.push(ROUTES.LANDING);
            })
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => (
                    <button onClick={e => (e, this.SignOut(e, firebase))}> Sign out </button>
                )}
                
            </FirebaseContext.Consumer>
        )
    }
}

const SignOutWithRouter = withRouter(SignOut);

export default SignOutWithRouter;