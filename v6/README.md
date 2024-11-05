# sigma-ssai-web-sdk

## Hls Integration
```html
<!DOCTYPE html>
<head>
  <!-- STEP 1: Include the HLS.js library for streaming -->
  <!-- BƯỚC 1: Thêm thư viện HLS.js cho streaming -->
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

  <!-- STEP 2: Include the Sigma SSAI Web SDK -->
  <!-- BƯỚC 2: Thêm thư viện Sigma SSAI Web SDK -->
  <script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/sdk-dai.iife.js"></script>
</head>

<body>
  <!-- STEP 3: Create a container for the video and ad playback -->
  <!-- BƯỚC 3: Tạo một container cho video và quảng cáo -->
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
    // BƯỚC 4: Khởi tạo SDK và thiết lập video streaming và quảng cáo khi trang tải xong
    window.addEventListener('load', function () {
      // Get references to the video and ad container elements
      const video = document.querySelector('.videoElement');
      const adContainer = document.querySelector('.adContainer');

      // STEP 5: Set the URL of the HLS manifest (video stream with SSAI)
      // BƯỚC 5: Đặt URL của HLS manifest (video stream với SSAI)
      const url =
        'https://ssai-stream-dev.sigmaott.com/manifest/manipulation/session/97004de4-1971-4577-8f1b-eccb03737fa5/origin04/scte35-av4s-clear/master.m3u8';
      let destroyFn;
      // STEP 6: Create a new instance of the Sigma SSAI SDK with the video and ad containers
      // BƯỚC 6: Tạo một instance mới của Sigma SSAI SDK với video và ad containers
      window.SigmaDaiSdk.createSigmaDai({ video, adContainer, adsUrl })
        .then(({ onEventTracking, sigmaPlayer, destroy }) => {
          // Check if the HLS.js is supported in the browser
          if (window.Hls.isSupported()) {
            const hls = new window.Hls();
            sigmaPlayer.attachHls(hls)

            // STEP 7: Load the manifest URL and attach the HLS stream to the video element
            // BƯỚC 7: Tải URL manifest và gắn HLS stream vào phần tử video
            hls.loadSource(url);
            hls.attachMedia(video);

            // STEP 8: Set up HLS event handlers to manage ad insertion and tracking
            // BƯỚC 8: Thiết lập các trình xử lý sự kiện HLS để quản lý việc chèn và theo dõi quảng cáo

            // STEP 9: Set up event tracking for logging
            // BƯỚC 9: Thiết lập theo dõi sự kiện để ghi log
            onEventTracking('*', (payload) => {
              console.log('[LOG] Event Payload:', payload);
            });
            destroyFn = destroy;
          }
        });

      // Extra: Destroy the SDK instance when the page is unloaded
      // Bổ sung: Hủy instance của SDK khi trang được tải xong
      window.addEventListener('beforeunload', destroyFn);
    });
  </script>
</body>

```
