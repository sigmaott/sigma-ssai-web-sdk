# Sigma SSAI Web SDK Integration

**Version** : 1.0.0
**Release Date** : 05/11/2024
**Author** : Thủ Đô Multimedia
**Unit** : Thủ Đô Multimedia

## Table of Contents

1. Introduction

2. Scope
3. Terms and definitions
4. Requirements
5. Process
6. References
7. Appendices (if any)

## 1. Introduction

This document provides detailed instructions on how to integrate **Sigma SSAI Web SDK** into video applications, supporting smart ad insertion during video playback. The main goal of the document is to guide users through the steps of setting up the SDK for video playback and ad insertion from various sources, including VideoJS and HLS.js. This document is of great importance to organizations implementing video streaming with SSAI (Server-Side Ad Insertion) to improve the quality and effectiveness of advertising campaigns.

## 2. Scope

This document applies to organizations or individuals who need to integrate **Sigma SSAI Web SDK** into their online video streaming system. It includes two main methods:

- **VideoJS Integration**: Using the VideoJS library to play videos and insert ads.

- **HLS.js Integration**: Using the HLS.js library to play HLS videos and support ad insertion.

The document does not cover the implementation of methods other than VideoJS and HLS.js or software options other than Sigma SSAI Web SDK.

## 3. Terms and definitions

| Terms | Definitions |
| ------------- | ----------------------------------------------------------------------------- |
| **SSAI** | Server-Side Ad Insertion, is a method of inserting ads into video streams directly on the server. |
| **SDK** | Software Development Kit, a set of software tools that support application development with libraries and APIs. |
| **HLS** | HTTP Live Streaming, a video streaming protocol over HTTP. |
| **VideoJS** | An open source library that supports video playback on browsers with features such as full-screen playback, ad insertion, and support for multiple video formats. |

## 4. Requirements

This document requires the following conditions:

- **Browser Support**: Latest web browsers that support JavaScript, HTML5, and video playback.

- **Libraries**: Must download and use the corresponding VideoJS and HLS.js libraries.

- **SDK Version**: Sigma SSAI Web SDK version 6.x or later.

- **Video Stream**: Must have an HLS video stream (M3U8 file) containing ads inserted from the server.

## 5. Process

Here is the process for integrating **Sigma SSAI Web SDK** into your project. The process is divided into two main parts: **VideoJS Integration** and **HLS.js Integration**.

### General Notes

- **Safari Compatibility**: VideoJS does not support HLS streams on Safari browsers. Instead, use the HLS.js integration method to ensure compatibility with Safari.

- **Event Tracking**: Both the VideoJS and HLS.js integration methods support event tracking, allowing you to record important events during video playback and insert ads.

- **SDK Instance Destroying**: To avoid memory leaks, the Sigma SSAI SDK instance must be destroyed when the page is reloaded by calling the destroy function.

### 5.1. VideoJS Integration

#### Step 1: Add VideoJS library

Add VideoJS library links and scripts to the `<head>` section of HTML.

```html
<link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
<script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
```

#### Step 2: Add Sigma SSAI Web SDK library

Add Sigma SSAI Web SDK library to the `<head>` section of HTML.

```html
<script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/sdk-dai.iife.js"></script>


#### Step 3: Create containers for videos and ads

Create an HTML container containing the video element and the element for the ad:

```html
<div style="position: relative; width: 720px; overflow: hidden; aspect-ratio: 16/9;">
 <!-- Video Element -->
 <video class="videoElement" muted controls playsinline preload="auto"
 style="position: absolute; inset: 0; width: 100%; height: 100%;"></video>

 <!-- Ad Container -->
 <div class="adContainer" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow: hidden; width: 100%;"></div>
</div>
```

#### Step 4: Initialize Sigma SSAI SDK on page load

When the page loads, initialize the SDK and set up the video and ads.

```javascript
window.addEventListener('load', function () {
 const video = document.querySelector('.videoElement');
 const adContainer = document.querySelector('.adContainer');
 let destroyFn;

 const url = 'https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-av6s-clear/master.m3u8?sigma.dai.adsEn dpoint=c1995593-784e-454e-b667-4b1ff441738e&sigma.dai.userId=abcd1234&sigma.dai.sessionId=xyz987';
 const { playerUrl, adsUrl } = window.SigmaDaiSdk.processURL(url)

 window.SigmaDaiSdk.createSigmaDai({ video, adContainer, adsUrl })
 .then(({ onEventTracking, sigmaPlayer, destroy, cspm }) => {
 const player = videojs(video);
