import React from "react";
import './landingStyle.css';

import { Link } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

class Landing extends React.Component {
    render() {
        return (
            <div className="landing-container">
                <div className="landing-hero">
                    <p className="landing-title">React-Firebase-Login</p>
                    <img src={require('./hero.jpg')} />
                </div>
                <br></br>
                <Link className="landing-actions" to={ROUTES.SIGN_IN}>Sign in</Link>
                <Link className="landing-actions" to={ROUTES.SIGN_UP}>Sign up</Link>
            </div>
        )
    }
}


export default Landing;