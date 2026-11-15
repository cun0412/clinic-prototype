import React, { useState } from 'react';
import { X, Smartphone, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2, User } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [step, setStep] = useState(1); // 1: Input phone/email, 2: OTP verification
  const [identifier, setIdentifier] = useState('0904888999');
  const [fullName, setFullName] = useState('Nguyễn Tiến Dũng');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setOtp('8899'); // Tự động điền mã OTP mẫu giúp giảng viên / người xem dễ dàng demo tức thì
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'user-01',
        name: isRegister ? fullName : 'Nguyễn Tiến Dũng',
        phone: identifier.includes('@') ? '0904 888 999' : identifier,
        email: identifier.includes('@') ? identifier : 'tiendung.ngo@neu.edu.vn',
        role: 'patient',
        emrCode: 'EMR-11247'
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-7 pb-5 bg-gradient-to-b from-teal-50/80 to-white text-left">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {step === 1 
              ? (isRegister ? 'Đăng ký tài khoản Bệnh nhân' : 'Đăng nhập vào MediFlow')
              : 'Xác thực mã bảo mật OTP'
            }
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {step === 1 
              ? 'Đặt lịch nhanh chóng, quản lý hồ sơ khám và nhận thông báo nhắc hẹn' 
              : `Mã OTP xác thực 4 số đã được gửi tới ${identifier}`
            }
          </p>
        </div>

        {/* Form Body */}
        <div className="p-7 pt-2 text-left">
          
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              
              {/* Method tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold mb-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === 'phone' 
                      ? 'bg-white text-teal-700 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Số điện thoại</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === 'email' 
                      ? 'bg-white text-teal-700 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>

              {/* If register, ask for Name */}
              {isRegister && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Họ và tên bệnh nhân</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Identifier Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {authMethod === 'phone' ? 'Số điện thoại nhận tin' : 'Địa chỉ Email'}
                </label>
                <div className="relative">
                  {authMethod === 'phone' ? (
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  )}
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={authMethod === 'phone' ? '0904 888 999' : 'nguyenvana@gmail.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              {/* Demo Hint */}
              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100 flex items-start gap-2 text-[11px] text-teal-800">
                <span className="font-bold shrink-0">💡 Chế độ Demo:</span>
                <span>Số điện thoại mẫu đã được điền sẵn. Nhấn Tiếp tục để nhận mã OTP mô phỏng tức thì!</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <span>Đang gửi mã...</span>
                ) : (
                  <>
                    <span>Tiếp tục nhận OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Toggle Register / Login */}
              <div className="text-center pt-2 text-xs text-slate-500">
                {isRegister ? (
                  <span>
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className="font-bold text-teal-700 hover:underline"
                    >
                      Đăng nhập ngay
                    </button>
                  </span>
                ) : (
                  <span>
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className="font-bold text-teal-700 hover:underline"
                    >
                      Đăng ký mới
                    </button>
                  </span>
                )}
              </div>

            </form>
          ) : (
            /* STEP 2: VERIFY OTP */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Nhập mã xác thực (4 chữ số)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={4}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="8899"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-teal-500 text-lg font-mono tracking-widest text-center text-teal-900 bg-teal-50/30 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Mã mẫu: <b className="text-teal-700">8899</b> (Tự động điền)</span>
                <span className="text-slate-400">Gửi lại sau 45s</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Đang xác thực...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác nhận & Bắt đầu</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                ← Quay lại đổi số điện thoại / email
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
