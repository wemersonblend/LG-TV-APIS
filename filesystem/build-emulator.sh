echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.example.filesystem*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.example.filesystem

echo ''
echo 'done!'
