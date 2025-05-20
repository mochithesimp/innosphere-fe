import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Line, RiEditLine, RiDeleteBinLine, RiMoreFill } from 'react-icons/ri';
import ApplicantPopup from './ApplicantPopup';

// Define the Applicant type
interface Applicant {
    id: number;
    name: string;
    position: string;
    experience: string;
    education: string;
    applicationDate: string;
}

const JobApplicationsView: React.FC = () => {
    const [sortOption, setSortOption] = useState<string>('Mới nhất');
    const [filterActive, setFilterActive] = useState<boolean>(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setFilterActive(false);
            }

            if (openMenuId && menuRefs.current[openMenuId] && !menuRefs.current[openMenuId]?.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    // Toggle dropdown menu
    const toggleMenu = (id: string) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Register menu ref
    const setMenuRef = (id: string, el: HTMLDivElement | null) => {
        menuRefs.current[id] = el;
    };

    // Open applicant popup
    const handleApplicantClick = (applicant: Applicant) => {
        setSelectedApplicant(applicant);
        setIsPopupOpen(true);
    };

    // Close applicant popup
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedApplicant(null);
    };

    // Sample data for applicants
    const allApplicants: Applicant[] = [
        {
            id: 1,
            name: 'Lê Thanh Vũ',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp MIT',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 2,
            name: 'Vũ Lê',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp Harvard',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 3,
            name: 'Mochi',
            position: 'Product Designer',
            experience: '7 năm',
            education: 'Học vấn: High School Degree',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 4,
            name: 'Anh Vũ Lê',
            position: 'User Experience Designer',
            experience: '7 năm',
            education: 'Học vấn: Master Degree',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 5,
            name: 'Vũ Lê Thanh',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp Stanford',
            applicationDate: 'Jan 23, 2025'
        }
    ];

    // For the right column, just the first two applicants
    const selectedApplicants: Applicant[] = [
        {
            id: 1,
            name: 'Vũ Lê',
            position: 'UI/UX Designer',
            experience: '7 năm',
            education: 'Học vấn: tốt nghiệp Harvard',
            applicationDate: 'Jan 23, 2025'
        },
        {
            id: 2,
            name: 'Mochi The Simp',
            position: 'UI Designer',
            experience: '7 năm',
            education: 'Học vấn: Bachelor Degree',
            applicationDate: 'Jan 23, 2025'
        }
    ];

    // Render applicant card in the Tất cả column
    const renderApplicantCard = (applicant: Applicant) => {
        return (
            <div
                key={applicant.id}
                className="bg-white rounded-lg shadow border border-gray-200 mb-4 text-left cursor-pointer hover:border-[#309689]"
                onClick={() => handleApplicantClick(applicant)}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        {/* Blank Avatar */}
                        <div className="mr-3">
                            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                        </div>

                        {/* Name and Title */}
                        <div className="flex-1 text-left">
                            <h3 className="text-base font-medium text-gray-900 text-left">{applicant.name}</h3>
                            <p className="text-sm text-gray-500 text-left">{applicant.position}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Experience & Details */}
                <div className="p-4 text-left">
                    <ul className="text-sm text-gray-500 space-y-1 text-left">
                        <li className="text-left">• Kinh nghiệm: {applicant.experience}</li>
                        <li className="text-left">• {applicant.education}</li>
                        <li className="text-left">• Ngày nộp: {applicant.applicationDate}</li>
                    </ul>

                    <button className="mt-3 text-[#309689] text-sm font-medium flex items-center hover:underline text-left">
                        <svg className="w-4 h-4 mr-1" style={{ color: "#309689" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15L12 3" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 7L12 3L16 7" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#309689]">Download CV</span>
                    </button>
                </div>
            </div>
        );
    };

    // Render applicant card in the Chọn lọc column
    const renderSelectedApplicantCard = (applicant: Applicant) => {
        return (
            <div
                key={applicant.id}
                className="bg-white rounded-lg shadow border border-gray-200 mb-4 text-left cursor-pointer hover:border-[#309689]"
                onClick={() => handleApplicantClick(applicant)}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        {/* Blank Avatar */}
                        <div className="mr-3">
                            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                        </div>

                        {/* Name and Title */}
                        <div className="flex-1 text-left">
                            <h3 className="text-base font-medium text-gray-900 text-left">{applicant.name}</h3>
                            <p className="text-sm text-gray-500 text-left">{applicant.position}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Experience & Details */}
                <div className="p-4 text-left">
                    <ul className="text-sm text-gray-500 space-y-1 text-left">
                        <li className="text-left">• Kinh nghiệm: {applicant.experience}</li>
                        <li className="text-left">• {applicant.education}</li>
                        <li className="text-left">• Ngày nộp: {applicant.applicationDate}</li>
                    </ul>

                    <button className="mt-3 text-[#309689] text-sm font-medium flex items-center hover:underline text-left">
                        <svg className="w-4 h-4 mr-1" style={{ color: "#309689" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15L12 3" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 7L12 3L16 7" stroke="#309689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#309689]">Download CV</span>
                    </button>
                </div>
            </div>
        );
    };

    // Menu dropdown component
    const MenuDropdown = () => (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-36">
            <div className="py-1.5 px-2 text-gray-700 flex items-center hover:bg-gray-50 rounded cursor-pointer">
                <RiEditLine className="mr-2 text-gray-600" />
                <span>Chỉnh sửa</span>
            </div>
            <div className="py-1.5 px-2 text-red-500 flex items-center hover:bg-gray-50 rounded cursor-pointer">
                <RiDeleteBinLine className="mr-2" />
                <span>Xóa</span>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                    <RiHome2Line className="mr-1" />
                    <Link to="/" className="hover:text-[#309689]">Home</Link>
                </div>
                <div className="mx-2">/</div>
                <div><Link to="/job" className="hover:text-[#309689]">Job</Link></div>
                <div className="mx-2">/</div>
                <div><Link to="/senior-uiux-designer" className="hover:text-[#309689]">Senior UI/UX Designer</Link></div>
                <div className="mx-2">/</div>
                <div className="text-[#309689]">Applications</div>
            </div>

            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Hồ sơ xin việc</h1>

                <div className="flex items-center relative">
                    <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:border hover:border-gray-300 transition-all mr-2">
                        Bộ lọc
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setFilterActive(!filterActive)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterActive ? 'bg-[#309689] text-white' : 'text-gray-700 hover:border hover:border-gray-300'}`}
                        >
                            Lọc
                        </button>

                        {/* Sort Dropdown */}
                        {filterActive && (
                            <div ref={sortRef} className="absolute mt-2 right-0 w-56 bg-white rounded-lg shadow-lg z-10 border border-gray-200 p-3">
                                <div className="text-xs text-gray-500 uppercase font-medium mb-2">SORT APPLICATION</div>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                id="newest"
                                                name="sort"
                                                checked={sortOption === 'Mới nhất'}
                                                onChange={() => setSortOption('Mới nhất')}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="newest"
                                                className="flex items-center cursor-pointer"
                                            >
                                                <span className={`w-5 h-5 inline-block mr-2 rounded-full border ${sortOption === 'Mới nhất' ? 'border-[#309689]' : 'border-gray-300'} flex-shrink-0`}>
                                                    {sortOption === 'Mới nhất' && (
                                                        <span className="block w-3 h-3 mt-1 ml-1 rounded-full bg-[#309689]"></span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-700">Mới nhất</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                id="oldest"
                                                name="sort"
                                                checked={sortOption === 'Cũ nhất'}
                                                onChange={() => setSortOption('Cũ nhất')}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="oldest"
                                                className="flex items-center cursor-pointer"
                                            >
                                                <span className={`w-5 h-5 inline-block mr-2 rounded-full border ${sortOption === 'Cũ nhất' ? 'border-[#309689]' : 'border-gray-300'} flex-shrink-0`}>
                                                    {sortOption === 'Cũ nhất' && (
                                                        <span className="block w-3 h-3 mt-1 ml-1 rounded-full bg-[#309689]"></span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-700">Cũ nhất</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                {/* Left Column - Tất cả */}
                <div className="w-full md:w-1/2">
                    <div className="bg-[#E4E5E8] rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-[#E4E5E8]">
                            <h2 className="text-base font-medium text-gray-700 text-left">Tất cả (213)</h2>
                            <div className="relative" ref={el => setMenuRef('all', el)}>
                                <div
                                    onClick={() => toggleMenu('all')}
                                    className="flex items-center justify-center bg-[#E4E5E8] cursor-pointer"
                                >
                                    <RiMoreFill className="text-gray-600 h-5 w-5" />
                                </div>
                                {openMenuId === 'all' && (
                                    <div className="absolute right-0 mt-1 z-10">
                                        <MenuDropdown />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4">
                            {allApplicants.map(applicant => renderApplicantCard(applicant))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Chọn lọc */}
                <div className="w-full md:w-1/2">
                    <div className="bg-[#E4E5E8] rounded-lg shadow mb-4">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-[#E4E5E8]">
                            <h2 className="text-base font-medium text-gray-700 text-left">Chọn lọc (2)</h2>
                            <div className="relative" ref={el => setMenuRef('selected', el)}>
                                <div
                                    onClick={() => toggleMenu('selected')}
                                    className="flex items-center justify-center bg-[#E4E5E8] cursor-pointer"
                                >
                                    <RiMoreFill className="text-gray-600 h-5 w-5" />
                                </div>
                                {openMenuId === 'selected' && (
                                    <div className="absolute right-0 mt-1 z-10">
                                        <MenuDropdown />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4">
                            {selectedApplicants.map(applicant => renderSelectedApplicantCard(applicant))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Applicant Popup */}
            <ApplicantPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                applicant={selectedApplicant}
            />
        </div>
    );
};

export default JobApplicationsView; 