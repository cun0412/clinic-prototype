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
  Check,
  Stethoscope,
  DollarSign,
  FileText,
  ChevronDown
} from 'lucide-react';
import { MOCK_ANALYTICS, DEPARTMENTS, DOCTORS } from '../../mockData';

// Mock data for doctor workload table (5 doctors)
const DOCTOR_WORKLOAD = [
  {
    name: 'BS.CKII Nguyễn Văn An',
    department: 'Nội Tổng Quát',
    totalSlots: 120,
    filled: 112,
    utilization: 93.3,
    completed: 108,
    cancelled: 4,
    noShow: 2,
    avgWait: 11,
    trend: '+5%',
    trendUp: true
  },
  {
    name: 'ThS.BS Trần Thị Mai Hương',
    department: 'Nhi Khoa',
    totalSlots: 100,
    filled: 97,
    utilization: 97.0,
    completed: 93,
    cancelled: 2,
    noShow: 2,
    avgWait: 9,
    trend: '+12%',
    trendUp: true
  },
  {
    name: 'PGS.TS Lê Hoàng Dũng',
    department: 'Tim Mạch',
    totalSlots: 80,
    filled: 68,
    utilization: 85.0,
    completed: 65,
    cancelled: 3,
    noShow: 3,
    avgWait: 15,
    trend: '-2%',
    trendUp: false
  },
  {
    name: 'BS Phạm Thùy Linh',
    department: 'Da Liễu & Thẩm Mỹ',
    totalSlots: 90,
    filled: 87,
    utilization: 96.7,
    completed: 84,
    cancelled: 1,
    noShow: 2,
    avgWait: 8,
    trend: '+8%',
    trendUp: true
  },
  {
    name: 'BS Hoàng Minh Tuấn',
    department: 'Tai Mũi Họng',
    totalSlots: 70,
    filled: 56,
    utilization: 80.0,
    completed: 52,
    cancelled: 2,
    noShow: 4,
    avgWait: 18,
    trend: '-1%',
    trendUp: false
  }
];

// Revenue mock data
const REVENUE_DATA = {
  gross: 294500000,
  insurance: 180400000,
  net: 114100000
};

const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);

