import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  HeartPulse, 
  Pill, 
  AlertTriangle, 
  Calendar, 
  User, 
  Download,
  Lock,
  Stethoscope
} from 'lucide-react';
import { MOCK_PATIENT_EMR } from '../../mockData';

export default function EmrRecordsView() {
  const emr = MOCK_PATIENT_EMR;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Hồ Sơ Y Tế Điện Tử
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {emr.emrCode}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Hồ sơ Bệnh án Điện tử (EMR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Lưu trữ tập trung và bảo mật toàn bộ lịch sử thăm khám, kết quả chẩn đoán và đơn thuốc đã kê.
          </p>
        </div>

        <button
          onClick={() => alert('Đang xuất toàn bộ Hồ sơ bệnh án điện tử định dạng PDF bảo mật...')}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <Download className="w-4 h-4 text-teal-600" />
          <span>Xuất tệp Bệnh án PDF</span>
        </button>
      </div>

      {/* Security & Access Restriction Notice (Requirement 9) */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-teal-300">Phân quyền truy cập hồ sơ bệnh án (RBAC):</span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Hồ sơ này chỉ có Bác sĩ phụ trách điều trị và Bệnh nhân được cấp quyền xem. Dữ liệu được mã hóa đầu cuối theo chuẩn y tế.
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950 px-2.5 py-1 rounded-lg border border-teal-800 shrink-0">
          ĐÃ XÁC THỰC
        </span>
      </div>

      {/* Patient Vital Info Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5 text-xs">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <User className="w-4 h-4 text-teal-600" />
          <span>Thông tin y tế cơ bản của bệnh nhân</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Họ và tên</span>
            <div className="font-bold text-slate-900 text-sm">{emr.patientName}</div>
            <div className="text-[11px] text-slate-500">{emr.dob} ({emr.gender})</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Nhóm máu</span>
            <div className="font-black text-rose-600 text-base">{emr.bloodGroup}</div>
            <div className="text-[11px] text-slate-500">Kháng nguyên Rh+</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Tiền sử dị ứng</span>
            <div className="font-bold text-emerald-700 text-xs">An toàn</div>
            <div className="text-[11px] text-slate-500">{emr.allergies}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Người liên hệ khẩn</span>
            <div className="font-bold text-slate-900 text-xs">{emr.emergencyContact}</div>
          </div>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span><b>Bệnh lý mạn tính lưu ý:</b> {emr.chronicDiseases}</span>
        </div>
      </div>

      {/* Longitudinal Consultation Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6 text-xs">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-teal-600" />
          <span>Lịch sử các đợt khám & Đơn thuốc đã điều trị</span>
        </h3>

        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200 pl-8">
          {emr.history.map((item, idx) => (
            <div key={idx} className="relative space-y-2">
              {/* Dot */}
              <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-teal-600 ring-4 ring-white" />

              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded">
                  {item.date}
                </span>
                <span className="font-bold text-teal-700">{item.department}</span>
                <span className="text-slate-400">• Bác sĩ điều trị: <b>{item.doctor}</b></span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div>
                  <span className="text-slate-400 text-[11px] font-bold">Chẩn đoán y khoa:</span>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{item.diagnosis}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 text-[11px] font-bold flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    <span>Đơn thuốc chỉ định:</span>
                  </span>
                  <div className="font-mono text-slate-700 text-[11px] mt-0.5 bg-white p-2.5 rounded-xl border border-slate-200/80">
                    {item.prescription}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  Lời dặn: "{item.notes}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
