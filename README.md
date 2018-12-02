# pollo-loco-back

#### How to install project

First install docker/docker-compose
~~~bash
sudo -s
curl -ks https://get.docker.com/ | sh
curl -L https://github.com/docker/compose/releases/download/1.14.0-rc1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
~~~

Install nodesjs

And then clone project and install

~~~bash
git clone ...
npm install
docker inspect pollo-loco-back_db_1
~~~
replace host with container ip in:
    -   /congig/database.js
then migrate the DB
~~~bash
node_modules/.bin/sequelize db:migrate
~~~

| Nom                   | URI                                                  |
|-------------------    |--------------------------------------------------    |
| Phpmyadmin            | http://localhost:5649                                |

#### How to update project

~~~bash
npm update
~~~
