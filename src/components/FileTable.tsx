import { Checkbox } from "flowbite-react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFiles } from "../api/backend-service";
import { FileManagerContext } from "../contexts/file-manager-context";
import { FileInfo } from "../model/file-info";

export function FileTable() {
    const { setFiles, files, openInNewTab }: { files: FileInfo[], setFiles: any, openInNewTab: any } = useContext(FileManagerContext);
    let [isAllSelect, setAllSelectCheckbox] = useState(false);
    const navigate = useNavigate();
    function loadNextFiles(path: string) {
        navigate("/" + path)
    }
    const isAllSelected = files.filter(it => it.isSelected).length === files.length;
    return (
        <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            <input type={"checkbox"} checked={isAllSelect && isAllSelected} onClick={(e) => {
                                isAllSelect = !isAllSelect;
                                setAllSelectCheckbox(isAllSelect);
                                const updateFiles = files.map(it => {
                                    it.isSelected = isAllSelect;
                                    return it;
                                })
                                setFiles([...updateFiles])
                            }} />
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Type
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Download
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Size
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        files.map((it, idx) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" key={idx} onClick={() => {
                                if (it.isDirectory) {
                                    loadNextFiles(it.relativePath)
                                } else {
                                    openInNewTab(process.env.REACT_APP_STATIC_SERVER_URL + "/" + it.relativePath)
                                }
                            }}>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <Checkbox checked={it.isSelected} onClick={(e) => {
                                        it.isSelected = !it.isSelected;
                                        setFiles([...files])
                                    }} />
                                </th>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {it.isDirectory ? (<svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path></svg>
                                    )}
                                </th>
                                <td className="py-4 px-6">
                                    {it.name}
                                </td>
                                <td className="py-4 px-6">

                                    {
                                        !it.isDirectory ? (<button className={"text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"} disabled={it.isDirectory}>
                                            <svg className="mr-2 -ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                            Download</button >) : (<button className={"text-white bg-blue-300 dark:bg-blue-500 cursor-not-allowed hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"} disabled={it.isDirectory}>
                                                <svg className="mr-2 -ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                                Download</button >)
                                    }

                                </td>
                                <td className="py-4 px-6">
                                    {it.size}
                                </td>
                                <td className="py-4 px-6">
                                    {it.creatingTime}
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    );
}