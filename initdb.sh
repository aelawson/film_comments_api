#!/bin/bash
echo "Initializing sequelize..."
./node_modules/.bin/sequelize init
echo "Creating sequelized models..."
./node_modules/.bin/sequelize model:create --name Comment --attributes "userId:string, contentId:integer, timeStamp:integer, content:text"
./node_modules/.bin/sequelize model:create --name User --attributes "userId:string, firstName:string, lastName:string, email:string"
read -p "Set up your associations (if any). Enter Y to continue and migrate. Anything else to exit and migrate manually." choice
case "$choice" in
    y|Y ) ./node_modules/.bin/sequelize db:migrate;;
    * ) echo "Finished. Make sure to run your migrations."; exit;;
esac
