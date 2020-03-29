Files in this directory are created via PurgeCSS.

PurgeCSS scans the index.html and all CSS files and removes unused CSS.
The cleaned CSS files are then stored in this folder.
You may embed files from here or just copy the changes to the actual files manually.

The purge process can be started with the following commands:

```shell script
# Install required dev-depencies
npm i -D

# Start the purge process
npm run purge-css 
```
