import React, { useState, useEffect } from 'react';
import './Popup.css';
import { ResumeService, ResumeModel } from '../services/resumeService';
import { JobApplicationService, CreateJobApplicationModel } from '../services/jobApplicationService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Text Editor Component
const TextEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}> = ({ value, onChange, placeholder }) => {

    const handleFormat = (format: string) => {
        // In a real implementation, this would apply the formatting to the selected text
        console.log(`Applying ${format} formatting`);
    };

    return (
        <div className="w-full border border-gray-200 rounded-md shadow-sm">
            <div className="p-4">
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full min-h-[100px] border-0 focus:outline-none resize-none p-0 placeholder:text-gray-500 text-gray-600"
                    style={{
                        fontSize: "14px",
                        lineHeight: "1.5"
                    }}
                />
            </div>
            <div className="flex items-center gap-1 p-2 border-t">
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("bold")}
                >
                    <span className="font-bold">B</span>
                </button>
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("italic")}
                >
                    <span className="italic">I</span>
                </button>
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("underline")}
                >
                    <span className="underline">U</span>
                </button>
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("strikethrough")}
                >
                    <span className="text-sm font-medium">S̶</span>
                </button>
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("link")}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                </button>
                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("bullet-list")}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                </button>
                <button
                    className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => handleFormat("numbered-list")}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="6" x2="21" y2="6"></line>
                        <line x1="10" y1="12" x2="21" y2="12"></line>
                        <line x1="10" y1="18" x2="21" y2="18"></line>
                        <path d="M4 6h1v4"></path>
                        <path d="M4 10h2"></path>
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

