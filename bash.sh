git pull

cd script

node crawler

node sync

node downloadPoster

cd ..

git add .

git commit -m "add data"

git push

git status

pm2 restart app.js

