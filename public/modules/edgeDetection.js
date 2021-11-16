 
     function opencvcheck() {
         openCvStatus = "Ready"
        outputTextElement(
    'openCvStatus',
    `OpenCvStatus: ${openCvStatus}`
  );
  edgeDetection();
       }

// https://towardsdatascience.com/real-time-edge-detection-in-browser-ee4d61ba05ef
       // Function to draw a video frame onto the canvas
function drawCanvas() {  
    var canvas = document.getElementById("canvas"); 
    if(video.videoWidth>0){
    
    var ctx = canvas.getContext('2d');
 
    var w = video.videoWidth;
    var h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(video,0,0,w,h);//https://stackoverflow.com/questions/19186312/html5-webcam-capture-scaling-problems-in-chrome
    canvas.style.display='block';
   //ideo.style.display='none';

    // Get context and draw frame from video element
    var scaleX = 0.10;
    var aspectRatio = 16/10;
    
   

//ctx.setTransform(1, 0, 0, 1, 0, 0);//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
//ctx.scale(0.3,0.3);
  //  ctx.drawImage(video, 0, 0,640,480, 0, 0, 640,480);
  }else{ canvas.style.display='hidden';return;};
}

async function edgeDetection() {
    try{
     
    // Set interval to repeat function every 42 milliseconds
    setInterval(() => {
        // Draw frame to the intermediate canvas
         drawCanvas();
        
        // Get the current frame from the intermediate canvas
        var src = cv.imread("canvas");
        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(src, src, 50, 100, 3, false);
        cv.imshow("edgeDetectionCanvas", src);
        src.delete();
    }, 42);
}catch{return;}
}

    