import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  UserCheck, 
  Stethoscope, 
  ArrowUpRight,
  Plus,
  RefreshCw,
  QrCode,
  Phone,
  X,
  UserCog
} from 'lucide-react';
import { DOCTORS } from '../../mockData';

// Time slots for walk-in / phone booking
const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00'
];

export default function ReceptionDashboardView({ 
  appointments, 
  onQuickCheckIn, 
  onNavigateToTimetable,
  onNavigateToCheckIn 
}) {
  // Existing filters
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // New filters: booking code & phone
  const [bookingCodeFilter, setBookingCodeFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');

  // Walk-in / Phone booking modal state
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInForm, setWalkInForm] = useState({
    patientName: '',
    phone: '',
    doctorId: '',
    date: new Date().toISOString().slice(0, 10),
    timeSlot: '',
    bookingType: 'walk-in'
  });
  const [walkInSuccess, setWalkInSuccess] = useState(false);

  // Reassign doctor modal state
  const [reassignModal, setReassignModal] = useState(null); // { aptId, currentDoctorId }
  const [newDoctorId, setNewDoctorId] = useState('');
  const [reassignSuccess, setReassignSuccess] = useState(false);

  // KPI calculations
  const totalToday = appointments.length;
  const checkedInCount = appointments.filter(a => a.status === 'checked-in').length;
  const inProgressCount = appointments.filter(a => a.status === 'in-progress').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  // Multi-filter logic
  const filteredList = appointments.filter(a => {
    const matchesSearch = 
      !searchTerm ||
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patientPhone.includes(searchTerm) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBookingCode =
      !bookingCodeFilter ||
      a.id.toLowerCase().includes(bookingCodeFilter.toLowerCase());

    const matchesPhone =
      !phoneFilter ||
      (a.patientPhone && a.patientPhone.includes(phoneFilter));

    const matchesDoctor = doctorFilter === 'all' || a.doctorId === doctorFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchesSearch && matchesBookingCode && matchesPhone && matchesDoctor && matchesStatus;
  });

  // Handle walk-in form submit
  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    if (!walkInForm.patientName || !walkInForm.phone || !walkInForm.doctorId || !walkInForm.timeSlot) return;
    setWalkInSuccess(true);
    setTimeout(() => {
      setWalkInSuccess(false);
      setShowWalkInModal(false);
      setWalkInForm({ patientName: '', phone: '', doctorId: '', date: new Date().toISOString().slice(0, 10), timeSlot: '', bookingType: 'walk-in' });
    }, 1800);
  };

  // Handle reassign doctor submit
  const handleReassignSubmit = (e) => {
    e.preventDefault();
    if (!newDoctorId) return;
    setReassignSuccess(true);
    setTimeout(() => {
      setReassignSuccess(false);
      setReassignModal(null);
      setNewDoctorId('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Cổng Quản Trị & Lễ Tân
            </span>
            <span className="text-xs text-slate-400">Hôm nay: 15/11/2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Bảng điều khiển Tiếp đón (Reception Dashboard)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Giám sát luồng bệnh nhân thời gian thực, điều phối check-in và hỗ trợ đặt lịch nhanh không bị trùng giờ.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Walk-in / Phone Booking Button (FR-09) */}
          <button
            onClick={() => setShowWalkInModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo lịch walk-in / điện thoại</span>
          </button>

          <button
            onClick={onNavigateToCheckIn}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Màn hình Quét QR Check-in</span>
          </button>

          <button
            onClick={onNavigateToTimetable}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Xem Lịch tổng hợp Bác sĩ</span>
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Tổng lịch hẹn</span>
          <div className="text-2xl font-black text-slate-900">{totalToday}</div>
          <p className="text-[10px] text-slate-500">Trong ngày hôm nay</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-teal-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-teal-700 uppercase">Chờ đến giờ</span>
          <div className="text-2xl font-black text-teal-700">{confirmedCount}</div>
          <p className="text-[10px] text-teal-600">Chưa đến quầy</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-300 bg-emerald-50/20 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-emerald-700 uppercase">Đã Check-in</span>
          <div className="text-2xl font-black text-emerald-700">{checkedInCount}</div>
          <p className="text-[10px] text-emerald-600">Đang chờ tại sảnh</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 bg-purple-50/20 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-purple-700 uppercase">Đang khám</span>
          <div className="text-2xl font-black text-purple-700">{inProgressCount}</div>
          <p className="text-[10px] text-purple-600">Trong phòng bác sĩ</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Đã hoàn tất</span>
          <div className="text-2xl font-black text-slate-700">{completedCount}</div>
          <p className="text-[10px] text-slate-400">Đã nhận đơn thuốc</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-rose-700 uppercase">Đã hủy / Vắng</span>
          <div className="text-2xl font-black text-rose-700">{cancelledCount}</div>
          <p className="text-[10px] text-rose-600">Đã giải phóng slot</p>
        </div>

      </div>

      {/* FILTER & SEARCH BAR (Multi-filter) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        
        {/* Row 1: Text search + Booking code + Phone filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* General search */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên bệnh nhân, SĐT, mã hẹn..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Booking code filter */}
          <div className="relative w-full sm:w-56">
            <Filter className="w-3.5 h-3.5 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={bookingCodeFilter}
              onChange={(e) => setBookingCodeFilter(e.target.value)}
              placeholder="Lọc theo mã đặt lịch..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-indigo-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50/40"
            />
          </div>

          {/* Phone number filter */}
          <div className="relative w-full sm:w-52">
            <Phone className="w-3.5 h-3.5 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={phoneFilter}
              onChange={(e) => setPhoneFilter(e.target.value)}
              placeholder="Lọc theo số điện thoại..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-teal-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/40"
            />
          </div>
        </div>

        {/* Row 2: Doctor & Status dropdowns */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:block">Lọc nhanh:</span>

          {/* Filter Doctor */}
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 bg-white"
          >
            <option value="all">Tất cả bác sĩ</option>
            {DOCTORS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 bg-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="confirmed">Chờ đến (Confirmed)</option>
            <option value="checked-in">Đã Check-in</option>
            <option value="in-progress">Đang khám</option>
            <option value="completed">Đã khám xong</option>
            <option value="cancelled">Đã hủy</option>
          </select>

          {/* Clear all filters */}
          {(searchTerm || bookingCodeFilter || phoneFilter || doctorFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setBookingCodeFilter(''); setPhoneFilter(''); setDoctorFilter('all'); setStatusFilter('all'); }}
              className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors"
            >
              <X className="w-3 h-3" /> Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Result count */}
        <div className="text-[11px] text-slate-500">
          Hiển thị <span className="font-bold text-slate-800">{filteredList.length}</span> / {totalToday} lịch hẹn
        </div>

        {/* APPOINTMENT TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Mã lịch hẹn</th>
                <th className="py-3 px-4">Bệnh nhân & SĐT</th>
                <th className="py-3 px-4">Bác sĩ phụ trách</th>
                <th className="py-3 px-4">Khung giờ</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                    Không tìm thấy lịch hẹn phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              )}
              {filteredList.map((apt) => {
                return (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* STT */}
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      #{apt.queueNumber || '-'}
                    </td>

                    {/* Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-800">
                      {apt.id}
                    </td>

                    {/* Patient */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">{apt.patientName}</div>
                      <div className="text-[11px] text-slate-400">{apt.patientPhone}</div>
                    </td>

                    {/* Doctor */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{apt.doctorName}</div>
                      <div className="text-[10px] text-teal-700">{apt.departmentName} • {apt.room}</div>
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{apt.timeSlot}</div>
                      <div className="text-[10px] text-slate-400">{apt.date}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {apt.status === 'confirmed' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                          Chờ đến
                        </span>
                      )}
                      {apt.status === 'checked-in' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Đã Check-in</span>
                        </span>
                      )}
                      {apt.status === 'in-progress' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                          <span>Đang khám</span>
                        </span>
                      )}
                      {apt.status === 'completed' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                          Đã khám
                        </span>
                      )}
                      {apt.status === 'cancelled' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Đã hủy
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Đổi BS button – always visible for active appointments */}
                        {!['completed', 'cancelled'].includes(apt.status) && (
                          <button
                            onClick={() => { setReassignModal({ aptId: apt.id, currentDoctorId: apt.doctorId }); setNewDoctorId(''); }}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[11px] border border-amber-200 transition-colors flex items-center gap-1"
                          >
                            <UserCog className="w-3 h-3" />
                            Đổi BS
                          </button>
                        )}

                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => onQuickCheckIn(apt.id)}
                            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] transition-colors"
                          >
                            Check-in ngay
                          </button>
                        )}
                        {apt.status === 'checked-in' && (
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            Đang trong hàng đợi
                          </span>
                        )}
                        {apt.status === 'in-progress' && (
                          <span className="text-[11px] text-purple-700 font-semibold">
                            Bác sĩ đang tiếp đón
                          </span>
                        )}
                        {['completed', 'cancelled'].includes(apt.status) && (
                          <span className="text-[11px] text-slate-400">
                            Hoàn tất
                          </span>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* ===== WALK-IN / PHONE BOOKING MODAL (FR-09) ===== */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex items-center gap-2 text-white">
                <Plus className="w-5 h-5" />
                <h2 className="font-extrabold text-sm">Tạo lịch Walk-in / Điện thoại</h2>
              </div>
              <button onClick={() => setShowWalkInModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWalkInSubmit} className="p-6 space-y-4 text-xs">
              {/* Booking type */}
              <div className="flex gap-3">
                {['walk-in', 'phone'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWalkInForm(f => ({ ...f, bookingType: type }))}
                    className={`flex-1 py-2.5 rounded-xl font-bold border text-xs transition-all ${
                      walkInForm.bookingType === type
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {type === 'walk-in' ? '🚶 Walk-in (Đến trực tiếp)' : '📞 Điện thoại'}
                  </button>
                ))}
              </div>

              {/* Patient name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên bệnh nhân <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={walkInForm.patientName}
                  onChange={e => setWalkInForm(f => ({ ...f, patientName: e.target.value }))}
                  placeholder="Nhập họ và tên đầy đủ..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại <span className="text-rose-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={walkInForm.phone}
                  onChange={e => setWalkInForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="VD: 0901234567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs"
                />
              </div>

              {/* Doctor selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chọn bác sĩ <span className="text-rose-500">*</span></label>
                <select
                  required
                  value={walkInForm.doctorId}
                  onChange={e => setWalkInForm(f => ({ ...f, doctorId: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs bg-white"
                >
                  <option value="">-- Chọn bác sĩ --</option>
                  {DOCTORS.map(d => (
                    <option key={d.id} value={d.id}>{d.name} – {d.departmentName}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Ngày khám <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  required
                  value={walkInForm.date}
                  onChange={e => setWalkInForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs"
                />
              </div>

              {/* Time slot selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-2">Khung giờ <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setWalkInForm(f => ({ ...f, timeSlot: slot }))}
                      className={`py-2 rounded-xl font-bold border text-[11px] transition-all ${
                        walkInForm.timeSlot === slot
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Success state */}
              {walkInSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-center text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Đã tạo lịch thành công! Mã: WI-{Date.now().toString().slice(-6)}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWalkInModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={walkInSuccess}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20 transition-all disabled:opacity-60"
                >
                  Xác nhận tạo lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== REASSIGN DOCTOR MODAL ===== */}
      {reassignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-500 to-orange-500">
              <div className="flex items-center gap-2 text-white">
                <UserCog className="w-5 h-5" />
                <h2 className="font-extrabold text-sm">Đổi Bác sĩ Phụ trách</h2>
              </div>
              <button onClick={() => setReassignModal(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReassignSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
                <span className="font-bold">Mã lịch hẹn:</span> {reassignModal.aptId}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bác sĩ mới <span className="text-rose-500">*</span></label>
                <select
                  required
                  value={newDoctorId}
                  onChange={e => setNewDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs bg-white"
                >
                  <option value="">-- Chọn bác sĩ thay thế --</option>
                  {DOCTORS.filter(d => d.id !== reassignModal.currentDoctorId).map(d => (
                    <option key={d.id} value={d.id}>{d.name} – {d.departmentName}</option>
                  ))}
                </select>
              </div>

              {reassignSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-center text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Đã chuyển bác sĩ thành công!
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setReassignModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={reassignSuccess}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-60"
                >
                  Xác nhận đổi BS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
