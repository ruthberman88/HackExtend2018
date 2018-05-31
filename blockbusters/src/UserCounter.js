import React from 'react';
import './UserCounter.css';

class UserCounter extends React.Component {
  constructor(props) {
  super(props);
  this.state = 0
}
  render () {
    return (
    <div className = "UserCounter">
    This is the counter
    </div>
  )
  }
}

export default UserCounter;
