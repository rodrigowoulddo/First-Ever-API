# First-Ever-API
The first API I ever built. Made with Node.js, Express framework and MongoDB.

## Instalaton

To run the API, you will need a MongoDB instalation. Te easiest way is using a docker image. Check [this link](https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/).

First of all, clone the repository.

```sh
git clone https://github.com/rodrigowoulddo/First-Ever-API
cd First-Ever-API
```

Configure the `.env` file, and change the environment values as you wish.

```sh
mv default.env .env
```

Then install dependencies.

```sh
npm install
```

Make sure mongoDB is runing on the right port, and run the API. I suggest the `dev` option for coding and debugging.

```sh
npm run dev
```

----
## Licence
Use as you like :)

