var fs, downloader, unzipper;
var defaultDir = 'file://internal/example';

mkdirTxt.value = defaultDir;
rmTxt.value = defaultDir;
rmfileTxt.value = defaultDir + '/teste.txt';
writefileTxt.value = defaultDir + '/teste.txt';
readfileTxt.value = defaultDir + '/teste.txt';
writefileDataTxt.value = 'vamos lá correr pra casa';
listDirTxt.value = defaultDir;

urlfileTxt.value = 'http://www.example.com/file.zip';
pathfileTxt.value = defaultDir;

fromTxt.value = defaultDir + '/image.zip';
toTxt.value = defaultDir;

window.onload = function () {

	fs =  new Filesystem();

	unzipper =  new Unzipper();

	downloader =  new Downloader();
}


function init(){
	fs.init();
}

function mkdir(){
	var path = mkdirTxt.value;

	_log('mkdir path', path);
	fs.mkdir(path, {}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}

function rmdir(){
	var path = rmTxt.value;

	_log('rmdir path', path);
	fs.rmdir(path, {recursive: true}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}


function rmfile(){
	var path = rmfileTxt.value;

	_log('rmfile path', path);
	fs.rm(path, {recursive: true}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);

	})
}

function writefile(){
	var path = writefileTxt.value;
	var text = writefileDataTxt.value;

	_log('writefile path', path);
	fs.writeFile(path, text, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}

function readfile(){
	var path = readfileTxt.value;

	_log('readfile path', path);
	fs.readFile(path, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}


function listdir(){
	var path = listDirTxt.value;

	_log('listdir path', path);
	fs.ls(path, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	});


	// fs.ls('/mtd_down/common', function(error, data){
	// 	if(error)
	// 		return _log('error', error);

	// 	_log('data', data);
	// });
}


function download(){
	_log('startDownloader');
	downloader.start({
		url: urlfileTxt.value,
		path: pathfileTxt.value,
	}, function(error, data){
		_log('complete', error, data)
	});
}

function unzip(){
	_log('startUnzipper');
	unzipper.start({
		from: fromTxt.value,
		to: toTxt.value,
	}, function(error, data){
		_log('complete', error, data)
	});
}