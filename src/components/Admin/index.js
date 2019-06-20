import React from "react";
import './admin-style.css';

import { withFirebase } from '../Firebase';

class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            users: []
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = 
                usersObject ? 
                Object.keys(usersObject).map(
                    key => ({...usersObject[key],
                    uid: key
                    })
                ) : 
                []

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        return (
            <div className="Admin">
                <h1>Admin</h1>
                {this.state.loading && <div>Loading ...</div>}
                <ul className="admin-list-container">
                  <li> 
                    <span>
                      <strong>ID</strong>
                    </span>
                    <span>
                      <strong>E-Mail</strong>
                    </span>
                    <span>
                      <strong>Username</strong>
                    </span>
                    <span>
                      <strong>Score</strong>
                    </span>
                  </li>
                  <UserList users={this.state.users} />
                </ul>
            </div>
        )
    }
}

const UserList = ({ users }) => (
    <div>
      {users.map(user => (
        <li className="admin-list-item" key={user.uid}>
          <span>
            {user.uid}
          </span>
          <span>
            {user.email}
          </span>
          <span>
            {user.username}
          </span>
          <span>
            {user.score}
          </span>
        </li>
      ))}
    </div>
  );


export default withFirebase(Admin);