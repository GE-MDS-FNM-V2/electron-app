const {execSync} = require("child_process")


const frontendUrl = "https://github.com/GE-MDS-FNM-V2/frontend.git"

execSync(`rm -rf build && mkdir build && cd build && git clone ${frontendUrl} && cd frontend && yarn && yarn build && cp -r ./build ../../compiled-frontend && cd ../.. && rm -rf build`)