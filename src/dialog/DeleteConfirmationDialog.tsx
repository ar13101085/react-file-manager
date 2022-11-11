import { Modal, Button } from "flowbite-react";

export function DeleteConfirmationDialog() {
    return (
        <Modal
            show={true}
            size="md"
            popup={true}
            onClose={() => {

            }}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" >
                    <svg className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </div>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={() => {

                            }}
                        >
                            Yes, I'm sure
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => {

                            }}
                        >
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}