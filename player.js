// player.js is a custom video player constructor

// Constructor

class Player {
  constructor(videoContainer, options = {}, meta = {}) {
    this.videoContainer = videoContainer;
    this.defaultMeta = {
      name: "Big Buck Bunny",
      channel: "Blender",
      channelPic: "/assets/pic.svg",
      duration: 596,
    };
    this.meta = { ...this.defaultMeta, ...meta };

    this.videoContainer.classList.add("video-container");
    this.videoContainer.classList.add("paused");
    this.videoContainer.setAttribute("data-volume-level", "high");

    let videoTitleContainer = document.createElement("div");
    videoTitleContainer.innerHTML = `
    <div class="video-title-container">
    <div class="video-title">
      <div class="channel-pic-container">
        <img src="${this.meta.channelPic}" class="channel-img" width="35px" height="35px">
      </div>
      <div class="video-name">${meta.name} ></div>
    </div>
  </div>
  `;

    videoContainer.appendChild(videoTitleContainer);

    let videoControlsContainer = document.createElement("div");
    videoControlsContainer.innerHTML = `
    <div class="video-controls-container">
    <div class="timeline-container">
      <div class="timeline">
        <div class="preview-time-stamp">00:00:00</div>
        <img class="preview-img" />
        <div class="thumb-indicator"></div>
      </div>
    </div>
    <div class="controls">
      <button class="play-pause-btn">
        <svg class="play-icon" viewBox="2 2 20 20">
          <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
        <i class="material-icons pause-icon">pause</i>
      </button>
      <div class="volume-container">
        <button class="mute-btn">
           
          <svg class="volume-high-icon" viewBox="-1 -1 26 26">
            <path
              fill="currentColor"
              d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
            />
          </svg>
          <svg class="volume-low-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
            />
          </svg>
          <svg class="volume-muted-icon" viewBox="-1 -1 26 26">
            <path
              fill="currentColor"
              d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
            />
          </svg>
        </button>
        <input
          class="volume-slider"
          type="range"
          min="0"
          max="1"
          step="any"
          value="1"
        />
      </div>
      <div class="duration-container">
        <div class="current-time">0:00</div>
        /
        <div class="total-time">${this.formatDuration(meta.duration)}</div>
      </div>
      <button class="captions-btn-container">
        <i class="material-icons captions-btn">subtitles</i>
      </button>
      <button class="speed-btn wide-btn">1x</button>
      <button class="settings-btn">
        <span class="material-icons">settings</span>
      </button>
      <button class="mini-player-btn">
        <span
          ><i class="material-symbols-outlined">branding_watermark</i></span
        >
      </button>
      <button class="theater-btn">
        <svg class="tall" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
          />
        </svg>
        <svg class="wide" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
          />
        </svg>
      </button>
      <button class="full-screen-btn">
        <svg class="open" viewBox="2 2 22 22">
          <path
            fill="currentColor"
            d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
          />
        </svg>
        <svg class="close" viewBox="2 2 22 22">
          <path
            fill="currentColor"
            d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
          />
        </svg>
      </button>
    </div>
  </div>
    `;
    this.videoContainer.appendChild(videoControlsContainer);

    // create video element and append to videoContainer
    const video = document.createElement("video");
    video.id = "video";
    videoContainer.appendChild(video);

    // Properties
    this.video = video;
    this.defaultOptions = {
      autoplay: false,
      preload: "auto",
      loop: false,
      muted: false,
      width: "1044px",
      height: "auto",
      poster:
        "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    };
    // override default options with options object
    this.options = { ...this.defaultOptions, ...options };
    for (let prop in this.options) {
      this.video[prop] = this.options[prop];
    }

    // initialize player dimensions
    this.videoContainer.style.width = this.options.width;
    this.videoContainer.style.height = this.options.height;
  }

  // Methods

  init() {
    try {
      // Adapted from hls.js (https://nochev.github.io/hls.js/docs/html/)
      // This code handles HLS video streaming with hls.js library.
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(options.src);
        hls.attachMedia(this.video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          this.video.play();
        });
      }
      // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
      // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
      // This is using the built-in support of the plain video element, without using hls.js.
      else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = options.src;
        this.video.addEventListener("canplay", function () {
          this.video.play();
        });
      }
    } catch (error) {
      console.log(error);
    }

    // bind toggler functions to videoContainer
    const playPauseBtn = this.videoContainer.querySelector(".play-pause-btn");
    const fullScreenBtn = this.videoContainer.querySelector(".full-screen-btn");

    this.video.addEventListener("click", this.togglePlay.bind(this));
    playPauseBtn.addEventListener("click", this.togglePlay.bind(this));
    fullScreenBtn.addEventListener("click", this.toggleFullScreen.bind(this));
    this.videoContainer.addEventListener(
      "dblclick",
      this.toggleFullScreen.bind(this)
    );
    this.video.addEventListener("play", () => {
      this.videoContainer.classList.remove("paused");
    });

    // progress bar
    this.video.addEventListener(
      "progress",
      this.handleTimelineProgress.bind(this)
    );

    // keydown events
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  togglePlay() {
    if (this.video.paused) {
      this.video.play();
      this.videoContainer.classList.toggle("paused");
    } else {
      this.video.pause();
      this.videoContainer.classList.toggle("paused");
    }
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) this.videoContainer.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
  }

  handleTimelineProgress() {
    const timelineContainer = this.videoContainer.querySelector(
      ".timeline-container"
    );
    const currentTimeElem = this.videoContainer.querySelector(".current-time");
    currentTimeElem.textContent = this.formatDuration(this.video.currentTime);
    const percent = this.video.currentTime / this.video.duration;
    timelineContainer.style.setProperty("--progress-position", percent);
  }

  handleKeyDown(e) {
    const tagName = document.activeElement.tagName.toLowerCase();

    if (tagName === "input") return;
    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
        if (tagName === "button") return;
        this.togglePlay();
        break;
      case "f":
        this.toggleFullScreen();
        break;
    }
  }

  // static methods
  formatDuration(time) {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0)
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}
