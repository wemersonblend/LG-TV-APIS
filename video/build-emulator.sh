echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.fouryousee.video*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.fouryousee.video

echo ''
echo 'done!'
