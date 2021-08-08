import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../store/admin'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {}
  }
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    // console.log("this is users", users)
    return (
      <div>
        Users
        {users}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    // admin: state.admin,
    users: state.users
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  }
}

export default connect(mapState, mapDispatch)(Admin)
