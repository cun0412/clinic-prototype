import React, { useState } from 'react';
import { X, Smartphone, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2, User, Calendar, Users, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [step, setStep] = useState(1); // 1: Input, 2: OTP verification
  const [identifier, setIdentifier] = useState('0904888999');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Registration fields ---
  const [fullName, setFullName] = useState('Nguyễn Tiến Dũng');
  const [dob, setDob] = useState('2004-10-15');
  const [gender, setGender] = useState('Nam');
  const [phone, setPhone] = useState('0904888999');
  const [email, setEmail] = useState('tiendung.ngo@neu.edu.vn');
  // Password field — stored in plain text client-side for demo;
  // in production this MUST be sent over HTTPS and hashed server-side with BCrypt (cost factor ≥ 12) — NFR-04.
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // --- Validation errors (real-time) ---
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  // --- OTP ---
  const [otp, setOtp] = useState('');

  // ---- Validators ----
  const validatePhone = (val) => {
    const clean = val.replace(/\s/g, '');
    if (!clean) return 'Số điện thoại không được để trống';
    if (!/^(0|\+84)[3-9]\d{8}$/.test(clean)) return 'Số điện thoại không hợp lệ (VD: 0904888999)';
    return '';
  };

  const validateEmail = (val) => {
    if (!val) return 'Email không được để trống';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Địa chỉ email không hợp lệ';
    return '';
  };

  const handlePhoneChange = (val) => {
    setPhone(val);
    setPhoneError(validatePhone(val));
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    setEmailError(validateEmail(val));
  };

  // ---- Submit Step 1 ----
  const handleSendOtp = (e) => {
    e.preventDefault();

    if (isRegister) {
      const pe = validatePhone(phone);
      const ee = validateEmail(email);
      setPhoneError(pe);
      setEmailError(ee);
      if (pe || ee || !consentChecked) return;
    } else {
      if (!identifier) return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      // 6-digit OTP auto-filled for demo — NFR-04 / UI-02
      setOtp('889900');
    }, 600);
  };

  // ---- Submit OTP ----
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'user-01',
        name: isRegister ? fullName : 'Nguyễn Tiến Dũng',
        phone: isRegister ? phone : (identifier.includes('@') ? '0904 888 999' : identifier),
        email: isRegister ? email : (identifier.includes('@') ? identifier : 'tiendung.ngo@neu.edu.vn'),
        role: 'patient',
        emrCode: 'EMR-11247'
      });
      onClose();
    }, 600);
  };

  const resetToLogin = () => {
    setIsRegister(false);
    setPhoneError('');
    setEmailError('');
    setConsentChecked(false);
    setPassword('');
    setStep(1);
    setOtp('');
  };

  if (!isOpen) return null;

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
              : `Mã OTP xác thực 6 số đã được gửi tới ${isRegister ? phone : identifier}`
            }
          </p>
        </div>

        {/* Form Body */}
        <div className="p-7 pt-2 text-left max-h-[70vh] overflow-y-auto">

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">

              {/* LOGIN MODE: Method tabs */}
              {!isRegister && (
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
              )}

              {/* LOGIN MODE: single identifier field */}
              {!isRegister && (
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
              )}

              {/* ===== REGISTRATION MODE fields ===== */}
              {isRegister && (
                <>
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Họ và tên đầy đủ <span className="text-rose-500">*</span></label>
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

                  {/* DOB + Gender row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Ngày sinh <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          required
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Giới tính <span className="text-rose-500">*</span></label>
                      <select
                        required
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

                  {/* Phone — required + real-time validation */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Số điện thoại <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="0904888999"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium ${
                          phoneError ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-[11px] text-rose-600 font-medium">{phoneError}</p>
                    )}
                  </div>

                  {/* Email — required + real-time validation */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Địa chỉ Email <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="nguyenvana@gmail.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium ${
                          emailError ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {emailError && (
                      <p className="text-[11px] text-rose-600 font-medium">{emailError}</p>
                    )}
                  </div>

                  {/* Password — BCrypt hashed server-side in production (see comment at top) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mật khẩu <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tối thiểu 8 ký tự"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Mật khẩu được mã hoá an toàn với BCrypt trước khi lưu trữ.</p>
                  </div>

                  {/* Personal data consent — NFR-04, mandatory */}
                  <div
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      consentChecked ? 'border-teal-400 bg-teal-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                    onClick={() => setConsentChecked(!consentChecked)}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        consentChecked ? 'bg-teal-600 border-teal-600' : 'border-slate-300'
                      }`}>
                        {consentChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-[11px] text-slate-700 leading-relaxed select-none">
                        Tôi đồng ý cho MediFlow thu thập và xử lý dữ liệu cá nhân (họ tên, ngày sinh, giới tính, số điện thoại, email) phục vụ mục đích quản lý hồ sơ y tế và nhắc lịch khám, theo đúng{' '}
                        <span className="text-teal-700 font-semibold">Chính sách bảo vệ dữ liệu cá nhân (NFR-04)</span> của phòng khám. <span className="text-rose-500 font-bold">*</span>
                      </span>
                    </label>
                  </div>
                  {!consentChecked && (
                    <p className="text-[11px] text-rose-500 font-medium -mt-2">Bạn phải đồng ý điều khoản để tiếp tục đăng ký.</p>
                  )}
                </>
              )}

              {/* Demo Hint */}
              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100 flex items-start gap-2 text-[11px] text-teal-800">
                <span className="font-bold shrink-0">💡 Chế độ Demo:</span>
                <span>
                  {isRegister
                    ? 'Các trường đã điền sẵn dữ liệu mẫu. Nhấn Tiếp tục để nhận mã OTP 6 số mô phỏng tức thì!'
                    : 'Số điện thoại mẫu đã được điền sẵn. Nhấn Tiếp tục để nhận mã OTP mô phỏng tức thì!'
                  }
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (isRegister && !consentChecked)}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 mt-4"
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
                      onClick={resetToLogin}
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
                      onClick={() => { setIsRegister(true); setPhoneError(''); setEmailError(''); }}
                      className="font-bold text-teal-700 hover:underline"
                    >
                      Đăng ký mới
                    </button>
                  </span>
                )}
              </div>

            </form>
          ) : (
            /* STEP 2: VERIFY OTP — 6 digits */
            <form onSubmit={handleVerifyOtp} className="space-y-4">

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Nhập mã xác thực (6 chữ số)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="889900"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-teal-500 text-lg font-mono tracking-widest text-center text-teal-900 bg-teal-50/30 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Mã mẫu: <b className="text-teal-700">889900</b> (Tự động điền)</span>
                <span className="text-slate-400">Gửi lại sau 45s</span>
              </div>

              {isRegister && (
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 text-[11px] text-teal-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Xác thực OTP thành công sẽ <b>kích hoạt tài khoản</b> của bạn trên hệ thống MediFlow.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Đang xác thực...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isRegister ? 'Xác nhận & Kích hoạt tài khoản' : 'Xác nhận & Bắt đầu'}</span>
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
