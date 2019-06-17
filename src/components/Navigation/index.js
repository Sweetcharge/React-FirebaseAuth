import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";

import SignOutWithRouter from '../SignOut';
import * as ROUTES from '../../constants/routes';

export default function Navigation(props) {
    return (
        <div>{props.authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
    )
}

const NavigationAuth = () => (
    <ul>
        <li>
            <Link className="text-link" to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link className="text-link" to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link className="text-link" to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
            <SignOutWithRouter />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link className="text-link" to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link className="text-link" to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);