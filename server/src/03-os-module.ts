import * as os from "node:os";

function getOSInfo() {
    console.log("Operating System Information: ");
    console.log("Platform: " + os.platform());
    console.log("Architecture: " + os.arch());
    console.log("Total Memory: " + os.totalmem());
    console.log("Free Memory: " + os.freemem());
    console.log("Home Directory: " + os.homedir());
    console.log("Temporary Directory: " + os.tmpdir());
    console.log("Type: " + os.type());
    console.log("Version: " + os.version());
    console.log("CPUs: " + JSON.stringify(os.cpus()));
}
getOSInfo();