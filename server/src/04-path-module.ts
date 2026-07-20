import path from "node:path";

//path.jsoin gives correct operator for the current OS
//process.cwd (current working diretory) gives the current working directory of the process

const projectRoot  = process.cwd(); 
console.log("Project Root: " + projectRoot);

// path .join - Will not creaet a folder, It will only create a path string.
// It doesn't check if the file exist.

const uploadFilePath = path.join(projectRoot, "uploads", "images", "profile.jpg");
console.log(uploadFilePath);

//get filename 

const filename = path.basename(uploadFilePath); // profile.jpg
const fileExt = path.extname(filename);
const Directory = path.dirname(uploadFilePath); // C:\Users\sachalamalasetti\Desktop\job-portal\uploads\images  
console.log(filename, fileExt, Directory);
