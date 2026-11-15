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
  QrCode
} from 'lucide-react';
import { DOCTORS } from '../../mockData';

export default function ReceptionDashboardView({ 
  appointments, 
  onQuickCheckIn, 
  onNavigateToTimetable,
  onNavigateToCheckIn 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // KPI calculations
  const totalToday = appointments.length;
  const checkedInCount = appointments.filter(a => a.status === 'checked-in').length;
  const inProgressCount = appointments.filter(a => a.status === 'in-progress').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  // Filtered list
  const filteredList = appointments.filter(a => {
    const matchesSearch = 
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patientPhone.includes(searchTerm) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDoctor = doctorFilter === 'all' || a.doctorId === doctorFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchesSearch && matchesDoctor && matchesStatus;
  });

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
        <div className="flex items-center gap-3">
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

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên bệnh nhân, SĐT, mã hẹn..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            
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

          </div>

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
              {filteredList.map((apt) => {
                const isCheckedIn = apt.status === 'checked-in';
                const isInProgress = apt.status === 'in-progress';
                const isCompleted = apt.status === 'completed';

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
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