interface PopupProps {
    show: boolean;
    onClose: () => void;
    jobTitle: string;
    jobPostingId: number;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, jobTitle, jobPostingId }) => {
    const [editorValue, setEditorValue] = useState("");
    const [resumes, setResumes] = useState<ResumeModel[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string>("");
    const [isLoadingResumes, setIsLoadingResumes] = useState(false);

    // Fetch resumes when popup opens
    useEffect(() => {
        if (show) {
            fetchResumes();
        }
    }, [show]);

    const fetchResumes = async () => {
        try {
            setIsLoadingResumes(true);

            console.log('🔄 Popup opened - Calling API: GET https://103.163.24.72:8080/api/worker/profile');

            // First get worker profile to get workerId
            const profile = await ResumeService.getWorkerProfile();
            console.log('✅ Worker Profile API Response:', profile);

            if (profile.workerId) {
                console.log(`🔄 Calling API: GET https://103.163.24.72:8080/api/resume/worker/${profile.workerId}`);

                // Then get resumes using workerId
                const resumesData = await ResumeService.getResumesByWorker(profile.workerId);
                console.log('✅ Resumes API Response:', resumesData);
                console.log(`📊 Found ${resumesData.length} resume(s) for dropdown`);

                setResumes(resumesData);

                // Auto-select first resume if available
                if (resumesData.length > 0) {
                    setSelectedResumeId(resumesData[0].id.toString());
                }
            }
        } catch (error) {
            console.error('❌ Error fetching resumes:', error);

            // Handle 404 or other errors
            const errorResponse = error as { response?: { status?: number } };
            if (errorResponse.response?.status === 404) {
                console.log('⚠️ Worker profile not found (404). No resumes available.');
            }
            setResumes([]);
        } finally {
            setIsLoadingResumes(false);
        }
    };

    const handleApply = async () => {
        const selectedResume = resumes.find(resume => resume.id.toString() === selectedResumeId);

        if (!selectedResume) {
            console.log('⚠️ No resume selected for application');
            MySwal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng chọn một CV để ứng tuyển',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: '#37A594'
            });
            return;
        }

        if (!editorValue.trim()) {
            console.log('⚠️ No cover note provided');
            MySwal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng nhập giới thiệu bản thân',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: '#37A594'
            });
            return;
        }

        try {
            const applicationData: CreateJobApplicationModel = {
                jobPostingId: jobPostingId,
                resumeId: selectedResume.id,
                coverNote: editorValue.trim()
            };

            console.log('📝 Submitting job application with data:');
            console.log(JSON.stringify(applicationData, null, 2));
            console.log('🔄 Calling API: POST https://103.163.24.72:8080/api/jobapplication/apply');

            const response = await JobApplicationService.applyForJob(applicationData);

            console.log('✅ Job Application API Response:', response);
            console.log('🎉 Application submitted successfully!');

            MySwal.fire({
                icon: 'success',
                title: 'Ứng tuyển thành công!',
                text: 'Nhà tuyển dụng sẽ liên hệ với bạn sớm.',
                confirmButtonText: 'Tuyệt vời!',
                confirmButtonColor: '#37A594',
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                onClose(); // Close the popup after successful application
                // Navigate to employee dashboard after successful application
                setTimeout(() => {
                    window.location.href = '/employee/dashboard';
                }, 300);
            });

        } catch (error) {
            console.error('❌ Error submitting job application:', error);

            const errorResponse = error as { response?: { status?: number; data?: unknown } };
            if (errorResponse.response?.status === 400) {
                console.log('⚠️ Bad request - may have already applied');
                MySwal.fire({
                    icon: 'error',
                    title: 'Không thể ứng tuyển',
                    text: 'Có lỗi xảy ra. Bạn có thể đã ứng tuyển công việc này rồi.',
                    confirmButtonText: 'Đã hiểu',
                    confirmButtonColor: '#dc3545'
                });
            } else if (errorResponse.response?.status === 401) {
                console.log('⚠️ Unauthorized - please login');
                MySwal.fire({
                    icon: 'warning',
                    title: 'Chưa đăng nhập',
                    text: 'Vui lòng đăng nhập để ứng tuyển.',
                    confirmButtonText: 'Đăng nhập',
                    confirmButtonColor: '#37A594'
                }).then(() => {
                    window.location.href = '/login';
                });
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra',
                    text: 'Có lỗi xảy ra khi ứng tuyển. Vui lòng thử lại.',
                    confirmButtonText: 'Thử lại',
                    confirmButtonColor: '#dc3545'
                });
            }
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-xl border-2 border-gray-200 relative">
                {/* Close button */}
                <button
                    className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal content */}
                <div className="p-8">
                    <h3 className="text-xl mb-6 text-left">
                        <span style={{ fontWeight: 'normal' }}>Ứng tuyển:</span> <span style={{ fontWeight: 'bold' }}>{jobTitle}</span>
                    </h3>

                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2 text-left">Chọn CV</label>
                        <div className="relative">
                            <select
                                className="w-full p-3 pr-8 border border-gray-300 rounded-md bg-white text-gray-700 appearance-none"
                                value={selectedResumeId}
                                onChange={(e) => setSelectedResumeId(e.target.value)}
                                disabled={isLoadingResumes}
                                style={{
                                    maxHeight: '120px', // Show about 3 items (40px each)
                                    overflowY: 'auto'
                                }}
                            >
                                {isLoadingResumes ? (
                                    <option value="">Đang tải CV...</option>
                                ) : resumes.length === 0 ? (
                                    <option value="">Không có CV nào</option>
                                ) : (
                                    <>
                                        <option value="">Chọn CV...</option>
                                        {resumes.map((resume) => (
                                            <option key={resume.id} value={resume.id.toString()}>
                                                {resume.title}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        {resumes.length > 3 && (
                            <p className="text-xs text-gray-500 mt-1">Có {resumes.length} CV - cuộn để xem thêm</p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2 text-left">Giới thiệu bản thân</label>
                        <TextEditor
                            value={editorValue}
                            onChange={setEditorValue}
                            placeholder="Hãy viết mô tả giới thiệu ngắn gọn về bạn. Nhà tuyển dụng sẽ liên hệ với bạn sau."
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Hủy Bỏ
                        </button>
                        <button className="apply-button" onClick={handleApply}>
                            Ứng Tuyển Ngay!
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ marginLeft: "4px" }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add CSS styles at the top of the file
const styles = `
.cancel-btn {
    background-color: #F8F9FA;
    color: #6c757d;
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 500;
    border: 1px solid #ced4da;
    cursor: pointer;
}
.cancel-btn:hover {
    background-color: #e2e6ea;
}
.apply-btn {
    background-color: #37A594;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 500;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
.apply-btn:hover {
    background-color: #2c8575;
}
`;

// Add style element to inject CSS
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default Popup; 