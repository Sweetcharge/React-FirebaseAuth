import React from "react";
import { Link } from 'react-router-dom';
import "./navigationStyle.css";

import SignOutWithRouter from '../SignOut';
import * as ROUTES from '../../constants/routes';

export default function Navigation(props) {
    return (
        <div className="Navigation">{props.authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
    )
}

const NavigationAuth = () => (
    <ul>
        <li>
            <Link className="navigation-link" to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link className="navigation-link" to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link className="navigation-link" to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
            <SignOutWithRouter />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link className="navigation-link" to={ROUTES.LANDING}>Home</Link>
        </li>
        <li>
            <Link className="navigation-link" to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link className="navigation-link" to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
    </ul>
);