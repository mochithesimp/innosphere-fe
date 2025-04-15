import React from 'react';
import { Link } from 'react-router-dom';

const JoinBanner: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="relative overflow-hidden bg-black rounded-3xl h-[400px]">
                    {/* Gradient overlay for text area only */}
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-black z-5"></div>

                    {/* Image positioned on the right */}
                    <div className="absolute top-0 right-0 h-full w-1/2 md:w-3/5 z-0">
                        <div className="relative h-full w-full">
                            <img
                                src="/Imgs.png"
                                alt="Team members"
                                className="absolute right-0 h-full w-auto max-w-none"
                            />
                        </div>
                    </div>

                    {/* Content on the left */}
                    <div className="relative z-10 p-10 md:p-16 max-w-full md:max-w-[45%] h-full flex flex-col justify-center">
                        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 text-left leading-tight">
                            Xây Dựng Tương Lai <br />
                            Linh Hoạt Cho Bạn
                        </h2>

                        <p className="text-white text-left opacity-90 mb-10 text-lg">
                            Hãy tham gia cùng chúng tôi để khám phá những cơ hội
                            việc làm theo giờ phù hợp với bạn.
                        </p>

                        <div className="text-left">
                            <Link
                                to="/jobs"
                                className="inline-block bg-[#309689] hover:bg-[#277a6e] text-white font-medium py-3 px-8 rounded-md transition-colors"
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