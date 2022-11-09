import { BreadcrumbBar } from "../components/BreadcrumbBar";
import { FileMangerActionsButton } from "../components/FileMangerActionsButton";
import { FileTable } from "../components/FileTable";
import { Header } from "../components/Header";

export function HomePage() {
    return (
        <div>
            <Header />
            <div className="container flex-col flex-wrap justify-between items-center mx-auto space-y-10">
                <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 space-y-3">
                    <FileMangerActionsButton />
                    <BreadcrumbBar />
                </div>
                <FileTable />

            </div>

        </div>
    )
}