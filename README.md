# Motion Library

A static site (no build step on the host) that shows reusable motion-graphics techniques with live demos, exact colors, estimated timing and copy-ready code.

## Structure

```
index.html          the page
assets/style.css    styles
assets/app.js       site logic
assets/data.js      data (generated; do not edit by hand)
src/techniques*.js  data source; each file covers a few videos
build.py            turns src/ into assets/data.js
.htaccess           compression, caching and HTTPS for Hostinger
```

## Adding a new video

1. Write its techniques in a new file such as `src/techniques7.js`.
2. Run `python3 build.py`.
3. Commit and push.

## Deploying to Hostinger (hPanel)

1. In hPanel open **Advanced → Git**.
2. Enter the public HTTPS repository URL and the `main` branch.
3. Set the install path (Directory) to `motion-library` so the site lives at `elahimiavagh.com/motion-library/`. Do not leave it empty: empty means `public_html` itself.
4. Click Create, then turn on **Auto deployment**.

Every push to `main` is then deployed automatically.
