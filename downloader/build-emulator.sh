echo 'Building app ...'
ares-package . -e .git

echo ''
echo 'Installing app ...'
ares-install -d emulator ./com.example.downloader*.ipk -

echo 'Launching app ...'
ares-launch --inspect com.example.downloader

echo ''
echo 'done!'
