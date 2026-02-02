# McIntosh MSA5500 - Web Audio Player

A premium web-based audio player inspired by the legendary McIntosh amplifier design, featuring authentic VU meters, professional equalizer controls, stereo balance, A-B loop functionality, and a stunning interface that captures the essence of high-end audio equipment.

![McIntosh MSA5500](https://img.shields.io/badge/McIntosh-MSA5500-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)

![McIntosh_Logo](https://github.com/user-attachments/assets/9f65f1d2-5f77-458b-b0fc-5ec35e992042)

<img width="1812" height="816" alt="Capture d’écran 2026-02-01 215318" src="https://github.com/user-attachments/assets/f307abdb-d163-40be-99ad-bb8e08b8257a" />

## ✨ Features

### 🎵 Audio Playback

- **Multi-format support**: FLAC, MP3, MP4, WAV
- **Playlist management**: Load and manage multiple audio files with visual playlist browser
- **Comprehensive playback controls**: Play, pause, stop, previous, next
- **Fast seeking**: Press and hold previous/next buttons for rapid track navigation
- **Repeat modes**:
  - Off
  - Repeat single track
  - Repeat all tracks
- **Random playback**: Shuffle mode with intelligent track selection
- **A-B Loop**: Set loop points for practicing or repeated listening
- **Media session integration**: Control playback from keyboard media keys and system controls

### 📺 Visual Interface

- **Animated stereo VU meters**:
  - Real-time dual-channel audio visualization
  - Smooth needle animation with realistic physics
  - Authentic McIntosh meter design
- **VFD Display**: Premium vacuum fluorescent display showing:
  - Track title with dynamic text sizing
  - Artist and album information
  - Current track number and total tracks
  - File format indicator (FLAC, MP3, WAV, MP4)
  - Bitrate calculation
  - Playback time with elapsed/remaining toggle
  - Playback status icons (PLAY, PAUSE, STOP)
  - Mode indicators (RANDOM, REPEAT, A-B LOOP)
- **Display modes**:
  - Normal mode with full illumination
  - Stealth mode (complete blackout)
- **Album art viewer**: Click track title to view embedded album artwork in popup
- **Interactive playlist**: Click track counter to browse and select tracks

### 🎛️ Audio Controls

- **Volume control**:
  - Interactive rotary knob with chrome finish
  - Click and hold left/right for continuous adjustment
  - Mouse wheel support for precise control
  - Visual feedback and temporary display
- **Mute function**: Instant audio muting with status display
- **2-Band Equalizer**:
  - Bass control: ±12dB at 200Hz (low shelf)
  - Treble control: ±12dB at 3000Hz (high shelf)
  - Real-time visual feedback of EQ settings
- **Stereo Balance**:
  - Left/Right balance adjustment
  - Keyboard shortcuts (Arrow keys)
  - Visual balance indicator
- **Tone Reset**: One-click restoration to flat EQ and center balance

### ⚙️ Advanced Features

- **Web Audio API processing**: Professional audio graph with:
  - Stereo channel splitting for true dual VU meters
  - Biquad filters for high-quality EQ
  - StereoPanner for balance control
  - Real-time frequency analysis
- **ID3 tag extraction**: Automatic metadata reading with jsmediatags library
- **Responsive controls**: Tactile button feedback and smooth animations
- **Options menu**: Hidden panel with advanced controls
- **Persistent power state**: LED indicator shows system status
- **Professional UI**: McIntosh-inspired design with authentic colors and styling

## 🚀 Installation

### Quick Start

1. **Clone or download** this repository:
   
   ```bash
   git clone https://github.com/yourusername/mcintosh-msa5500.git
   ```
1. **Verify file structure**:
   
   ```
   mcintosh-msa5500/
   ├── index.html
   ├── script.js
   ├── style.css
   ├── README.md
   ├── manifest.json
   ├── img/
   │   ├── mc-logo.png
   │   ├── logo_b.png
   │   ├── favicon.png
   │   └── vumeter-new.png
   └── fontawesome7/
       └── css/
           └── all.min.css
   ```
1. **Add required assets**:
- **McIntosh logo** (`mc-logo.png`): Main brand logo for center display
- **Options logo** (`logo_b.png`): Logo for options menu
- **VU meter background** (`vumeter-new.png`): Authentic meter dial image
- **Favicon** (`favicon.png`): Browser tab icon
1. **Install Font Awesome** (if not included):
- Download Font Awesome 7 or use CDN
- Place in `fontawesome7/css/` directory
1. **Open in browser**:
- Simply open `index.html` in any modern web browser
- No server or build process required!

## 📖 User Guide

### Getting Started

1. **Power On**: Click the red **STANDBY/ON** button
1. **Load Tracks**: Click the **INPUT** knob to select audio files
1. **Play Music**: Use center control buttons for playback
1. **Access Options**: Click **OPTIONS** button for EQ and advanced features

### Main Controls

#### Input Section

- **INPUT Knob**:
  - Click to open file selector
  - Supports multiple file selection
  - Displays “PUSH” indicator

#### Playback Controls

- **⏮ Previous**:
  - Click: Skip to previous track
  - Hold: Fast rewind within track
- **⏭ Next**:
  - Click: Skip to next track
  - Hold: Fast forward within track
- **▶/⏸ Play/Pause**: Toggle playback
- **⏹ Stop**: Stop playback and reset to start
- **MUTE**: Toggle audio muting with visual feedback

#### Volume Section

- **VOLUME Knob**:
  - Click left side: Decrease volume
  - Click right side: Increase volume
  - Hold for continuous adjustment
  - Mouse wheel: Fine volume control
  - Hover to display current level
  - Shows “ADJUST” indicator

#### System Controls

- **OPTIONS**: Open advanced controls menu
- **DISPLAY**: Toggle stealth mode (blackout)
- **STANDBY/ON**: Power on/off with full system reset

### OPTIONS Menu

Click **OPTIONS** to reveal:

#### Playback Modes

- **RANDOM**: Shuffle playback order
- **REPEAT**: Cycle through modes:
  - Off → Repeat One → Repeat All
- **A-B**: Set loop points:
  - First click: Set point A
  - Second click: Set point B and start loop
  - Third click: Disable loop

#### Equalizer Controls

- **BASS +**: Increase low frequencies (+2dB steps, max +12dB)
- **BASS -**: Decrease low frequencies (-2dB steps, min -12dB)
- **TREBLE +**: Increase high frequencies (+2dB steps, max +12dB)
- **TREBLE -**: Decrease high frequencies (-2dB steps, min -12dB)
- **TONE RESET**: Reset EQ to flat and balance to center

#### Balance Controls

- **BALANCE L**: Shift audio to left channel
- **BALANCE R**: Shift audio to right channel

### Interactive Display Elements

- **Track Title** (VFD center): Click to view album artwork
- **Track Counter** (top left): Click to open playlist browser
- **Time Display** (top right): Click to toggle elapsed/remaining time
- **Volume Display** (bottom center): Auto-shows during volume changes
- **Status Icons** (bottom right): Shows current playback state
- **Mode Indicators** (bottom left): Shows RANDOM, REPEAT, A-B status

### Keyboard Shortcuts

- **Left Arrow**: Balance left
- **Right Arrow**: Balance right

## 🔧 Technical Details

### Technology Stack

#### Core Technologies

- Pure JavaScript (ES6+)
- HTML5 Audio API
- Web Audio API
- CSS3 with animations

#### External Libraries

- **Font Awesome 7**: Icon library for control symbols
- **jsmediatags 3.9.5**: ID3 tag and metadata extraction
- **Google Fonts**:
  - Bitcount Single (VFD display)
  - Roboto (labels and UI)

### Browser Compatibility

|Browser|Version|Support|
|-------|-------|-------|
|Chrome |90+    |✅ Full |
|Edge   |90+    |✅ Full |
|Firefox|88+    |✅ Full |
|Safari |14+    |✅ Full*|
|Opera  |76+    |✅ Full |

*Safari requires user interaction before audio playback (browser security policy)

### Web Audio API Architecture

```
Audio Element Source
       ↓
StereoPanner (Balance)
       ↓
Biquad Filter (Bass - Low Shelf 200Hz)
       ↓
Biquad Filter (Treble - High Shelf 3000Hz)
       ↓
Channel Splitter
       ↓          ↓
  Analyser L  Analyser R  (for VU meters)
       ↓          ↓
       Destination
```

### Supported File Formats

|Format |Extension |Quality     |Notes                     |
|-------|----------|------------|--------------------------|
|FLAC   |.flac     |Lossless    |Best quality, larger files|
|WAV    |.wav      |Uncompressed|Studio quality            |
|MP3    |.mp3      |Lossy       |Universal compatibility   |
|MP4/M4A|.mp4, .m4a|Lossy (AAC) |Apple ecosystem           |

### Performance Characteristics

- **VU Meter Refresh**: 60fps animation
- **FFT Size**: 1024 samples per channel
- **Audio Processing**: Real-time with minimal latency
- **Memory Usage**: Efficient file handling with URL.createObjectURL()

## 🎨 Customization Guide

### Color Scheme

Edit CSS custom properties in `style.css`:

```css
:root {
    --mc-blue: #00c3ff;        /* VFD display text */
    --mc-green: #00ff41;       /* Control labels */
    --mc-vumeter: #00aef2;     /* VU meter background */
    --panel-black: #080808;    /* Main panel */
    --mc-led-green: #00ff00;   /* Digital counters */
    --mc-gold: #ffd700;        /* Accent details */
}
```

### VU Meter Behavior

Adjust sensitivity and response in `script.js`:

```javascript
// Line ~560
let levelL = dataArrayL.reduce((a, b) => a + b) / dataArrayL.length;
let normalizedL = Math.pow(Math.min(255, levelL * 1.8) / 255, 0.7);
targetAngleL = -55 + normalizedL * 95;
```

**Parameters**:

- `1.8`: Input gain multiplier
- `0.7`: Response curve exponent
- `-55`: Minimum needle angle
- `95`: Maximum needle swing range

### Needle Animation Speed

Adjust smoothing factor:

```javascript
// Line ~572
currentAngleL += (targetAngleL - currentAngleL) * 0.25;
```

Higher values = faster response (range: 0.1 to 1.0)

### Equalizer Specifications

Modify filter parameters in `script.js`:

```javascript
// Bass filter
bassFilter.frequency.value = 200;  // Hz
bassFilter.gain.value = bassGain;  // -12 to +12 dB

// Treble filter
trebleFilter.frequency.value = 3000;  // Hz
trebleFilter.gain.value = trebleGain; // -12 to +12 dB
```

### Font Sizes

Adjust display text sizes in `style.css`:

```css
:root {
    --police-size-counter: 30px;       /* Track/time counters */
    --police-size-label-counter: 12px; /* Label text */
}

.vfd-large {
    font-size: 30px;  /* Main track title */
}

.vfd-info {
    font-size: 14px;  /* Artist/album info */
}
```

## 🐛 Known Issues & Limitations

### Current Limitations

- Bitrate calculation is estimated for variable bitrate (VBR) files
- Some browsers require user interaction before auto-playing audio
- Album artwork display depends on proper ID3v2 tag embedding
- Playlist order is not persistent across page reloads

### Browser-Specific Issues

- **Safari**: May show security warnings for local file access
- **Mobile browsers**: Limited support for file input (use desktop for best experience)

### Workarounds

- **Autoplay blocked**: Click any button after loading to initialize audio context
- **Missing album art**: Ensure files have embedded artwork in ID3 tags
- **Bitrate accuracy**: Use constant bitrate (CBR) encoding for accurate display

## 🚧 Roadmap & Future Enhancements

### Planned Features

- [ ] Full keyboard shortcut system
- [ ] Customizable VU meter colors and ranges
- [ ] Spectrum analyzer visualization mode
- [ ] Save/load EQ presets to localStorage
- [ ] Drag-and-drop file loading
- [ ] Dark/light/custom theme selector
- [ ] Export/import playlists (M3U, PLS formats)
- [ ] Gapless playback between tracks
- [ ] Crossfade transitions
- [ ] Peak hold indicators on VU meters
- [ ] Visualizer customization options
- [ ] Multi-band parametric EQ
- [ ] Playlist editing (reorder, remove tracks)
- [ ] PWA installation support
- [ ] Cloud storage integration
- [ ] Lyrics display
- [ ] Scrobbling support (Last.fm)

### Under Consideration

- Mobile-responsive layout
- Touch gesture controls
- Vinyl simulation mode
- Cassette tape interface theme
- Audio recording capability
- Plugin/extension system

## 👨‍💻 Development

### Project Structure

```
src/
├── index.html          # Main HTML structure
├── script.js           # Application logic (~750 lines)
├── style.css          # All styling and animations
├── img/               # Image assets
│   ├── mc-logo.png
│   ├── logo_b.png
│   ├── favicon.png
│   └── vumeter-new.png
└── fontawesome7/      # Icon library
```

### Code Organization

**script.js sections**:

1. DOM selectors
1. Variable initialization
1. Power on/off logic
1. Audio engine setup
1. Balance controls
1. EQ controls
1. File loading
1. Playback controls
1. VU meter animation
1. UI interactions
1. Media session integration

### Building & Testing

No build process required! Simply:

1. Edit source files
1. Refresh browser (Ctrl+F5 for hard reload)
1. Test in multiple browsers
1. Validate HTML/CSS/JS

### Coding Standards

- ES6+ JavaScript syntax
- Meaningful variable names
- Comments for complex logic
- Consistent indentation (4 spaces)
- CSS organized by component

## 🤝 Contributing

Contributions are welcome! Here’s how to help:

### How to Contribute

1. **Fork** the repository
1. **Create** a feature branch:
   
   ```bash
   git checkout -b feature/amazing-feature
   ```
1. **Make** your changes
1. **Test** thoroughly across browsers
1. **Commit** with clear messages:
   
   ```bash
   git commit -m "Add amazing feature"
   ```
1. **Push** to your fork:
   
   ```bash
   git push origin feature/amazing-feature
   ```
1. **Submit** a pull request

### Contribution Guidelines

- Test in Chrome, Firefox, and Safari
- Maintain existing code style
- Update README if adding features
- Add comments for complex logic
- Ensure backwards compatibility

### Bug Reports

When reporting bugs, include:

- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

## 📄 License

This project is released under the **MIT License**.

```
MIT License

Copyright (c) 2026 Yohann Zaoui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## ⚠️ Disclaimer

This is a **fan-made tribute project** and is:

- **NOT affiliated** with McIntosh Laboratory, Inc.
- **NOT endorsed** by McIntosh Laboratory, Inc.
- **NOT an official** McIntosh product

McIntosh® is a registered trademark of McIntosh Laboratory, Inc. This project is created solely for educational and entertainment purposes.

## 🙏 Credits & Acknowledgments

### Design Inspiration

This project pays homage to **McIntosh Laboratory**, legendary American manufacturer of high-end audio equipment since 1949, renowned for:

- Iconic blue watt meters
- Premium build quality
- Timeless design aesthetics
- Audiophile-grade performance

### Libraries & Resources

- **[Font Awesome](https://fontawesome.com/)** - Comprehensive icon library
- **[jsmediatags](https://github.com/aadsm/jsmediatags)** - Audio metadata extraction
- **[Google Fonts](https://fonts.google.com/)** - Web typography
- **Web Audio API** - Mozilla Developer Network documentation
- **HTML5 Audio** - W3C specification

### Special Thanks

- The open-source community
- Audio enthusiasts and HiFi collectors
- McIntosh for decades of design excellence
- All contributors and testers

## 📞 Support & Contact

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/yourusername/mcintosh-msa5500/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mcintosh-msa5500/discussions)
- **Documentation**: This README and inline code comments

### Useful Resources

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [HTML5 Audio Guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [jsmediatags Documentation](https://github.com/aadsm/jsmediatags)

-----

**Enjoy your premium web audio experience! 🎵🎛️**

*Made with ❤️ for audio enthusiasts everywhere*
