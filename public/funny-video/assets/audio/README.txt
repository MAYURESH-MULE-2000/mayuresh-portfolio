Drop your background tracks here as audio1 ... audio5.
Extension can be .mp3, .m4a, .ogg or .wav (tried in that order).

  e.g. audio1.mp3   or   audio1.wav

Optional tracks.json in this folder renames them in the UI:

  {
    "audio1": { "name": "Dhol Intro" },
    "audio2": { "name": "Sad Violin" }
  }

Length: 15 s or more is ideal (a video is ~14.6 s). Shorter audio loops, longer
audio is cut when the video ends.

Anything missing is synthesised with the Web Audio API (see js/audio.js) - real
audio that is recorded into the exported video exactly like an MP3 would be.

Press "Check my assets" in the app to see which files were picked up.
