# sigma-ssai-web-sdk

```
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
        .then(({ onEventTracking, manifestUrl, hlsHelper }) => {
          // Check if the HLS.js is supported in the browser
          if (window.Hls.isSupported()) {
            const hls = new window.Hls();

            // STEP 7: Load the manifest URL and attach the HLS stream to the video element
            hls.loadSource(manifestUrl);
            hls.attachMedia(video);

            // STEP 8: Set up HLS event handlers to manage ad insertion and tracking
            hls.on(window.Hls.Events.FRAG_CHANGED, hlsHelper.createHlsFragChanged());
            hls.on(window.Hls.Events.FRAG_PARSING_METADATA, hlsHelper.createHlsFragParsingMetadata());

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
