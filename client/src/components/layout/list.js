import React, { Component } from 'react'

export default class list extends Component {
  render() {
    return (
      <div>
        <ul id="dropdown2" class="dropdown-content">
            <li><a href="#!">one<span class="badge">1</span></a></li>
            <li><a href="#!">two<span class="new badge">1</span></a></li>
            <li><a href="#!">three</a></li>
        </ul>
      </div>
    )
  }
}
