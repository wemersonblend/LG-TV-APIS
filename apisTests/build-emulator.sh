echo 'Updating Files'
./update.sh

echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.fouryousee.apis*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.fouryousee.apis

echo ''
echo 'done!'
