const {execSync} = require("child_process")
const shell = require("shelljs")
require("dotenv").config()

const frontendUrl = "https://github.com/GE-MDS-FNM-V2/frontend.git"
const frontendBranch = process.env.FRONTEND_DEPLOYMENT_BRANCH

const projectDirectory = process.cwd()
const frontendDirectoryName = "/tmp/.ge-fnm-react-app"

shell.rm("-rf", frontendDirectoryName)
shell.mkdir("/tmp")
shell.mkdir(frontendDirectoryName)
shell.cd(frontendDirectoryName)
shell.exec(`git clone -b ${frontendBranch} ${frontendUrl}`)
shell.cd("frontend")
shell.exec("yarn")
shell.exec("yarn build")
shell.cp("-r", "./build", `${projectDirectory}/src/compiled-frontend`)
shell.cd(projectDirectory)
shell.rm("-rf", frontendDirectoryName)
// execSync(`rm -rf build && mkdir build && cd build && git clone ${frontendUrl} && cd frontend && yarn && yarn build && cp -r ./build ../../src/compiled-frontend && cd ../.. && rm -rf build`)