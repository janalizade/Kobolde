docker build . -t kobolde-frontend

docker run -p 8081:8080 --name kobolde-frontend --network kobolde-network --restart always -d kobolde-frontend 
