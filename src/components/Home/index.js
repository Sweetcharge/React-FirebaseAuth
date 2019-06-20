import React from "react";
import "./home-style.css";

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { withFirebase, FirebaseContext } from "../Firebase";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            score: 0,
            uid: ''
        }
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    increase(e, firebase, props) {
        e.preventDefault();
        firebase
            .user(props.authUser.uid)
            .update({
                score: this.state.score + 1
            })
        this.setState(prevState => {
            return { score: prevState.score + 1 }
        })
    }

    decrease(e, firebase, props) {
        firebase
            .user(props.authUser.uid)
            .update({
                score: this.state.score - 1
            })
        this.setState(prevState => {
            return { score: prevState.score - 1 }
        })
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authenticatedUser => {
                authenticatedUser ?
                this.updateScore(authenticatedUser.uid) :
                console.log("Not logged in yet");
                }, 
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    updateScore(uid) {
        this.props.firebase.user(uid).once('value', snapshot => {
            this.setState({
                    score: snapshot.val().score,
                    loading: false
                })
        })
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => (
                    <div className="Home">
                        <p className="home-label">Choose your path</p>
                        <Link className="home-acc-link" to={ROUTES.ACCOUNT}>Account</Link>
                        <Link className="home-admin-link" to={ROUTES.ADMIN}>Admin</Link>
                        <button 
                            onClick={e => this.increase(e, firebase, this.props)}
                            className="home-action-inc"
                        >Go up!</button>
                        <button 
                            onClick={e => this.decrease(e, firebase, this.props)}
                            className="home-action-dec"
                        >Go down!</button>
                        <p className="home-user-score">Your score: {this.state.score}</p>
                    </div>
                )}
            </FirebaseContext.Consumer>
        )
    }
}


export default withFirebase(Home);

