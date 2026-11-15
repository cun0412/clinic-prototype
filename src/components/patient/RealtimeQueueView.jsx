import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Users, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  Tv, 
  Smartphone, 
  BellRing, 
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Building2,
  RefreshCw
} from 'lucide-react';
import { DOCTORS } from '../../mockData';

export default function RealtimeQueueView({ appointments, user }) {
  const [displayMode, setDisplayMode] = useState('patient'); // 'patient' | 'tv'
  
  // Find current user's appointment
  const myApt = appointments.find(
    a => (a.patientName.includes(user?.name || 'Nguyễn Tiến Dũng') || a.id === 'APT-20261115-003') && 
         ['checked-in', 'in-progress', 'confirmed'].includes(a.status)
  ) || appointments[2]; // Default to Dung's appointment

  // Doctor associated with user's appointment
  const doctor = DOCTORS.find(d => d.id === myApt.doctorId) || DOCTORS[0];

  // Active appointments for this doctor today
  const doctorQueue = appointments.filter(
    a => a.doctorId === doctor.id && a.date === '2026-11-15' && a.status !== 'cancelled'
  );

  const currentlyExamining = doctorQueue.find(a => a.status === 'in-progress');
  const waitingList = doctorQueue.filter(a => a.status === 'checked-in');

  // Calculate my position
  const myQueueNum = myApt?.queueNumber || 3;
  const currentExaminingNum = currentlyExamining ? currentlyExamining.queueNumber : 2;
  const peopleAhead = Math.max(0, myQueueNum - currentExaminingNum - 1);
  const estimatedWaitMinutes = Math.max(5, peopleAhead * 15 + 5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Giải quyết Vấn đề 4 (Focus Group)
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-600">Đang cập nhật thời gian thực</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Theo dõi Hàng đợi & Thời gian chờ (Real-time Queue)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Minh bạch thời gian chờ, biết trước số thứ tự đang khám và nhận chuông báo khi sắp đến lượt.
          </p>
        </div>

        {/* Display Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setDisplayMode('patient')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              displayMode === 'patient'
                ? 'bg-white text-teal-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Màn hình Bệnh nhân</span>
          </button>

          <button
            onClick={() => setDisplayMode('tv')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              displayMode === 'tv'
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>TV Sảnh chờ phòng khám</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: PATIENT PERSONAL QUEUE TRACKER (MOBILE/TABLET) */}
      {/* ============================================================ */}
      {displayMode === 'patient' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Card: Queue Status & Countdown */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Lịch hẹn hôm nay</span>
                <h3 className="text-lg font-bold text-slate-900">{myApt?.patientName}</h3>
                <p className="text-xs text-teal-700 font-semibold">{myApt?.doctorName} • {myApt?.room}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Mã phiếu hẹn:</span>
                <div className="font-mono text-sm font-bold text-slate-800">{myApt?.id}</div>
              </div>
            </div>

            {/* Circular Progress & Huge Queue Number */}
            <div className="py-6 bg-gradient-to-b from-teal-50/60 to-cyan-50/20 rounded-3xl border border-teal-100 text-center space-y-4">
              
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                {/* Outer decorative ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="text-slate-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="text-teal-600 transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray={477}
                    strokeDashoffset={477 * (1 - 0.65)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Số của bạn</span>
                  <span className="text-5xl font-black text-slate-900 tracking-tight">#{myQueueNum}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Đã Check-in
                  </span>
                </div>
              </div>

              {/* Waiting status banner */}
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-teal-900 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>Ước tính thời gian chờ: ~{estimatedWaitMinutes} phút</span>
                </div>
                <p className="text-xs text-slate-500">
                  {peopleAhead === 0 ? (
                    <span className="text-emerald-700 font-bold">Bạn là người tiếp theo! Vui lòng đứng trước cửa phòng khám.</span>
                  ) : (
                    <span>Hiện còn <b>{peopleAhead} người</b> đang chờ khám trước số thứ tự của bạn.</span>
                  )}
                </p>
              </div>

            </div>

            {/* Live Comparison Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[11px] uppercase">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                  <span>Đang trong phòng khám</span>
                </div>
                <div className="text-3xl font-black text-purple-900">
                  #{currentExaminingNum}
                </div>
                <p className="text-[11px] text-purple-700 font-medium truncate">
                  {currentlyExamining?.patientName || 'BN: Lê Thu Trang'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-1">
                <div className="text-teal-700 font-bold text-[11px] uppercase">
                  Số tiếp theo chuẩn bị
                </div>
                <div className="text-3xl font-black text-teal-900">
                  #{myQueueNum} (Số của bạn)
                </div>
                <p className="text-[11px] text-teal-700 font-medium truncate">
                  {myApt?.patientName}
                </p>
              </div>

            </div>

            {/* Notification alert banner */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <BellRing className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-[11px] leading-relaxed">
                <span className="font-bold">Cơ chế cảnh báo thông minh (Chống chờ đợi thụ động):</span>
                <p>
                  Khi số đang khám hoàn tất, điện thoại của bạn sẽ nhận được thông báo rung và tin nhắn SMS: <i>"Đã đến lượt khám STT #{myQueueNum}. Mời bạn vào {myApt?.room}"</i>.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Tips & Next up in queue */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Realtime Doctor Roster Queue */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Hàng đợi tại {myApt?.room}</span>
                <span className="text-xs text-teal-700 font-semibold">{waitingList.length + 1} người</span>
              </h3>

              <div className="space-y-2 text-xs">
                {doctorQueue.map((item) => {
                  const isCurrent = item.status === 'in-progress';
                  const isMe = item.queueNumber === myQueueNum;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-purple-50 border-purple-300 font-bold text-purple-950'
                          : isMe
                            ? 'bg-teal-50 border-teal-400 font-bold text-teal-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                          isCurrent ? 'bg-purple-600 text-white' : isMe ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          #{item.queueNumber}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">
                            {item.patientName} {isMe && <span className="text-teal-700 font-normal">(Bạn)</span>}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.timeSlot}</div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isCurrent ? (
                          <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Đang khám</span>
                        ) : item.status === 'checked-in' ? (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Đang chờ</span>
                        ) : (
                          <span className="text-slate-400">Chờ đến</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Benefits Notice */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-2 text-xs">
              <span className="font-bold text-teal-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Không phải xếp hàng vật lý</span>
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Hệ thống hàng đợi điện tử đồng bộ trực tiếp với phòng bác sĩ giúp giải quyết triệt để vấn đề bệnh nhân D (Focus Group) phải chờ hơn 45 phút mà không biết khi nào đến lượt.
              </p>
            </div>

          </div>

        </div>
      ) : (
        /* ============================================================ */
        /* MODE 2: PUBLIC TV HALL DISPLAY (MÀN HÌNH SẢNH CHỜ PHÒNG KHÁM) */
        /* ============================================================ */
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-slate-800 space-y-8 animate-in fade-in duration-300">
          
          {/* TV Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-teal-500/20">
                <Tv className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  BẢNG THÔNG BÁO HÀNG ĐỢI KHÁM BỆNH - SẢNH CHỜ TẦNG 2
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Phòng khám Đa khoa Quốc tế MediFlow • Giờ hiện tại: 09:25 AM
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">
                LIVE BROADCAST
              </span>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Room 1: BS Nguyễn Văn An */}
            <div className="bg-slate-900 rounded-3xl p-6 border-2 border-teal-500/80 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs text-teal-400 font-bold uppercase">Phòng 201 - Tầng 2, Nhà A</span>
                  <h4 className="text-lg font-black text-white">{DOCTORS[0].name}</h4>
                  <p className="text-xs text-slate-400">{DOCTORS[0].departmentName}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/40 text-center space-y-1">
                <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Đang trong phòng khám</span>
                <div className="text-5xl font-black text-teal-300">#02</div>
                <div className="text-xs font-bold text-white">BN: Lê Thu Trang</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Số tiếp theo:</span>
                <span className="font-mono text-xl font-black text-amber-400">#03 (Nguyễn Tiến Dũng)</span>
              </div>
            </div>

            {/* Room 2: ThS.BS Mai Hương */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase">Phòng 105 - Tầng 1, Nhà B</span>
                  <h4 className="text-lg font-black text-white">{DOCTORS[1].name}</h4>
                  <p className="text-xs text-slate-400">{DOCTORS[1].departmentName}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-1">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Đang trong phòng khám</span>
                <div className="text-5xl font-black text-amber-300">#01</div>
                <div className="text-xs font-bold text-white">Bé Nguyễn Gia Huy</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Số tiếp theo:</span>
                <span className="font-mono text-xl font-black text-amber-400">#04 (Bé Hoàng Minh Triết)</span>
              </div>
            </div>

            {/* Room 3: PGS.TS Lê Hoàng Nam */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs text-rose-400 font-bold uppercase">Phòng 304 - Tầng 3, Nhà A</span>
                  <h4 className="text-lg font-black text-white">{DOCTORS[2].name}</h4>
                  <p className="text-xs text-slate-400">{DOCTORS[2].departmentName}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-center space-y-1">
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">Đang trong phòng khám</span>
                <div className="text-5xl font-black text-rose-300">#01</div>
                <div className="text-xs font-bold text-white">BN: Vũ Thị Loan</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Số tiếp theo:</span>
                <span className="font-mono text-xl font-black text-amber-400">#05 (Phạm Đức Hòa)</span>
              </div>
            </div>

          </div>

          <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
            Xin quý bệnh nhân theo dõi loa phát thanh và màn hình trước cửa phòng khám tương ứng.
          </div>

        </div>
      )}

    </div>
  );
}
