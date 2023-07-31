## Project with the ideia to train my skills on building an RESTful API

## Criando um novo usuário no MongoDB dockerizado

```shell
## Creating a database called myparty and an User that can only Read and Write on it
docker exec -it backend-mongo-1 `
    mongosh --host localhost -u root -p root --authenticationDatabase admin `
    --eval "db.getSiblingDB('myparty').createUser({user: 'rafael', pwd: 'senhateste', roles: [{role: 'readWrite', db: 'myparty'}]})"
```