import React, { useState, useRef, useEffect } from 'react';
import { RiBookmarkFill, RiMore2Fill, RiDownload2Line } from 'react-icons/ri';
import { FiInfo } from 'react-icons/fi';

interface SavedCandidate {
    id: number;
    name: string;
    position: string;
    image: string;
    isFeatured?: boolean;
}

const SavedCandidatesContent: React.FC = () => {
    const candidates: SavedCandidate[] = [
        { id: 1, name: 'Le Thanh Vu', position: 'Techical Support Specialist', image: '/placeholders/profile1.jpg' },
        { id: 2, name: 'Vu Le Thanh', position: 'Product Designer', image: '/placeholders/profile2.jpg' },
        { id: 3, name: 'Mochi', position: 'Marketing Officer', image: '/placeholders/profile3.jpg' },
        { id: 4, name: 'Mochi the Cutie', position: 'Marketing Manager', image: '/placeholders/profile4.jpg' },
        { id: 5, name: 'Mochi the Simp', position: 'Junior Graphic Designer', image: '/placeholders/profile5.jpg' },
        { id: 6, name: 'Anh Vũ Lê', position: 'Visual Designer', image: '/placeholders/profile6.jpg' },
        { id: 7, name: 'Lê Vũ Anh', position: 'Senior UX Designer', image: '/placeholders/profile7.jpg' },
        { id: 8, name: 'Anh Lê Vũ', position: 'Interaction Designer', image: '/placeholders/profile8.jpg' },
        { id: 9, name: 'Vũ Lê Anh', position: 'Networking Engineer', image: '/placeholders/profile9.jpg' },
        { id: 10, name: 'Anh Vũ Lee', position: 'Software Engineer', image: '/placeholders/profile10.jpg' },
    ];

    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [dropdownPositions, setDropdownPositions] = useState<{ [key: number]: 'top' | 'bottom' }>({});
    const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // Check position when dropdown is opened
    useEffect(() => {
        if (openDropdownId !== null) {
            const buttonElement = dropdownRefs.current[openDropdownId];
            if (buttonElement) {
                const rect = buttonElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const bottomSpace = windowHeight - rect.bottom;

                // If less than 150px space below, position dropdown above
                if (bottomSpace < 150) {
                    setDropdownPositions(prev => ({ ...prev, [openDropdownId]: 'top' }));
                } else {
                    setDropdownPositions(prev => ({ ...prev, [openDropdownId]: 'bottom' }));
                }
            }
        }
    }, [openDropdownId]);

    const toggleDropdown = (id: number) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    return (
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold text-gray-800">Thông tin ứng viên đã lưu</h1>
                <div className="flex items-center text-sm text-gray-500">
                    <FiInfo className="mr-2" />
                    <span>Tất cả các ứng cử viên đều được hiện thị cho đến ngày 29 Tháng Mười Một, 2025</span>
                </div>
            </div>

            <div className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                    <div
                        key={candidate.id}
                        className="py-4 relative hover:border hover:border-[#309689] hover:rounded-lg hover:px-4 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-14 h-14 bg-gray-300 rounded mr-4">
                                    {/* Square profile image placeholder */}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">{candidate.name}</h3>
                                    <p className="text-sm text-gray-500">{candidate.position}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className="text-[#309689]">
                                    <RiBookmarkFill size={24} />
                                </span>

                                <a
                                    href="#"
                                    className="px-4 py-2 bg-[#E8F5F3] text-[#309689] rounded-md hover:bg-[#d5efe9] transition-colors font-medium flex items-center"
                                >
                                    <span>Xem Hồ Sơ</span>
                                    <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#309689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>

                                <div className="relative" ref={el => { dropdownRefs.current[candidate.id] = el; }}>
                                    <button
                                        onClick={() => toggleDropdown(candidate.id)}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                        <RiMore2Fill size={20} />
                                    </button>

                                    {/* Dropdown menu */}
                                    {openDropdownId === candidate.id && (
                                        <div className={`absolute ${dropdownPositions[candidate.id] === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200`}>
                                            <div className="py-1">
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <RiDownload2Line className="mr-2" />
                                                    Download CV
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Gửi mail
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedCandidatesContent; 