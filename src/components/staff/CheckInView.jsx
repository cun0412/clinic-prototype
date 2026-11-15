import React, { useState } from 'react';
import { 
  Search, 
  QrCode, 
  CheckCircle2, 
  UserCheck, 
  Clock, 
  User, 
  Stethoscope, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function CheckInView({ appointments, onCheckInSuccess }) {
  const [searchKey, setSearchKey] = useState('0904 888 999'); // Pre-filled with demo patient for quick test
  const [matchedApt, setMatchedApt] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [checkInDone, setCheckInDone] = useState(false);

  // Search logic
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const cleanKey = searchKey.trim().toLowerCase();
    const found = appointments.find(a => 
      a.id.toLowerCase() === cleanKey ||
      a.patientPhone.replace(/\s+/g, '') === cleanKey.replace(/\s+/g, '') ||
      a.patientName.toLowerCase().includes(cleanKey)
    );
    setMatchedApt(found || null);
    setCheckInDone(false);
  };

  // Simulate QR Scanner
  const handleSimulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Pick the confirmed patient (e.g. Dung)
      const target = appointments.find(a => a.id === 'APT-20261115-003') || appointments[2];
      setMatchedApt(target);
      setSearchKey(target.id);
      setCheckInDone(false);
    }, 800);
  };

  // Perform Check-in
  const handleExecuteCheckIn = () => {
    if (!matchedApt) return;
    onCheckInSuccess(matchedApt.id);
    setCheckInDone(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
          Quầy Tiếp Đón Bệnh Nhân
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Tiếp nhận & Check-in Bệnh nhân
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tìm kiếm hồ sơ đặt lịch qua Mã hẹn / SĐT hoặc quét mã QR Code để cấp số thứ tự vào hàng đợi của Bác sĩ.
        </p>
      </div>

      {/* SEARCH AND SCAN BAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Nhập Mã lịch hẹn (APT-...), Số điện thoại hoặc Tên bệnh nhân..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner"
            />
          </div>

          <button
            onClick={handleSearch}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors shrink-0"
          >
            Tìm kiếm hồ sơ
          </button>

          <button
            onClick={handleSimulateQRScan}
            disabled={isScanning}
            className="px-5 py-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <QrCode className="w-4 h-4 text-teal-600" />
            <span>{isScanning ? 'Đang quét QR...' : 'Quét mã QR Code'}</span>
          </button>

        </div>

        {/* Quick Demo Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
          <span className="font-semibold text-slate-400">💡 Chọn nhanh để thử:</span>
          <button
            type="button"
            onClick={() => {
              setSearchKey('0904 888 999');
              const found = appointments.find(a => a.patientPhone === '0904 888 999');
              setMatchedApt(found);
              setCheckInDone(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
          >
            BN: Nguyễn Tiến Dũng (Chưa check-in)
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchKey('APT-20261115-001');
              const found = appointments.find(a => a.id === 'APT-20261115-001');
              setMatchedApt(found);
              setCheckInDone(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
          >
            BN: Trần Văn Mạnh (Đã khám xong)
          </button>
        </div>

      </div>

      {/* SEARCH RESULT MATCH CARD */}
      {matchedApt && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500/40 shadow-xl shadow-teal-500/10 space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Card Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Tìm thấy thông tin đặt hẹn
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {matchedApt.patientName}
              </h3>
              <p className="text-xs text-slate-500">
                Mã lịch hẹn: <span className="font-mono font-bold text-slate-800">{matchedApt.id}</span> • SĐT: <b>{matchedApt.patientPhone}</b>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400">Trạng thái hiện tại:</span>
              <div className="mt-1">
                {matchedApt.status === 'confirmed' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                    Sẵn sàng Check-in
                  </span>
                )}
                {matchedApt.status === 'checked-in' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Đã Check-in (Đang chờ khám)
                  </span>
                )}
                {matchedApt.status === 'in-progress' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    Đang trong phòng khám
                  </span>
                )}
                {matchedApt.status === 'completed' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    Đã hoàn tất khám
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-medium">Bác sĩ phụ trách:</span>
              <div className="font-extrabold text-slate-900 text-sm">{matchedApt.doctorName}</div>
              <div className="text-teal-700 font-semibold">{matchedApt.departmentName}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-medium">Thời gian hẹn:</span>
              <div className="font-extrabold text-slate-900 text-sm">{matchedApt.timeSlot}</div>
              <div className="text-slate-500">{matchedApt.date} • {matchedApt.room}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-medium">Số thứ tự hàng đợi:</span>
              <div className="font-black text-teal-700 text-2xl">#{matchedApt.queueNumber}</div>
              <div className="text-[11px] text-slate-500">Thứ tự khám trong ca</div>
            </div>

          </div>

          {/* Clinical note */}
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs text-slate-700">
            <span className="font-bold text-teal-900">Lý do khám / Triệu chứng bệnh nhân mô tả:</span>
            <p className="mt-1 text-slate-600 leading-relaxed italic">"{matchedApt.reason}"</p>
          </div>

          {/* Action button */}
          {matchedApt.status === 'confirmed' ? (
            <div className="pt-2">
              <button
                onClick={handleExecuteCheckIn}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold text-base shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>XÁC NHẬN BỆNH NHÂN ĐÃ ĐẾN & CHECK-IN VÀO HÀNG ĐỢI</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Bệnh nhân này đã hoàn tất thủ tục check-in tại quầy!</span>
              </div>
              <span className="text-slate-500 text-[11px]">Thông báo đã được chuyển tới màn hình Bác sĩ</span>
            </div>
          )}

        </div>
      )}

      {/* SUCCESS CONFIRMATION BANNER */}
      {checkInDone && (
        <div className="p-6 rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-md">
            <UserCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black">Check-in thành công cho bệnh nhân {matchedApt?.patientName}!</h3>
          <p className="text-xs text-emerald-100 max-w-md mx-auto">
            Số thứ tự <b>#{matchedApt?.queueNumber}</b> đã được kích hoạt. Hệ thống phòng khám của bác sĩ <b>{matchedApt?.doctorName}</b> đã nhận được tín hiệu bệnh nhân sẵn sàng vào khám.
          </p>
        </div>
      )}

    </div>
  );
}
