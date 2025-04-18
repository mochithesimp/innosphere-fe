import React, { useState, useRef } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, file: File | null) => void;
}

// Define button styles separately just like in EmployeeFavorites
const buttonStyles = `
    .cancel-button {
        background-color: #E8F5F3;
        color: #309689;
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        border: none;
        cursor: pointer;
    }
    .cancel-button:hover {
        background-color: #d8efeb;
    }
    
    .add-button {
        background-color: #309689;
        color: white;
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
    }
    .add-button:hover {
        background-color: #267b70;
    }
    .add-button:disabled {
        background-color: #a0c4c0;
        cursor: not-allowed;
    }
`;

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [cvName, setCvName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(cvName, selectedFile);
        // Reset form
        setCvName('');
        setSelectedFile(null);
    };

    const handleCancel = () => {
        setCvName('');
        setSelectedFile(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Include styles exactly like in EmployeeFavorites */}
            <style>
                {buttonStyles}
            </style>

            <div className="bg-white rounded-lg w-full max-w-md mx-4">
                <div className="relative p-6">
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        onClick={handleCancel}
                    >
                        <FiX size={24} />
                    </button>

                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">Thêm CV/Resume</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="cvName" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Tên CV/Resume
                            </label>
                            <input
                                type="text"
                                id="cvName"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                placeholder="Nhập tên CV/Resume"
                                value={cvName}
                                onChange={(e) => setCvName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Tải lên CV/Resume của bạn
                            </label>
                            <div
                                className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <div className="mb-3 text-gray-400">
                                        <FiUpload size={36} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">Chọn File hoặc thả vào đây</p>
                                    <p className="text-xs text-gray-500 mt-1">Chỉ có định dạng PDF. Kích thước tệp tối đa là 12 MB.</p>
                                    {selectedFile && (
                                        <div className="mt-3 text-sm text-gray-600">
                                            {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="cancel-button" onClick={handleCancel}>
                                Hủy Bỏ
                            </div>
                            <button
                                type="submit"
                                className="add-button"
                                disabled={!cvName || !selectedFile}
                            >
                                Thêm CV/Resume
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CVModal; 