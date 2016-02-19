echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.example.unzipper*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.example.unzipper

echo ''
echo 'done!'
