import { Modal, Button } from "flowbite-react";
import { useContext, useRef } from "react";
import { renameFiles } from "../api/backend-service";
import { FileManagerContext } from "../contexts/file-manager-context";
import { FileInfo } from "../model/file-info";

export function RenameDialog() {
    const { isOpenRenameDialog, setRenameDialogOpen, files, loadData } = useContext<{ loadData: any, files: FileInfo[], isOpenRenameDialog: boolean, setRenameDialogOpen: any }>(FileManagerContext);
    const inputRef = useRef<any>(null);

    function clearInputFiles(closeDialog: boolean) {
        //setSelectedFiles(undefined);
        inputRef.current.value = "";
        closeDialog && setRenameDialogOpen(false)
    }
    return (
        <Modal
            show={isOpenRenameDialog}
            onClose={() => {
                clearInputFiles(true)
            }}
        >
            <Modal.Header>
                Rename File/Folder
            </Modal.Header>
            <Modal.Body>

                <div className="space-y-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rename file/folder</label>
                    <input ref={inputRef} type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rename Your Files" />
                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Existing same file name can be change.</p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 invisible">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <Button onClick={() => {
                    renameFiles(files.filter(it => it.isSelected).map(it => it.relativePath), inputRef.current.value).then(res => {
                        clearInputFiles(true);
                        loadData();
                    });
                }}>
                    Create
                </Button>
                <Button
                    color="gray"
                    onClick={() => {
                        clearInputFiles(true)
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}