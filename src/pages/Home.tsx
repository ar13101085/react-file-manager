import { useEffect, useState } from "react";
import { getFiles } from "../api/backend-service";
import { BreadcrumbBar } from "../components/BreadcrumbBar";
import { FileMangerActionsButton } from "../components/FileMangerActionsButton";
import { FileTable } from "../components/FileTable";
import { Header } from "../components/Header";
import { FileManagerContext } from "../contexts/file-manager-context";
import { FileInfo } from "../model/file-info";
import { useLocation } from "react-router-dom"

export function HomePage() {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const location = useLocation();

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    function loadData() {
        getFiles(decodeURI(location.pathname)).then(res => {
            setFiles(res.data);
        })
    }
    useEffect(() => {
        console.log("init call...");
        loadData();
        window.addEventListener('popstate', (event) => {
            loadData();
        });
    }, []);
    return (
        <FileManagerContext.Provider value={{ files, setFiles,openInNewTab }}>
            <Header />
            <div className="container flex-col flex-wrap justify-between items-center mx-auto space-y-10">
                <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 space-y-3">
                    <FileMangerActionsButton />
                    <BreadcrumbBar />
                </div>
                <FileTable />

            </div>

        </FileManagerContext.Provider>
    )
}