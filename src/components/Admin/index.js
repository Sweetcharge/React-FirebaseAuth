import React from "react";

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
            const userObject = snapshot.val()

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
            <div>
                <h1>Admin</h1>
                {this.state.loading && <div>Loading ...</div>}

                <UserList users={this.state.users} />
            </div>
        )
    }
}

const UserList = ({ users }) => (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );


export default withFirebase(Admin);