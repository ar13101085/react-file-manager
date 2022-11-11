import axios from "axios";
import { FileInfo } from "../model/file-info";
import { StatusInfo } from "../model/status-info";
const base = process.env.REACT_APP_SERVER_URL;

export function getFiles(path: string): Promise<{
    data: FileInfo[]
}> {
    return axios.post(base + "/file/files", {
        "path": path
    });
}


export function mkDir(currentDir: string, name: string): Promise<{
    data: FileInfo[]
}> {
    return axios.post(base + "/file/create-dir", {
        "currentDir": currentDir,
        "name": name
    });
}
export function renameFiles(paths: string[], name: string): Promise<{ data: StatusInfo<FileInfo>[] }> {
    return axios.post(base + "/file/rename-files", {
        "paths": paths,
        "name": name
    });
}

export function moveFiles(paths: string[], moveDir: string, currentDir: string): Promise<{ data: StatusInfo<FileInfo>[] }> {
    return axios.post(base + "/file/move-files", {
        "paths": paths,
        "moveDir": moveDir,
        "currentDir": currentDir
    });
}

export function archiveFiles(paths: string[], name: string, currentDir: string): Promise<{ data: StatusInfo<FileInfo>[] }> {
    return axios.post(base + "/file/archive-files", {
        "paths": paths,
        "name": name,
        "currentDir": currentDir
    });
}
export function deleteFiles(paths: string[]): Promise<{ data: StatusInfo<FileInfo>[] }> {
    return axios.post(base + "/file/delete-files", {
        "paths": paths
    });
}

export function uploadFiles(uploadDir: string, files: any, progressCb: any): Promise<{
    data: FileInfo[]
}> {
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
    }



    formData.append("dir", uploadDir);
    return axios.post(base + "/file/upload-files", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ({ loaded, total }) => {
            if (total) {
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    progressCb(percent);
                }
            }
        }
    });
}