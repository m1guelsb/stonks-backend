<div align="center">
  <h1>Stonks Portfolio Backend</h1>
</div>

<p align="center">
  <img alt="Typescript" src="https://img.shields.io/badge/Typescript-black?style=for-the-badge&logo=typescript&logoColor=blue"/>

  <img alt="NestJs" src="https://img.shields.io/badge/nestjs-black?style=for-the-badge&logo=nestjs&logoColor=e0234e"/>

  <img alt="MongoDB" src="https://img.shields.io/badge/mongodb-black?style=for-the-badge&logo=mongodb&logoColor=green"/>

  <img alt="Socket-io" src="https://img.shields.io/badge/socket.io-black.svg?style=for-the-badge"/>

  <img alt="Kafka" src="https://img.shields.io/badge/kafka-black.svg?style=for-the-badge"/>

  <img alt="Docker" src="https://img.shields.io/badge/docker-black?style=for-the-badge&logo=docker&logoColor=blue"/>
</p>

# About 🔎

Investment portfolio where is possible to manage, purchase and sell assets.

# How to run 🏃

## Prerequisites
- NodeJs v22.14
- Docker

This is the back-end of a whole project, you will need the other parts to run it properly:
- [NextJs Frontend](https://github.com/m1guelsb/stonks-frontend)
- [Go Microservice](https://github.com/m1guelsb/stonks-b3)

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/m1guelsb/stonks-backend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start Mongodb container
   ```sh
   docker compose up
   ```
4. Start assets server
   ```sh
   npm run start:assets
   ```
5. Start Kafka server (needs [Go Microservice](https://github.com/m1guelsb/stonks-b3))
   ```sh
   npm run start:kafka
   ```
6. Start the development server
   ```sh
   npm run start:dev
   ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Miguel Barbosa - [@m1guelsb](https://www.linkedin.com/in/m1guelsb)
