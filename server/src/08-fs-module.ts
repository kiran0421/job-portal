import path from "node:path";
import fs from "node:fs";
// fs file system
//create folders
// read files
// write files 
// check file information
// Delete files

//sync API : Read file sync
// call back APIS
//Promise APIS

// While creating some small start up scripts

const DEMO_FOLDER = path.join(process.cwd(), 'file_storage', 'fs_demo');
const sync_file_path = path.join(DEMO_FOLDER, 'sync_file.txt');
const callback_file_path = path.join(DEMO_FOLDER, 'callback_file.txt');
const promise_file_path = path.join(DEMO_FOLDER, 'promise_file.txt');

type Filersult = {
    type: string,
    fileName: string,
    content: string,
    fileSize: number,
}

function runSyncFunction(): Filersult {
    // If the file doesn't exist, Node is going to create it. If the fiel exist, Node is goign to replace the content with this
    fs.writeFileSync(sync_file_path, 'Hello from sync file write operation','utf-8');
    fs.appendFileSync(sync_file_path, '\nAppend to file append operation', 'utf-8');
    const content = fs.readFileSync(sync_file_path, 'utf-8');
    const stats = fs. statSync(sync_file_path);

    return {
        type : 'Sync',
        content,
        fileName : path.basename(sync_file_path),
        fileSize : stats.size
    }

}

function demoFolderExist(): void{
    if(!fs.existsSync(DEMO_FOLDER)){
        fs.mkdirSync(DEMO_FOLDER, {recursive: true});
    }
}


async function main(): Promise <void>{
    try {
        // ensure Demo Folder Exists
        demoFolderExist()
        const syncResult = runSyncFunction()
        console.log([syncResult])
    }
    catch(error){
        const errorMessage = error instanceof Error ? error.message : "unknown Error" ;
        console.log(errorMessage);
    }
}

main();



// callback (error , result)

function runCallBackExample(): Promise <Filersult>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(callback_file_path, 'Created using callback file write operation', 'utf-8', 
        (err)=>{
            if(err){
            reject(err)
            return
            }
        })
        fs.appendFile( 
            callback_file_path,
            "appended using call back file path",
            "utf-8",
            (appendFileError) => {
                if(appendFileError){
                    reject(appendFileError)
                    return
                }
            })
        fs.readFile(callback_file_path, 'utf-8', (readFileError, content)=>{
            if(readFileError){
                reject (readFileError)
                return
            }
            fs.stat(callback_file_path, (statError, stats)=>{
                if(statError){
                    reject(statError)
                    return
                    }
                    resolve({
                        type:"callback",
                        content,
                        fileName: path.basename(callback_file_path),
                        fileSize: stats.size
                    })
            })
        })
    })
}
runCallBackExample();