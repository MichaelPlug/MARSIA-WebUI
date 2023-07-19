import './App.css';
import React, {Component} from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.chain = "eth";
    this.api = "http://0.0.0.0:8888/";
    this.tab = 0;
  }

  render() {
    return (
      <div>
        <div id = "tabs-container">
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
            <input type="submit" value="Handshake" onClick={() => this.sendClientRequestToHandshake()}/>
            <input type="submit" value="Generate key" onClick={() => this.sendClientRequestToGenerateKye()}/>
          </div>
        </div>
        <div class="cleaner"></div>
        <div class="loader"></div>
      </div>   
   );
  }

  sendCertifyRequest = () => {
    var actors = document.getElementById("Input-client-actors").value;
    var roles = document.getElementById("Input-client-roles").value;

    const response = fetch(this.api + "certification", {
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

   sendClientRequestToGenerateKey = () => {
    var processId = document.getElementById("Input-client-process-id").value;
    var readerAddress = document.getElementById("Input-client-reader-address").value;
    var gid = document.getElementById("Input-client-gid").value;

    const response = fetch(this.api.concat("client/generateKey"), {
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

  async sendClientRequestToHandshake()  {
    var processId = document.getElementById("Input-client-process-id").value;
    var readerAddress = document.getElementById("Input-client-reader-address").value;
    var gid = document.getElementById("Input-client-gid").value;
    console.log(processId); 
    console.log(readerAddress);
    console.log(gid);
    console.log("sendClientRequestToHandshake");
    const response = await fetch("http://0.0.0.0:8888/client/handshake/", {
      method: "POST",
      body: JSON.stringify({
        process_id: processId,
        reader_address: readerAddress,
        gid: gid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': '* ',
      }
    });
    const result = await response.json();
    console.log(result);
  }

  async connectToAPI() {
    console.log("connectToAPI");
    const response = await fetch(this.api, {
      headers: {
        'Access-Control-Allow-Origin': 'http://0.0.0.0',
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    console.log("Waiting for response...")
    await console.log(response);
    return;
    const result = response.json();
    var text = document.getElementById("apitext");
    text.disabled = true;
    var button = document.getElementById("apibutton");
    button.disabled = true;
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
