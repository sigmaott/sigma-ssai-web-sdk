# Sigma SSAI Web SDK Integration

**Version**: v7  
**Release Date**: 03/12/2024  
**Author**: Thu Do Multimedia  
**Organization**: Thu Do Multimedia

## Table of Contents

1. Introduction
2. Scope
3. Terms and Definitions
4. Requirements
5. Process
6. References
7. Appendix (if any)

## 1. Introduction

This document provides detailed guidance on integrating the **Sigma SSAI Web SDK** into video applications, supporting smart ad insertion during video playback. The main objective of this document is to guide users through the steps of setting up the SDK for video playback and ad insertion from various sources, including VideoJS and HLS.js. This document is crucial for organizations implementing video streaming with SSAI (Server-Side Ad Insertion) to improve the quality and effectiveness of advertising campaigns.

## 2. Scope

This document applies to organizations or individuals needing to integrate **Sigma SSAI Web SDK** into their online video streaming systems. It covers two main methods:  
- **VideoJS Integration**: Using the VideoJS library for video playback and ad insertion.  
- **HLS.js Integration**: Using the HLS.js library for HLS video playback with ad insertion support.

The document does not cover implementations beyond VideoJS and HLS.js or software options other than Sigma SSAI Web SDK.

## 3. Terms and Definitions

| Term          | Definition                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| **SSAI**      | Server-Side Ad Insertion, a method of inserting ads into video streams at the server level. |
| **SDK**       | Software Development Kit, a software toolkit supporting application development with libraries and APIs. |
| **HLS**       | HTTP Live Streaming, a video streaming protocol over HTTP. |
| **VideoJS**   | An open-source library supporting video playback in browsers with features like full-screen playback, ad insertion, and support for multiple video formats. |

## 4. Requirements

This document requires the following conditions:
- **Browser Support**: Latest web browsers supporting JavaScript, HTML5, and video playback.
- **Libraries**: Need to load and use VideoJS and HLS.js libraries accordingly.
- **SDK Version**: Sigma SSAI Web SDK version 6.x or higher.
- **Video Stream**: Requires an HLS video stream (M3U8 file) containing server-side inserted ads.

## 5 Generating Video URL
Once the SDK is initialized, generate the video URL by calling the generateUrl method with the videoUrl parameter:

Note: If the videoUrl contains the query parameter sigma.dai.adsEndpoint, its value will override the adsEndpoint provided during initialization.

Example: https://example.com/master.m3u8?sigma.dai.adsEndpoint=abc123

## 6. Process

Below is the process for integrating **Sigma SSAI Web SDK** into your project. The process is divided into two main parts: **VideoJS Integration** and **HLS.js Integration**.

### General Notes

- **Safari Compatibility**: VideoJS doesn't support HLS streams on Safari browser. Instead, use the HLS.js integration method to ensure Safari compatibility.

- **Event Tracking**: Both VideoJS and HLS.js integration methods support event tracking, allowing you to log important events during video playback and ad insertion.

- **SDK Instance Cleanup**: To prevent memory leaks, destroy the Sigma SSAI SDK instance when the page is reloaded by calling the destroy function.

### 6.1. VideoJS Integration

#### Step 1: Add VideoJS Library

Add VideoJS library links and scripts to the HTML `<head>` section.

```html
<link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
<script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
```

#### Step 2: Add Sigma SSAI Web SDK

Add the Sigma SSAI Web SDK library to the HTML `<head>` section.

```html
<script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/sdk-dai.iife.js"></script>
```

#### Step 3: Create Container for Video and Ads

Create an HTML container with elements for video and ads:

```html
<div style="position: relative; width: 720px; overflow: hidden; aspect-ratio: 16/9;">
  <!-- Video Element -->
  <video class="videoElement" muted controls playsinline preload="auto"
    style="position: absolute; inset: 0; width: 100%; height: 100%;"></video>
  
  <!-- Ad Container -->
  <div class="adContainer" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow: hidden; width: 100%;"></div>
</div>
```

#### Step 4: Initialize Sigma SSAI SDK on Page Load

Initialize the SDK and set up video and ads when the page loads.

```javascript
window.addEventListener('load', function () {
  const video = document.querySelector('.videoElement');
  const adContainer = document.querySelector('.adContainer');
  let destroyFn;

  const url = 'https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-av6s-clear/master.m3u8?sigma.dai.adsEn dpoint=c1995593-784e-454e-b667-4b1ff441738e&sigma.dai.userId=abcd1234&sigma.dai.sessionId=xyz987';
  const { playerUrl, adsUrl } = window.SigmaDaiSdk.processURL(url)

  window.SigmaDaiSdk.createSigmaDai({ video, adContainer, adsUrl })
    .then(({ onEventTracking, sigmaPlayer, destroy }) => {
      const player = videojs(video);
      
      player.src({
        src: url,
        type: 'application/x-mpegURL',
      });

      sigmaPlayer.attachVideojs(player);

      onEventTracking('*', (payload) => {
        console.log('[LOG] Event Payload:', payload);
      });

      destroyFn = destroy;
    });
});
```

### 6.2. HLS.js Integration

#### Step 1: Add HLS.js Library

Add the HLS.js library to the HTML `<head>` section.

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

#### Step 2: Add Sigma SSAI Web SDK

Add the Sigma SSAI Web SDK library to the HTML `<head>` section.

```html
<script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/sdk-dai.iife.js"></script>
```

#### Step 3: Create Container for Video and Ads

Create an HTML container with elements for video and ads.

```html
<div style="position: relative; width: 720px; overflow: hidden; aspect-ratio: 16/9;">
  <video
    class="videoElement"
    muted
    controls
    playsinline
    preload="auto"
    style="position: absolute; inset: 0; width: 100%; height: 100%;"
  ></video>
  <div
    class="adContainer"
    style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow: hidden; width: 100%;"
  ></div>
</div>
```

#### Step 4: Initialize SDK on Page Load

Initialize Sigma SSAI SDK and set up video and ad containers.

```javascript
window.addEventListener('load', function () {
  const video = document.querySelector('.videoElement');
  const adContainer = document.querySelector('.adContainer');

  const url = 'https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-av6s-clear/master.m3u8?sigma.dai.adsEn dpoint=c1995593-784e-454e-b667-4b1ff441738e&sigma.dai.userId=abcd1234&sigma.dai.sessionId=xyz987';
  const { playerUrl, adsUrl } = window.SigmaDaiSdk.processURL(url)

  window.SigmaDaiSdk.createSigmaDai({ video, adContainer, adsUrl })
    .then(({ onEventTracking, sigmaPlayer, destroy }) => {
      if (window.Hls.isSupported()) {
        const hls = new window.Hls();
        sigmaPlayer.attachHls(hls);

        hls.loadSource(url);
        hls.attachMedia(video);

        onEventTracking('*', (payload) => {
          console.log('[LOG] Event Payload:', payload);
        });

        destroyFn = destroy;
      }
    });
});
```

## 7. References

- Sigma SSAI Web SDK Documentation
- HLS.js Documentation: https://github.com/video-dev/hls.js/