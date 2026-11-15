import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  QrCode, 
  Share2, 
  Download, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  BellRing,
  Info,
  Check,
  Building2,
  CalendarCheck
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, TIME_SLOTS } from '../../mockData';

export default function BookingWizard({ 
  initialDepartment, 
  initialDoctorId, 
  user, 
  appointments, 
  onAddAppointment, 
  onCancel,
  onGoToMyAppointments
}) {
  // Wizard steps: 1: Department, 2: Doctor, 3: Date & Time, 4: Patient Info, 5: Success
  const [step, setStep] = useState(1);

  // Selections
  const [selectedDept, setSelectedDept] = useState(initialDepartment || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId || '');
  const [selectedDate, setSelectedDate] = useState('2026-11-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Conflict / Double booking alert state (Screen 4)
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictMessage, setConflictMessage] = useState('');

  // Patient info form
  const [patientName, setPatientName] = useState(user ? user.name : 'Nguyễn Tiến Dũng');
  const [patientPhone, setPatientPhone] = useState(user ? user.phone : '0904 888 999');
  const [patientEmail, setPatientEmail] = useState(user ? user.email : 'tiendung.ngo@neu.edu.vn');
  const [patientDob, setPatientDob] = useState('2004-10-15');
  const [gender, setGender] = useState('Nam');
  const [bhytCode, setBhytCode] = useState('DN4010203040506');
  const [reason, setReason] = useState('Đau dạ dày âm ỉ sau ăn kèm ợ hơi, chướng bụng kéo dài 1 tuần');

  // Success result
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Sync if initial props change
  useEffect(() => {
    if (initialDepartment) {
      setSelectedDept(initialDepartment);
      setStep(2);
    }
    if (initialDoctorId) {
      setSelectedDoctorId(initialDoctorId);
      const doc = DOCTORS.find(d => d.id === initialDoctorId);
      if (doc) setSelectedDept(doc.departmentName);
      setStep(3);
    }
  }, [initialDepartment, initialDoctorId]);

  // Selected doctor object
  const selectedDoctor = DOCTORS.find(d => d.id === selectedDoctorId);

  // Filter doctors by selected department
  const availableDoctors = selectedDept
    ? DOCTORS.filter(d => d.departmentName === selectedDept)
    : DOCTORS;

  // Determine booked slots for current selected doctor & date
  const bookedSlots = appointments
    .filter(a => a.doctorId === selectedDoctorId && a.date === selectedDate && a.status !== 'cancelled')
    .map(a => a.timeSlot);

  // Handle slot selection with double-booking check (MoSCoW 4)
  const handleSelectSlot = (slot) => {
    // If slot is already booked by someone
    if (bookedSlots.includes(slot) || slot === '09:00 - 09:30') {
      setConflictMessage(
        `Rất tiếc! Khung giờ ${slot} của ${selectedDoctor?.name || 'bác sĩ'} vừa được một bệnh nhân khác đặt thành công. Hệ thống tự động khóa khung giờ này nhằm ngăn chặn triệt để tình trạng trùng 2 người 1 giờ (Focus Group - Vấn đề 2). Vui lòng chọn một khung giờ còn trống khác!`
      );
      setShowConflictModal(true);
      return;
    }
    setSelectedTimeSlot(slot);
  };

  // Submit booking
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedTimeSlot) return;

    // Double check again before confirming
    if (bookedSlots.includes(selectedTimeSlot)) {
      setConflictMessage(`Khung giờ ${selectedTimeSlot} vừa có người khác đặt. Vui lòng chọn giờ khác!`);
      setShowConflictModal(true);
      return;
    }

    const newAppointment = {
      id: `APT-${selectedDate.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      patientName,
      patientPhone,
      patientEmail,
      patientDob,
      gender,
      bhytCode,
      emrCode: user?.emrCode || 'EMR-11247',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      departmentName: selectedDoctor.departmentName,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      room: selectedDoctor.room,
      fee: selectedDoctor.fee,
      status: 'confirmed',
      queueNumber: appointments.filter(a => a.date === selectedDate).length + 1,
      reason,
      createdAt: '2026-11-15 08:30',
      reminder24hSent: true,
      reminder1hSent: true,
      channel: 'SMS + Email'
    };

    onAddAppointment(newAppointment);
    setConfirmedBooking(newAppointment);
    setStep(5); // Go to success screen
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* WIZARD CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden text-left">
        
        {/* PROGRESS STEPPER HEADER (Except Success Step) */}
        {step < 5 && (
          <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  {step}/4
                </span>
                <span className="font-bold text-sm tracking-wide text-teal-300 uppercase">
                  {step === 1 && 'Bước 1: Chọn Chuyên khoa'}
                  {step === 2 && 'Bước 2: Chọn Bác sĩ'}
                  {step === 3 && 'Bước 3: Chọn Ngày & Giờ'}
                  {step === 4 && 'Bước 4: Nhập thông tin & Xác nhận'}
                </span>
              </div>
              <button
                onClick={onCancel}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Hủy bỏ
              </button>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: 'Chuyên khoa' },
                { num: 2, label: 'Bác sĩ' },
                { num: 3, label: 'Ngày & Giờ' },
                { num: 4, label: 'Xác nhận' }
              ].map((s) => (
                <div key={s.num} className="space-y-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.num ? 'bg-teal-400' : 'bg-slate-700'
                    }`}
                  />
                  <div className="hidden sm:block text-[11px] font-medium text-slate-400 truncate">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: CHỌN CHUYÊN KHOA */}
        {/* ============================================================ */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Bạn cần thăm khám chuyên khoa nào?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Chọn chuyên khoa phù hợp để hệ thống hiển thị danh sách bác sĩ chuyên môn tương ứng.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    setSelectedDept(dept.name);
                    setStep(2);
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedDept === dept.name
                      ? 'border-teal-600 bg-teal-50/50 shadow-md shadow-teal-500/10'
                      : 'border-slate-200 hover:border-teal-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-slate-900">{dept.name}</span>
                      {selectedDept === dept.name && (
                        <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                    <span>{dept.doctorsCount} Bác sĩ trực</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: CHỌN BÁC SĨ */}
        {/* ============================================================ */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Chọn bác sĩ chuyên khoa: <span className="text-teal-700">{selectedDept}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Xem học vị, số năm kinh nghiệm và lịch trống gần nhất của từng bác sĩ.
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Đổi khoa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoctorId(doc.id);
                    setStep(3);
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedDoctorId === doc.id
                      ? 'border-teal-600 bg-teal-50/50 shadow-md shadow-teal-500/10'
                      : 'border-slate-200 hover:border-teal-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                        {selectedDoctorId === doc.id && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{doc.title}</p>
                      <div className="flex items-center gap-2 text-xs pt-1">
                        <span className="flex items-center gap-1 font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-current" /> {doc.rating}
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">{doc.experienceYears} năm KN</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Giá khám: </span>
                      <span className="font-bold text-teal-700">{doc.fee.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                      {doc.nextAvailable}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: CHỌN NGÀY & KHUNG GIỜ (TRÁNH TRÙNG LỊCH REAL-TIME) */}
        {/* ============================================================ */}
        {step === 3 && selectedDoctor && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctor.avatar}
                  alt={selectedDoctor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{selectedDoctor.name}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{selectedDoctor.departmentName} • {selectedDoctor.room}</p>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 self-start sm:self-auto"
              >
                Đổi bác sĩ
              </button>
            </div>

            {/* Date selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-teal-600" />
                <span>1. Chọn Ngày khám:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { date: '2026-11-15', label: 'Hôm nay', sub: 'Chủ nhật, 15/11' },
                  { date: '2026-11-16', label: 'Ngày mai', sub: 'Thứ hai, 16/11' },
                  { date: '2026-11-17', label: 'Ngày kia', sub: 'Thứ ba, 17/11' },
                  { date: '2026-11-18', label: 'Thứ tư', sub: '18/11/2026' }
                ].map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(d.date);
                      setSelectedTimeSlot('');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedDate === d.date
                        ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{d.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{d.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slot selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>2. Chọn Khung giờ khám (30 phút / lượt):</span>
                </label>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-teal-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Còn trống
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Đã kín
                  </span>
                </div>
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot) || (selectedDoctor.id === 'doc-1' && selectedDate === '2026-11-15' && slot === '09:00 - 09:30');
                  const isSelected = selectedTimeSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSelectSlot(slot)}
                      className={`p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isBooked
                          ? 'border border-slate-200 bg-slate-100/90 text-slate-400 line-through cursor-not-allowed'
                          : isSelected
                            ? 'border-2 border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-500/20'
                            : 'border border-teal-500/40 bg-teal-50/40 text-teal-900 hover:border-teal-600 hover:bg-teal-50'
                      }`}
                    >
                      <span>{slot}</span>
                      {isBooked ? (
                        <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold no-underline">
                          Kín
                        </span>
                      ) : isSelected ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* DEMO TEST BUTTON FOR LECTURER / SPRINT REVIEW (MoSCoW 4) */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Mô phỏng Kiểm thử Chống Trùng Lịch (Double-Booking Check):</span>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Bấm nút bên cạnh để thử chọn khung <b>09:00 - 09:30</b> đang bị tranh chấp nhằm xem cơ chế bảo vệ tự động của hệ thống.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectSlot('09:00 - 09:30')}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 shadow-xs transition-colors"
                >
                  ⚡ Thử tình huống trùng lịch
                </button>
              </div>

            </div>

            {/* Step 3 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>

              <button
                type="button"
                disabled={!selectedTimeSlot}
                onClick={() => setStep(4)}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                  selectedTimeSlot
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Tiếp tục bước 4</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: NHẬP THÔNG TIN BỆNH NHÂN & XÁC NHẬN */}
        {/* ============================================================ */}
        {step === 4 && selectedDoctor && (
          <form onSubmit={handleConfirmBooking} className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Thông tin người khám & Lý do khám
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Vui lòng kiểm tra kỹ số điện thoại và email để hệ thống gửi tin nhắn nhắc lịch hẹn tự động (trước 24h & 1h).
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/80 text-xs text-slate-700 space-y-3">
              <div className="flex items-center justify-between font-bold text-teal-900 text-sm">
                <span>Tóm tắt lịch hẹn</span>
                <span>Giá khám: {selectedDoctor.fee.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-teal-200/50">
                <div>
                  <span className="text-slate-500">Bác sĩ phụ trách:</span>
                  <div className="font-bold text-slate-900">{selectedDoctor.name}</div>
                  <div className="text-[11px] text-teal-700">{selectedDoctor.departmentName}</div>
                </div>
                <div>
                  <span className="text-slate-500">Thời gian khám:</span>
                  <div className="font-bold text-slate-900">{selectedTimeSlot}</div>
                  <div className="text-[11px] text-slate-600">{selectedDate}</div>
                </div>
                <div>
                  <span className="text-slate-500">Địa điểm:</span>
                  <div className="font-bold text-slate-900">{selectedDoctor.room}</div>
                  <div className="text-[11px] text-slate-600">Phòng khám Đa khoa MediFlow</div>
                </div>
              </div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Họ và tên bệnh nhân *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Số điện thoại nhận SMS nhắc lịch *</label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Địa chỉ Email nhận phiếu khám *</label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Ngày sinh</label>
                  <input
                    type="date"
                    value={patientDob}
                    onChange={(e) => setPatientDob(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Giới tính</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Lý do khám & Triệu chứng ban đầu *</label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Mô tả cụ thể triệu chứng, thời gian xuất hiện, tiền sử dị ứng thuốc nếu có..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Clear Policy Notice (Business Rule) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Chính sách đặt hẹn & Hủy lịch minh bạch</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Quý khách được quyền tự hủy hoặc đổi sang khung giờ khác miễn phí <b>trước giờ hẹn tối thiểu 2 giờ</b>.</li>
                <li>Hệ thống tự động kích hoạt 02 tin nhắn nhắc lịch (trước 24 giờ và trước 1 giờ khám) qua SMS và Email.</li>
              </ul>
            </div>

            {/* Submit Actions */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại chọn giờ
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Xác nhận Đặt lịch ngay</span>
              </button>
            </div>

          </form>
        )}

        {/* ============================================================ */}
        {/* STEP 5: MÀN HÌNH XÁC NHẬN THÀNH CÔNG (MÀN 5) */}
        {/* ============================================================ */}
        {step === 5 && confirmedBooking && (
          <div className="p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-200 text-center">
            
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5 max-w-lg mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Đặt lịch thành công 24/7
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Lịch khám của bạn đã được xác nhận!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Thông tin lịch hẹn đã được lưu trên hệ thống và chuyển trực tiếp tới phòng khám của bác sĩ.
              </p>
            </div>

            {/* Ticket Card with QR Code */}
            <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-teal-300 rounded-3xl p-6 text-left relative overflow-hidden space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold">MÃ LỊCH HẸN</span>
                  <div className="font-mono text-lg font-black text-teal-800">{confirmedBooking.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 font-semibold">SỐ THỨ TỰ KHÁM</span>
                  <div className="text-2xl font-black text-slate-900">STT: #{confirmedBooking.queueNumber}</div>
                </div>
              </div>

              {/* QR Code and details */}
              <div className="flex items-center gap-5">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shrink-0 shadow-xs">
                  {/* SVG Simulation of QR Code */}
                  <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center text-white relative p-1">
                    <QrCode className="w-20 h-20 text-white" />
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono block text-center mt-1">Quét tại quầy</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-slate-400">Bệnh nhân: </span>
                    <span className="font-bold text-slate-800">{confirmedBooking.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Bác sĩ: </span>
                    <span className="font-bold text-slate-800">{confirmedBooking.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Thời gian: </span>
                    <span className="font-bold text-teal-700">{confirmedBooking.timeSlot} • {confirmedBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Phòng khám: </span>
                    <span className="font-bold text-slate-800">{confirmedBooking.room}</span>
                  </div>
                </div>
              </div>

              {/* AUTOMATIC REMINDER NOTICE (PROBLEM 3 RESOLVED) */}
              <div className="p-3.5 bg-teal-100/70 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start gap-2.5">
                <BellRing className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <b>Tự động nhắc lịch qua SMS & Email:</b> Hệ thống sẽ gửi tin nhắn nhắc nhở vào lúc <b>08:00 sáng mai (trước 24h)</b> và <b>trước giờ khám 60 phút</b> tới số điện thoại {confirmedBooking.patientPhone}.
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onGoToMyAppointments}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Xem trong Lịch hẹn của tôi</span>
              </button>

              <button
                onClick={onCancel}
                className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Về trang chủ
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL CẢNH BÁO CHỐNG TRÙNG LỊCH (SCREEN 4 - DOUBLE-BOOKING PREVENTED) */}
      {/* ============================================================ */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-rose-300 text-left space-y-4">
            
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200">
                  Cơ chế chống trùng lịch
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Khung giờ vừa được đặt bởi người khác!
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {conflictMessage}
            </p>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-[11px] text-rose-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <b>Bảo đảm chất lượng dịch vụ:</b> Mỗi bác sĩ chỉ tiếp nhận duy nhất 1 bệnh nhân trong khung giờ 30 phút để bảo đảm thời gian thăm khám chu đáo.
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowConflictModal(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Đã hiểu, tôi sẽ chọn giờ khác
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
