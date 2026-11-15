import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  UserPlus, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  User, 
  Stethoscope,
  Info,
  CalendarCheck
} from 'lucide-react';
import { DOCTORS, TIME_SLOTS } from '../../mockData';

export default function StaffTimetableView({ appointments, onAddAppointment }) {
  const [selectedDate, setSelectedDate] = useState('2026-11-15');
  
  // Proxy Booking Modal State
  const [showProxyModal, setShowProxyModal] = useState(false);
  const [proxyDoctorId, setProxyDoctorId] = useState('doc-1');
  const [proxyTimeSlot, setProxyTimeSlot] = useState('09:00 - 09:30'); // Default to conflicting slot to demonstrate validation!
  const [proxyPatientName, setProxyPatientName] = useState('Bệnh nhân gọi điện: Lê Văn C');
  const [proxyPatientPhone, setProxyPatientPhone] = useState('0912 999 888');
  const [proxyReason, setProxyReason] = useState('Đau đầu, chóng mặt khi đổi tư thế');

  // Find if slot is conflicted
  const conflictedAppointment = appointments.find(
    a => a.doctorId === proxyDoctorId && 
         a.date === selectedDate && 
         a.timeSlot === proxyTimeSlot && 
         a.status !== 'cancelled'
  );

  const isSlotConflicted = Boolean(conflictedAppointment);

  const handleCreateProxyBooking = (e) => {
    e.preventDefault();
    if (isSlotConflicted) return;

    const doctor = DOCTORS.find(d => d.id === proxyDoctorId);

    const newApt = {
      id: `APT-${selectedDate.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      patientName: proxyPatientName,
      patientPhone: proxyPatientPhone,
      patientEmail: 'proxy.patient@gmail.com',
      patientDob: '1990-01-01',
      gender: 'Nam',
      emrCode: 'EMR-NEW',
      doctorId: doctor.id,
      doctorName: doctor.name,
      departmentName: doctor.departmentName,
      date: selectedDate,
      timeSlot: proxyTimeSlot,
      room: doctor.room,
      fee: doctor.fee,
      status: 'confirmed',
      queueNumber: appointments.filter(a => a.date === selectedDate).length + 1,
      reason: proxyReason,
      createdAt: '2026-11-15 08:45 (Tạo bởi Lễ tân)',
      reminder24hSent: true,
      reminder1hSent: true,
      channel: 'SMS'
    };

    onAddAppointment(newApt);
    setShowProxyModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Điều phối phòng khám
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Lịch tổng hợp theo Bác sĩ (Timetable Grid)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Xem lịch trực của toàn bộ bác sĩ theo khung giờ, hỗ trợ đặt lịch hộ qua điện thoại và chặn trùng lịch tự động.
          </p>
        </div>

        {/* Action Button: Book for phone caller */}
        <button
          onClick={() => setShowProxyModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Đặt lịch hẹn hộ (Bệnh nhân gọi điện / Đến quầy)</span>
        </button>
      </div>

      {/* Date Switcher */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="text-slate-500">Xem ngày:</span>
        {['2026-11-15', '2026-11-16', '2026-11-17'].map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDate(d)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              selectedDate === d
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {d === '2026-11-15' ? 'Hôm nay (15/11)' : d === '2026-11-16' ? 'Ngày mai (16/11)' : d}
          </button>
        ))}
      </div>

      {/* TIMETABLE GRID MATRIX */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            
            {/* Header: Doctors */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 w-28 font-bold text-slate-400 uppercase text-[10px] border-r border-slate-200 sticky left-0 bg-slate-50 z-10">
                  Khung giờ
                </th>
                {DOCTORS.map((doc) => (
                  <th key={doc.id} className="p-4 min-w-[200px] border-r border-slate-100 last:border-r-0">
                    <div className="font-bold text-slate-900 text-xs">{doc.name}</div>
                    <div className="text-[10px] text-teal-700 font-medium">{doc.departmentName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{doc.room}</div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body: Time slots */}
            <tbody className="divide-y divide-slate-100">
              {TIME_SLOTS.map((slot) => (
                <tr key={slot} className="hover:bg-slate-50/50">
                  
                  {/* Slot Time */}
                  <td className="p-3 font-mono font-bold text-[11px] text-slate-600 bg-slate-50/80 border-r border-slate-200 sticky left-0 z-10">
                    {slot}
                  </td>

                  {/* Doctor Cells */}
                  {DOCTORS.map((doc) => {
                    const apt = appointments.find(
                      a => a.doctorId === doc.id && 
                           a.date === selectedDate && 
                           a.timeSlot === slot && 
                           a.status !== 'cancelled'
                    );

                    return (
                      <td key={doc.id} className="p-2 border-r border-slate-100 last:border-r-0 align-top">
                        {apt ? (
                          <div className={`p-2.5 rounded-xl border text-[11px] space-y-1 transition-all ${
                            apt.status === 'in-progress'
                              ? 'bg-purple-50 border-purple-200 text-purple-950 font-medium'
                              : apt.status === 'checked-in'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium'
                                : 'bg-teal-50/80 border-teal-200 text-teal-950'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 truncate max-w-[120px]">{apt.patientName}</span>
                              <span className="font-mono text-[9px] text-slate-500 font-bold">#{apt.queueNumber}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">{apt.patientPhone}</div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[9px]">
                              <span className="capitalize font-semibold text-teal-700">{apt.status}</span>
                              <span className="font-mono text-slate-400">{apt.id}</span>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => {
                              setProxyDoctorId(doc.id);
                              setProxyTimeSlot(slot);
                              setShowProxyModal(true);
                            }}
                            className="h-14 rounded-xl border border-dashed border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer flex items-center justify-center text-slate-300 hover:text-teal-600 transition-all text-[11px] font-semibold gap-1"
                            title="Bấm để đặt lịch hộ cho bệnh nhân"
                          >
                            <span>+ Trống</span>
                          </div>
                        )}
                      </td>
                    );
                  })}

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL TẠO LỊCH HỘ & CHẶN TRÙNG LỊCH REAL-TIME (SCREEN 9) */}
      {/* ============================================================ */}
      {showProxyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-left space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Tạo lịch hẹn hộ Bệnh nhân</h3>
                  <p className="text-xs text-slate-400">Dành cho cuộc gọi điện thoại hoặc đăng ký trực tiếp tại quầy</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProxyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProxyBooking} className="space-y-4">
              
              {/* Doctor and Time Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Bác sĩ khám</label>
                  <select
                    value={proxyDoctorId}
                    onChange={(e) => setProxyDoctorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
                  >
                    {DOCTORS.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.departmentName})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Khung giờ hẹn</label>
                  <select
                    value={proxyTimeSlot}
                    onChange={(e) => setProxyTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
                  >
                    {TIME_SLOTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CRITICAL BUSINESS RULE ALERT: DOUBLE-BOOKING DETECTION (PROBLEM 2) */}
              {isSlotConflicted ? (
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs space-y-2 animate-in shake">
                  <div className="flex items-center gap-2 font-black text-rose-700 text-sm">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>🚫 BỊ CHẶN: PHÁT HIỆN TRÙNG LỊCH KHÁM!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Khung giờ <b>{proxyTimeSlot}</b> của bác sĩ đã được đặt trước bởi bệnh nhân: 
                    <span className="font-bold underline ml-1">{conflictedAppointment.patientName}</span> ({conflictedAppointment.patientPhone}).
                  </p>
                  <p className="text-[10px] text-rose-700 font-semibold bg-white/70 p-2 rounded-lg border border-rose-200">
                    💡 Hệ thống tự động khóa để bảo đảm không xảy ra sự cố trùng 2 người 1 giờ như khi ghi sổ tay. Vui lòng chọn khung giờ trống khác!
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Khung giờ <b>{proxyTimeSlot}</b> đang trống và hợp lệ để đặt lịch.</span>
                </div>
              )}

              {/* Patient Info */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tên bệnh nhân *</label>
                <input
                  type="text"
                  required
                  value={proxyPatientName}
                  onChange={(e) => setProxyPatientName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Số điện thoại bệnh nhân (nhận SMS nhắc lịch) *</label>
                <input
                  type="tel"
                  required
                  value={proxyPatientPhone}
                  onChange={(e) => setProxyPatientPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Lý do khám bệnh</label>
                <input
                  type="text"
                  value={proxyReason}
                  onChange={(e) => setProxyReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProxyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSlotConflicted}
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white transition-all ${
                    isSlotConflicted
                      ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                      : 'bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-500/20'
                  }`}
                >
                  Xác nhận lưu lịch hẹn
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
