 import React, { useEffect, useRef } from 'react';

 function VideoDivFunc({ onTimeUpdate, videoStopped, setVideoStopped }) {  // Accept the callback prop
   const playerRef = useRef(null);
   const stopTimeRef = useRef(600);
   const stopTimeList = [600, 1200, 1800, 2400, 2800]


   useEffect(() => {
     if (!document.getElementById('iframe-demo')) {
       const tag = document.createElement('script');
       tag.id = 'iframe-demo';
       tag.src = 'https://www.youtube.com/iframe_api';
       document.getElementsByTagName('head')[0].appendChild(tag);
     }

     const onPlayerStateChange = (event) => {
       if (event.data === window.YT.PlayerState.PLAYING) {
         const currentTime = event.target.getCurrentTime();
         console.log("Video started playing at:", currentTime);
         if (onTimeUpdate) {
           onTimeUpdate(currentTime);  // Trigger callback on play start
         }
        }
     };

     window.onYouTubeIframeAPIReady = () => {
       if (window.YT && window.YT.Player) {
         playerRef.current = new window.YT.Player('existing-iframe-example', {
           events: {
             onStateChange: onPlayerStateChange,
           },
         });
       }
     };

     const interval = setInterval(() => {
       if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
         const currentTime = playerRef.current.getCurrentTime();
         //console.log("Current timestamp:", stopTimeRef.current);

         // Call the onTimeUpdate prop to send current time to parent
         if (onTimeUpdate) {
           onTimeUpdate(currentTime);  // Trigger callback on play start
       }
       if (stopTimeRef.current !== null && currentTime >= stopTimeRef.current) {
                 console.log(`Stopping video at ${stopTimeRef.current} seconds`);
                 playerRef.current.pauseVideo();
                 setVideoStopped(true);
                 if(stopTimeList.indexOf(stopTimeRef.current) < stopTimeList.length - 1){
                   stopTimeRef.current = stopTimeList[stopTimeList.indexOf(stopTimeRef.current) + 1];
                 }
                 else
                 {
                   stopTimeRef.current = null; // Reset stop time after stopping
                 }
               }
       }
     }, 30); // Update every 10 seconds

     return () => {
       clearInterval(interval);  // Cleanup interval on unmount
       if (playerRef.current) {
         playerRef.current.destroy();
         playerRef.current = null;
       }
       window.onYouTubeIframeAPIReady = null;
     };
   }, []);  // Add onTimeUpdate to dependency array

   return (
     <iframe
       id="existing-iframe-example"
       src="https://www.youtube.com/embed/YhgS5FDXQf8?enablejsapi=1"
       title="YouTube video player"
       frameBorder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       allowFullScreen
       style={{ width: "100%", height: "100%" }}
     ></iframe>
   );
 }

 export default VideoDivFunc;
