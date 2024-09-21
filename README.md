# sigma-ssai-web-sdk

## Videojs Sample
```html
<!DOCTYPE html>

<head>
  <link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
  <script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>

  <!-- STEP 2: Include the Sigma SSAI Web SDK -->
  <script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/sdk-dai.iife.js"></script>
</head>

<body>
  <!-- STEP 3: Create a container for the video and ad playback -->
  <div style="position: relative; width: 720px; overflow: hidden; aspect-ratio: 16/9;">
    <!-- Video Element -->
    <video class="videoElement" muted controls playsinline preload="auto"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"></video>
    <!-- Ad Container -->
    <div class="adContainer"
      style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow: hidden; width: 100%;"></div>
  </div>

  <script>
    // STEP 4: Initialize the SDK and set up video streaming and ads when the page loads
    window.addEventListener('load', function () {
      // Get references to the video and ad container elements
      const video = document.querySelector('.videoElement');
      const adContainer = document.querySelector('.adContainer');

      const url =
        'https://ssai-stream-dev.sigmaott.com/manifest/manipulation/session/97004de4-1971-4577-8f1b-eccb03737fa5/origin04/scte35-av4s-clear/master.m3u8';

      // STEP 6: Create a new instance of the Sigma SSAI SDK with the video and ad containers
      window.SigmaDaiSdk.createSigmaDai({ video, adContainer, url })
        .then(({ onEventTracking, manifestUrl, sigmaPlayer }) => {
          const player = videojs(video)

          // IMPORTANT!!!: STEP 7: Set the source of the player to the manifest URL
          player.src({
            src: manifestUrl,
            type: 'application/x-mpegURL',
          })

          sigmaPlayer.attachVideojs(player)

          onEventTracking('*', (payload) => {
            console.log('[LOG] Event Payload:', payload);
          })
        });
    });
  </script>
</body>

```

## Hls Sample
```html
<!DOCTYPE html>
<head>
  <!-- STEP 1: Include the HLS.js library for streaming -->
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

  <!-- STEP 2: Include the Sigma SSAI Web SDK -->
  <script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/sdk-dai.iife.js"></script>
</head>

<body>
  <!-- STEP 3: Create a container for the video and ad playback -->
  <div style="position: relative; width: 720px; overflow: hidden; aspect-ratio: 16/9;">
    <!-- Video Element -->
    <video
      class="videoElement"
      muted
      controls
      playsinline
      preload="auto"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
    ></video>
    <!-- Ad Container -->
    <div
      class="adContainer"
      style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow: hidden; width: 100%;"
    ></div>
  </div>

  <script>
    // STEP 4: Initialize the SDK and set up video streaming and ads when the page loads
    window.addEventListener('load', function () {
      // Get references to the video and ad container elements
      const video = document.querySelector('.videoElement');
      const adContainer = document.querySelector('.adContainer');

      // STEP 5: Set the URL of the HLS manifest (video stream with SSAI)
      const manifestUrl =
        'https://ssai-stream-dev.sigmaott.com/manifest/manipulation/session/97004de4-1971-4577-8f1b-eccb03737fa5/origin04/scte35-av4s-clear/master.m3u8';

      // STEP 6: Create a new instance of the Sigma SSAI SDK with the video and ad containers
      window.SigmaDaiSdk.createSigmaDai({ video, adContainer, url: manifestUrl })
        .then(({ onEventTracking, manifestUrl, sigmaPlayer }) => {
          // Check if the HLS.js is supported in the browser
          if (window.Hls.isSupported()) {
            const hls = new window.Hls();

            // STEP 7: Load the manifest URL and attach the HLS stream to the video element
            hls.loadSource(manifestUrl);
            hls.attachMedia(video);

            // STEP 8: Set up HLS event handlers to manage ad insertion and tracking
            sigmaPlayer.attachHls(hls)

            // STEP 9: Set up event tracking for logging
            onEventTracking('*', (payload) => {
              console.log('[LOG] Event Payload:', payload);
            });
          }
        });
    });
  </script>
</body>

```
