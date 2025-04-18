import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    employerName: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, jobTitle, employerName }) => {
    const [jobDescriptionRating, setJobDescriptionRating] = useState<number>(0);
    const [employerTrustRating, setEmployerTrustRating] = useState<number>(0);
    const [workEnvironmentRating, setWorkEnvironmentRating] = useState<number>(0);
    const [fairnessRating, setFairnessRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');

    if (!isOpen) return null;

    const handleRatingChange = (category: string, rating: number) => {
        switch (category) {
            case 'jobDescription':
                setJobDescriptionRating(rating);
                break;
            case 'employerTrust':
                setEmployerTrustRating(rating);
                break;
            case 'workEnvironment':
                setWorkEnvironmentRating(rating);
                break;
            case 'fairness':
                setFairnessRating(rating);
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        // Here you would handle the submission of the rating
        console.log({
            jobDescriptionRating,
            employerTrustRating,
            workEnvironmentRating,
            fairnessRating,
            feedback
        });
        onClose();
    };

    const renderStars = (category: string, currentRating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={`w-7 h-7 cursor-pointer ${index < currentRating ? 'text-[#FFA500]' : 'text-gray-300'
                            }`}
                        onClick={() => handleRatingChange(category, index + 1)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md w-full max-w-md mx-4 overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="text-left">
                            <h2 className="text-xl text-gray-800 text-left">
                                <span className="font-normal">Đánh giá công việc:</span> <span className="font-bold">{jobTitle}</span>
                            </h2>
                            <p className="text-gray-600 mt-1 text-left">Người cung cấp: <span className="font-bold">{employerName}</span></p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <IoClose className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-700 font-medium">Độ tin cậy và chất lượng công việc thế nào?</p>

                        <div className="mt-4 space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-bold">Công việc giống mô tả</span>
                                {renderStars('jobDescription', jobDescriptionRating)}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-bold">Độ uy tín của người tuyển dụng</span>
                                {renderStars('employerTrust', employerTrustRating)}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-bold">Môi trường làm việc</span>
                                {renderStars('workEnvironment', workEnvironmentRating)}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-bold">Sự minh bạch và công bằng</span>
                                {renderStars('fairness', fairnessRating)}
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-700 mb-2">Bạn có thể cho chúng tôi biết thêm không?</p>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35a79c]"
                                rows={4}
                                placeholder="Thêm phản hồi"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 bg-white text-gray-700 font-medium border border-gray-300 rounded-md"
                    >
                        Hủy bỏ
                    </button>
                    <div
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "#35a79c",
                            color: "white",
                            padding: "12px 16px",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "500",
                            flex: "1",
                            cursor: "pointer",
                            textAlign: "center"
                        }}
                    >
                        Gửi
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingModal; 