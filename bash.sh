appPath="/root/app/web-ebook/"

cd $appPath

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

pm2 restart $appPath"/app.js"

