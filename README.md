<h1 align="center">Padel Club</h1>

Padel Club is Copenhagen based community for padel players. Join us for our next game, and have fun!

<p align="center">
  <img width="800" src="https://github.com/Kajatin/padel-club/assets/33018844/26b4c3fe-e311-400d-b1a6-bf367d6812e7">
</p>

## Stack

### PostgreSQL

The backend is powered by [PostgreSQL](https://www.postgresql.org) which is used to store the sessions and users related information. It is an open source relational database solution; my go-to choice for new projects.

### NextJS

A very powerfult React framework. The frontend and the API handling the database connection and queries is implemented in Typescript using this framework.

### Docker

The project is containerized using Docker. You can build and run the project using the following commands:

* `sudo docker build -t padel-club .`
* `sudo docker run -p 3002:3002 padel-club`

## TODO

* [x] Ability to leave the club (remove from members)
* [ ] Admin page for adding new sessions
* [ ] Store game results for more serious sessions
* [ ] Filter expired sessions -> show only for people that need to pay or max 2-3 expired sessions
* [x] Personal page to see activity (sessions)
* [x] Merch page
* [x] Option to create games by anyone -> add host of the game, etc.
* [ ] Ability to invite people to the club/session
* [x] Badge should be based on amount of games played (not time since joined)
* [ ] Private session -> invitation only

## Screenshots

<p align="center">
  <img width="800" src="https://github.com/Kajatin/padel-club/assets/33018844/1c338336-1cab-45f9-b848-f4f802b9564b">
</p>

<p align="center">
  <img width="800" src="https://github.com/Kajatin/padel-club/assets/33018844/b9cb4fa8-b197-4bab-aec5-e17a06a3160e">
</p>

<p align="center">
  <img width="800" src="https://github.com/Kajatin/padel-club/assets/33018844/534d27b3-c47c-47be-80a5-8c136e94d7a4">
</p>

<p align="center">
  <img width="800" src="https://github.com/Kajatin/padel-club/assets/33018844/ac1af016-3ffd-4724-a731-ceec1410629d">
</p>
