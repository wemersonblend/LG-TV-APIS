echo 'Updating Files'
./update.sh

echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.example.apis*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.example.apis

echo ''
echo 'done!'
