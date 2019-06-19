import React from "react";
import "./home-style.css";

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { FirebaseContext } from "../Firebase";

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            score: 0
        }
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    increase() {
        this.setState(prevState => {
            return { score: prevState.score + 1 }
        })
    }

    decrease() {
        this.setState(prevState => {
            return { score: prevState.score - 1 }
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
                            onClick={e => this.increase(e, firebase)}
                            className="home-action-inc"
                        >Go up!</button>
                        <button 
                            onClick={e => this.decrease(e, firebase)}
                            className="home-action-dec"
                        >Go down!</button>
                        <p className="home-user-score">Your score: {this.state.score}</p>
                    </div>
                )}
            </FirebaseContext.Consumer>
        )
    }
}


export default Home;

