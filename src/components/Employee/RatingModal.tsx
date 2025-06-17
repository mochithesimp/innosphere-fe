import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { RatingService, RatingCriteriaModel, CreateEmployerRatingModel, CreateEmployerRatingDetailModel } from '../../services/ratingService';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    employerName: string;
    jobApplicationId: number;
    employerId: number;
    onRatingSuccess?: (jobApplicationId: number) => void; // Callback for successful rating
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, jobTitle, employerName, jobApplicationId, employerId, onRatingSuccess }) => {
    const [ratingCriteria, setRatingCriteria] = useState<RatingCriteriaModel[]>([]);
    const [criteriaRatings, setCriteriaRatings] = useState<{ [key: number]: number }>({});
    const [feedback, setFeedback] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Fetch employer rating criteria when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchRatingCriteria();
        }
    }, [isOpen]);

    const fetchRatingCriteria = async () => {
        try {
            setIsLoading(true);
            console.log('🔍 Fetching employer rating criteria...');
            const criteria = await RatingService.getEmployerRatingCriteria();
            console.log('✅ Fetched criteria:', criteria);
            setRatingCriteria(criteria);

            // Initialize ratings object
            const initialRatings: { [key: number]: number } = {};
            criteria.forEach(criterion => {
                initialRatings[criterion.id] = 0;
            });
            setCriteriaRatings(initialRatings);
        } catch (error) {
            console.error('❌ Error fetching rating criteria:', error);
            alert('Không thể tải tiêu chí đánh giá. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRatingChange = (criteriaId: number, rating: number) => {
        setCriteriaRatings(prev => ({
            ...prev,
            [criteriaId]: rating
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log('=== RATING SUBMISSION DEBUG START ===');
            console.log('🔍 Props received:');
            console.log('- jobApplicationId:', jobApplicationId);
            console.log('- employerId:', employerId);
            console.log('- jobTitle:', jobTitle);
            console.log('- employerName:', employerName);

            console.log('🔍 Current state:');
            console.log('- ratingCriteria:', ratingCriteria);
            console.log('- criteriaRatings:', criteriaRatings);
            console.log('- feedback:', feedback);

            // Validate that all criteria have been rated (rating > 0)
            const unratedCriteria = ratingCriteria.filter(criterion => criteriaRatings[criterion.id] === 0);
            console.log('🔍 Validation check:');
            console.log('- unratedCriteria:', unratedCriteria);

            if (unratedCriteria.length > 0) {
                console.log('❌ Validation failed: Some criteria not rated');
                alert('Vui lòng đánh giá tất cả các tiêu chí!');
                return;
            }

            setIsSubmitting(true);
            console.log('🌟 Starting rating submission...');

            // Prepare rating details
            console.log('🔧 Preparing rating details...');
            const details: CreateEmployerRatingDetailModel[] = ratingCriteria.map(criterion => {
                const detail = {
                    ratingCriteriaId: criterion.id,
                    score: criteriaRatings[criterion.id]
                };
                console.log(`- Detail for criterion ${criterion.id} (${criterion.criteriaName}):`, detail);
                return detail;
            });
            console.log('📋 Final details array:', details);

            // Prepare rating data
            console.log('🔧 Preparing final rating data...');
            const ratingData: CreateEmployerRatingModel = {
                jobApplicationId,
                employerId,
                comment: feedback.trim() || undefined,
                details
            };

            console.log('📤 FINAL JSON BEING SENT TO API:');
            console.log(JSON.stringify(ratingData, null, 2));
            console.log('📤 API Endpoint: POST /api/employerrating');

            const result = await RatingService.createEmployerRating(ratingData);

            console.log('✅ API Response received:');
            console.log(result);
            console.log('✅ Rating submitted successfully!');

            // Store successful rating in localStorage
            const ratedJobs = JSON.parse(localStorage.getItem('ratedJobApplications') || '[]');
            if (!ratedJobs.includes(jobApplicationId)) {
                ratedJobs.push(jobApplicationId);
                localStorage.setItem('ratedJobApplications', JSON.stringify(ratedJobs));
                console.log('💾 Stored rating success for jobApplicationId:', jobApplicationId);
            }

            // Notify parent component of successful rating
            if (onRatingSuccess) {
                onRatingSuccess(jobApplicationId);
            }

            alert('Đánh giá đã được gửi thành công!');

            // Reset form and close modal
            setCriteriaRatings({});
            setFeedback('');
            onClose();

        } catch (error) {
            console.log('=== ERROR DETAILS ===');
            console.error('❌ Error submitting rating:', error);

            // Log detailed error information
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown; headers?: unknown }; config?: unknown };
                console.error('🔥 API Error Response:');
                console.error('- Status:', axiosError.response?.status);
                console.error('- Status Text:', axiosError.response?.statusText);
                console.error('- Response Data:', axiosError.response?.data);
                console.error('- Response Headers:', axiosError.response?.headers);
                console.error('- Request Config:', axiosError.config);
            }

            alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
            console.log('=== RATING SUBMISSION DEBUG END ===');
        }
    };

    if (!isOpen) return null;

    const renderStars = (criteriaId: number, currentRating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={`w-7 h-7 cursor-pointer ${index < currentRating ? 'text-[#FFA500]' : 'text-gray-300'
                            }`}
                        onClick={() => handleRatingChange(criteriaId, index + 1)}
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

                        {isLoading ? (
                            <div className="mt-4 text-center py-8">
                                <div className="text-gray-500">Đang tải tiêu chí đánh giá...</div>
                            </div>
                        ) : (
                            <div className="mt-4 space-y-5">
                                {ratingCriteria.map((criterion) => (
                                    <div key={criterion.id} className="flex justify-between items-center">
                                        <span className="text-gray-700 font-bold">{criterion.criteriaName}</span>
                                        {renderStars(criterion.id, criteriaRatings[criterion.id] || 0)}
                                    </div>
                                ))}
                            </div>
                        )}

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
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isLoading}
                        style={{
                            backgroundColor: isSubmitting || isLoading ? "#9CA3AF" : "#35a79c",
                            color: "white",
                            padding: "12px 16px",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "500",
                            flex: "1",
                            cursor: isSubmitting || isLoading ? "not-allowed" : "pointer",
                            textAlign: "center"
                        }}
                    >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal; 