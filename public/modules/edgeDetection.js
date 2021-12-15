 
function opencvcheck() {
        openCvStatus = "Ready"
        outputTextElement(
        'openCvStatus',
        `OpenCvStatus: ${openCvStatus}`
    );
        edgeDetection();
}

//-------------Click-EVENT----------------------

var topDiv = document.getElementById('output'); 
topDiv.addEventListener('click', function (e){
    
  clickX = e.clientX;
  clickY = e.clientY;

  if(corners.length<=3 && enableEdgeDetection){

    var object ={};
    object.x =clickX;
    object.y =clickY;
    object.id = "snapshot_"+corners.length;

    var snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.id = "snapshot_"+corners.length;
    snapshotCanvas.style.position = "fixed";
    snapshotCanvas.style.border = "red 1px";
    snapshotCanvas.width = snapshotWitdh ;
    snapshotCanvas.height = snapshotHeight ;
    snapshotCanvas.style.left = clickX-snapshotWitdh/2 + "px";
    snapshotCanvas.style.top = clickY-snapshotHeight/2 + "px";
    document.body.appendChild(snapshotCanvas);
    corners.push(object);
    }
});

var edgeDetectionInterval;

// Inspiration from:  https://towardsdatascience.com/real-time-edge-detection-in-browser-ee4d61ba05ef

       
function drawCanvas() {  
    var canvas = document.getElementById("canvas");
     
    if(video.videoWidth>0)
    {
        var ctx = canvas.getContext('2d');
    
        var w = video.videoWidth;
        var h = video.videoHeight; 
    
        canvas.width = w;
        canvas.height = h;
            
        ctx.drawImage(video,0,0,w,h);
  
  }else{ canvas.style.display='hidden'; console.log("could not draw");return;};
}

async function edgeDetection() {

        try{
  setInterval(() => {
            if(enableEdgeDetection){
        
         drawCanvas();
        
        // Get the current frame from the intermediate canvas
        var  src = cv.imread("canvas");

        var  srcGrey = new cv.Mat();
        var  harrisCorner_1 = new cv.Mat();
        var  harrisCorner_2 = new cv.Mat();
        var  srcCanny = new cv.Mat();
        var  houghLine = new cv.Mat();
        var  cornerMat = new cv.Mat();
        var  srcDeligate = new cv.Mat();
        var  srcErode = new cv.Mat();

     for(var i = 0; i<corners.length; i++){
            var id = "snapshot_"+i;
        var smallCanvas = document.getElementById(id);
        smallCanvas.style.display = "block";

        var sx = corners[i].x-snapshotWitdh/2;
        var sy = corners[i].y-snapshotHeight/2;
       
            var ctx_smallCanvas = smallCanvas.getContext('2d');
            var a = document.getElementById("video-background");
            ctx_smallCanvas.drawImage(a,sx,sy,snapshotWitdh,snapshotHeight,0,0,snapshotWitdh ,snapshotHeight);
    
              var src_canny = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_harris = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_img = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_grey = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_deligate = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_erode = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
            
            src_img = cv.imread(id);
            src_grey = cv_cvtColor(src_img);

            src_canny = cv_Canny(src_grey);
            src_harris = cv_CornerHarris(src_canny);
            
            let M = cv.Mat.ones(5, 5, cv.CV_8U);
            let anchor = new cv.Point(-1, -1);
            
            cv.erode(src_harris, src_erode, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
            cv.dilate(src_erode, src_deligate, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());            
            
            var result = cv.minMaxLoc(src_deligate);

            if(result.maxLoc.x != 0){
                var cornerX = result.maxLoc.x - snapshotWitdh/2 + corners[i].x;
            }
                
            if(result.maxLoc.y != 0)   {
                var cornerY = result.maxLoc.y - snapshotHeight/2 + corners[i].y;
            }
  
             corners[i].x = cornerX;
             corners[i].y = cornerY;
             smallCanvas.style.left = (cornerX - snapshotWitdh/2) + "px";
             smallCanvas.style.top = (cornerY - snapshotHeight/2) + "px";
             
            cv.imshow(id, src_deligate);

            src_img.delete();
            src_grey.delete();
            src_canny.delete();
            src_harris.delete();
            src_deligate.delete();
         }

        src.delete();
        srcGrey.delete();
        harrisCorner_1.delete();
        harrisCorner_2.delete();
        srcCanny.delete();
        houghLine.delete();
        cornerMat.delete();
        srcDeligate.delete();
        srcErode.delete();
    }else{
        for(var i = 0; i<corners.length; i++){
            var id = "snapshot_"+i;
            var smallCanvas = document.getElementById(id);

            smallCanvas.style.display = "none";
        }}
    }, 42);
}catch{return;}
}

function cv_CornerHarris(src)
    {
        var output = new cv.Mat();
        cv.cornerHarris(src, output, 3, 9, 0.01);
        return output;
    }
 function cv_Canny(src)
 {
     var output = new cv.Mat();
    cv.Canny(src, output,518, 1083, 5, false);
    return output;
 }   
 function cv_houghLine(src){
    var output = new cv.Mat();
    cv.HoughLines(src, output, 3, Math.PI/180, 150);
    return output;
 }
 function cv_cvtColor(src)
 {
    var output = new cv.Mat();
    cv.cvtColor(src, output, cv.COLOR_RGB2GRAY, 0);
    return output;
 }
