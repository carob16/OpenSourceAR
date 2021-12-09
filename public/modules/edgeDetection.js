 
     function opencvcheck() {
         openCvStatus = "Ready"
        outputTextElement(
    'openCvStatus',
    `OpenCvStatus: ${openCvStatus}`
  );
  edgeDetection();
       }

//-------------Variables----------------------




// https://towardsdatascience.com/real-time-edge-detection-in-browser-ee4d61ba05ef
       // Function to draw a video frame onto the canvas
function drawCanvas() {  
    var canvas = document.getElementById("canvas");
     
    if(video.videoWidth>0)
    {
        var ctx = canvas.getContext('2d');
        //var source = video;
        var w = video.videoWidth;
        var h = video.videoHeight; 
    
        canvas.width = w;
        canvas.height = h;
            
        ctx.drawImage(video,0,0,w,h);
        // console.log("clickX:"+clickX +" clickY:" + clickY + "cornerAreaSize: " + cornerAreaSize);
        // ctx.drawImage(video,clickX,clickY,cornerAreaSize,cornerAreaSize,clickX,clickY,50,50);//https://stackoverflow.com/questions/19186312/html5-webcam-capture-scaling-problems-in-chrome
        // canvas.style.display='block';
        // video.style.display='none';
  
  }else{ canvas.style.display='hidden'; console.log("could not draw");return;};
}

async function edgeDetection() {
    try{
     
    // Set interval to repeat function every 42 milliseconds
    setInterval(() => {
        // Draw frame to the intermediate canvas
         drawCanvas();
        
        // Get the current frame from the intermediate canvas
     
        var  src = cv.imread("canvas");
        var  srcGrey = new cv.Mat();
        var  harrisCorner_1 = new cv.Mat();
        var  harrisCorner_2 = new cv.Mat();
        var  srcCanny = new cv.Mat();
        var  houghLine = new cv.Mat();
        var  cornerMat = new cv.Mat();
        
        //making source img into grey img
        cv.cvtColor(src, srcGrey, cv.COLOR_RGB2GRAY, 0);
        srcGrey = cv_cvtColor(src);
        // cv.imshow("edgeDetectionCanvas", srcGrey); 
       

        //Finding corners #1
        // cv.cornerHarris(srcGrey, harrisCorner_1, 3, 5, 0.05);
        // harrisCorner_1 = cv_CornerHarris(srcGrey);
        // var result = cv.minMaxLoc(harrisCorner_1);
        //console.log(result.maxLoc);  
        // cv.imshow("edgeDetectionCanvas", harrisCorner_1);  

        //Canny Edge detection
        //cv.Canny(srcGrey, srcCanny,1150, 2800, 5, false);
        // cv.Canny(srcGrey, srcCanny,50, 150, 3, false);
        srcCanny = cv_Canny(srcGrey);
        // cv.imshow("edgeDetectionCanvas", srcCanny);

        //Finding corners #2
        // cv.cornerHarris(srcCanny, harrisCorner_2, 2, 9, 0.04);
        harrisCorner_2 = cv_CornerHarris(srcCanny);
        // // var result = cv.minMaxLoc(harrisCorner_2);
        // //console.log(result.maxLoc);  
        // cv.imshow("edgeDetectionCanvas", harrisCorner_2);  
        // let dst = grey;
        // cv.HoughLines(srcCanny, houghLine, 3, Math.PI/180, 150);
        // houghLine = cv_houghLine(srcCanny);
        // let p1 = new cv.Point(100,100);
        // let p2 = new cv.Point(500,100);
        // let lineColor = new cv.Scalar(255,0,0);
        // console.log(houghLine);
        // cv.line(srcGrey, p1, p2, lineColor, 2);
        // cv.imshow("edgeDetectionCanvas", srcGrey);

        
      // cv.imshow("edgeDetectionCanvas", src);

     for(var i = 0; i<corners.length; i++){
            var id = "snapshot_"+i;
        var smallCanvas = document.getElementById(id);

        var sx = corners[i].x-snapshotWitdh/2;
        var sy = corners[i].y-snapshotHeight/2;
       
            var ctx_smallCanvas = smallCanvas.getContext('2d');
            var a = document.getElementById("video-background");
            ctx_smallCanvas.drawImage(a,sx,sy,snapshotWitdh,snapshotHeight,0,0,snapshotWitdh ,snapshotHeight);
    
            // if(src_canny==undefined){
              var src_canny = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_harris = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_img = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
              var src_grey = new cv.Mat(snapshotWitdh, snapshotHeight, cv.CV_8U);
            // }   
            
            src_img = cv.imread(id);
            // console.log(src_img.rows, src_img.cols);
            // console.log(clickX, clickY);
            src_grey = cv_cvtColor(src_img);


            src_canny = cv_Canny(src_grey);
            src_harris = cv_CornerHarris(src_canny);
            
            
            var result = cv.minMaxLoc(src_harris);
            // console.log(result.maxLoc); 
            cv.imshow(id, src_harris);

            var cornerX = result.maxLoc.x - snapshotWitdh/2 + corners[i].x;
            var cornerY = result.maxLoc.y - snapshotHeight/2 + corners[i].y;
  
            // console.log("Data");
            //  console.log("corner pos:" + cornerX, cornerY);
             corners[i].x = cornerX;
             corners[i].y = cornerY;
             smallCanvas.style.left = (cornerX - snapshotWitdh/2) + "px";
             smallCanvas.style.top = (cornerY - snapshotHeight/2) + "px";
            // console.log(result.maxLoc.x, result.maxLoc.y);
             // console.log("mouse pos:" + clickX, clickY);

            src_img.delete();
            src_grey.delete();
            src_canny.delete();
            src_harris.delete();
         }
        

        

        //cv.imshow("edgeDetectionCanvas", srcGrey);
        // cv.imshow("smallCanvas", src);

        src.delete();
        srcGrey.delete();
        harrisCorner_1.delete();
        harrisCorner_2.delete();
        srcCanny.delete();
        houghLine.delete();
        cornerMat.delete();
    }, 2);
}catch{return;}
}

