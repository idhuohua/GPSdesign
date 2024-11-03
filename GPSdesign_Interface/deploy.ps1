
$port = "22022"
$server = "amax@pub.hsuni.top"
$dir = "/var/www"
$websiteName = "confront"

# build website

yarn build

# pack build folder

tar zcf build.tar.gz build

# send to server

scp -P $port build.tar.gz ${server}:$dir

Remove-Item .\build.tar.gz

# define bash script

$deployScript = @"
echo deploying

echo switching to $dir
cd $dir

echo unzipping
sudo -u www-data tar zxf build.tar.gz --no-same-owner

echo remove build.tar.gz
sudo -u www-data rm -r $websiteName build.tar.gz

echo rename build to $websiteName
sudo -u www-data mv build $websiteName

echo reloading
sudo /usr/sbin/nginx -s reload
"@

# substitue all '\r\n' by '\n'

$deployScript = $deployScript -replace "`r`n", "`n"

# run script

ssh -p $port $server bash -c $deployScript

