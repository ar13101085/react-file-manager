import { Button, Modal } from "flowbite-react";

export function FolderCreateDialog() {
    return (
        <Modal
            show={false}
            onClose={() => {

            }}
        >
            <Modal.Header>
                Create New Folder
            </Modal.Header>
            <Modal.Body>

                <div className="space-y-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Folder name</label>
                    <input type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Folder" />
                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Folder will not create if folder is exist</p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 invisible">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <Button onClick={() => {

                }}>
                    Create
                </Button>
                <Button
                    color="gray"
                    onClick={() => {

                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}