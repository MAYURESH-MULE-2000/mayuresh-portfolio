Optional self-hosted fonts.

The canvas text uses "Baloo 2" (Latin + Devanagari) loaded from Google Fonts in
css/app.css, falling back to "Plus Jakarta Sans", "Noto Sans Devanagari" and the
system UI font. To self-host instead, put the .woff2 files here and replace the
@import at the top of css/app.css with a local @font-face rule.
