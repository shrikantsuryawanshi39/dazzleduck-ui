import React, { useState } from "react";
import { MdHttp } from "react-icons/md";

const SessionManagement = ({
    isConnected,
    fileInputRef,
    handleSaveSession,
    handleOpenSession,
    handleImportFromUrl,
    openFileDialog
}) => {
    const [urlMode, setUrlMode] = useState(false);
    const [sessionUrl, setSessionUrl] = useState("");

    const handleUrlModeToggle = () => {
        setUrlMode(!urlMode);
        setSessionUrl("");
    };

    const handleImportUrl = () => {
        handleImportFromUrl(sessionUrl);
        setSessionUrl("");
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Session Management</h3>

            <button
                onClick={handleSaveSession}
                disabled={!isConnected}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                Save Session
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleOpenSession}
                className="hidden"
            />

            {urlMode ? (
                <div className="space-y-2">
                    <input
                        type="url"
                        value={sessionUrl}
                        onChange={(e) => setSessionUrl(e.target.value)}
                        placeholder="https://example.com/session.json"
                        className="w-full border border-gray-400 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleUrlModeToggle}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition cursor-pointer"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleImportUrl}
                            disabled={!sessionUrl.trim()}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Import
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex rounded-lg overflow-hidden">
                    {/* Main button for file import */}
                    <button
                        onClick={openFileDialog}
                        className="w-full flex-1 pl-20 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 transition cursor-pointer"
                    >
                        Open Session
                    </button>

                    {/* URL section with different color */}
                    <button
                        onClick={handleUrlModeToggle}
                        className="w-20 bg-purple-800 hover:bg-purple-900 text-white flex items-center justify-center transition cursor-pointer"
                        title="Import from URL"
                    >
                        <MdHttp size={35} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SessionManagement;