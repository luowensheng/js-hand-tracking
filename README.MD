
# Javascript Movenet SinglePose HandTracker


#### Installation via script tags
```html
<script src="./handtracker.js" defer></script>

```


#### Demo Usage
```js
document.addEventListener("DOMContentLoaded", ()=>{

   const tracker = new HandTracker({
        onLeftHandRaised: ()=>console.log("left hand raised"),// replace with your funtion
        onRightHandRaised: ()=>console.log("right hand raised"),// replace with your funtion
        webcamIsVisible: true
    });
k
    tracker.run();

})

```