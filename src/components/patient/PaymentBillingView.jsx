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
  ArrowRight
} from 'lucide-react';

export default function PaymentBillingView({ appointment, onPaymentSuccess }) {
  const [method, setMethod] = useState('vietqr'); // 'vietqr' | 'momo' | 'card' | 'counter'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(appointment?.paymentStatus === 'paid');

  const baseFee = appointment?.fee || 350000;
  const bhytDiscount = appointment?.bhytCode ? 70000 : 0; // Simulated BHYT deduction
  const finalAmount = Math.max(0, baseFee - bhytDiscount);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
          Cổng Viện Phí Điện Tử
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Thanh toán Viện phí & Hóa đơn Điện tử
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Thanh toán trực tuyến bảo mật qua VietQR, Ví điện tử MoMo hoặc thanh toán tại quầy khi đến khám.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Payment Methods & Action */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Chọn phương thức thanh toán
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
                    <div className="font-bold text-slate-900 text-sm">Chuyển khoản quét mã VietQR (Mọi App Ngân hàng)</div>
                    <p className="text-[11px] text-slate-500">Miễn phí giao dịch, xác nhận tự động tức thì 24/7</p>
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
                    <div className="font-bold text-slate-900 text-sm">Thẻ Quốc tế (Visa / Mastercard) / Thẻ ATM nội địa</div>
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
                    <p className="text-[11px] text-slate-500">Thanh toán bằng tiền mặt hoặc quẹt thẻ POS tại lễ tân</p>
                  </div>
                </div>
                <input type="radio" checked={method === 'counter'} readOnly className="text-amber-600" />
              </label>

            </div>

            {/* QR Simulation Box if VietQR selected */}
            {method === 'vietqr' && !isPaid && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                <span className="text-[11px] font-bold text-slate-600 uppercase">
                  Quét mã QR bằng App Ngân hàng bất kỳ
                </span>
                <div className="w-40 h-40 bg-white p-2 rounded-2xl border-2 border-slate-900 mx-auto flex items-center justify-center shadow-md">
                  <QrCode className="w-32 h-32 text-slate-900" />
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <div>Chủ TK: <b>PHONG KHAM DA KHOA MEDIFLOW</b></div>
                  <div>Số tiền: <b className="text-teal-700">{finalAmount.toLocaleString('vi-VN')} đ</b></div>
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
                  <span>Đang kết nối cổng thanh toán...</span>
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
                  <span>Đã thanh toán thành công hóa đơn viện phí!</span>
                </div>
                <span className="text-[11px] text-slate-500">Mã GD: #TX-99421</span>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Detailed E-Receipt (Phiếu thu / Hóa đơn) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg text-xs space-y-4 relative overflow-hidden">
            
            {/* Stamp if paid */}
            {isPaid && (
              <div className="absolute top-6 right-6 border-2 border-emerald-600 text-emerald-700 font-black text-xs uppercase px-3 py-1 rounded-lg transform rotate-12 bg-emerald-50/80 shadow-xs">
                ĐÃ THANH TOÁN
              </div>
            )}

            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase">HÓA ĐƠN ĐIỆN TỬ</span>
              <h4 className="font-extrabold text-slate-900 text-base">PHIẾU THU KHÁM BỆNH</h4>
              <p className="text-[11px] text-slate-500">Mã hóa đơn: E-INV-2026-08892</p>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Bệnh nhân:</span>
                <span className="font-bold text-slate-800">{appointment?.patientName || 'Nguyễn Tiến Dũng'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bác sĩ:</span>
                <span className="font-semibold text-slate-800">{appointment?.doctorName || 'BS.CKII Nguyễn Văn An'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Thời gian:</span>
                <span className="font-semibold text-slate-800">{appointment?.timeSlot || '10:00 - 10:30'} ({appointment?.date || '15/11/2026'})</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Phí khám Chuyên khoa:</span>
                <span className="font-bold text-slate-800">{baseFee.toLocaleString('vi-VN')} đ</span>
              </div>
              
              {bhytDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Hỗ trợ Bảo hiểm y tế (BHYT):</span>
                  <span>- {bhytDiscount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-teal-900">
                <span>Số tiền thanh toán:</span>
                <span>{finalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            {/* Print / Download buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
              <button
                type="button"
                onClick={() => alert('Đang tạo và tải về file Hóa đơn điện tử PDF...')}
                className="hover:text-slate-800 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Tải hóa đơn PDF
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="hover:text-slate-800 flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> In phiếu thu
              </button>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-[11px] text-teal-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>Hóa đơn điện tử hợp lệ theo quy định của Tổng cục Thuế và Bộ Y tế.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
