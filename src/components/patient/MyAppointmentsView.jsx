import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  XCircle, 
  CalendarSync, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  BellRing,
  FileText,
  ChevronRight,
  Filter,
  Sparkles,
  Stethoscope,
  Pill,
  ClipboardList,
  CalendarCheck,
  AlertTriangle
} from 'lucide-react';

// BR-04: returns true if appointment is more than 2 hours away from now
function isMoreThan2HoursAway(date, timeSlot) {
  try {
    // timeSlot format: "08:30 - 09:00" – use the start time
    const startTime = timeSlot.split(' - ')[0].trim(); // e.g. "08:30"
    const [hours, minutes] = startTime.split(':').map(Number);
    const aptDateTime = new Date(`${date}T${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:00`);
    const now = new Date();
    const diffMs = aptDateTime - now;
    return diffMs > 2 * 60 * 60 * 1000; // > 2 hours in ms
  } catch {
    return true; // fail open
  }
}

export default function MyAppointmentsView({ 
  appointments, 
  onCancelAppointment, 
  onRescheduleAppointment,
  onStartBooking 
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'cancelled'
  
  // Cancel modal state
  const [cancellingApt, setCancellingApt] = useState(null);
  const [cancelReason, setCancelReason] = useState('Bận công việc đột xuất');

  // Reschedule modal state
  const [reschedulingApt, setReschedulingApt] = useState(null);
  const [newDate, setNewDate] = useState('2026-11-16');
  const [newTimeSlot, setNewTimeSlot] = useState('14:00 - 14:30');

  // EMR view modal state (FR-16)
  const [emrViewApt, setEmrViewApt] = useState(null);

  // Filter appointments
  const upcomingList = appointments.filter(a => ['confirmed', 'checked-in', 'in-progress'].includes(a.status));
  const completedList = appointments.filter(a => a.status === 'completed');
  const cancelledList = appointments.filter(a => ['cancelled', 'no-show'].includes(a.status));

  const currentList = activeTab === 'upcoming' 
    ? upcomingList 
    : activeTab === 'completed' 
      ? completedList 
      : cancelledList;

  // Confirm cancel action
  const handleConfirmCancel = () => {
    if (!cancellingApt) return;
    onCancelAppointment(cancellingApt.id, cancelReason);
    setCancellingApt(null);
  };

  // Confirm reschedule action
  const handleConfirmReschedule = () => {
    if (!reschedulingApt) return;
    onRescheduleAppointment(reschedulingApt.id, newDate, newTimeSlot);
    setReschedulingApt(null);
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'in-progress':
        return {
          label: 'Đang trong phòng khám',
          className: 'bg-purple-100 text-purple-800 border-purple-200',
          dot: 'bg-purple-500 animate-ping'
        };
      case 'checked-in':
        return {
          label: 'Đã check-in (Đang chờ)',
          className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'confirmed':
        return {
          label: 'Đã xác nhận đặt hẹn',
          className: 'bg-teal-100 text-teal-800 border-teal-200',
          dot: 'bg-teal-500'
        };
      case 'completed':
        return {
          label: 'Đã hoàn tất khám',
          className: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
      case 'cancelled':
        return {
          label: 'Đã hủy lịch hẹn',
          className: 'bg-rose-100 text-rose-800 border-rose-200',
          dot: 'bg-rose-500'
        };
      case 'no-show':
        return {
          label: 'Không đến khám (No-show)',
          className: 'bg-orange-100 text-orange-800 border-orange-200',
          dot: 'bg-orange-500'
        };
      default:
        return { label: status, className: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Cổng Bệnh Nhân
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Lịch hẹn khám của tôi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Theo dõi tiến độ khám, quản lý và tự phục vụ đổi/hủy lịch trước giờ hẹn tối thiểu 2 giờ.
          </p>
        </div>

        <button
          onClick={onStartBooking}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Đặt thêm lịch khám mới</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'text-teal-700 font-bold border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Sắp tới</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-teal-100 text-teal-800 font-bold">
            {upcomingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'text-teal-700 font-bold border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Lịch sử khám</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
            {completedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'cancelled'
              ? 'text-teal-700 font-bold border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Đã hủy / No-show</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
            {cancelledList.length}
          </span>
        </button>
      </div>

      {/* Appointment Cards List */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-700 text-base">Không có lịch hẹn nào</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Bạn chưa có lịch hẹn nào trong danh mục này. Hãy đặt lịch trực tuyến bất cứ lúc nào bạn cần!
            </p>
            <button
              onClick={onStartBooking}
              className="mt-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Đặt lịch ngay bây giờ
            </button>
          </div>
        ) : (
          currentList.map((apt) => {
            const badge = getStatusBadge(apt.status);
            // BR-04: check if appointment is > 2 hours away
            const canModify = ['confirmed', 'checked-in'].includes(apt.status) && isMoreThan2HoursAway(apt.date, apt.timeSlot);
            const isUpcomingButTooClose = ['confirmed', 'checked-in'].includes(apt.status) && !isMoreThan2HoursAway(apt.date, apt.timeSlot);

            return (
              <div
                key={apt.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-5"
              >
                {/* Top bar of card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {apt.id}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.className}`}>
                      <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {apt.queueNumber && (
                    <div className="text-right sm:text-right">
                      <span className="text-xs text-slate-400">Số thứ tự khám: </span>
                      <span className="font-black text-teal-800 text-base">#{apt.queueNumber}</span>
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Doctor & Room */}
                  <div className="md:col-span-7 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                      <span>{apt.departmentName}</span>
                      <span>•</span>
                      <span>Phòng khám: {apt.room}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {apt.doctorName}
                    </h3>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-700">Lý do khám: </span>
                      {apt.reason}
                    </p>
                  </div>

                  {/* Right: Date & Time info box */}
                  <div className="md:col-span-5 bg-teal-50/50 rounded-2xl p-4 border border-teal-100 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-semibold">Ngày khám: </span>
                      <span className="font-bold text-slate-900">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-semibold">Khung giờ: </span>
                      <span className="font-bold text-teal-800">{apt.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <BellRing className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-[11px] text-slate-500">
                        Nhắc lịch: SMS & Email tự động (24h & 1h)
                      </span>
                    </div>
                  </div>

                </div>

                {/* EMR View button for completed appointments (FR-16) */}
                {apt.status === 'completed' && apt.diagnosis && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Khám hoàn tất – Có kết quả chẩn đoán và đơn thuốc</span>
                    </div>
                    <button
                      onClick={() => setEmrViewApt(apt)}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ClipboardList className="w-3.5 h-3.5" />
                      <span>Xem kết quả khám</span>
                    </button>
                  </div>
                )}

                {/* Bottom Actions for Upcoming Appointments (BR-04 enforced) */}
                {canModify && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Có thể hủy hoặc đổi giờ khám trước 2 giờ</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCancellingApt(apt)}
                        className="px-3.5 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Hủy lịch</span>
                      </button>

                      <button
                        onClick={() => {
                          setReschedulingApt(apt);
                          setNewDate(apt.date);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors flex items-center gap-1.5"
                      >
                        <CalendarSync className="w-3.5 h-3.5 text-slate-600" />
                        <span>Đổi ngày / giờ khác</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* BR-04: Too close to appointment – show lock message instead of buttons */}
                {isUpcomingButTooClose && (
                  <div className="pt-4 border-t border-slate-100">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <b>Không thể tự đổi/hủy:</b> Lịch hẹn còn dưới 2 giờ nữa. Vui lòng liên hệ lễ tân để được hỗ trợ.
                      </span>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL XEM KẾT QUẢ KHÁM / EMR (FR-16, READ-ONLY)              */}
      {/* ============================================================ */}
      {emrViewApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-left space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Kết quả khám bệnh</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{emrViewApt.id} • {emrViewApt.date}</p>
                </div>
              </div>
              <button
                onClick={() => setEmrViewApt(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Doctor & Department */}
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-bold text-slate-800">{emrViewApt.doctorName}</span>
              <span>•</span>
              <span>{emrViewApt.departmentName}</span>
            </div>

            {/* Diagnosis */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Chẩn đoán y khoa</span>
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {emrViewApt.diagnosis}
              </p>
            </div>

            {/* Prescription */}
            {emrViewApt.prescription && emrViewApt.prescription.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <Pill className="w-3.5 h-3.5 text-teal-600" />
                  <span>Đơn thuốc chỉ định</span>
                </div>
                <div className="space-y-2">
                  {emrViewApt.prescription.map((med, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-[11px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="text-xs">
                        <div className="font-bold text-slate-900">{med.name}</div>
                        <div className="text-slate-500 mt-0.5">{med.dosage}</div>
                        <div className="text-teal-700 font-semibold mt-0.5">SL: {med.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Doctor Notes */}
            {emrViewApt.doctorNotes && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Lời dặn của Bác sĩ</div>
                <p className="text-xs text-amber-900 italic leading-relaxed">"{emrViewApt.doctorNotes}"</p>
              </div>
            )}

            {/* Follow-up date */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><b>Lịch tái khám:</b> Tái khám sau 30 ngày</span>
            </div>

            {/* Read-only notice */}
            <p className="text-[10px] text-center text-slate-400 italic">
              Hồ sơ chỉ được xem (read-only). Bảo mật theo chuẩn y tế RBAC.
            </p>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setEmrViewApt(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL HỦY LỊCH HẸN (SELF-SERVICE CANCEL WITH REASON) */}
      {/* ============================================================ */}
      {cancellingApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-left space-y-4">
            
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <XCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Xác nhận hủy lịch hẹn?</h3>
                <p className="text-xs text-slate-500">Mã lịch hẹn: {cancellingApt.id}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Bạn đang yêu cầu hủy lịch khám với <b>{cancellingApt.doctorName}</b> vào lúc <b>{cancellingApt.timeSlot} ({cancellingApt.date})</b>. 
              Sau khi hủy, khung giờ này sẽ được giải phóng ngay lập tức trên hệ thống cho bệnh nhân khác đặt.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Lý do hủy lịch hẹn</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-rose-500"
              >
                <option>Bận công việc đột xuất</option>
                <option>Sức khỏe đã cải thiện / Khỏi bệnh</option>
                <option>Muốn đổi sang bác sĩ hoặc bệnh viện khác</option>
                <option>Lý do cá nhân khác</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setCancellingApt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Giữ lại lịch
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                Đồng ý hủy lịch
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL ĐỔI LỊCH HẸN (RESCHEDULE MODAL) */}
      {/* ============================================================ */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-left space-y-5">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <CalendarSync className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Đổi lịch khám bệnh</h3>
                <p className="text-xs text-slate-500">Bác sĩ: {reschedulingApt.doctorName}</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">1. Chọn ngày khám mới</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { date: '2026-11-16', label: 'Ngày mai (16/11)' },
                  { date: '2026-11-17', label: 'Ngày kia (17/11)' }
                ].map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setNewDate(d.date)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left ${
                      newDate === d.date ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">2. Chọn khung giờ mới còn trống</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {['08:30 - 09:00', '10:00 - 10:30', '14:00 - 14:30', '15:30 - 16:00'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setNewTimeSlot(slot)}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      newTimeSlot === slot ? 'border-teal-600 bg-teal-600 text-white font-bold' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 text-[11px] text-teal-800">
              Khi đổi lịch thành công, hệ thống sẽ tự động cập nhật lại thời gian gửi tin nhắn nhắc lịch (trước 24h & 1h) qua SMS và Email.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReschedulingApt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
              >
                Xác nhận đổi lịch
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
