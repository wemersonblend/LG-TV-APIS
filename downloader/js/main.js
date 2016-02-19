var downloader;
var defaultDir = 'file://internal/4yousee';

urlfileTxt.value = 'http://www.samsungdforum.com/B2B/Guide/_downloads/mixPlaylistApp.zip';
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