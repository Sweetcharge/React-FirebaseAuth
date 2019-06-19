import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
     this.listener = this.props.firebase.auth.onAuthStateChanged(
            authenticatedUser => {
            authenticatedUser ?
            this.setState({ authUser: authenticatedUser}) :
            this.setState({ authUser: null})
            },
        );    
    }

    componentWillMount() {
        this.listener;
    }

    render() {
        return (
            <Router>
                <Navigation authUser={this.state.authUser}/>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route exact path={ROUTES.HOME} component={HomePage} />
                <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            </Router>
        );
    }
}

export default withFirebase(App);