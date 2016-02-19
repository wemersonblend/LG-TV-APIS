echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.fouryousee.filesystem*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.fouryousee.filesystem

echo ''
echo 'done!'
