var fillVideo = function(vid){

	return;
    var video = $(vid);
    // var actualRatio = vid.videoWidth/vid.videoHeight;
    var actualRatio = vid.videoWidth/vid.videoHeight;
    var targetRatio = video.width()/video.height();
    // var targetRatio = window.innerWidth / window.innerHeight;
    var adjustmentRatio = targetRatio/actualRatio;
    var scale = (actualRatio < targetRatio) ? targetRatio / actualRatio : actualRatio / targetRatio;
    video.css('-webkit-transform','scale(' + scale  + ')');
};

function getVideoStatus () {
	var video;
    function successCb(cbObject) {
    	window.source = cbObject;
    	window.video_ = video;
    	console.log(cbObject)
        console.log(video)
        // Do something
    }

    function failureCb(cbObject) {
        var errorCode = cbObject.errorCode;
        var errorText = cbObject.errorText;

        console.log ("Error Code [" + errorCode + "]: " + errorText);
    }

    video = new Video();
    video.getVideoStatus(successCb, failureCb);
}

window.onload = function (){
	// fillVideo(document.getElementById('player'));
	getVideoStatus();
}

window.onresize = function (){
	// fillVideo(document.getElementById('player'));
}