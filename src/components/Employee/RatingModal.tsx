import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    employerName: string;
    jobApplicationId: number;
    employerId: number;
    onRatingSuccess: (jobApplicationId: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
    isOpen,
    onClose,
    jobTitle,
    employerName,
    jobApplicationId,
    employerId,
    onRatingSuccess
}) => {
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

    const handleSubmit = async () => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            console.log('🔑 Token check:', token ? `Token found (length: ${token.length})` : 'No token found');

            if (!token) {
                Swal.fire('Lỗi', 'Vui lòng đăng nhập lại', 'error');
                return;
            }

            // Log input props
            console.log('📝 Rating Modal Props:');
            console.log('  - jobApplicationId:', jobApplicationId, typeof jobApplicationId);
            console.log('  - employerId:', employerId, typeof employerId);
            console.log('  - jobTitle:', jobTitle);
            console.log('  - employerName:', employerName);

            // Log rating values
            console.log('⭐ Rating Values:');
            console.log('  - jobDescriptionRating:', jobDescriptionRating, typeof jobDescriptionRating);
            console.log('  - employerTrustRating:', employerTrustRating, typeof employerTrustRating);
            console.log('  - workEnvironmentRating:', workEnvironmentRating, typeof workEnvironmentRating);
            console.log('  - fairnessRating:', fairnessRating, typeof fairnessRating);
            console.log('  - feedback:', feedback, typeof feedback);

            // Calculate overall rating (average of all individual ratings)
            const allRatings = [jobDescriptionRating, employerTrustRating, workEnvironmentRating, fairnessRating];
            const overallRating = Math.round(allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length);

            // Prepare rating data in correct API format
            const ratingData = {
                jobApplicationId: jobApplicationId,
                employerId: employerId,
                ratingValue: overallRating,
                comment: feedback || "",
                details: [
                    {
                        ratingCriteriaId: 1, // Assuming ID 1 for "Công việc giống mô tả"
                        score: jobDescriptionRating
                    },
                    {
                        ratingCriteriaId: 2, // Assuming ID 2 for "Độ uy tín của người tuyển dụng"
                        score: employerTrustRating
                    },
                    {
                        ratingCriteriaId: 3, // Assuming ID 3 for "Môi trường làm việc"
                        score: workEnvironmentRating
                    },
                    {
                        ratingCriteriaId: 4, // Assuming ID 4 for "Sự minh bạch và công bằng"
                        score: fairnessRating
                    }
                ]
            };

            console.log('📤 API Request Details:');
            console.log('  - URL: https://103.163.24.72/api/employerrating');
            console.log('  - Method: POST');
            console.log('  - Headers:', {
                'Authorization': `Bearer ${token.substring(0, 20)}...`,
                'Content-Type': 'application/json'
            });
            console.log('  - Body (stringified):', JSON.stringify(ratingData, null, 2));
            console.log('  - Body (object):', ratingData);

            // Call rating API
            console.log('🚀 Making API call...');
            const response = await fetch('https://103.163.24.72/api/employerrating', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ratingData)
            });

            console.log('📥 API Response Details:');
            console.log('  - Status:', response.status);
            console.log('  - Status Text:', response.statusText);
            console.log('  - Headers:', Object.fromEntries(response.headers.entries()));

            // Try to get response body as text first
            const responseText = await response.text();
            console.log('  - Response Body (text):', responseText);

            let responseJson = null;
            try {
                responseJson = JSON.parse(responseText);
                console.log('  - Response Body (parsed JSON):', responseJson);
            } catch (parseError) {
                console.log('  - Could not parse response as JSON:', parseError);
            }

            if (response.ok) {
                console.log('✅ API call successful!');
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Đánh giá của bạn đã được gửi thành công',
                    icon: 'success',
                    confirmButtonColor: '#309689'
                });

                // Mark this job application as rated
                const ratedJobs = JSON.parse(localStorage.getItem('ratedJobApplications') || '[]');
                ratedJobs.push(jobApplicationId);
                localStorage.setItem('ratedJobApplications', JSON.stringify(ratedJobs));

                // Call success callback
                onRatingSuccess(jobApplicationId);
                onClose();
            } else {
                console.error('❌ API call failed with status:', response.status);
                console.error('❌ Response body:', responseText);
                throw new Error(`API call failed with status ${response.status}: ${responseText}`);
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonColor: '#309689'
            });
        }
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