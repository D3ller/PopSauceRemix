# SAE401

## Installer les dependences

```
cd client

npm i 

cd ../server

npm i
```

## Lancer les scripts

Se rendre dans le dossier client

```
cd client

npm run all
```

## Lancer l'API avec docker

```
docker compose -p sae401 up -d
```

## Requêtes

# créer un token

method POST url http://localhost:8080/api/login_check
```
{
    "username": "username",
    "email": "email@mail",
    "password": "pwd"
}
```
recupération du token