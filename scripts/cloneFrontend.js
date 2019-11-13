const {execSync} = require("child_process")
const shell = require("shelljs")

const frontendUrl = "https://github.com/GE-MDS-FNM-V2/frontend.git"

shell.rm("-rf", "build")
shell.mkdir("build")
shell.cd("build")
shell.exec(`git clone ${frontendUrl}`)
shell.cd("frontend")
shell.exec("yarn")
shell.exec("yarn build")
shell.cp("-r", "./build", "../../src/compiled-frontend")
shell.cd("../..")
shell.rm("-rf", "build")
// execSync(`rm -rf build && mkdir build && cd build && git clone ${frontendUrl} && cd frontend && yarn && yarn build && cp -r ./build ../../src/compiled-frontend && cd ../.. && rm -rf build`)