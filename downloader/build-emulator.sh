echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.fouryousee.downloader*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.fouryousee.downloader

echo ''
echo 'done!'
