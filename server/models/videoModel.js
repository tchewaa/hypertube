import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

export function getExt(string) {
    let extension = string.match(/.*(\..+?)$/);
    return extension[1].toLowerCase();
}

export function convertMkv(path) {
    var newfile = path.replace('mkv', 'mp4')
    try {
        ffmpeg(path)
            .toFormat('mp4')
            .on('error', (err) => {
                console.log(err)
            })
            .on('progress', (progress) => {
                process.stdout.write(`      ${progress.targetSize} kb converted`+'\r')
            })
            .on('end', () => {
                console.log('conversion complete')
            })
            .save(newfile)
            return(newfile)
    } catch (e) {console.log(e)}
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deleteVideo(file) {
    fs.unlink(file, () => {
        console.log(`${file} deleted!`)
    })
}

export async function maintainVideos(path) {
    await sleep(100)
   // console.log(`\nscanning library...`)
    process.stdout.write('\nscanning library...\r')
    await sleep(400)
    let len = 0
    fs.readdir(path, (err, files) => {
        if (files.length == 0)
            console.log('library empty\n')
        files.forEach(file => {
            fs.stat(path+file, (err, stat) => {
                console.log(file)
            })
        })
        len = files.length
    })
    await sleep(100)
    console.log(len+' videos available\n')
}