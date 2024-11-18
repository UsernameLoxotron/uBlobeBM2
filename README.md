# Welcome to uBlobeBM2 (BlobeBM uBlock Second Edition)!

uBlobeBM is a tool that can run bookmarklets using uBlock Origin. It's very useful if bookmarklets don't work on your device or if they are blocked by your administrator.
However, uBlobeBM2 have more new functions, for example:
```
+Custom Bookmarks
+New style
+Easier shortcuts/setup
```

### How to setup uBlobeBM
Make sure that you have uBlock Origin installed on your computer. If you don't, download it [here](https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm).

Go to
UBlock advanced settings --> `chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/advanced-settings.html`

Find `userResourcesLocation` and change it from `unset` to 
`https://usernameloxotron.github.io/uBlobeBM2/blob.js`

Go to 
UBlock filters --> `chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/1p-filters.html`

Add the following line of code:
```
*##+js(blob.js)
```


### How to use uBlobeBM
Hold _CTRL + Shift + ~_(Next to the ESC)
Or _CTRL + `_
