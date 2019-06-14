import React from "react";

import { Link } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

class Landing extends React.Component {
    render() {
        return (
            <div>
                Landing page (You haven't signed in yet!)
                <br></br>
                <Link className="sign-in-text" to={ROUTES.SIGN_IN}>Sign in now</Link>
            </div>
        )
    }
}


export default Landing;