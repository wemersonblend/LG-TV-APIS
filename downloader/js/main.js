var downloader;
var defaultDir = 'file://internal/example';

urlfileTxt.value = 'http://www.example.com/file.zip';
pathfileTxt.value = defaultDir;

window.onload = function () {
	_log('onload')

	downloader =  new Downloader();

}

function init(){
	_log('init');
	downloader.start({
		url: urlfileTxt.value,
		path: pathfileTxt.value,
	}, function(error, data){
		_log('complete', error, data)
	});
}