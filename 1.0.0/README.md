# Sigma SSAI Web SDK Integration

**Phiên bản** : 1.0  
**Ngày phát hành** : 05/11/2024  
**Tác giả** : [Tên tác giả]  
**Đơn vị** : [Tên tổ chức]

## Mục lục

1. Giới thiệu
2. Phạm vi
3. Thuật ngữ và định nghĩa
4. Yêu cầu
5. Quy trình
6. Tài liệu tham khảo
7. Phụ lục (nếu có)

## 1. Giới thiệu

Tài liệu này cung cấp hướng dẫn chi tiết về cách tích hợp **Sigma SSAI Web SDK** vào các ứng dụng video, hỗ trợ chèn quảng cáo thông minh trong quá trình phát video. Mục tiêu chính của tài liệu là hướng dẫn người dùng qua các bước thiết lập SDK cho việc phát video và chèn quảng cáo từ các nguồn khác nhau, bao gồm VideoJS và HLS.js. Tài liệu này có tầm quan trọng lớn đối với các tổ chức triển khai video streaming với SSAI (Server-Side Ad Insertion) để cải thiện chất lượng và tính hiệu quả của các chiến dịch quảng cáo.

## 2. Phạm vi

Tài liệu này áp dụng cho các tổ chức hoặc cá nhân có nhu cầu tích hợp **Sigma SSAI Web SDK** vào hệ thống phát video trực tuyến của mình. Nó bao gồm hai phương pháp chính:  
- **VideoJS Integration**: Sử dụng thư viện VideoJS để phát video và chèn quảng cáo.  
- **HLS.js Integration**: Sử dụng thư viện HLS.js để phát các video dạng HLS và hỗ trợ chèn quảng cáo.

Tài liệu không bao gồm việc triển khai các phương pháp ngoài VideoJS và HLS.js hoặc các tùy chọn phần mềm khác ngoài Sigma SSAI Web SDK.

## 3. Thuật ngữ và định nghĩa

| Thuật ngữ     | Định nghĩa                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| **SSAI**      | Server-Side Ad Insertion, là phương pháp chèn quảng cáo vào luồng video ngay trên server. |
| **SDK**       | Software Development Kit, bộ công cụ phần mềm hỗ trợ phát triển ứng dụng với các thư viện và API. |
| **HLS**       | HTTP Live Streaming, một giao thức streaming video qua HTTP. |
| **VideoJS**   | Thư viện mã nguồn mở hỗ trợ phát video trên trình duyệt với các tính năng như phát full-screen, chèn quảng cáo, và hỗ trợ nhiều định dạng video. |

## 4. Yêu cầu

Tài liệu này yêu cầu các điều kiện sau:
- **Trình duyệt hỗ trợ**: Các trình duyệt web mới nhất hỗ trợ JavaScript, HTML5, và video playback.
- **Thư viện**: Cần phải tải và sử dụng các thư viện VideoJS và HLS.js tương ứng.
- **Phiên bản SDK**: Sigma SSAI Web SDK phiên bản 6.x trở lên.
- **Video Stream**: Cần có một stream video HLS (M3U8 file) có chứa quảng cáo được chèn từ server.

## 5. Quy trình

Dưới đây là quy trình tích hợp **Sigma SSAI Web SDK** vào dự án của bạn. Quy trình được chia thành hai phần chính: **VideoJS Integration** và **HLS.js Integration**.

### Lưu ý chung

- **Tương thích Safari**: VideoJS không hỗ trợ luồng HLS trên trình duyệt Safari. Thay vào đó, hãy sử dụng phương pháp tích hợp HLS.js để đảm bảo tương thích với Safari.

- **Theo dõi sự kiện**: Cả hai phương pháp tích hợp VideoJS và HLS.js đều hỗ trợ theo dõi sự kiện, cho phép bạn ghi lại các sự kiện quan trọng trong quá trình phát video và chèn quảng cáo.

- **Hủy instance SDK**: Để tránh rò rỉ bộ nhớ, cần phải hủy instance Sigma SSAI SDK khi trang được tải lại bằng cách gọi hàm destroy.

### 5.1. VideoJS Integration



#### Bước 1: Thêm thư viện VideoJS

Thêm các liên kết và script của thư viện VideoJS vào phần `<head>` của HTML.

```html
<link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
<script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
```

#### Bước 2: Thêm thư viện Sigma SSAI Web SDK

Thêm thư viện Sigma SSAI Web SDK vào phần `<head>` của HTML.

```html
<script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/sdk-dai.iife.js"></script>


#### Bước 3: Tạo container cho video và quảng cáo

Tạo một container HTML chứa phần tử video và phần tử cho quảng cáo:

```html
<div style="position: relative; width: 720px; overflow: hidden; aspect-ratio: 16/9;">
  <!-- Video Element -->
  <video class="videoElement" muted controls playsinline preload="auto"
    style="position: absolute; inset: 0; width: 100%; height: 100%;"></video>
  
  <!-- Ad Container -->
  <div class="adContainer" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow: hidden; width: 100%;"></div>
</div>
```

#### Bước 4: Khởi tạo Sigma SSAI SDK khi trang tải

Khi trang được tải, khởi tạo SDK và thiết lập video và quảng cáo.

```javascript 
window.addEventListener('load', function () {
  const video = document.querySelector('.videoElement');
  const adContainer = document.querySelector('.adContainer');
  let destroyFn;

  const url = 'https://ssai-stream-dev.sigmaott.com/manifest/manipulation/session/97004de4-1971-4577-8f1b-eccb03737fa5/origin04/scte35-av4s-clear/master.m3u8';

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

### 5.2. HLS.js Integration

#### Bước 1: Thêm thư viện HLS.js

Thêm thư viện HLS.js vào phần `<head>` của HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

#### Bước 2: Thêm thư viện Sigma SSAI Web SDK

Thêm thư viện Sigma SSAI Web SDK vào phần `<head>` của HTML.

```html
<script src="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/sdk-dai.iife.js"></script>
```

#### Bước 3: Tạo container cho video và quảng cáo

Tạo một container HTML chứa phần tử video và phần tử cho quảng cáo.

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

#### Bước 4: Khởi tạo SDK khi trang tải

Khởi tạo Sigma SSAI SDK và thiết lập các container video và quảng cáo.

```javascript
window.addEventListener('load', function () {
  const video = document.querySelector('.videoElement');
  const adContainer = document.querySelector('.adContainer');

  const url = 'https://ssai-stream-dev.sigmaott.com/manifest/manipulation/session/97004de4-1971-4577-8f1b-eccb03737fa5/origin04/scte35-av4s-clear/master.m3u8';

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

## 6. Tài liệu tham khảo

- Sigma SSAI Web SDK Documentation.
- HLS.js Documentation: https://github.com/video-dev/hls.js/

## 7. Phụ lục (nếu có)

Không có phụ lục trong tài liệu này.
