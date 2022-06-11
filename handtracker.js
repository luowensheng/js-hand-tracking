// url:  https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet


addScriptToDom("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core")
addScriptToDom("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter")
addScriptToDom("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl")
addScriptToDom("https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection")

const NOSE_INDEX = 0
const LEFT_EYE_INDEX = 1
const RIGHT_EYE_INDEX = 2
const LEFT_EAR_INDEX = 3
const RIGHT_EAR_INDEX = 4
const LEFT_SHOULDER_INDEX = 5
const RIGHT_SHOULDER_INDEX = 6
const LEFT_ELBOW_INDEX = 7
const RIGHT_ELBOW_INDEX = 8
const LEFT_WRIST_INDEX = 9
const RIGHT_WRIST_INDEX = 10
const LEFT_HIP_INDEX = 11
const RIGHT_HIP_INDEX = 12
const LEFT_KNEE_INDEX = 13
const RIGHT_KNEE_INDEX = 14
const LEFT_ANKLE_INDEX = 15
const RIGHT_ANKLE_INDEX = 16





class HandTracker {

    constructor({ onRightHandRaised=null, onLeftHandRaised=null}){
      
        this.onRightHandRaised= (onRightHandRaised!=null)?onRightHandRaised:()=>console.log("right hand Raised");
        this.onLeftHandRaised = (onLeftHandRaised!=null)?onLeftHandRaised:()=>console.log("left hand Raised");

    }


    async run(){

            const webcam = await createWebcamElement();
            const detectorConfig = {modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
            const detector = await window.poseDetection.createDetector(window.poseDetection.SupportedModels.MoveNet, detectorConfig);
            const onDetection = (keypoints) => this.onDetection(keypoints, this.onLeftHandRaised,this.onRightHandRaised);
                   
            async function loop() {

            const poses = await detector.estimatePoses(webcam);    

            // console.log(poses)
                if (poses.length!=0){
                    let keypoints = poses[0].keypoints;
                    onDetection(keypoints);
                }
                requestAnimationFrame(loop);
           }
           
           loop() 
    }

    onDetection(keypoints, onLeftHandRaised, onRightHandRaised) {
    
        let highest_index = -1;
        let best_height = 100000;
        [LEFT_WRIST_INDEX, RIGHT_WRIST_INDEX, LEFT_SHOULDER_INDEX, RIGHT_SHOULDER_INDEX].forEach((index) => {
           
            let element = keypoints[index]

            if (element.y< best_height){
               best_height = element.y;
               highest_index = index;
           }

        });
        
        switch (highest_index) {
            case LEFT_WRIST_INDEX:
                onLeftHandRaised();
                break;
            case RIGHT_WRIST_INDEX:
                   onRightHandRaised();
                    break;    
            default:
                break;
        }
        
    }
}


async function startWebCam(video) {
    if (navigator.mediaDevices.getUserMedia) {
       await navigator.mediaDevices.getUserMedia({ 
            video: { width: 1280, height: 720, facingMode: "user" }
         })
          .then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function(e) {
                video.play();
              };
          })
          .catch(function (error) {
            console.log(error);
          });
      }
}

async function createWebcamElement() {

    const webcam = addToDom("video", document.body);
    webcam.style.width = "100vw";
    webcam.style.height = "100vh";
    await startWebCam(webcam);
    return webcam;
}


function addToDom(tag, parent) {
    const el = document.createElement(tag);
    parent.appendChild(el);
    return el;  
}
function addScriptToDom(src) {
    addToDom("script", document.body).src = src;
}