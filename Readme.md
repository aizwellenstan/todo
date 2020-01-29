#React Rails TODO リスト

<h1 align="center">
  <img src="https://github.com/aizwellenstan/fivexruby-todo/blob/master/screenshot.png?raw=true" alt="screenshot" width="600px"/>
</h1>

## Features
- Register/Login
- User can Create/Delete their own task
- Task
1. title
2. body
3. start_time
4. end_time
5. level

- sort task by 
1. time_end
2. time_start
3. level

- suprate task
1. onhand
2. passive
3. ative

- filter task by title || body 

# Contributing
## Install rails && start server
1. `sudo apt-get install curl`
2. `command curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -`
3. `\curl -sSL https://get.rvm.io | bash -s stable --rails`
4. `sudo apt install postgresql-contrib libpq-dev`
5. `sudo apt install git`
6. `git clone https://github.com/aizwellenstan/fivexruby-todo`
7. `cd server`
8. `sudo apt install rbenv`
9. `sudo rbenv exec gem install bundler`
10. `rbenv rehash`
11. `source ~/.rvm/scripts/rvm`
12. `rvm install ruby 2.6.3`
13. `rvm --default use 2.6.3`
14. `gem install bundler:2.0.2`
15. `bundle`
16. `rails db:setup db:migrate db:seed`
17. `rails s`

## Install NodeJS && start client
1. `sudo apt-get update`
2. `sudo apt-get install build-essential libssl-dev`
3. `sudo apt install curl`
4. `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
5. `sudo apt-get install -y nodejs`
6. `cd client`
7. `npm i`
8. `npm start`

# Error Handling
## Address already in use - bind(2) for "::1" port 3000 (Errno::EADDRINUSE)
1. `sudo rm -rf tmp`            //delete `tmp` folder under project folder
2. close the rails terminal
3. `sudo lsof -t -i:3000`
4. `sudo kill -9 {pid}`
5. restart rails

## Server Already Started...&& others
1. remove tmp folder in rails project
2. restart rails