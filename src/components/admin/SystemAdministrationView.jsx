import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  FileText, 
  Lock, 
  Unlock, 
  UserPlus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Bell, 
  Building2, 
  Sliders, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Key,
  ShieldAlert,
  Save,
  Check
} from 'lucide-react';

export default function SystemAdministrationView() {
  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' | 'config' | 'audit'

  // --- 1. Staff Accounts & RBAC State (FR-18, NFR-01) ---
  const [staffAccounts, setStaffAccounts] = useState([
    { id: 'STF-001', name: 'Nguyễn Văn Bình', email: 'binh.admin@mediflow.vn', role: 'System Administrator', dept: 'IT & Quản trị', status: 'active', lastLogin: '16/11/2026 01:42' },
    { id: 'STF-002', name: 'BS.CKII Nguyễn Văn An', email: 'an.nv@mediflow.vn', role: 'Doctor', dept: 'Nội Tổng Quát', status: 'active', lastLogin: '15/11/2026 17:30' },
    { id: 'STF-003', name: 'Lê Thị Thu Hồng', email: 'hong.reception@mediflow.vn', role: 'Receptionist', dept: 'Quầy Lễ tân & Đón tiếp', status: 'active', lastLogin: '16/11/2026 01:15' },
    { id: 'STF-004', name: 'Trần Thị Mai Lan', email: 'lan.nurse@mediflow.vn', role: 'Nurse / Triage', dept: 'Phòng Điều dưỡng', status: 'active', lastLogin: '15/11/2026 16:45' },
    { id: 'STF-005', name: 'Vũ Đình Khoa', email: 'khoa.vd@mediflow.vn', role: 'Receptionist', dept: 'Quầy Thu ngân & Đón tiếp', status: 'locked', lastLogin: '14/11/2026 09:20' }
  ]);

  const [accountSearch, setAccountSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'Receptionist',
    dept: 'Quầy Lễ tân & Đón tiếp'
  });

  // Toggle Lock/Unlock staff account
  const handleToggleAccountStatus = (id) => {
    setStaffAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const nextStatus = acc.status === 'active' ? 'locked' : 'active';
        return { ...acc, status: nextStatus };
      }
      return acc;
    }));
  };

  // Add new staff account
  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;
    const newAcc = {
      id: `STF-00${staffAccounts.length + 1}`,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      dept: newUserData.dept,
      status: 'active',
      lastLogin: 'Chưa đăng nhập'
    };
    setStaffAccounts([newAcc, ...staffAccounts]);
    setIsAddUserModalOpen(false);
    setNewUserData({ name: '', email: '', role: 'Receptionist', dept: 'Quầy Lễ tân & Đón tiếp' });
  };

  // --- 2. System & Business Rules Configuration State (BR-02) ---
  const [configSettings, setConfigSettings] = useState({
    slotDurationMinutes: 30,
    maxPatientsPerSlot: 1,
    bufferTimeMinutes: 5,
    enableDoubleBookingBlock: true,
    reminder24hEnabled: true,
    reminder1hEnabled: true,
    reminderChannels: ['sms', 'email'],
    autoCancelUncheckedMinutes: 30,
    departments: [
      { id: 'D01', name: 'Nội Tổng Quát', room: 'Phòng 201 - Nhà A', status: 'active' },
      { id: 'D02', name: 'Nhi Khoa', room: 'Phòng 105 - Nhà B', status: 'active' },
      { id: 'D03', name: 'Tim Mạch', room: 'Phòng 304 - Nhà A', status: 'active' },
      { id: 'D04', name: 'Tai Mũi Họng', room: 'Phòng 102 - Nhà A', status: 'active' },
      { id: 'D05', name: 'Da Liễu & Thẩm Mỹ', room: 'Phòng 401 - Nhà B', status: 'active' },
      { id: 'D06', name: 'Sản Phụ Khoa', room: 'Phòng 205 - Nhà B', status: 'active' }
    ]
  });
  const [configSavedToast, setConfigSavedToast] = useState(false);

  const handleSaveConfig = () => {
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 3000);
  };

  // --- 3. Security Audit Logs State (NFR-03) ---
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-8819', timestamp: '16/11/2026 01:42:15', actor: 'binh.admin@mediflow.vn', ip: '192.168.1.10', action: 'ADMIN_LOGIN_SUCCESS', level: 'INFO', details: 'Quản trị viên đăng nhập thành công qua xác thực 2 lớp (2FA).' },
    { id: 'LOG-8818', timestamp: '16/11/2026 01:30:00', actor: 'SYSTEM_SCHEDULER', ip: '127.0.0.1', action: 'DISPATCH_REMINDER_JOB', level: 'SUCCESS', details: 'Job tự động phát gửi 24 thông báo nhắc hẹn trước 24h qua SMS Brandname & Email.' },
    { id: 'LOG-8817', timestamp: '16/11/2026 01:15:22', actor: 'hong.reception@mediflow.vn', ip: '192.168.1.25', action: 'CHECKIN_EXECUTE', level: 'INFO', details: 'Quét QR check-in thành công cho lịch hẹn APT-20261115-003 (BN: Nguyễn Tiến Dũng).' },
    { id: 'LOG-8816', timestamp: '16/11/2026 00:58:10', actor: 'UNKNOWN_CLIENT', ip: '14.162.180.44', action: 'FAILED_LOGIN_ALERT', level: 'WARNING', details: 'Phát hiện 3 lần đăng nhập sai mật khẩu liên tiếp vào tài khoản khoa.vd@mediflow.vn.' },
    { id: 'LOG-8815', timestamp: '16/11/2026 00:55:00', actor: 'binh.admin@mediflow.vn', ip: '192.168.1.10', action: 'ACCOUNT_LOCKED', level: 'SECURITY', details: 'Khóa tài khoản nhân viên STF-005 (Vũ Đình Khoa) do nghi vấn vi phạm chính sách bảo mật.' },
    { id: 'LOG-8814', timestamp: '15/11/2026 23:40:12', actor: 'PATIENT_PORTAL', ip: '118.70.12.9', action: 'BHYT_VERIFICATION', level: 'SUCCESS', details: 'Tra cứu xác thực thành công thẻ BHYT SV4010203040503 với Cổng BHXH điện tử (Mức hưởng 80%).' },
    { id: 'LOG-8813', timestamp: '15/11/2026 22:10:45', actor: 'an.nv@mediflow.vn', ip: '192.168.1.18', action: 'EMR_DIAGNOSIS_SAVE', level: 'INFO', details: 'Bác sĩ lưu chẩn đoán ICD-10 và kê đơn thuốc cho mã khám APT-20261115-001.' }
  ]);
  const [logFilterLevel, setLogFilterLevel] = useState('ALL');

  const filteredLogs = auditLogs.filter(log => {
    if (logFilterLevel === 'ALL') return true;
    return log.level === logFilterLevel;
  });

  const filteredAccounts = staffAccounts.filter(acc => {
    const matchSearch = acc.name.toLowerCase().includes(accountSearch.toLowerCase()) || 
                        acc.email.toLowerCase().includes(accountSearch.toLowerCase()) ||
                        acc.id.toLowerCase().includes(accountSearch.toLowerCase());
    const matchRole = roleFilter === 'all' || acc.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Cổng Quản Trị Hệ Thống
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Quản Trị Hệ Thống & Bảo Mật Vận Hành
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Phân quyền vai trò người dùng, quản lý tài khoản nhân viên, cấu hình tham số thời lượng khám, mốc gửi thông báo nhắc lịch và giám sát nhật ký an ninh hệ thống.
          </p>
        </div>

        {/* Action badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hệ thống Bảo mật ISO/IEC 27001</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('accounts')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-2 shrink-0 ${
            activeTab === 'accounts'
              ? 'text-teal-700 font-bold border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Tài khoản nhân viên & Phân quyền</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-teal-100 text-teal-800 font-bold">
            {staffAccounts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-2 shrink-0 ${
            activeTab === 'config'
              ? 'text-teal-700 font-bold border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Cấu hình tham số vận hành</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-2 shrink-0 ${
            activeTab === 'audit'
              ? 'text-teal-700 font-bold border-b-2 border-teal-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Nhật ký an ninh & Audit logs</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 text-amber-800 font-bold">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* TAB 1: STAFF ACCOUNTS & RBAC (FR-18, NFR-01) */}
      {activeTab === 'accounts' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Tìm nhân viên theo tên, email, mã số..." 
                value={accountSearch}
                onChange={(e) => setAccountSearch(e.target.value)}
                className="bg-transparent text-xs text-slate-800 outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 outline-none"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="System Administrator">Quản trị viên (Admin)</option>
                <option value="Doctor">Bác sĩ khám (Doctor)</option>
                <option value="Receptionist">Lễ tân (Receptionist)</option>
                <option value="Nurse / Triage">Điều dưỡng (Nurse)</option>
              </select>

              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>Thêm nhân viên</span>
              </button>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-5">Mã NV / Họ Tên</th>
                    <th className="py-3.5 px-5">Email đăng nhập</th>
                    <th className="py-3.5 px-5">Vai trò RBAC</th>
                    <th className="py-3.5 px-5">Khoa / Phòng ban</th>
                    <th className="py-3.5 px-5">Đăng nhập gần nhất</th>
                    <th className="py-3.5 px-5">Trạng thái</th>
                    <th className="py-3.5 px-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredAccounts.map(acc => {
                    const isLocked = acc.status === 'locked';
                    return (
                      <tr key={acc.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                              {acc.name.split(' ').pop().charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{acc.name}</p>
                              <span className="text-[10px] font-mono text-slate-400">{acc.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 font-mono text-[11px] text-slate-600">
                          {acc.email}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            acc.role === 'System Administrator'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : acc.role === 'Doctor'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : acc.role === 'Receptionist'
                                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                          }`}>
                            {acc.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-slate-600">
                          {acc.dept}
                        </td>
                        <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                          {acc.lastLogin}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isLocked 
                              ? 'bg-rose-100 text-rose-800' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? 'bg-rose-600' : 'bg-emerald-600'}`} />
                            {isLocked ? 'Đã khóa' : 'Đang hoạt động'}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => handleToggleAccountStatus(acc.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ml-auto ${
                              isLocked
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            }`}
                            title={isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản khẩn cấp'}
                          >
                            {isLocked ? (
                              <>
                                <Unlock className="w-3.5 h-3.5" />
                                <span>Mở khóa</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5" />
                                <span>Khóa tài khoản</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SYSTEM CONFIGURATION (BR-02, FR-18) */}
      {activeTab === 'config' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {configSavedToast && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500 text-white flex items-center gap-3 text-xs font-bold shadow-lg animate-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
              <span>Đã lưu thành công tham số cấu hình hệ thống và mốc thời gian khám bệnh!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Slot Duration & Collision Prevention */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Clock className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Cấu hình Thời lượng Khám & Chặn Trùng lịch
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Thời lượng tiêu chuẩn cho mỗi lượt khám (phút):
                  </label>
                  <select
                    value={configSettings.slotDurationMinutes}
                    onChange={(e) => setConfigSettings({ ...configSettings, slotDurationMinutes: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold outline-none"
                  >
                    <option value={15}>15 phút / lượt (Khám nhanh / Tái khám)</option>
                    <option value={30}>30 phút / lượt (Khám chuyên khoa tiêu chuẩn)</option>
                    <option value={45}>45 phút / lượt (Khám chuyên sâu / Tim mạch)</option>
                    <option value={60}>60 phút / lượt (Hội chẩn đặc biệt)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Số bệnh nhân tối đa trên mỗi khung giờ (Slot Capacity):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={3}
                    value={configSettings.maxPatientsPerSlot}
                    onChange={(e) => setConfigSettings({ ...configSettings, maxPatientsPerSlot: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Mặc định = 1 để đảm bảo nguyên tắc 1-1, chặn đứng hoàn toàn vấn đề 2 (Double-booking 9h00).
                  </p>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configSettings.enableDoubleBookingBlock}
                      onChange={(e) => setConfigSettings({ ...configSettings, enableDoubleBookingBlock: e.target.checked })}
                      className="w-4 h-4 text-teal-600 rounded"
                    />
                    <span className="font-semibold text-slate-800">
                      Bật cơ chế khóa slot tức thời khi đang xử lý (Real-time Mutex Lock)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Automated Reminder Intervals (BR-02, Vấn đề 3) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Cấu hình Lịch Nhắc Tự Động (Automated Reminders)
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configSettings.reminder24hEnabled}
                    onChange={(e) => setConfigSettings({ ...configSettings, reminder24hEnabled: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-slate-800 block">
                      Gửi thông báo nhắc lịch trước 24 giờ
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Tự động kích hoạt lúc 08:00 sáng ngày hôm trước qua SMS Brandname & Email kèm mã lịch hẹn.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configSettings.reminder1hEnabled}
                    onChange={(e) => setConfigSettings({ ...configSettings, reminder1hEnabled: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-slate-800 block">
                      Gửi thông báo nhắc lịch trước 1 giờ (60 phút)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Cảnh báo bệnh nhân chuẩn bị đến quầy lễ tân check-in và link theo dõi số thứ tự hàng đợi.
                    </span>
                  </div>
                </label>

                <div className="pt-2 border-t border-slate-100">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Tự động hủy lịch nếu bệnh nhân đến trễ quá (No-show timeout):
                  </label>
                  <select
                    value={configSettings.autoCancelUncheckedMinutes}
                    onChange={(e) => setConfigSettings({ ...configSettings, autoCancelUncheckedMinutes: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold outline-none"
                  >
                    <option value={15}>15 phút sau giờ hẹn</option>
                    <option value={30}>30 phút sau giờ hẹn (Khuyên dùng)</option>
                    <option value={45}>45 phút sau giờ hẹn</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Department Management */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Danh mục Chuyên khoa & Phân bổ Phòng khám
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {configSettings.departments.length} chuyên khoa
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {configSettings.departments.map(dept => (
                  <div key={dept.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{dept.name}</p>
                      <p className="text-[11px] text-slate-500">{dept.room}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Hoạt động
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveConfig}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-teal-400" />
                  <span>Áp dụng cấu hình hệ thống</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: SECURITY AUDIT LOGS (NFR-03) */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Audit Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Mức độ cảnh báo:</span>
              <div className="flex items-center gap-1 text-xs">
                {['ALL', 'INFO', 'SUCCESS', 'WARNING', 'SECURITY'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setLogFilterLevel(lvl)}
                    className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                      logFilterLevel === lvl
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Đã trích xuất file log an ninh (audit_logs_export.csv)!')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất file CSV</span>
              </button>
            </div>
          </div>

          {/* Audit Log Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider font-sans">
                  <tr>
                    <th className="py-3 px-4">Mã Log / Thời gian</th>
                    <th className="py-3 px-4">Tác tử (Actor)</th>
                    <th className="py-3 px-4">Địa chỉ IP</th>
                    <th className="py-3 px-4">Hành động (Action)</th>
                    <th className="py-3 px-4">Cấp độ</th>
                    <th className="py-3 px-4">Chi tiết sự kiện</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">{log.id}</span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800 font-sans">
                        {log.actor}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {log.ip}
                      </td>
                      <td className="py-3 px-4 font-bold text-teal-700">
                        {log.action}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.level === 'SECURITY' 
                            ? 'bg-rose-100 text-rose-800'
                            : log.level === 'WARNING'
                              ? 'bg-amber-100 text-amber-800'
                              : log.level === 'SUCCESS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                        }`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-sans text-slate-600 text-[11px] max-w-xs">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                Thêm Tài Khoản Nhân Viên Mới
              </h3>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Họ và tên nhân viên:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Văn Nam"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email nội bộ (@mediflow.vn):</label>
                <input
                  type="email"
                  required
                  placeholder="nam.hv@mediflow.vn"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vai trò phân quyền RBAC:</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold outline-none"
                >
                  <option value="Receptionist">Lễ tân (Receptionist - Xem lịch, check-in, đặt hộ)</option>
                  <option value="Doctor">Bác sĩ (Doctor - Xem hàng đợi, khám, kê đơn EMR)</option>
                  <option value="Nurse / Triage">Điều dưỡng (Nurse - Đo sinh hiệu, phân luồng)</option>
                  <option value="System Administrator">Quản trị viên (Admin - Full quyền)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Khoa / Phòng ban phân công:</label>
                <input
                  type="text"
                  value={newUserData.dept}
                  onChange={(e) => setNewUserData({ ...newUserData, dept: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm"
                >
                  Tạo tài khoản & Cấp quyền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
