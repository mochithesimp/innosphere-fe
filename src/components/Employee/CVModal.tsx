import React, { useState, useRef } from 'react';
import { FiX, FiUpload, FiFile } from 'react-icons/fi';
import { CreateResumeModel, ResumeService } from '../../services/resumeService';
import FirebaseStorageService from '../../services/firebaseStorageService';
import { getUserIdFromToken } from '../../utils/jwtHelper';

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
    workerId: number;
    onResumeAdded: () => void;
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

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, workerId, onResumeAdded }) => {
    const [cvName, setCvName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validate document file
            const validation = FirebaseStorageService.validateDocumentFile(file);
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }

            setSelectedFile(file);
            setError('');
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];

            // Validate document file
            const validation = FirebaseStorageService.validateDocumentFile(file);
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                return;
            }

            setSelectedFile(file);
            setError('');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileType = (filename: string): string => {
        const extension = filename.split('.').pop();
        return extension ? extension.toUpperCase() : 'UNKNOWN';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cvName.trim()) {
            setError('Vui lòng nhập tên CV/Resume');
            return;
        }

        if (!selectedFile) {
            setError('Vui lòng chọn file');
            return;
        }

        setIsSubmitting(true);
        setIsUploading(true);
        setError('');

        try {
            // Get user ID from token
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const userId = getUserIdFromToken(token);
            if (!userId) {
                throw new Error('Could not extract user ID from token');
            }

            console.log('🚀 Starting CV/Resume upload process...');
            console.log('File:', selectedFile.name, 'Size:', selectedFile.size);

            // Upload document to Firebase
            const firebaseUrl = await FirebaseStorageService.uploadDocument(
                selectedFile,
                userId,
                'cv-resumes'
            );

            console.log('✅ Document uploaded to Firebase:', firebaseUrl);

            // Determine file type from the uploaded file
            const fileExtension = selectedFile.name.split('.').pop()?.toUpperCase() || 'PDF';

            const resumeData: CreateResumeModel = {
                workerId: workerId,
                title: cvName.trim(),
                urlCvs: firebaseUrl, // Use Firebase download URL
                fileType: fileExtension,
                fileSize: selectedFile.size
            };

            console.log('📄 Thêm Resume - Data being sent to API:');
            console.log(JSON.stringify(resumeData, null, 2));

            await ResumeService.createResume(resumeData);

            console.log('✅ Resume created successfully in database');

            // Reset form
            setCvName('');
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Close modal and refresh data
            onClose();
            onResumeAdded();

        } catch (error) {
            console.error('❌ Error in CV/Resume upload process:', error);
            if (error instanceof Error) {
                setError(`Có lỗi xảy ra: ${error.message}`);
            } else {
                setError('Có lỗi xảy ra khi thêm CV/Resume. Vui lòng thử lại.');
            }
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setCvName('');
        setSelectedFile(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                                className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center cursor-pointer hover:border-[#309689] hover:bg-gray-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <div className="mb-3 text-gray-400">
                                        <FiUpload size={36} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">Chọn File hoặc thả vào đây</p>
                                    <p className="text-xs text-gray-500 mt-1">Hỗ trợ: PDF, DOC, DOCX</p>
                                </div>
                            </div>

                            {/* Selected File Display */}
                            {selectedFile && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex items-center">
                                        <FiFile className="h-5 w-5 text-[#309689] mr-3" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {getFileType(selectedFile.name)} • {formatFileSize(selectedFile.size)}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                            className="text-gray-400 hover:text-red-500 ml-2"
                                        >
                                            <FiX className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <div className="cancel-button" onClick={handleCancel}>
                                Hủy Bỏ
                            </div>
                            <button
                                type="submit"
                                className="add-button"
                                disabled={!cvName || !selectedFile || isSubmitting || isUploading}
                            >
                                {isUploading ? 'Đang tải lên...' : isSubmitting ? 'Đang lưu...' : 'Thêm CV/Resume'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CVModal; 