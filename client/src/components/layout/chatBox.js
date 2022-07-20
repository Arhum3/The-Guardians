import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import { Link} from 'react-router-dom';
import axios from "axios"

class Demo extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: [],
      firstname:"",
      lastname:"",
      employee:[]
    };
  }
  componentDidMount()
  {
    axios
    .post("/api/users/displayEmpData")
    .then((response) => {
      const data = response.data.resultArray
      this.setState({ employee: data })
      this.setState({firstname: this.state.employee[0].firstname})
      this.setState({lastname: this.state.employee[0].lastname})
    })
  }
  _onMessageWasSent(message) {
    
    var msgToBeSent = message.data.text+" - "+this.state.firstname
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    // const obj = [msgToBeSent]
    // this.props.history.push({
    //   pathname:'/SelfService',
    //   state: obj
    // })

  }
 
  render() {
      
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Queries',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
      <Link
          to={{
            pathname: "/SelfService",
            state: this.state.messageList // your data array of objects
          }}
        ></Link>
    </div>)
  }
}
export default Demo