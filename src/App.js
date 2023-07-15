import './App.css';
import React, {Component} from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.chain = "eth";
    this.api = ""
  }

  render() {
    return 
  }

  sendClientRequest = async () => {
    var actors = document.getElementById("Input-client-actors").value;
    var roles = document.getElementById("Input-client-roles").value;

    const response = await fetch(this.api.concat(certification), {
      method: "POST",
      body: JSON.stringify({
        actors: actors,
        roles: roles
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json();
    console.log(result);
  } 
}
export default App;
