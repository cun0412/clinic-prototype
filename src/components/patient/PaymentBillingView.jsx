import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  Wallet, 
  Building2, 
  Sparkles, 
  ArrowRight,
  ShieldPlus,
  Search,
  Check,
  RefreshCw,
  Percent
} from 'lucide-react';
import { MOCK_BHYT_REGISTRY } from '../../mockData';

export default function PaymentBillingView({ appointment, onPaymentSuccess }) {
  const [method, setMethod] = useState('vietqr'); // 'vietqr' | 'momo' | 'card' | 'counter'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(appointment?.paymentStatus === 'paid');

  // --- Health Insurance Verification State (FR-20) ---
  const [bhytCodeInput, setBhytCodeInput] = useState(appointment?.bhytCode || 'SV4010203040503');
  const [isVerifyingBhyt, setIsVerifyingBhyt] = useState(false);
  const [verifiedBhyt, setVerifiedBhyt] = useState({
    code: 'SV4010203040503',
    patientName: 'NGUYỄN TIẾN DŨNG',
    dob: '15/10/2004',
    benefitRate: 80,
    validUntil: '31/12/2026',
    facility: 'Bệnh viện Bạch Mai (Đúng tuyến)',
    status: 'valid'
  });

  // Verify BHYT card simulation via simulated portal (FR-20)
  const handleVerifyBhyt = (e) => {
    if (e) e.preventDefault();
    const clean = bhytCodeInput.trim().toUpperCase();
    if (!clean) return;

    setIsVerifyingBhyt(true);
    setTimeout(() => {
      setIsVerifyingBhyt(false);
      const registryEntry = MOCK_BHYT_REGISTRY[clean] || {
        code: clean,
        patientName: appointment?.patientName ? appointment.patientName.toUpperCase() : 'NGUYỄN TIẾN DŨNG',
        dob: '15/10/2004',
        benefitRate: clean.startsWith('TE') ? 100 : 80,
        validUntil: '31/12/2026',
        facility: 'Phòng khám Đa khoa MediFlow (Đúng tuyến)',
        status: 'valid'
      };
      setVerifiedBhyt(registryEntry);
    }, 700);
  };

  // Automated copayment calculation
  const baseFee = appointment?.fee || 350000;
  const benefitRate = verifiedBhyt ? verifiedBhyt.benefitRate : 0;
  const bhytDiscount = verifiedBhyt ? Math.round((baseFee * benefitRate) / 100) : 0;
  const finalAmount = Math.max(0, baseFee - bhytDiscount);

  // Simulated online payment gateway checkout (FR-19, UC-09)
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onPaymentSuccess) {
        onPaymentSuccess(appointment?.id || 'APT-20261115-003');
      }
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
          Cổng Viện Phí & Bảo Hiểm Y Tế
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Xác Thực Thẻ BHYT & Thanh Toán Viện Phí Điện Tử
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tra cứu xác thực thẻ BHYT trực tuyến, tự động tính toán số tiền đồng chi trả, hỗ trợ đa dạng phương thức thanh toán bảo mật và xuất hóa đơn điện tử.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: BHYT Verification + Payment Gateway */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. HEALTH INSURANCE VERIFICATION PORTAL */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldPlus className="w-5 h-5 text-cyan-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  1. Tra cứu & Xác thực thẻ BHYT
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                Tự động giảm trừ
              </span>
            </div>

            <form onSubmit={handleVerifyBhyt} className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Nhập số thẻ BHYT (15 ký tự):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={15}
                  value={bhytCodeInput}
                  onChange={(e) => setBhytCodeInput(e.target.value.toUpperCase())}
                  placeholder="Ví dụ: SV4010203040503"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono text-sm font-bold text-slate-800 uppercase outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={isVerifyingBhyt}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {isVerifyingBhyt ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang tra cứu...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Kiểm tra thẻ</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample card codes for test */}
              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                <span>Thẻ mẫu kiểm thử:</span>
                <button
                  type="button"
                  onClick={() => { setBhytCodeInput('SV4010203040503'); handleVerifyBhyt(); }}
                  className="text-teal-700 underline font-mono font-bold hover:text-teal-900"
                >
                  SV (Hưởng 80%)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => { setBhytCodeInput('TE4010203040504'); handleVerifyBhyt(); }}
                  className="text-cyan-700 underline font-mono font-bold hover:text-cyan-900"
                >
                  TE (Trẻ em dưới 6 tuổi - 100%)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => { setBhytCodeInput(''); setVerifiedBhyt(null); }}
                  className="text-slate-500 underline font-medium hover:text-slate-800"
                >
                  Không dùng BHYT
                </button>
              </div>
            </form>

            {/* Verified BHYT Result Card */}
            {verifiedBhyt && (
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2 animate-in zoom-in-95 duration-200 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span className="font-extrabold text-teal-950 font-mono text-sm">{verifiedBhyt.code}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    MỨC HƯỞNG {verifiedBhyt.benefitRate}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>Họ tên: <b className="text-slate-900">{verifiedBhyt.patientName}</b></div>
                  <div>Hạn thẻ: <span className="font-mono text-slate-900 font-bold">{verifiedBhyt.validUntil}</span></div>
                  <div className="col-span-2">ĐKKCB ban đầu: <b className="text-teal-900">{verifiedBhyt.facility}</b></div>
                </div>
              </div>
            )}
          </div>

          {/* 2. PAYMENT METHODS & GATEWAY (FR-19, UC-09) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm">
              2. Chọn phương thức thanh toán trực tuyến
            </h3>

            {/* Methods Options */}
            <div className="space-y-3">
              
              {/* VietQR */}
              <label
                onClick={() => setMethod('vietqr')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  method === 'vietqr' ? 'border-teal-600 bg-teal-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Chuyển khoản VietQR động (Mọi App Ngân hàng)</div>
                    <p className="text-[11px] text-slate-500">Tự động điền số tiền đồng chi trả và mã hóa đơn</p>
                  </div>
                </div>
                <input type="radio" checked={method === 'vietqr'} readOnly className="text-teal-600" />
              </label>

              {/* MoMo */}
              <label
                onClick={() => setMethod('momo')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  method === 'momo' ? 'border-pink-600 bg-pink-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Ví điện tử MoMo</div>
                    <p className="text-[11px] text-slate-500">Thanh toán 1 chạm qua ứng dụng MoMo</p>
                  </div>
                </div>
                <input type="radio" checked={method === 'momo'} readOnly className="text-pink-600" />
              </label>

              {/* Card */}
              <label
                onClick={() => setMethod('card')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  method === 'card' ? 'border-indigo-600 bg-indigo-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Thẻ Quốc tế (Visa / Mastercard) / ATM Napas</div>
                    <p className="text-[11px] text-slate-500">Cổng thanh toán bảo mật tiêu chuẩn PCI-DSS</p>
                  </div>
                </div>
                <input type="radio" checked={method === 'card'} readOnly className="text-indigo-600" />
              </label>

              {/* At Clinic */}
              <label
                onClick={() => setMethod('counter')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  method === 'counter' ? 'border-amber-600 bg-amber-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Thanh toán tại quầy khi đến khám</div>
                    <p className="text-[11px] text-slate-500">Thanh toán tiền mặt hoặc quẹt thẻ POS tại quầy lễ tân</p>
                  </div>
                </div>
                <input type="radio" checked={method === 'counter'} readOnly className="text-amber-600" />
              </label>

            </div>

            {/* QR Simulation Box if VietQR selected */}
            {method === 'vietqr' && !isPaid && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                <span className="text-[11px] font-bold text-slate-600 uppercase">
                  Quét mã QR để thanh toán đồng chi trả
                </span>
                <div className="w-40 h-40 bg-white p-2 rounded-2xl border-2 border-slate-900 mx-auto flex items-center justify-center shadow-md">
                  <QrCode className="w-32 h-32 text-slate-900" />
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <div>Chủ TK: <b>PHONG KHAM DA KHOA MEDIFLOW</b></div>
                  <div>Số tiền đồng chi trả: <b className="text-teal-700 text-sm">{finalAmount.toLocaleString('vi-VN')} đ</b></div>
                  <div>Nội dung: <span className="font-mono bg-slate-200 px-1 rounded">MEDIFLOW {appointment?.id || 'APT-20261115-003'}</span></div>
                </div>
              </div>
            )}

            {/* Action button */}
            {!isPaid ? (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulatePayment}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold text-sm shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Đang kết nối cổng thanh toán trực tuyến...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Mô phỏng Thanh toán {finalAmount.toLocaleString('vi-VN')} đ</span>
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Đã thanh toán thành công viện phí! Đã xuất E-Receipt.</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">#TX-99421</span>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Automated Copayment Breakdown & E-Receipt (FR-19, UC-09) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg text-xs space-y-4 relative overflow-hidden">
            
            {/* Stamp if paid */}
            {isPaid && (
              <div className="absolute top-6 right-6 border-2 border-emerald-600 text-emerald-700 font-black text-xs uppercase px-3 py-1 rounded-lg transform rotate-12 bg-emerald-50/80 shadow-xs animate-in zoom-in-50 duration-200">
                ĐÃ THANH TOÁN (PAID)
              </div>
            )}

            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                E-RECEIPT (HÓA ĐƠN ĐIỆN TỬ)
              </span>
              <h4 className="font-extrabold text-slate-900 text-base mt-1.5">
                PHIẾU THU & ĐỒNG CHI TRẢ VIỆN PHÍ
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">Mã hóa đơn: E-INV-2026-08892</p>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Bệnh nhân:</span>
                <span className="font-bold text-slate-800">{appointment?.patientName || 'Nguyễn Tiến Dũng'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mã lịch hẹn:</span>
                <span className="font-mono font-bold text-teal-700">{appointment?.id || 'APT-20261115-003'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bác sĩ khám:</span>
                <span className="font-semibold text-slate-800">{appointment?.doctorName || 'BS.CKII Nguyễn Văn An'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Thời gian khám:</span>
                <span className="font-semibold text-slate-800">{appointment?.timeSlot || '10:00 - 10:30'} ({appointment?.date || '15/11/2026'})</span>
              </div>
            </div>

            {/* Automated Copayment Price Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Giá khám cơ bản (Base Consultation Fee):</span>
                <span className="font-bold text-slate-900">{baseFee.toLocaleString('vi-VN')} đ</span>
              </div>

              {verifiedBhyt ? (
                <>
                  <div className="flex justify-between text-teal-800 font-medium">
                    <span>Thẻ BHYT ({verifiedBhyt.code}):</span>
                    <span className="font-bold">Mức hưởng {benefitRate}%</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Quỹ BHYT chi trả ({benefitRate}%):</span>
                    <span>- {bhytDiscount.toLocaleString('vi-VN')} đ</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-slate-400 italic">
                  <span>Bảo hiểm y tế (BHYT):</span>
                  <span>Chưa áp dụng</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-black text-sm text-teal-950">
                <span>Người bệnh đồng chi trả (Copayment):</span>
                <span className="text-base text-teal-700 font-black">{finalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            {/* Print / Download buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
              <button
                type="button"
                onClick={() => alert('Đang tạo và tải về hóa đơn điện tử E-Receipt PDF...')}
                className="hover:text-slate-800 flex items-center gap-1 font-bold text-teal-700"
              >
                <Download className="w-3.5 h-3.5" /> Tải hóa đơn PDF
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="hover:text-slate-800 flex items-center gap-1 font-bold text-slate-600"
              >
                <Printer className="w-3.5 h-3.5" /> In phiếu thu
              </button>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-[11px] text-teal-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>Dữ liệu chi phí và bảo lãnh viện phí được đồng bộ trực tuyến với Cổng thanh toán quốc gia và Cổng giám định BHYT.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
