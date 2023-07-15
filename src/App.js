import './App.css';
import React, {Component} from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.chain = "eth";
    this.api = ""
    this.tab = 0;
  }

  render() {
    return (
      <div>
        <input class="apibox" type="text" placeholder="API's link"  onChange={(e) => this.api = e.target.value}/>
        <div class="Container">
          <h2>Certify</h2>
          <div>Actors</div>
          <input id="Input-client-actors" type="text" placeholder="Actors"/>
          <div>Roles</div>
          <input id="Input-client-roles" type="text" placeholder="roles"/>
          <div></div>
          <input type="submit" value="Submit" onClick={() => this.sendCertifyRequest()}/>
          <div></div>
        </div>
        <div class="Container">
          <h2>Data Owner</h2>
          <div>Message</div>
          <textarea id="Input-data-owner-message" type="text" placeholder="Message" rows="4" cols="50"/>
          <div>Policy</div>
          <input id="Input-data-owner-policy" type="text" placeholder="Policy"/>
          <div>Entries</div>
          <input id="Input-data-owner-entries" type="text" placeholder="Entries"/>
          <div></div>
          <input type="submit" value="Cipher" onClick={() => this.sendDataOwnerRequestToCipher()}/>
          <input type="submit" value="Generate PP KK" onClick={() => this.sendDataOwnerRequestToGeneratePPKK()}/>
        </div>
        <div class="Container">
          <h2>Client</h2>
          <div>Process id</div>
          <input id="Input-client-process-id" type="text" placeholder="Process id"/>
          <div>Reader address</div>
          <input id="Input-client-reader-address" type="text" placeholder="Reader address"/>
          <div>Gid</div>
          <input id="Input-client-gid" type="text" placeholder="Gid"/>
          <div></div>
          <input type="submit" value="Submit" onClick={() => this.sendClientRequest()}/>
        </div>
        <div class="cleaner"></div>
        <div class="loader"></div>
      </div>   
   );
  }

  sendCertifyRequest = () => {
    var actors = document.getElementById("Input-client-actors").value;
    var roles = document.getElementById("Input-client-roles").value;

    const response = fetch(this.api.concat("certification"), {
      method: "POST",
      body: JSON.stringify({
        actors: actors,
        roles: roles
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = response.json();
    console.log(result);
  } 

  sendDataOwnerRequestToCipher = () => {
    var message = document.getElementById("Input-data-owner-message").value;
    var policy = document.getElementById("Input-data-owner-policy").value;
    var entries = document.getElementById("Input-data-owner-entries").value;
    const response = fetch(this.api.concat("dataowner/cipher"), {
      method: "POST",
      body: JSON.stringify({
        message: message,
        policy: policy,
        entries: entries
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = response.json();
    console.log(result);
  }

  sendDataOwnerRequestToGeneratePPKK = () => {
    var message = document.getElementById("Input-data-owner-message").value;
    var policy = document.getElementById("Input-data-owner-policy").value;
    var entries = document.getElementById("Input-data-owner-entries").value;

    const response = fetch(this.api.concat("dataowner/generate_pp_pk"), {
      method: "POST",
      body: JSON.stringify({
        message: message,
        policy: policy,
        entries: entries
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = response.json();
    console.log(result);
  }

  sendClientRequest = () => {
    var processId = document.getElementById("Input-client-process-id").value;
    var readerAddress = document.getElementById("Input-client-reader-address").value;
    var gid = document.getElementById("Input-client-gid").value;

    const response = fetch(this.api.concat("client"), {
      method: "POST",
      body: JSON.stringify({
        processId: processId,
        readerAddress: readerAddress,
        gid: gid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = response.json();
    console.log(result);
  }

  sendClientRequest = () => {
    var processId = document.getElementById("Input-client-process-id").value;
    var readerAddress = document.getElementById("Input-client-reader-address").value;
    var gid = document.getElementById("Input-client-gid").value;

    const response = fetch(this.api.concat("client"), {
      method: "POST",
      body: JSON.stringify({
        processId: processId,
        readerAddress: readerAddress,
        gid: gid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = response.json();
    console.log(result);
  }



  moveToCertify = () => {
    this.tab=0;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "block";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "none";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "none";

  }
  moveToDataOwner = () => {
    this.tab=1;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "none";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "block";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "none";
  }
  moveToClient = () => {
    this.tab=2;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "none";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "none";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "block";
  }

}
export default App;
