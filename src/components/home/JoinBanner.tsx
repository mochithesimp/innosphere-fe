import React from 'react';
import { Link } from 'react-router-dom';

const JoinBanner: React.FC = () => {
    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="relative overflow-hidden bg-black rounded-2xl md:rounded-3xl min-h-[300px] md:h-[400px]">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent z-5"></div>

                    {/* Image positioned on the right */}
                    <div className="absolute top-0 right-0 h-full w-full md:w-3/5 z-0">
                        <div className="relative h-full w-full">
                            <img
                                src="/Imgs.png"
                                alt="Team members"
                                className="absolute right-0 h-full w-auto max-w-none object-cover"
                                style={{ minWidth: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-16 w-full md:max-w-[55%] lg:max-w-[45%] h-full flex flex-col justify-center">
                        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-left leading-tight">
                            Xây Dựng Tương Lai <br className="hidden sm:block" />
                            Linh Hoạt Cho Bạn
                        </h2>

                        <p className="text-white text-left opacity-90 mb-6 md:mb-10 text-sm sm:text-base md:text-lg">
                            Hãy tham gia cùng chúng tôi để khám phá những cơ hội
                            việc làm theo giờ phù hợp với bạn.
                        </p>

                        <div className="text-left">
                            <Link
                                to="/jobs"
                                className="inline-block w-full sm:w-auto text-center bg-[#309689] hover:bg-[#277a6e] text-white font-medium py-2.5 md:py-3 px-6 md:px-8 rounded-md transition-colors text-sm md:text-base"
                            >
                                Tìm Việc Ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinBanner; 