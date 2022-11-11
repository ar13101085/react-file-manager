import { Button, Modal } from "flowbite-react";

export function FileUploadDialog() {
    return (
        <Modal
            show={false}
            onClose={() => {

            }}
        >
            <Modal.Header>
                Upload Files
            </Modal.Header>
            <Modal.Body>

                <div className="space-y-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="multiple_files">Upload multiple files</label>
                    <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 invisible">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <Button onClick={() => {

                }}>
                    Upload
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