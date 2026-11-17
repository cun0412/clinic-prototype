import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Heart,
  PlusCircle,
  Edit2,
  Trash2,
  ShieldPlus,
  Save,
  X,
  CheckCircle2,
  Baby,
  AlertTriangle,
  Calendar,
  Users
} from 'lucide-react';

// Mock family members data (FR-02)
const INITIAL_FAMILY_MEMBERS = [
  { id: 'fm-1', name: 'Bé Nguyễn Minh Triết', relation: 'Con trai', dob: '10/08/2022', gender: 'Nam', bhytCode: 'TE4010203040504' },
  { id: 'fm-2', name: 'Nguyễn Thị Hoa', relation: 'Mẹ', dob: '12/03/1972', gender: 'Nữ', bhytCode: 'GD4010203040510' },
];

export default function PatientProfileView({ user, onSaveSuccess }) {
  // Profile form state
  const [form, setForm] = useState({
    fullName: user?.name || 'Nguyễn Tiến Dũng',
    dob: '2004-10-15',
    gender: 'Nam',
    phone: user?.phone || '0904 888 999',
    email: user?.email || 'tiendung.ngo@neu.edu.vn',
    emergencyContactName: 'Nguyễn Văn Hùng (Bố)',
    emergencyContactPhone: '0913 222 111',
    bhytCode: 'SV4010203040503',
  });
  const [saved, setSaved] = useState(false);

  // Family members state
  const [familyMembers, setFamilyMembers] = useState(INITIAL_FAMILY_MEMBERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', relation: '', dob: '', gender: 'Nam', bhytCode: '' });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onSaveSuccess) onSaveSuccess();
  };

  const handleOpenAdd = () => {
    setMemberForm({ name: '', relation: '', dob: '', gender: 'Nam', bhytCode: '' });
    setEditingMember(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (member) => {
    setMemberForm({ ...member });
    setEditingMember(member.id);
    setShowAddModal(true);
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.relation || !memberForm.dob) return;
    if (editingMember) {
      setFamilyMembers(prev => prev.map(m => m.id === editingMember ? { ...m, ...memberForm } : m));
    } else {
      setFamilyMembers(prev => [...prev, { ...memberForm, id: `fm-${Date.now()}` }]);
    }
    setShowAddModal(false);
  };

  const handleDeleteMember = (id) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Hồ Sơ Cá Nhân (UI-08)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Quản lý Hồ sơ Bệnh nhân & Gia đình
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cập nhật thông tin cá nhân, thẻ BHYT và quản lý thành viên gia đình để đặt lịch nhanh hơn (FR-02).
          </p>
        </div>
      </div>

      {/* Avatar + EMR Badge Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-6 flex items-center gap-5 text-white">
        <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center text-2xl font-black shrink-0">
          {(form.fullName || 'U').trim().split(' ').pop().charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="font-extrabold text-lg">{form.fullName}</div>
          <div className="text-teal-300 text-xs mt-0.5">{form.email} • {form.phone}</div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[10px] font-mono font-bold text-teal-200 bg-teal-900/60 px-2 py-0.5 rounded">
              {user?.emrCode || 'EMR-11247'}
            </span>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/40 px-2 py-0.5 rounded">
              BHYT: {form.bhytCode || 'Chưa cập nhật'}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
        <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <User className="w-4 h-4 text-teal-600" />
          Thông tin cá nhân
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* Full name */}
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1.5">Họ và tên đầy đủ <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Ngày sinh <span className="text-rose-500">*</span></label>
            <input
              type="date"
              required
              value={form.dob}
              onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Giới tính <span className="text-rose-500">*</span></label>
            <select
              required
              value={form.gender}
              onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs bg-white"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Số điện thoại <span className="text-rose-500">*</span></label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="VD: 0901234567"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Email <span className="text-rose-500">*</span></label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="VD: example@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* BHYT Code */}
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <ShieldPlus className="w-3.5 h-3.5 text-cyan-600" /> Số thẻ Bảo hiểm y tế (BHYT)
            </label>
            <input
              type="text"
              value={form.bhytCode}
              onChange={e => setForm(f => ({ ...f, bhytCode: e.target.value }))}
              placeholder="VD: SV4010203040503"
              className="w-full px-4 py-2.5 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-xs bg-cyan-50/30 font-mono"
            />
          </div>

          {/* Emergency contact */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Người liên hệ khẩn cấp
            </label>
            <input
              type="text"
              value={form.emergencyContactName}
              onChange={e => setForm(f => ({ ...f, emergencyContactName: e.target.value }))}
              placeholder="VD: Nguyễn Văn A (Bố)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">SĐT liên hệ khẩn cấp</label>
            <input
              type="tel"
              value={form.emergencyContactPhone}
              onChange={e => setForm(f => ({ ...f, emergencyContactPhone: e.target.value }))}
              placeholder="VD: 0901234567"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Lưu thông tin
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              Đã lưu thành công!
            </span>
          )}
        </div>
      </form>

      {/* Family Members Section (FR-02) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            Thành viên gia đình ({familyMembers.length})
          </h2>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Thêm thành viên
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Thêm hồ sơ cho trẻ em, người thân để đặt lịch khám thay mà không cần tạo tài khoản riêng (FR-02).
        </p>

        {familyMembers.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-xs">
            <Baby className="w-8 h-8 mx-auto mb-2 opacity-30" />
            Chưa có thành viên gia đình nào. Nhấn &quot;+ Thêm thành viên&quot; để bắt đầu.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {familyMembers.map(member => (
            <div key={member.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm shrink-0">
                  {member.name.trim().split(' ').pop().charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs truncate">{member.name}</div>
                  <div className="text-[11px] text-slate-500">{member.relation} • {member.dob} • {member.gender}</div>
                  {member.bhytCode && (
                    <div className="text-[10px] font-mono text-cyan-700 mt-0.5">BHYT: {member.bhytCode}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Chỉnh sửa"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Family Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <h2 className="font-extrabold text-sm">
                  {editingMember ? 'Chỉnh sửa thành viên' : 'Thêm thành viên gia đình'}
                </h2>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMemberSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="VD: Nguyễn Văn B"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quan hệ <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={memberForm.relation}
                    onChange={e => setMemberForm(f => ({ ...f, relation: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs bg-white"
                  >
                    <option value="">-- Chọn --</option>
                    <option>Bố</option>
                    <option>Mẹ</option>
                    <option>Con trai</option>
                    <option>Con gái</option>
                    <option>Vợ</option>
                    <option>Chồng</option>
                    <option>Ông</option>
                    <option>Bà</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={memberForm.gender}
                    onChange={e => setMemberForm(f => ({ ...f, gender: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs bg-white"
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ngày sinh <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  required
                  value={memberForm.dob}
                  onChange={e => setMemberForm(f => ({ ...f, dob: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Số thẻ BHYT (nếu có)</label>
                <input
                  type="text"
                  value={memberForm.bhytCode}
                  onChange={e => setMemberForm(f => ({ ...f, bhytCode: e.target.value }))}
                  placeholder="VD: TE4010203040504"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-xs font-mono bg-cyan-50/30"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20 transition-all"
                >
                  {editingMember ? 'Cập nhật' : 'Thêm thành viên'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