export default function AnalyticsReportsView() {
  const [period, setPeriod] = useState('month'); // 'week' | 'month' | 'quarter'
  const [deptFilter, setDeptFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const data = MOCK_ANALYTICS;

  // Filter workload table
  const filteredWorkload = DOCTOR_WORKLOAD.filter(d => {
    const matchesDept = deptFilter === 'all' || d.department === deptFilter;
    const matchesDoctor = doctorFilter === 'all' || d.name === doctorFilter;
    return matchesDept && matchesDoctor;
  });

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

        <div className="flex flex-wrap items-center gap-3">
          {/* Period selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:ring-2 focus:ring-teal-500 shadow-xs"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">Tháng này (11/2026)</option>
            <option value="quarter">Quý IV / 2026</option>
          </select>

          {/* Department filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:ring-2 focus:ring-teal-500 shadow-xs"
          >
            <option value="all">Tất cả chuyên khoa</option>
            {DEPARTMENTS.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          {/* Doctor filter */}
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:ring-2 focus:ring-teal-500 shadow-xs"
          >
            <option value="all">Tất cả bác sĩ</option>
            {DOCTOR_WORKLOAD.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>

          {/* PDF Export button */}
          <button
            onClick={() => alert('Đang xuất tệp báo cáo PDF...')}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs shadow-xs transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Xuất PDF</span>
          </button>

          {/* Excel Export button */}
          <button
            onClick={() => alert('Đang xuất tệp báo cáo tổng hợp Excel (.xlsx)...')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS OVERVIEW – 6 cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* KPI 1: Total Bookings */}
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

        {/* KPI 2: Completed Rate */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Tỷ lệ khám thành công</span>
          <div className="text-3xl font-black text-emerald-800">{data.summary.completedRate}%</div>
          <p className="text-[10px] text-emerald-600">Đạt chỉ tiêu vận hành &gt; 90%</p>
        </div>

        {/* KPI 3: Cancellation Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tỷ lệ hủy lịch tự phục vụ</span>
          <div className="text-3xl font-black text-slate-800">{data.summary.cancellationRate}%</div>
          <p className="text-[10px] text-slate-500">Được hủy trước &gt; 2 giờ</p>
        </div>

        {/* KPI 4: No-show Rate */}
        <div className="bg-white p-5 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-rose-700 uppercase">Tỷ lệ vắng mặt (No-show)</span>
          <div className="text-3xl font-black text-rose-700">{data.summary.noShowRate}%</div>
          <p className="text-[10px] text-emerald-600 font-semibold">Giảm mạnh nhờ SMS nhắc 24h & 1h</p>
        </div>

        {/* KPI 5: Avg Wait Time */}
        <div className="bg-white p-5 rounded-3xl border border-teal-200 bg-teal-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-teal-700 uppercase">Thời gian chờ bình quân</span>
          <div className="text-3xl font-black text-teal-800">{data.summary.avgWaitTimeMinutes} phút</div>
          <p className="text-[10px] text-teal-600 font-medium">Giảm 65% so với mô hình cũ</p>
        </div>

        {/* KPI 6 (NEW): Doctor Workload Utilization */}
        <div className="bg-white p-5 rounded-3xl border border-indigo-200 bg-indigo-50/20 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-indigo-700 uppercase">Hiệu suất bác sĩ</span>
          <div className="text-3xl font-black text-indigo-800">90.4%</div>
          <p className="text-[10px] text-indigo-600 font-medium">Trung bình slot đã lấp đầy</p>
        </div>

      </div>

      {/* REVENUE SECTION (KPI 6 detail) */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white">
        <div className="flex items-center gap-2 mb-5">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h3 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wide">
            Doanh thu Thu tiền Khám (Tháng 11/2026)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gross revenue */}
          <div className="p-5 rounded-2xl bg-slate-700/60 border border-slate-600 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng phí khám (Gross)</span>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatVND(REVENUE_DATA.gross)}
            </div>
            <p className="text-[11px] text-slate-400">Tổng phí trước khi trừ bảo hiểm</p>
          </div>

          {/* Insurance covered */}
          <div className="p-5 rounded-2xl bg-blue-900/40 border border-blue-700/40 space-y-2">
            <span className="text-[10px] font-bold text-blue-300 uppercase">Bảo hiểm chi trả (Mô phỏng)</span>
            <div className="text-xl sm:text-2xl font-black text-blue-300">
              {formatVND(REVENUE_DATA.insurance)}
            </div>
            <p className="text-[11px] text-blue-400/80">Phần BHYT thanh toán cho phòng khám</p>
          </div>

          {/* Net revenue */}
          <div className="p-5 rounded-2xl bg-emerald-900/40 border border-emerald-500/40 space-y-2">
            <span className="text-[10px] font-bold text-emerald-300 uppercase">Doanh thu thực thu (Net)</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300">
              {formatVND(REVENUE_DATA.net)}
            </div>
            <p className="text-[11px] text-emerald-400/80">Gross − Bảo hiểm = Tiền mặt thực thu</p>
          </div>
        </div>

        {/* Revenue progress bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Tỷ lệ bảo hiểm / gross revenue</span>
            <span className="font-bold text-blue-300">
              {((REVENUE_DATA.insurance / REVENUE_DATA.gross) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-700 overflow-hidden">
            <div
              style={{ width: `${(REVENUE_DATA.insurance / REVENUE_DATA.gross) * 100}%` }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
            />
          </div>
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

      {/* DOCTOR WORKLOAD TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Stethoscope className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">
                Bảng Hiệu suất Bác sĩ (Doctor Workload Utilization)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">Tỷ lệ lấp đầy slot, tỷ lệ hoàn tất và thời gian chờ bình quân theo bác sĩ</p>
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            {filteredWorkload.length} bác sĩ
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Bác sĩ</th>
                <th className="py-3 px-4">Chuyên khoa</th>
                <th className="py-3 px-4 text-center">Tổng slot</th>
                <th className="py-3 px-4 text-center">Đã lấp đầy</th>
                <th className="py-3 px-4 text-center">Hiệu suất (%)</th>
                <th className="py-3 px-4 text-center">Hoàn tất</th>
                <th className="py-3 px-4 text-center">Hủy / Vắng</th>
                <th className="py-3 px-4 text-center">T.gian chờ</th>
                <th className="py-3 px-4 text-center">Xu hướng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkload.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-400 text-xs">
                    Không có dữ liệu phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
              {filteredWorkload.map((doc, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900">{doc.name}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {doc.department}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{doc.totalSlots}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">{doc.filled}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`font-black text-sm ${doc.utilization >= 90 ? 'text-emerald-700' : doc.utilization >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {doc.utilization.toFixed(1)}%
                      </span>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden max-w-[80px]">
                        <div
                          style={{ width: `${doc.utilization}%` }}
                          className={`h-full rounded-full ${doc.utilization >= 90 ? 'bg-emerald-500' : doc.utilization >= 80 ? 'bg-amber-400' : 'bg-rose-400'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-slate-800">{doc.completed}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-rose-600 font-semibold">{doc.cancelled}</span>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-amber-600 font-semibold">{doc.noShow}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                    {doc.avgWait} phút
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                      doc.trendUp
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {doc.trendUp ? '↑' : '↓'} {doc.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary row */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center gap-6 text-[11px] text-slate-500 flex-wrap">
          <span>✅ Hiệu suất &ge; 90%: <strong className="text-emerald-700">{DOCTOR_WORKLOAD.filter(d => d.utilization >= 90).length} BS</strong></span>
          <span>⚠️ Cần cải thiện (&lt;90%): <strong className="text-amber-700">{DOCTOR_WORKLOAD.filter(d => d.utilization < 90).length} BS</strong></span>
          <span>Trung bình toàn phòng khám: <strong className="text-indigo-700">90.4%</strong></span>
        </div>
      </div>

      {/* BA STRATEGIC INSIGHTS BOX */}
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
