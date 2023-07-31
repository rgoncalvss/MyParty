# Project with the ideia to train my skills on building an **RESTful API**

If you want to test the project by yourself, clone this to your machine and run:
```
npm i
```
To become more familiar with Docker, I've created the MongoDB instance with it. If you want to do the same, go to [Docker](https://www.docker.com/products/docker-desktop/) and install Docker Desktop.

In the repository, you will find a docker-compose file. Access the project folder in your terminal and run:
```
docker compose up
```
Once all images were successfully installed, you will be able to view and manage the containers using the Docker Desktop app.

I've downloaded two Docker images, one for MongoDB and another for Express, which provides a web interface for interaction. This interface can be accessed at:
```
http://localhost:8081
```
If you don't want to use your root credentials to test the project, you can create a new user with only read and write permissions, as shown in the following command:
## Creating a new user on our MongoDB container

```shell
### Creating a database called myparty and an User that can only Read and Write on it
docker exec -it MONGO_CONTAINER_NAME `
    mongosh --host localhost -u CONFIG_MONGODB_ADMINUSERNAME -p CONFIG_MONGODB_ADMINPASSWORD --authenticationDatabase admin `
    --eval "db.getSiblingDB('DB_NAME').createUser({user: 'USERNAME', pwd: 'USER_PASSWORD', roles: [{role: 'readWrite', db: 'DB_NAME'}]})"
```
