"# kobolde-multer" 

docker network create kobolde-network

docker build . -t kobolde-backend

docker run -p 27017:27017 -v ~/data/db:/data/db --name mongo --network kobolde-network --restart always -d mongo

docker run -p 8080:8080 --name kobolde-backend --network kobolde-network --restart always -d kobolde-backend 


