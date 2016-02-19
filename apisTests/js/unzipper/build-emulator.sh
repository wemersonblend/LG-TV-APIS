echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.fouryousee.unzipper*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.fouryousee.unzipper

echo ''
echo 'done!'
