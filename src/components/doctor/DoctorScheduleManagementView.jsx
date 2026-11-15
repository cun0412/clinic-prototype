import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  UserCheck,
  Save,
  Coffee
} from 'lucide-react';
import { DOCTORS } from '../../mockData';

export default function DoctorScheduleManagementView({ onSaveSuccess }) {
  const currentDoctor = DOCTORS[0]; // BS An

  const [workingDays, setWorkingDays] = useState(['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']);
  const [slotDuration, setSlotDuration] = useState('30');
  const [morningStart, setMorningStart] = useState('08:00');
  const [morningEnd, setMorningEnd] = useState('11:30');
  const [afternoonStart, setAfternoonStart] = useState('13:30');
  const [afternoonEnd, setAfternoonEnd] = useState('17:00');
  
  // Leave / Off days registered
  const [offDays, setOffDays] = useState([
    { date: '2026-11-20', reason: 'Nghỉ lễ Ngày Nhà giáo Việt Nam (Hội thảo giảng dạy y khoa)' },
    { date: '2026-12-05', reason: 'Tham dự Hội nghị Tim Mạch - Nội tiết Miền Bắc' }
  ]);
  const [newOffDate, setNewOffDate] = useState('');
  const [newOffReason, setNewOffReason] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleAddOffDay = (e) => {
    e.preventDefault();
    if (!newOffDate || !newOffReason) return;
    setOffDays([...offDays, { date: newOffDate, reason: newOffReason }]);
    setNewOffDate('');
    setNewOffReason('');
  };

  const handleRemoveOffDay = (index) => {
    setOffDays(offDays.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Quản trị Lịch Khám & Ca Trực
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Quản lý Ca làm việc của Bác sĩ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cấu hình ngày khám trong tuần, thời lượng mỗi lượt khám (slot) và đăng ký lịch nghỉ phép công tác.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu cấu hình ca trực</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Cấu hình lịch làm việc đã được lưu và cập nhật lên hệ thống đặt hẹn trực tuyến!</span>
        </div>
      )}

      {/* Grid Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Working days & Slot duration */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Working Days Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>1. Ngày làm việc cố định trong tuần</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day) => {
                const isActive = workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all text-center ${
                      isActive
                        ? 'border-teal-600 bg-teal-50 text-teal-800 shadow-xs'
                        : 'border-slate-200 text-slate-400 bg-slate-50/50'
                    }`}
                  >
                    <div>{day}</div>
                    <span className="text-[10px] font-normal block mt-0.5">
                      {isActive ? '✓ Có trực' : 'Nghỉ'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shift Time & Duration */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>2. Khung giờ ca trực & Thời lượng khám</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ca sáng:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={morningStart}
                    onChange={(e) => setMorningStart(e.target.value)}
                    className="p-2 border rounded-xl w-full"
                  />
                  <span>đến</span>
                  <input
                    type="time"
                    value={morningEnd}
                    onChange={(e) => setMorningEnd(e.target.value)}
                    className="p-2 border rounded-xl w-full"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ca chiều:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={afternoonStart}
                    onChange={(e) => setAfternoonStart(e.target.value)}
                    className="p-2 border rounded-xl w-full"
                  />
                  <span>đến</span>
                  <input
                    type="time"
                    value={afternoonEnd}
                    onChange={(e) => setAfternoonEnd(e.target.value)}
                    className="p-2 border rounded-xl w-full"
                  />
                </div>
              </div>

            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <label className="font-bold text-slate-700">Thời lượng tiêu chuẩn mỗi lượt khám (Slot duration):</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '15', label: '15 phút', desc: 'Khám nhanh / Tái khám' },
                  { value: '30', label: '30 phút (Chuẩn)', desc: 'Khám kỹ, toàn diện' },
                  { value: '45', label: '45 phút', desc: 'Chuyên sâu / Thủ thuật' }
                ].map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSlotDuration(s.value)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      slotDuration === s.value
                        ? 'border-teal-600 bg-teal-50 text-teal-800'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="font-bold">{s.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right: Register Off-days / Conference */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5 text-xs">
            
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span>3. Đăng ký Ngày nghỉ / Công tác</span>
            </h3>

            <p className="text-slate-500 text-[11px] leading-relaxed">
              Khi đăng ký ngày nghỉ, hệ thống sẽ <b>tự động khóa lịch khám</b> trong ngày đó, bệnh nhân sẽ không thể chọn giờ khám của bạn.
            </p>

            {/* Form add off-day */}
            <form onSubmit={handleAddOffDay} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Chọn ngày nghỉ phép / vắng mặt:</label>
                <input
                  type="date"
                  required
                  value={newOffDate}
                  onChange={(e) => setNewOffDate(e.target.value)}
                  className="w-full p-2 rounded-xl border bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lý do nghỉ:</label>
                <input
                  type="text"
                  required
                  value={newOffReason}
                  onChange={(e) => setNewOffReason(e.target.value)}
                  placeholder="Ví dụ: Công tác, Hội chẩn tuyến trên..."
                  className="w-full p-2 rounded-xl border bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                + Thêm ngày nghỉ phép
              </button>
            </form>

            {/* List of registered off-days */}
            <div className="space-y-2">
              <span className="font-bold text-slate-700">Các ngày nghỉ đã ghi nhận:</span>
              {offDays.map((od, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="font-mono font-bold text-rose-800">{od.date}</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">{od.reason}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOffDay(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
