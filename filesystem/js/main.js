var fs;
var defaultDir = 'file://internal/4yousee';

mkdirTxt.value = defaultDir;
rmTxt.value = defaultDir;
rmfileTxt.value = defaultDir + '/teste.txt';
writefileTxt.value = defaultDir + '/teste.txt';
readfileTxt.value = defaultDir + '/teste.txt';
writefileDataTxt.value = 'vamos lá correr pra casa';
listDirTxt.value = defaultDir;

window.onload = function () {

	fs =  new Filesystem();

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


function rm(){
	var path = rmfileTxt.value;

	_log('rmfile path', path);
	fs.rm(path, {recursive: true}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);

	})
}

function writeFile(){
	var path = writefileTxt.value;
	var text = writefileDataTxt.value;

	_log('writefile path', path);
	fs.writeFile(path, text, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}

function readFile(){
	var path = readfileTxt.value;

	_log('readfile path', path);
	fs.readFile(path, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}


function listDir(){
	var path = listDirTxt.value;

	_log('listdir path', path);
	fs.ls(path, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}
