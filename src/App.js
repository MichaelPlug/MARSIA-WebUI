import './App.css';
import React, {Component} from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.chain = "eth";
    this.api = "http://0.0.0.0:8888/";
    this.tab = 0;
    this.json_message = "";
  }

  render() {
    return (
      <div>
        <ul>
          <li><a onClick={() => this.moveToCertify()}>Certify</a></li>
          <li><a onClick={() => this.moveToDataOwner()}>DataOwner</a></li>
          <li><a onClick={() => this.moveToClient()}>Client</a></li>
          <li><a onClick={() => this.moveToReader()}>Reader</a></li>
        </ul>

          <div class="Container" id = "certify-container">
            <h2>Certify</h2>
            <div>Actors and Roles</div>
            <textarea id="Input-client-roles" type="text" placeholder="roles" rows="5" cols="30"/>
            <div></div>
            <input type="submit" value="Submit" onClick={() => this.sendCertifyRequest()}/>
            <div></div>
          </div>
          <div class="Container" id = "data-owner-container">
            <h2>Data Owner</h2>
            <div></div>
            <div>Process ID</div>
            <input id="Input-data-owner-processid" type="text" placeholder="Process Id"/>
            <div>Message</div>
            <textarea id="Input-data-owner-message" accept=".json" rows="5" cols="30"/>
            <div>Policy</div>
            <textarea id="Input-data-owner-policy" type="text" placeholder="Policy" rows="5" cols="30"/>
            <div>Entries</div>
            <textarea id="Input-data-owner-entries" type="text" placeholder="Entries" rows="2" cols="30"/>
            <div></div>
            <input type="submit" value="Generate PP KK" onClick={() => this.sendDataOwnerRequestToGeneratePPKK()}/>
            <input type="submit" value="Cipher" onClick={() => this.sendDataOwnerRequestToCipher()}/>
          </div>
          <div class="Container" id ="client-container">
            <h2>Client</h2>
            <div>Process id</div>
            <input id="Input-client-process-id" type="text" placeholder="Process id"/>
            <div>Reader address</div>
            <input id="Input-client-reader-address" type="text" placeholder="Reader address"/>
            <div>Gid</div>
            <input id="Input-client-gid" type="text" placeholder="Gid"/>
            <div></div>
            <input type="submit" value="Handshake" onClick={() => this.sendClientRequestToHandshake()}/>
            <input type="submit" value="Generate key" onClick={() => this.sendClientRequestToGenerateKey()}/>
          </div>
          <div class="Container" id="reader-container">
            <h2>Reader</h2>
            <div>Process id</div>
            <input id="Input-reader-process-id" type="text" placeholder="Process id"/>
            <div>Message id</div>
            <input id="Input-reader-message-id" type="text" placeholder="Message id"/>
            <div>Slice id</div>
            <input id="Input-reader-slice-id" type="text" placeholder="Slice id"/>
            <div></div>
            <div>Gid</div>
            <input id="Input-reader-gid" type="text" placeholder="Gid"/>
            <div></div>
            <input type="checkbox" id="input-reader-generate" name="generate public parameters" value="g"/>
            <label for="input-reader-generate"> Generate public parameters</label>
            <div></div>
            <input type="submit" value="Read" onClick={() => this.sendReaderRequest()}/>
          </div>
        <div class="cleaner"></div>
        <div class="loader"></div>
      </div>   
   );
  }

  readJson = (e) => {
    var message = document.getElementById("Input-data-owner-message-file").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var content = e.target.result;
      try {
        console.log(content);
        const jsonData = JSON.parse(content);

      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
      this.json_message = content;
    };
    reader.app = this;
    reader.readAsText(message);
    console.log("eheheh " + this.json_message);
  }


  async sendCertifyRequest()  {
    var roles = document.getElementById("Input-client-roles").value;
    var dict_roles = this.readActorsAndRoles(roles);
    var list_actors = Object.keys(dict_roles)
    alert("Request sent")
    const response = await fetch(this.api + "certification/", {
      method: "POST",
      body: JSON.stringify({
        'actors': list_actors,
        'roles': dict_roles
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json();
    alert("Your process id is ready");
    console.log(result);
  } 

  async sendDataOwnerRequestToCipher(){
    var process_id = document.getElementById("Input-data-owner-processid").value;
    var message = document.getElementById("Input-data-owner-message").value;
    alert(this.json_message);
    const response = await fetch(this.api.concat("dataOwner/cipher/"), {
      method: "POST",
      body: JSON.stringify({
        'process_id': process_id,
        'message': JSON.parse(message),
        'policy': this.readPolicy(),
        'entries': this.readEntries()
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    console.log(response);
    return;
  }

  async sendDataOwnerRequestToGeneratePPKK() {
    var process_id = document.getElementById("Input-data-owner-processid").value;
    var message = document.getElementById("Input-data-owner-message").value;

    const response = await fetch(this.api.concat("dataOwner/generate_pp_pk/"), {
      method: "POST",
      body: JSON.stringify({
        'process_id': process_id,
        'message': JSON.parse(message),
        'policy': this.readPolicy(),
        'entries': this.readEntries()
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json();
    console.log(result);
  }

   async sendClientRequestToGenerateKey() {
    var processId = document.getElementById("Input-client-process-id").value;
    var readerAddress = document.getElementById("Input-client-reader-address").value;
    var gid = document.getElementById("Input-client-gid").value;

    const response = await fetch(this.api.concat("client/generateKey/"), {
      method: "POST",
      body: JSON.stringify({
        'process_id': processId,
        'reader_address': readerAddress,
        'gid': gid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    console.log(response);
    console.log("Key generated")
  }

  async sendClientRequestToHandshake()  {
    var processId = document.getElementById("Input-client-process-id").value;
    var readerAddress = document.getElementById("Input-client-reader-address").value;
    var gid = document.getElementById("Input-client-gid").value;
    const response = await fetch("http://0.0.0.0:8888/client/handshake/", {
      method: "POST",
      body: JSON.stringify({
        'process_id': processId,
        'reader_address': readerAddress,
        'gid': gid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': '* ',
      }
    });
    console.log(response);
    console.log("Handshake completed")
  }

  async sendReaderRequest() {
    var processId = document.getElementById("Input-reader-process-id").value;
    var messageId = document.getElementById("Input-reader-message-id").value;
    var sliceId = document.getElementById("Input-reader-slice-id").value;
    var gid = document.getElementById("Input-reader-gid").value;
    var generate = document.getElementById("input-reader-generate").checked;
    const response = await fetch("http://0.0.0.0:8888/read/", {
      method: "POST",
      body: JSON.stringify({
        'process_id': processId,
        'message_id': messageId,
        'generate': generate,
        'gid' : gid,
        'slice_id': sliceId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': '* ',
      }
    });
    console.log(response);
    console.log("Reading completed")
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
  }


  moveToCertify = () => {
    this.tab=0;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "block";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "none";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "none";
    var readercontainer = document.getElementById("reader-container");
    readercontainer.style.display = "none";

  }
  moveToDataOwner = () => {
    this.tab=1;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "none";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "block";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "none";
    var readercontainer = document.getElementById("reader-container");
    readercontainer.style.display = "none";
  }
  moveToClient = () => {
    this.tab=2;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "none";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "none";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "block";
    var readercontainer = document.getElementById("reader-container");
    readercontainer.style.display = "none";
  }

  moveToReader() {
    this.tab=3;
    var certifycontainer = document.getElementById("certify-container");
    certifycontainer.style.display = "none";
    var dataownercontainer = document.getElementById("data-owner-container");
    dataownercontainer.style.display = "none";
    var clientcontainer = document.getElementById("client-container");
    clientcontainer.style.display = "none";
    var readercontainer = document.getElementById("reader-container");
    readercontainer.style.display = "block";
  }

  fromStringToArray = (inputString) => {
    // Remove the square brackets and single quotes from the string
    const stringWithoutBrackets = inputString.replace(/[\[\]']/g, '');

    // Split the string by commas to create an array
    const dataArray = stringWithoutBrackets.split(', ');

    return dataArray;
  }

  fromStringToArrayOfArrays = (inputString) => {
    try {
      const cleanedString = inputString.replace(/'/g, '"');
      const parsedArray = eval(cleanedString);
      
      if (Array.isArray(parsedArray)) {
        if (parsedArray.every(Array.isArray)) {
          return parsedArray;
        } else {
          throw new Error('The input string does not contain an array of arrays.');
        }
      } else {
        throw new Error('The input string does not represent an array.');
      }
    } catch (error) {
      console.error('Error while parsing the string:', error);
      return null;
    }
  }

  fromStringToDict = (inputString) => {
    // Remove the curly braces and single quotes from the string
  
    inputString.replace("\n", " ");
  
    const stringWithoutBraces = inputString.replace(/[\{\}\[\]'']/g, '');
    // Split the string by commas followed by a space
    const keyValuePairs = stringWithoutBraces.split(', ');
    // Create an empty object
    const dictionary = {};
  
    // Iterate over each key-value pair and add them to the dictionary
    var pastKey = ""
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split(': ');
      if (value === undefined){
        dictionary[pastKey].push(key)
      }
      else{
        dictionary[key] = [value];
        pastKey = key
      }
    });
  
    return dictionary;
  }

  readActorsAndRoles = (inputString) => {
    const inputRows = inputString.split(';');
    var dictionary = {};
    inputRows.forEach(row => {
      var splittedRow = row.split(":");
      var key = splittedRow[0].trim();
      var roles = splittedRow[1].split(",");
      if (dictionary[key] === undefined){
        dictionary[key] = [];
      }
      roles.forEach(role => {
        dictionary[key].push(role.trim());
      })
    })      
    return dictionary
  }

  readPolicy = () => {
    var inputString = document.getElementById("Input-data-owner-policy").value;
    const process_id = document.getElementById("Input-data-owner-processid").value;
    inputString = inputString.replace("#Pid", process_id);
    var output = [];
    inputString.split(',').forEach(p => {  
      output.push(p.trim());
      }  
    );
    return output;
  }

  readEntries = () => {
    var inputString = document.getElementById("Input-data-owner-entries").value;
    var output = [];
    inputString.split(';').forEach(p => {  
      var entry = [];
      p.trim().split(',').forEach(e => {
        entry.push(e.trim());
      });
      output.push(entry);
    });
    return output;
  }
}
export default App;
