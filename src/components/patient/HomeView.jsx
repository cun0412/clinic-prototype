import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Stethoscope, 
  HeartPulse, 
  Baby, 
  Activity, 
  ShieldPlus,
  PhoneCall,
  Search,
  Users,
  Zap,
  BellRing,
  HelpCircle,
  Timer
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../../mockData';

// Map icon string to Lucide icon
const iconMap = {
  Stethoscope,
  Baby,
  HeartPulse,
  Activity,
  Sparkles,
  ShieldPlus
};

export default function HomeView({ onStartBooking, onSelectDoctor, onSelectDepartment }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = DOCTORS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-cyan-50/30 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Giải pháp chuyển đổi số y tế thông minh</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                Đặt lịch khám bệnh online <br />
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Chủ động 24/7 - Không chờ đợi
                </span>
              </h1>

              {/* Subtitle addressing Problem 1 & 4 */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Không còn nỗi lo gọi điện bận máy 30 phút hay đến nơi chờ đợi cả tiếng đồng hồ. 
                MediFlow giúp bạn chủ động xem lịch trống bác sĩ theo thời gian thực, tự động chặn trùng giờ và nhận thông báo nhắc lịch chính xác qua SMS/Email.
              </p>

              {/* Main Call To Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onStartBooking()}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/35 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group"
                >
                  <Calendar className="w-5 h-5 text-teal-100" />
                  <span>Đặt lịch khám ngay</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#departments"
                  className="px-6 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2"
                >
                  <span>Xem chuyên khoa</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-black text-slate-900">24/7</div>
                  <div className="text-xs text-slate-500 font-medium">Đặt lịch trực tuyến</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-teal-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Chặn trùng giờ khám</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-600">&lt; 15 phút</div>
                  <div className="text-xs text-slate-500 font-medium">Thời gian chờ bình quân</div>
                </div>
              </div>

            </div>

            {/* Right Card: Quick Doctor Card & Booking Feature Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/70 border border-slate-100 space-y-6">
                
                {/* Header card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Lịch khám trực tuyến hôm nay
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">15/11/2026</span>
                </div>

                {/* Featured Doctor Preview */}
                <div className="flex items-center gap-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <img
                    src={DOCTORS[0].avatar}
                    alt={DOCTORS[0].name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded-md">
                      {DOCTORS[0].departmentName}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{DOCTORS[0].name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {DOCTORS[0].rating}
                      </span>
                      <span>•</span>
                      <span>{DOCTORS[0].experienceYears} năm KN</span>
                    </div>
                  </div>
                </div>

                {/* Available Slot Pills Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Khung giờ khám còn trống:</span>
                    <span className="text-teal-600 font-bold">Thời gian thực</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl border border-teal-500 bg-teal-50/60 text-teal-800 font-semibold flex items-center justify-between">
                      <span>14:00 - 14:30</span>
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                    </div>
                    <div className="p-2.5 rounded-xl border border-teal-500 bg-teal-50/60 text-teal-800 font-semibold flex items-center justify-between">
                      <span>15:00 - 15:30</span>
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 font-medium text-xs flex items-center justify-between line-through">
                    <span>09:00 - 09:30 (Đã có bệnh nhân đặt)</span>
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold">Kín</span>
                  </div>
                </div>

                {/* Quick button */}
                <button
                  onClick={() => onStartBooking()}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Chọn bác sĩ & Đặt lịch</span>
                </button>

                {/* Mini guarantee note */}
                <p className="text-[11px] text-center text-slate-400">
                  ⚡ Xác nhận tức thì • Hủy/Đổi lịch tự do trước 2 giờ
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 BUSINESS PROBLEMS RESOLVED HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Nghiệp vụ cốt lõi từ Focus Group
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Hệ thống giải quyết 4 bài toán thực tế
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Mỗi tính năng được thiết kế dựa trên đúng các vấn đề phát sinh tại phòng khám, mang lại trải nghiệm tối ưu cho cả bệnh nhân lẫn nhân viên y tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-teal-700 uppercase">Giải quyết Vấn đề 1</span>
              <h3 className="font-bold text-slate-900 text-base">Đặt lịch tự phục vụ 24/7</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thay thế hoàn toàn việc gọi điện bị bận máy giờ cao điểm. Bệnh nhân tự chọn bác sĩ, xem lịch trống và đặt hẹn bất kỳ lúc nào.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-rose-700 uppercase">Giải quyết Vấn đề 2</span>
              <h3 className="font-bold text-slate-900 text-base">Chặn trùng lịch Real-time</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khóa slot tức thời khi có giao dịch. Tuyệt đối không để xảy ra tình trạng ghi sổ tay trùng 2 người cùng 1 khung giờ của bác sĩ.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <BellRing className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-amber-700 uppercase">Giải quyết Vấn đề 3</span>
              <h3 className="font-bold text-slate-900 text-base">Tự động nhắc lịch 24h & 1h</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gửi thông báo chủ động qua SMS và Email trước ngày hẹn và trước giờ khám 60 phút, giúp giảm thiểu 95% tỷ lệ quên lịch hoặc đến muộn.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Timer className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-700 uppercase">Giải quyết Vấn đề 4</span>
              <h3 className="font-bold text-slate-900 text-base">Theo dõi hàng đợi trực tiếp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Biết trước số thứ tự đang khám, số người phía trước và thời gian chờ ước tính minh bạch, không phải ngồi chờ mệt mỏi tại hành lang.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* DEPARTMENTS SECTION */}
      <section id="departments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Chuyên khoa tiêu biểu</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Khám chữa bệnh đa chuyên khoa
            </h2>
          </div>
          <button
            onClick={() => onStartBooking()}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Đặt theo chuyên khoa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Stethoscope;
            return (
              <div
                key={dept.id}
                onClick={() => onSelectDepartment(dept.name)}
                className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200 hover:border-teal-500/80 shadow-xs hover:shadow-lg hover:shadow-teal-500/10 transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${dept.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {dept.doctorsCount} Bác sĩ
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-left">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <span>Đặt lịch ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DOCTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Đội ngũ chuyên gia</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Bác sĩ giỏi chuyên môn, giàu y đức
            </h2>
          </div>
          
          {/* Search box for doctors */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bác sĩ, khoa..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                
                {/* Doctor Avatar + Details */}
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      {doc.departmentName}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{doc.title}</p>
                    
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" /> {doc.rating}
                      </span>
                      <span className="text-slate-400">({doc.reviewCount})</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">{doc.experienceYears} năm KN</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  {doc.bio}
                </p>

                <div className="text-xs text-slate-500 space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <span>Phòng khám:</span>
                    <span className="font-semibold text-slate-700">{doc.room}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Giá khám:</span>
                    <span className="font-bold text-teal-700 text-sm">{doc.fee.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md font-medium">
                  {doc.nextAvailable}
                </span>
                <button
                  onClick={() => onSelectDoctor(doc.id)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Đặt lịch khám</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS / 4 EASY STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="max-w-2xl space-y-3 text-left mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
              Quy trình tiện lợi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Đặt khám nhanh chỉ trong 4 bước
            </h2>
            <p className="text-slate-400 text-sm">
              Giao diện trực quan, thân thiện cho mọi đối tượng, kể cả người lớn tuổi sử dụng lần đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-extrabold text-sm flex items-center justify-center border border-teal-500/40">
                01
              </div>
              <h4 className="font-bold text-white text-base">Chọn Chuyên khoa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tìm khoa phù hợp với triệu chứng (Nhi, Tim Mạch, Da liễu, v.v.).
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-extrabold text-sm flex items-center justify-center border border-teal-500/40">
                02
              </div>
              <h4 className="font-bold text-white text-base">Chọn Bác sĩ</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tham khảo học vị, số năm kinh nghiệm và đánh giá của bệnh nhân.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-extrabold text-sm flex items-center justify-center border border-teal-500/40">
                03
              </div>
              <h4 className="font-bold text-white text-base">Chọn Ngày & Giờ</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Xem lịch trống thời gian thực, hệ thống tự động khóa để chặn trùng lịch.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-extrabold text-sm flex items-center justify-center border border-teal-500/40">
                04
              </div>
              <h4 className="font-bold text-white text-base">Nhận Mã & Nhắc lịch</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nhận mã QR check-in và tự động nhận tin nhắn SMS/Email nhắc hẹn trước 24h & 1h.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Được bảo chứng bởi tiêu chuẩn bảo mật y tế & chính sách hủy/đổi lịch minh bạch trước 2 giờ.
            </span>
            <button
              onClick={() => onStartBooking()}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
            >
              Bắt đầu đặt lịch ngay
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
