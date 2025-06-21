import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRoleFromToken } from "../../utils/jwtHelper";
import { getActiveCities } from "../apiServices/CityServices/cityService";
import { getActiveJobTags } from "../apiServices/JobTagServices/jobTagService";
import { getJobPostings } from "../apiServices/JobPostingServices/jobPostingService";
import { getUserCountsByRole } from "../apiServices/UserServices/userService";

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = token;


  const [cities, setCities] = useState<{ id: number; cityName: string; country: string }[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const [jobTags, setJobTags] = useState<{ id: number; tagName: string }[]>([]);
  const [selectedJobTagId, setSelectedJobTagId] = useState<number | null>(null);

  const [keyword, setKeyword] = useState<string>("");

  const [jobCount, setJobCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getActiveCities();
        setCities(response); // Update state cities → dropdown sẽ có data
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities(); // Gọi khi component mount
  }, []);

  useEffect(() => {
    const fetchJobTags = async () => {
      try {
        const response = await getActiveJobTags();
        setJobTags(response);
      } catch (error) {
        console.error("Error fetching job tags:", error);
      }
    };

    fetchJobTags();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const jobs = await getJobPostings({ Page: 1, PageSize: 1 });
        const users = await getUserCountsByRole();
        setJobCount(jobs.totalCount || 0);
        setWorkerCount(users.totalWorkers);
        setEmployerCount(users.totalEmployers);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchCounts();
  }, []);


  // Hàm xử lý khi click nút Tìm việc
  const handleSearch = async () => {
    const params: Record<string, string | number> = {
      Page: 1,
      PageSize: 10,
    };

    if (selectedCityId) params.CityId = selectedCityId;
    if (selectedJobTagId) params.CategoryId = selectedJobTagId;
    if (keyword.trim() !== "") params.Keyword = keyword.trim();

    console.log("Searching jobs with params:", params);

    try {
      const result = await getJobPostings(params);
      console.log("Search result:", result);

      // Chuyển hướng qua trang /jobs với query param
      const queryParams = new URLSearchParams();
      if (selectedCityId) queryParams.append('cityId', selectedCityId.toString());
      if (selectedJobTagId) queryParams.append('categoryId', selectedJobTagId.toString());
      if (keyword.trim() !== "") queryParams.append('keyword', keyword.trim());

      navigate(`/jobs?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const handleAvatarClick = () => {
    if (token) {
      const role = getRoleFromToken(token);
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Worker") {
        navigate("/employee/dashboard");
      } else if (role === "Employer") {
        navigate("/employer/dashboard");
      }
    }
  };

  return (
    <>
      <div className="relative py-12 pb-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-[#0f172a]"
          style={{
            backgroundImage: "url('/herobanner.png')",
            filter: "brightness(0.4)",
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/80 via-transparent to-[#0f172a]/80"></div>

        <div className="container relative z-10 mx-auto px-4 max-w-[90%]">
          {/* Header */}
          <div className="flex items-center justify-between py-2 -mt-6 mb-12">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="InnoSphere"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-bold text-xl text-white">InnoSphere</span>
              </Link>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white hover:text-[#309689] transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/jobs"
                className="text-white hover:text-[#309689] transition-colors"
              >
                Công việc
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-[#309689] transition-colors"
              >
                Về chúng tôi
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-[#309689] transition-colors"
              >
                Liên hệ
              </Link>
              <Link
                to="/ads"
                className="text-white hover:text-[#309689] transition-colors"
              >
                Quảng cáo
              </Link>
            </nav>

            {/* Authentication Buttons */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* User Avatar */}
                  <button
                    onClick={handleAvatarClick}
                    className="w-8 h-8 bg-[#309689] rounded-full flex items-center justify-center hover:bg-[#277a6e] transition-colors"
                    title="Đi tới Dashboard"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </button>

                  {/* Logout Button */}
                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="text-white hover:text-[#309689] transition-colors"
                  >
                    Đăng xuất
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-[#309689] transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#309689] hover:bg-[#277a6e] text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Banner Content */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Kết Nối Nhanh, Làm Việc Ngay!
            </h1>
            <p className="text-gray-300 mb-8">
              Kết nối nhân lực với cơ hội: Giải pháp cho công việc ngắn hạn.
            </p>

            {/* Search Bar - Matching Image Exactly */}
            <div className="flex flex-col md:flex-row rounded-lg overflow-hidden max-w-3xl mx-auto shadow-sm">
              {/* Job or company input */}
              <div className="flex-1 bg-white">
                <input
                  type="text"
                  placeholder="Công việc hoặc công ty"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full h-full px-4 py-3 text-sm text-gray-600 focus:outline-none border-r border-gray-100"
                />
              </div>

              {/* Location dropdown */}
              <div className="flex-1 bg-white">
                <select
                  className="w-full h-full px-4 py-3 text-sm text-gray-600 focus:outline-none border-r border-gray-100"
                  value={selectedCityId ?? ''}
                  onChange={(e) => setSelectedCityId(Number(e.target.value))}
                >
                  <option value="">Chọn vị trí</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.cityName}</option>
                  ))}
                </select>
              </div>

              {/* Category dropdown */}
              <div className="flex-1 bg-white">
                <select
                  value={selectedJobTagId ?? ""}
                  onChange={(e) => setSelectedJobTagId(Number(e.target.value))}
                  className="w-full h-full px-4 py-3 text-sm text-gray-600 focus:outline-none"
                >
                  <option value="">Chọn danh mục</option>
                  {jobTags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.tagName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search button → thêm onClick={handleSearch} */}
              <div
                onClick={handleSearch}
                className="bg-[#309689] flex items-center justify-center px-6 py-3 text-sm text-white cursor-pointer hover:bg-[#277a6e]"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                Tìm việc
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-10 text-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#309689] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                {/* <h4 className="font-bold text-xl text-white">25,850</h4> */}
                <h4 className="font-bold text-xl text-white">{jobCount.toLocaleString()}</h4>
                <p className="text-gray-300 text-sm">Công việc</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#309689] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                {/* <h4 className="font-bold text-xl text-white">10,250</h4>
                 */}
                <h4 className="font-bold text-xl text-white">{workerCount.toLocaleString()}</h4>
                <p className="text-gray-300 text-sm">Ứng viên</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#309689] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                {/* <h4 className="font-bold text-xl text-white">18,400</h4> */}
                <h4 className="font-bold text-xl text-white">{employerCount.toLocaleString()}</h4>
                <p className="text-gray-300 text-sm">Doanh nghiệp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos Section - Full Width */}
      <div className="w-full bg-black py-10">
        <div className="container mx-auto px-4 max-w-[90%]">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="w-40 mx-4 md:mx-0 flex items-center justify-center"
              >
                <img
                  src={`/hero${num}.png`}
                  alt={`Partner Logo ${num}`}
                  className="h-16 md:h-20 object-contain filter invert brightness-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
