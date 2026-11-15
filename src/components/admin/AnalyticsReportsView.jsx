import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Download, 
  Filter,
  Sparkles,
  ArrowUpRight,
  PieChart,
  Check
} from 'lucide-react';
import { MOCK_ANALYTICS } from '../../mockData';

export default function AnalyticsReportsView() {
  const [period, setPeriod] = useState('month'); // 'week' | 'month' | 'quarter'
  const data = MOCK_ANALYTICS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Cổng Giám Đốc & Quản Lý Phòng Khám
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Báo cáo Thống kê & Hiệu suất Hoạt động
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Đo lường số lượng đặt khám, tỷ lệ no-show, tỷ lệ hủy lịch và thời gian chờ trung bình để tối ưu hóa nguồn lực.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:ring-2 focus:ring-teal-500 shadow-xs"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">Tháng này (11/2026)</option>
            <option value="quarter">Quý IV / 2026</option>
          </select>

          <button
            onClick={() => alert('Đang xuất tệp báo cáo tổng hợp Excel (.xlsx)...')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng lượt đặt khám</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              +18.4%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{data.summary.totalAppointmentsMonth}</div>
          <p className="text-[10px] text-slate-500">So với tháng trước (711 ca)</p>
        </div>

        {/* Completed Rate */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Tỷ lệ khám thành công</span>
          <div className="text-3xl font-black text-emerald-800">{data.summary.completedRate}%</div>
          <p className="text-[10px] text-emerald-600">Đạt chỉ tiêu vận hành &gt; 90%</p>
        </div>

        {/* Cancellation Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tỷ lệ hủy lịch tự phục vụ</span>
          <div className="text-3xl font-black text-slate-800">{data.summary.cancellationRate}%</div>
          <p className="text-[10px] text-slate-500">Được hủy trước &gt; 2 giờ</p>
        </div>

        {/* No-show Rate */}
        <div className="bg-white p-5 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-rose-700 uppercase">Tỷ lệ vắng mặt (No-show)</span>
          <div className="text-3xl font-black text-rose-700">{data.summary.noShowRate}%</div>
          <p className="text-[10px] text-emerald-600 font-semibold">Giảm mạnh nhờ SMS nhắc 24h & 1h</p>
        </div>

        {/* Avg Wait Time */}
        <div className="bg-white p-5 rounded-3xl border border-teal-200 bg-teal-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-teal-700 uppercase">Thời gian chờ bình quân</span>
          <div className="text-3xl font-black text-teal-800">{data.summary.avgWaitTimeMinutes} phút</div>
          <p className="text-[10px] text-teal-600 font-medium">Giảm 65% so với mô hình cũ</p>
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Daily Bookings Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5 text-xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Xu hướng Đặt lịch theo Ngày trong Tuần
              </h3>
              <p className="text-[11px] text-slate-500">Số lượng bệnh nhân đặt khám phân bổ qua các ngày</p>
            </div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              Đỉnh điểm: Thứ 6 (164 ca)
            </span>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {data.dailyBookings.map((item, idx) => {
              const heightPercent = Math.round((item.count / 180) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-gradient-to-t from-teal-600 to-cyan-500 rounded-2xl group-hover:from-teal-700 group-hover:to-cyan-600 transition-all shadow-sm"
                  />
                  <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[50px]">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Department Distribution */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5 text-xs">
          
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Cơ cấu Đặt khám theo Chuyên khoa
            </h3>
            <p className="text-[11px] text-slate-500">Tỷ lệ phân bổ nhu cầu khám của người bệnh</p>
          </div>

          <div className="space-y-3.5">
            {data.departmentShare.map((dept, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{dept.name}</span>
                  <span className="font-extrabold text-slate-900">{dept.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${dept.percentage}%` }}
                    className={`h-full rounded-full ${dept.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* BA STRATEGIC INSIGHTS BOX (ĐẶC SẮC MÔN PHÂN TÍCH NGHIỆP VỤ) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 text-xs">
        <div className="flex items-center gap-2 font-bold text-teal-400 text-sm">
          <Sparkles className="w-5 h-5" />
          <span>Đánh giá hiệu quả triển khai hệ thống (Business Analysis Value Evaluation):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 text-[11px] leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <b className="text-white">1. Xóa bỏ quá tải tổng đài:</b>
            <p>Hơn 85% bệnh nhân chuyển sang tự đặt lịch 24/7 trên web/mobile, giải quyết dứt điểm thời gian chờ máy 30 phút của lễ tân.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <b className="text-white">2. Không còn sự cố trùng lịch:</b>
            <p>Cơ chế khóa slot tự động giảm tỷ lệ double-booking từ 4.2% (khi dùng sổ tay) về <b>0% tuyệt đối</b> trong suốt tháng 11.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <b className="text-white">3. Tối ưu thời gian chờ:</b>
            <p>Hàng đợi real-time và hệ thống nhắc lịch 24h & 1h giúp giảm tỷ lệ vắng mặt (no-show) từ 15% xuống chỉ còn 3.4%.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
