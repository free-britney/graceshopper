import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newGenie } from '../redux/robots';

class AddGenieForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.newRobot({...this.state});
    this.props.history.push('/robots');
    console.log('Submitting', (this.state));
  }


  render() {
    return (
      <div>
          <label> Add New Robot </label>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            placeholder="Robot Name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  newRobot: (robot) => dispatch(newRobot(robot)),
});

export default connect(null, mapDispatch)(AddRobotForm);
