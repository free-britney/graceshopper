import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../store/admin'

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { users } = this.props || []
    return (
      <div>
        Users - admin view only
        {users.map((user) => (
          <div key={user.id}>
            <div>{user.id}</div>
            <div>{user.username}</div>
            <br/ >
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.admin
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  }
}

export default connect(mapState, mapDispatch)(Admin)
