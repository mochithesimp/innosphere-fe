import React, { useState, useRef } from 'react';
import { FiX, FiUpload, FiFile } from 'react-icons/fi';
import { AdvertisementPackageModel } from '../../services/advertisementService';

interface AdvertisementModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage: AdvertisementPackageModel | null;
    onProceedToPayment: (adData: AdvertisementFormData) => void;
}

export interface AdvertisementFormData {
    title: string;
    description: string;
    imageFile: File | null;
    packageId: number;
    packageName: string;
    price: number;
}

// Define button styles separately just like in CVModal
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
    
    .payment-button {
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
    .payment-button:hover {
        background-color: #267b70;
    }
    .payment-button:disabled {
        background-color: #a0c4c0;
        cursor: not-allowed;
    }
`;

const AdvertisementModal: React.FC<AdvertisementModalProps> = ({
    isOpen,
    onClose,
    selectedPackage,
    onProceedToPayment
}) => {
    const [adTitle, setAdTitle] = useState('');
    const [adDescription, setAdDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // Check if file is an image
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setError('');
            } else {
                setError('Vui lòng chọn file hình ảnh (JPG, PNG, GIF, etc.)');
            }
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setError('');
            } else {
                setError('Vui lòng chọn file hình ảnh (JPG, PNG, GIF, etc.)');
            }
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!adTitle.trim()) {
            setError('Vui lòng nhập tiêu đề quảng cáo');
            return;
        }

        if (!selectedFile) {
            setError('Vui lòng chọn file hình ảnh');
            return;
        }

        if (!selectedPackage) {
            setError('Gói quảng cáo không hợp lệ');
            return;
        }

        // Prepare advertisement data
        const adData: AdvertisementFormData = {
            title: adTitle.trim(),
            description: adDescription.trim(),
            imageFile: selectedFile,
            packageId: selectedPackage.id,
            packageName: selectedPackage.packageName,
            price: selectedPackage.price
        };

        // Proceed to payment modal
        onProceedToPayment(adData);
    };

    const handleCancel = () => {
        setAdTitle('');
        setAdDescription('');
        setSelectedFile(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    if (!isOpen || !selectedPackage) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Include styles exactly like in CVModal */}
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

                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">
                        Quảng cáo - {selectedPackage.packageName}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Tiêu đề quảng cáo
                            </label>
                            <input
                                type="text"
                                id="adTitle"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689]"
                                placeholder="Nhập tiêu đề quảng cáo"
                                value={adTitle}
                                onChange={(e) => setAdTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="adDescription" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Mô tả quảng cáo (tùy chọn)
                            </label>
                            <textarea
                                id="adDescription"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#309689] focus:border-[#309689] resize-none"
                                placeholder="Nhập mô tả quảng cáo"
                                value={adDescription}
                                onChange={(e) => setAdDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Tải lên Quảng cáo của bạn
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
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {selectedFile ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <FiFile className="text-[#309689] text-2xl" />
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {getFileType(selectedFile.name)} • {formatFileSize(selectedFile.size)}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Kéo thả file hình ảnh vào đây hoặc click để chọn
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Hỗ trợ: JPG, PNG, GIF (tối đa 10MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 text-sm text-red-600 text-left">
                                {error}
                            </div>
                        )}

                        <div className="flex space-x-3">
                            <button
                                type="button"
                                className="cancel-button flex-1"
                                onClick={handleCancel}
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="payment-button flex-1"
                            >
                                Thanh toán
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementModal; 