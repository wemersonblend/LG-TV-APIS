echo 'Building app ...'

[ -d /tmp/scap_app.zip ] || rm /tmp/scap_app.zip

[ -d temp_data ] || mkdir temp_data

cp -Rf assets         temp_data/assets
cp -Rf fonts          temp_data/fonts
cp -Rf imgs           temp_data/imgs
cp -Rf js             temp_data/js
cp -Rf appinfo.json   temp_data/appinfo.json
cp -Rf icon.png       temp_data/icon.png
cp -Rf index.html     temp_data/index.html
cp -Rf largeIcon.png  temp_data/largeIcon.png

cd temp_data

zip -r -q -l scap_app.zip .
mv scap_app.zip /tmp

rm -rf ../temp_data