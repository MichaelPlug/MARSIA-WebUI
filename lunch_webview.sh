docker build . -t martsia-webui
docker run --rm -i -p 80:3000 martsia-webui