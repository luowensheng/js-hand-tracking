
document.addEventListener("DOMContentLoaded", ()=>{

   const tracker = new HandTracker({
        onLeftHandRaised: ()=>console.log("left hand raised"),
        onRightHandRaised: ()=>console.log("right hand raised")
    });

    tracker.run();

})