function cv_CornerHarris(src)
    {
    //   var a = document.getElementById("slider_1").value;
    //   var b = document.getElementById("slider_2").value;
    //   var c = document.getElementById("slider_3").value;
    //   console.log(a/1);
    //   console.log(b/1);
    //   console.log(c/100);

        var output = new cv.Mat();
        //cv.cornerHarris(src, output, a/1, b/1, c/100);
        cv.cornerHarris(src, output, 3, 9, 0.01);
        return output;
        // var result = cv.minMaxLoc(harrisCorner_1);
    }
 function cv_Canny(src)
 {
    //slider input
    // var a = document.getElementById("slider_1").value;
    // var b = document.getElementById("slider_2").value;
    // var c = document.getElementById("slider_3").value;
    // console.log(a/1);
    // console.log(b/1);
    // console.log(c/100);
    
    var output = new cv.Mat();
    cv.Canny(src, output,518, 1083, 5, false);
    // cv.Canny(src, output,a/1, b/1, c/1, false);
    return output;
 }   
 function cv_houghLine(src)
 {
    // var a = document.getElementById("slider_1").value;
    // var b = document.getElementById("slider_2").value;
    // var c = document.getElementById("slider_3").value;
    // console.log(a/1);
    // console.log(b/1);
    // console.log(c/100);
    var output = new cv.Mat();
    cv.HoughLines(src, output, 3, Math.PI/180, 150);
    // cv.HoughLines(src, output, a/1, Math.PI/(b/1), c/1);
    return output;
 }
 function cv_cvtColor(src)
 {
    var output = new cv.Mat();
    cv.cvtColor(src, output, cv.COLOR_RGB2GRAY, 0);
    return output;
 }

// - Velg 1 hjørne i bilde -> trykk:start kalibrering -> Beveg til ny posisjon -> trykk:neste sekvens -> Beregn avstand til punktet basert på målingene