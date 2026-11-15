import React, { useState } from 'react';
import { 
  Stethoscope, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Pill, 
  Sparkles, 
  ArrowRight,
  Volume2,
  CalendarCheck,
  ShieldCheck,
  X
} from 'lucide-react';
import { DOCTORS } from '../../mockData';

export default function DoctorPortalView({ appointments, onUpdateAppointmentStatus, onCompleteExam }) {
  // Current doctor logged in (Default BS An)
  const currentDoctor = DOCTORS[0];

  // Appointments for this doctor today
  const doctorApts = appointments.filter(
    a => a.doctorId === currentDoctor.id && a.date === '2026-11-15' && a.status !== 'cancelled'
  );

  const inProgressApt = doctorApts.find(a => a.status === 'in-progress');
  const checkedInQueue = doctorApts.filter(a => a.status === 'checked-in');
  const upcomingApts = doctorApts.filter(a => a.status === 'confirmed');
  const completedApts = doctorApts.filter(a => a.status === 'completed');

  // Examination Modal state
  const [showExamModal, setShowExamModal] = useState(false);
  const [examiningApt, setExaminingApt] = useState(null);
  const [diagnosis, setDiagnosis] = useState('K29.7 - Viêm dạ dày cấp tính trên nền viêm mạn / Trào ngược dạ dày thực quản (GERD)');
  const [prescriptionText, setPrescriptionText] = useState('1. Nexium 40mg (Esomeprazole) - 1 viên/ngày (uống trước ăn sáng 30p) x 30 ngày\n2. Gaviscon Dual Action - 1 gói sau ăn và trước khi đi ngủ x 20 ngày\n3. Trimedat 100mg - 2 viên/ngày (chia 2 lần)');
  const [doctorNotes, setDoctorNotes] = useState('Bệnh nhân cần kiêng thức ăn cay nóng, cà phê, rượu bia. Không ăn khuya trước khi ngủ 3 tiếng. Hẹn tái khám sau 4 tuần.');

  // Open modal to complete examination
  const handleOpenCompleteModal = (apt) => {
    setExaminingApt(apt);
    setShowExamModal(true);
  };

  // Submit complete exam
  const handleConfirmCompleteExam = (e) => {
    e.preventDefault();
    if (!examiningApt) return;

    onCompleteExam(examiningApt.id, {
      diagnosis,
      doctorNotes,
      prescriptionText
    });

    setShowExamModal(false);
    setExaminingApt(null);
  };

  // Call next patient
  const handleCallNextPatient = (apt) => {
    onUpdateAppointmentStatus(apt.id, 'in-progress');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <img
            src={currentDoctor.avatar}
            alt={currentDoctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Cổng Phòng Khám Bác Sĩ
              </span>
              <span className="text-xs text-slate-400">15/11/2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {currentDoctor.name}
            </h1>
            <p className="text-xs sm:text-sm text-teal-700 font-semibold">
              {currentDoctor.departmentName} • {currentDoctor.room}
            </p>
          </div>
        </div>

        {/* Doctor Stats Summary */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Tổng ca hôm nay</span>
            <span className="text-xl font-black text-slate-900">{doctorApts.length}</span>
          </div>
          <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 text-center shadow-xs">
            <span className="text-[10px] text-emerald-700 uppercase font-bold block">Đã xong</span>
            <span className="text-xl font-black text-emerald-800">{completedApts.length}</span>
          </div>
          <div className="bg-teal-50 px-4 py-2.5 rounded-2xl border border-teal-200 text-center shadow-xs">
            <span className="text-[10px] text-teal-700 uppercase font-bold block">Đang chờ khám</span>
            <span className="text-xl font-black text-teal-800">{checkedInQueue.length}</span>
          </div>
        </div>
      </div>

      {/* ACTIVE PATIENT SECTION (CURRENTLY IN EXAMINATION ROOM) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-400/80 shadow-xl shadow-purple-500/10 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-purple-500 animate-ping" />
            <h3 className="font-extrabold text-purple-900 text-base uppercase tracking-wider">
              Bệnh nhân đang trong phòng khám
            </h3>
          </div>
          {inProgressApt && (
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              Mã: {inProgressApt.id}
            </span>
          )}
        </div>

        {inProgressApt ? (
          <div className="space-y-6 animate-in fade-in">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center">
                    #{inProgressApt.queueNumber}
                  </span>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{inProgressApt.patientName}</h4>
                    <p className="text-xs text-slate-500">
                      SĐT: <b>{inProgressApt.patientPhone}</b> • Mã BHYT: <b>{inProgressApt.bhytCode || 'Chưa cung cấp'}</b>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs space-y-1">
                  <span className="font-bold text-purple-900">Triệu chứng bệnh nhân mô tả:</span>
                  <p className="text-slate-700 leading-relaxed italic">"{inProgressApt.reason}"</p>
                </div>
              </div>

              {/* Action Buttons for in-progress */}
              <div className="md:col-span-4 flex flex-col gap-2.5 justify-center">
                <button
                  onClick={() => handleOpenCompleteModal(inProgressApt)}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hoàn tất khám & Kê đơn thuốc</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Khung giờ: <b>{inProgressApt.timeSlot}</b>
                </p>
              </div>

            </div>

          </div>
        ) : (
          <div className="py-8 text-center text-slate-400 space-y-2">
            <Stethoscope className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs">Hiện chưa có bệnh nhân nào trong phòng khám.</p>
            {checkedInQueue.length > 0 && (
              <p className="text-xs text-teal-700 font-bold">
                Có {checkedInQueue.length} bệnh nhân đã check-in đang chờ ngoài sảnh!
              </p>
            )}
          </div>
        )}

      </div>

      {/* WAITING QUEUE LIST (CHECKED-IN PATIENTS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Hàng đợi bệnh nhân đã Check-in tại quầy
            </h3>
            <p className="text-xs text-slate-500">
              Bệnh nhân đã có mặt tại sảnh, sẵn sàng nhận thông báo mời vào phòng khám
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            {checkedInQueue.length} người chờ
          </span>
        </div>

        {checkedInQueue.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            Không có bệnh nhân nào trong hàng đợi lúc này.
          </p>
        ) : (
          <div className="space-y-3">
            {checkedInQueue.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-teal-500 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                    #{apt.queueNumber}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{apt.patientName}</h4>
                    <p className="text-xs text-slate-500">
                      Khung giờ: <b>{apt.timeSlot}</b> • SĐT: {apt.patientPhone}
                    </p>
                    <p className="text-[11px] text-slate-600 italic mt-0.5 line-clamp-1">
                      "{apt.reason}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCallNextPatient(apt)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Mời vào khám</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL KÊ ĐƠN THUỐC & HOÀN TẤT KHÁM (INTEGRATES TO EMR) */}
      {/* ============================================================ */}
      {showExamModal && examiningApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 text-left max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded">
                  Hồ sơ chẩn đoán & Đơn thuốc
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Hoàn tất ca khám: {examiningApt.patientName} (STT #{examiningApt.queueNumber})
                </h3>
              </div>
              <button
                onClick={() => setShowExamModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmCompleteExam} className="space-y-4">
              
              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700">Chẩn đoán y khoa chính (Mã ICD-10) *</label>
                <input
                  type="text"
                  required
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700">Đơn thuốc chỉ định *</label>
                <textarea
                  rows={4}
                  required
                  value={prescriptionText}
                  onChange={(e) => setPrescriptionText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700">Lời dặn bác sĩ & Chế độ sinh hoạt *</label>
                <textarea
                  rows={2}
                  required
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-[11px] text-teal-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  Sau khi lưu, hồ sơ này sẽ được mã hóa và đồng bộ trực tiếp vào <b>Hồ sơ bệnh án điện tử (EMR)</b> của bệnh nhân.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowExamModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Xác nhận Hoàn tất ca khám
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
