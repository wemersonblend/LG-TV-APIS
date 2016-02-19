
# LG-TV-APIS

Generic Apis implemented to LG Signage WebOS applications


[Filesystem API](#filesystem-api)
[Download API](#download-api)
[Unzip API](#unzip-api)

<a href="#" name="filesystem-api"></a>
## Filesystem API

Class to handle filesystem

**HTML Code**
```html
<!-- HEAD -->
<script type="text/javascript" src="./js/cordova/2.7.0/cordova.webos.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/storage.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/configuration.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/deviceInfo.js"></script>

```

**Javascript Code**
```javascript
var fs =  new Filesystem();

fs.mkdir('/mypath', {}, function(error, data){
    console.log('complete', error, data);
});

fs.rmdir('/mypath', {}, function(error, data){
    console.log('complete', error, data);
});

fs.rm('/mypath/file.txt', {}, function(error, data){
    console.log('complete', error, data);
});

fs.writeFile(path, text, function(error, data){
    console.log('complete', error, data);
});

fs.readFile(path, text, function(error, data){
    console.log('complete', error, data);
});

fs.ls(path, function(error, data){
    console.log('complete', error, data);
});

```

<a href="#" name="download-api"></a>
## Download API

Class to manage downloads

**HTML Code**
```html
<!-- HEAD -->
<script type="text/javascript" src="./js/cordova/2.7.0/cordova.webos.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/storage.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/configuration.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/deviceInfo.js"></script>

```

**Javascript Code**
```javascript
var downloader =  new Downloader();

downloader.start({
    url: 'http://www.example.com/myfile.zip',
    path: '/mypath/myfile.zip',
}, function(error, data){
    console.log('complete', error, data)
});
```

<a href="#" name="unzip-api"></a>
## Unzip API

Class to unzip files

**HTML Code**
```html
<!-- HEAD -->
<script type="text/javascript" src="./js/cordova/2.7.0/cordova.webos.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/storage.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/configuration.js"></script>
<script type="text/javascript" src="./js/cordova-cd/1.2/deviceInfo.js"></script>

```

**Javascript Code**
```javascript
var unzipper =  new Unzipper();

unzipper.start({
    from: '/mypath/myfile.zip',
    to: '/mypath',
}, function(error, data){
    console.log('complete', error, data)
});

```
