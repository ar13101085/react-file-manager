import { Button, Modal } from "flowbite-react";
import { useContext, useRef, useState } from "react";
import { uploadFiles } from "../api/backend-service";
import { FileManagerContext } from "../contexts/file-manager-context";

export function FileUploadDialog() {
    const { isOpenUploadDialog, setUploadDialogOpen, setFiles, currentDir } = useContext<{ isOpenUploadDialog: boolean, setUploadDialogOpen: any, setFiles: any, currentDir: string }>(FileManagerContext);
    const [selectedFiles, setSelectedFiles] = useState<any>();
    const [uploadProgress, setUploadProgress] = useState<any>();
    let inputFilesRef = useRef<any>(null);
    function clearInputFiles() {
        setSelectedFiles(undefined);
        inputFilesRef.current.value = "";
    }

    return (
        <Modal
            show={isOpenUploadDialog}
            onClose={() => {
                clearInputFiles();
                setUploadDialogOpen(false);
            }}
        >
            <Modal.Header>
                Upload Files
            </Modal.Header>
            <Modal.Body>

                <div className="space-y-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="multiple_files">Upload multiple files</label>
                    <input ref={inputFilesRef} onChange={(e) => {
                        setSelectedFiles(e.target.files)
                    }} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className={"w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 " + (uploadProgress > 0 ? "" : "invisible")}>
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: uploadProgress + '%' }}></div>
                </div>
                <Button onClick={() => {
                    uploadFiles(currentDir, inputFilesRef.current.files, (progress: number) => {
                        setUploadProgress(progress);
                    }).then(res => {
                        res.data = res.data.map(it => {
                            it.isSelected = false;
                            return it;
                        })
                        setUploadProgress(0);
                        setFiles(res.data);
                        clearInputFiles();
                        setUploadDialogOpen(false);
                    });
                }}>
                    Upload
                </Button>
                <Button
                    color="gray"
                    onClick={() => {
                        clearInputFiles();
                        setUploadDialogOpen(false);
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}