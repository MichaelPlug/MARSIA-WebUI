# MARTSIA WebUI
A React app to lunch a web interface to interact with MARTSIA API.
This project is an extension of the following github repositories:
- [MARTSIA Ethereum](https://github.com/apwbs/MARTSIA-Ethereum)
- [MARTSIA Algorand](https://github.com/apwbs/MARTSIA-Algorand)

## How Lunch the application

```bash
docker build . -t martsia-webui
docker run --rm -i -p 80:3000 martsia-webui
```

or 

```bash
sh lunch_webview.sh
```

The server will be reachable via browser at the address `http://localhost:80`
