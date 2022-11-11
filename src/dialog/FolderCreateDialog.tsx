import { Button, Modal } from "flowbite-react";
import { useContext, useRef } from "react";
import { mkDir } from "../api/backend-service";
import { FileManagerContext } from "../contexts/file-manager-context";

export function FolderCreateDialog() {
    const { isOpenNewFolderDialog, setNewFolderDialogOpen, setFiles, currentDir } = useContext<{ currentDir: string, setFiles: any, isOpenNewFolderDialog: boolean, setNewFolderDialogOpen: any }>(FileManagerContext);
    const inputRef = useRef<any>(null);
    function clearInputFiles(closeDialog: boolean) {
        //setSelectedFiles(undefined);
        inputRef.current.value = "";
        closeDialog && setNewFolderDialogOpen(false)
    }
    return (
        <Modal
            show={isOpenNewFolderDialog}
            onClose={() => {
                setNewFolderDialogOpen(false)
            }}
        >
            <Modal.Header>
                Create New Folder
            </Modal.Header>
            <Modal.Body>

                <div className="space-y-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Folder name</label>
                    <input ref={inputRef} type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Folder" />
                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Folder will not create if folder is exist</p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 invisible">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <Button onClick={() => {
                    mkDir(currentDir, inputRef.current.value).then(res => {
                        res.data = res.data.map(it => {
                            it.isSelected = false;
                            return it;
                        })
                        setFiles(res.data);
                        clearInputFiles(true);
                    });
                }}>
                    Create
                </Button>
                <Button
                    color="gray"
                    onClick={() => {
                        clearInputFiles(true);
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}