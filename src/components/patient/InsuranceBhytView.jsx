import React, { useState } from 'react';
import { 
  ShieldPlus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Calendar, 
  User, 
  Percent,
  Sparkles,
  Info
} from 'lucide-react';
import { MOCK_BHYT_REGISTRY } from '../../mockData';

export default function InsuranceBhytView() {
  const [bhytCode, setBhytCode] = useState('SV4010203040503');
  const [cardInfo, setCardInfo] = useState(MOCK_BHYT_REGISTRY['SV4010203040503']);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchBhyt = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const found = MOCK_BHYT_REGISTRY[bhytCode.trim().toUpperCase()] || {
        code: bhytCode.toUpperCase(),
        patientName: 'NGUYỄN TIẾN DŨNG',
        dob: '15/10/2004',
        gender: 'Nam',
        registeredHospital: '01-014 - Bệnh viện Bạch Mai',
        benefitRate: 80,
        validFrom: '01/01/2026',
        validTo: '31/12/2026',
        status: 'active',
        statusText: 'Thẻ BHYT đang có hiệu lực sử dụng'
      };
      setCardInfo(found);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
          Chính Sách Quyền Lợi Y Tế
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Tra cứu & Tích hợp Bảo hiểm Y tế (BHYT)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Kiểm tra giá trị sử dụng thẻ BHYT, mức hưởng quyền lợi và tự động áp dụng khấu trừ đồng chi trả khi đặt lịch khám.
        </p>
      </div>

      {/* Search BHYT input */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        
        <form onSubmit={handleSearchBhyt} className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <ShieldPlus className="w-5 h-5 text-teal-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={bhytCode}
              onChange={(e) => setBhytCode(e.target.value.toUpperCase())}
              placeholder="Nhập mã thẻ BHYT 15 ký tự (VD: SV4010203040503)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            {isSearching ? (
              <span>Đang kiểm tra...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Kiểm tra hiệu lực thẻ</span>
              </>
            )}
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
          <span className="font-semibold text-slate-400">Thẻ mẫu kiểm tra:</span>
          <button
            type="button"
            onClick={() => {
              setBhytCode('SV4010203040503');
              setCardInfo(MOCK_BHYT_REGISTRY['SV4010203040503']);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px]"
          >
            SV4010203040503 (Hưởng 80%)
          </button>
          <button
            type="button"
            onClick={() => {
              setBhytCode('TE4010203040504');
              setCardInfo(MOCK_BHYT_REGISTRY['TE4010203040504']);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px]"
          >
            TE4010203040504 (Trẻ em dưới 6 tuổi - 100%)
          </button>
        </div>

      </div>

      {/* BHYT Digital Card Result */}
      {cardInfo && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500/60 shadow-xl shadow-teal-500/10 space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Card Top */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <ShieldPlus className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  BẢO HIỂM XÃ HỘI VIỆT NAM
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  THẺ BẢO HIỂM Y TẾ ĐIỆN TỬ
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 w-max sm:ml-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{cardInfo.statusText}</span>
              </span>
            </div>
          </div>

          {/* Details on Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-medium">Họ và tên chủ thẻ:</span>
              <div className="text-base font-black text-slate-900">{cardInfo.patientName}</div>
              <div className="text-slate-500">Ngày sinh: {cardInfo.dob} • Giới tính: {cardInfo.gender}</div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
              <span className="text-teal-700 font-bold">Mã số thẻ BHYT:</span>
              <div className="font-mono text-lg font-black text-teal-900">{cardInfo.code}</div>
              <div className="text-emerald-700 font-bold">Mức hưởng quyền lợi: {cardInfo.benefitRate}% chi phí khám chữa bệnh</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-medium">Nơi đăng ký KCB ban đầu:</span>
              <div className="font-bold text-slate-800">{cardInfo.registeredHospital}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-medium">Thời hạn sử dụng:</span>
              <div className="font-bold text-slate-800">Từ {cardInfo.validFrom} đến {cardInfo.validTo}</div>
              <div className="text-[11px] text-slate-500">Đủ điều kiện thanh toán BHYT đúng tuyến / thông tuyến</div>
            </div>

          </div>

          {/* Co-pay Calculation Simulation */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 text-xs space-y-2">
            <span className="font-bold text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Ví dụ mức khấu trừ tự động tại MediFlow Clinic:</span>
            </span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white border border-teal-100">
                <span className="text-slate-400 block">Giá khám gốc</span>
                <span className="font-bold text-slate-800">350.000 đ</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-700 block">BHYT chi trả ({cardInfo.benefitRate}%)</span>
                <span className="font-bold text-emerald-800">- 70.000 đ</span>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-600 text-white font-bold">
                <span className="text-teal-100 block">Bệnh nhân thanh toán</span>
                <span className="text-sm">280.000 đ</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
