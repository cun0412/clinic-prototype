import React, { useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';

export default function NotificationSettingsView({ settings, onUpdateSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activePreview, setActivePreview] = useState('sms'); // 'sms' | 'email'

  const handleToggle = (key) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
          Chăm sóc khách hàng tự động
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Cài đặt & Tùy chọn Nhắc lịch hẹn
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Giải quyết triệt để tình trạng quên lịch tái khám (Focus Group - Vấn đề 3) bằng hệ thống thông báo đa kênh tự động.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            {/* Communication Channels */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-teal-600" />
                <span>1. Kênh tiếp nhận thông báo</span>
              </h3>

              {/* SMS Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Tin nhắn SMS điện thoại
                  </div>
                  <p className="text-xs text-slate-500">
                    Gửi trực tiếp tới: <span className="font-semibold text-slate-700">{localSettings.phoneNumber}</span>
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.smsEnabled}
                    onChange={() => handleToggle('smsEnabled')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

              {/* Email Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Thư điện tử Email
                  </div>
                  <p className="text-xs text-slate-500">
                    Gửi kèm phiếu khám điện tử và file iCal tới: <span className="font-semibold text-slate-700">{localSettings.email}</span>
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.emailEnabled}
                    onChange={() => handleToggle('emailEnabled')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>
            </div>

            {/* Reminder Milestones */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span>2. Mốc thời gian gửi nhắc nhở</span>
              </h3>

              {/* 24 hours */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Nhắc trước 24 giờ (Ngày hôm trước)
                  </div>
                  <p className="text-xs text-slate-500">
                    Giúp bệnh nhân sắp xếp công việc, chuẩn bị giấy tờ, bảo hiểm y tế và nhịn ăn nếu có chỉ định xét nghiệm.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.reminder24h}
                    onChange={() => handleToggle('reminder24h')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

              {/* 1 hour */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Nhắc trước 1 giờ (60 phút trước giờ khám)
                  </div>
                  <p className="text-xs text-slate-500">
                    Kèm hướng dẫn di chuyển, số phòng khám và mã QR check-in nhanh tại quầy tiếp đón.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.reminder1h}
                    onChange={() => handleToggle('reminder1h')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

              {/* Queue status updates */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    Cập nhật tiến độ hàng đợi real-time
                  </div>
                  <p className="text-xs text-slate-500">
                    Tự động báo khi bác sĩ sắp khám đến số thứ tự của bạn (còn 2 người phía trước).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.queueStatusUpdates}
                    onChange={() => handleToggle('queueStatusUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

            </div>

            {/* Save Button */}
            <div className="pt-2 flex items-center justify-between">
              {savedSuccess ? (
                <div className="text-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã lưu cài đặt thông báo thành công!</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">Tùy chọn được áp dụng cho mọi lịch hẹn mới</span>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all"
              >
                Lưu thay đổi
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Live Mock Preview (Phone SMS & Email) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Xem trước tin nhắn thực tế</span>
            </span>

            <div className="flex p-0.5 bg-slate-200 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActivePreview('sms')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activePreview === 'sms' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                Mẫu SMS
              </button>
              <button
                type="button"
                onClick={() => setActivePreview('email')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activePreview === 'email' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                Mẫu Email
              </button>
            </div>
          </div>

          {/* PREVIEW CONTAINER */}
          {activePreview === 'sms' ? (
            /* PHONE MOCKUP */
            <div className="mx-auto max-w-xs bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700 relative text-left">
              
              {/* Notch */}
              <div className="w-28 h-4 bg-slate-900 rounded-b-xl mx-auto mb-2" />
              
              <div className="bg-slate-100 rounded-[28px] p-4 text-xs space-y-3 min-h-[380px] flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-semibold">Hôm nay, 08:00 (Trước 24 giờ)</span>
                    <h5 className="font-bold text-slate-800 text-xs">MEDIFLOW CLINIC</h5>
                  </div>

                  {/* SMS Message Bubble 1 */}
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-200/80 space-y-1.5 text-[11px] leading-relaxed text-slate-800">
                    <p className="font-bold text-teal-700">[NHẮC LỊCH HẸN KHÁM TRƯỚC 24H]</p>
                    <p>Xin chào <b>Nguyễn Tiến Dũng</b>, Quý khách có lịch hẹn khám tại MediFlow vào ngày mai:</p>
                    <ul className="text-slate-600 space-y-0.5 pl-2 border-l-2 border-teal-500 text-[10px]">
                      <li>• Bác sĩ: BS.CKII Nguyễn Văn An</li>
                      <li>• Giờ khám: 10:00 - 10:30 (15/11/2026)</li>
                      <li>• Phòng: 201 - Tầng 2, Nhà A</li>
                      <li>• Mã lịch hẹn: APT-20261115-003</li>
                    </ul>
                    <p className="text-[10px] text-slate-500">
                      *Đổi/hủy lịch trước 2h tại: mediflow.vn/my-apt
                    </p>
                  </div>

                  {/* SMS Message Bubble 2 */}
                  <div className="bg-teal-50 p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-teal-200 space-y-1 text-[11px] leading-relaxed text-teal-950">
                    <p className="font-bold text-teal-800">[NHẮC TRƯỚC 1 GIỜ & CHECK-IN]</p>
                    <p className="text-[10px]">
                      Lịch khám của bạn sẽ bắt đầu lúc 10:00. Vui lòng đến trước 10 phút, xuất trình mã <b>APT-20261115-003</b> tại Quầy Tiếp đón để nhận STT khám.
                    </p>
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-200">
                  Tin nhắn tự động từ tổng đài MediFlow
                </div>

              </div>

            </div>
          ) : (
            /* EMAIL MOCKUP */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg text-left text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-mono text-[10px] text-slate-400">Từ: no-reply@mediflow.vn</span>
                <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">Email HTML</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 text-sm">
                  [Xác Nhận & Nhắc Hẹn] Lịch khám bệnh tại MediFlow Clinic
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Kính gửi Quý bệnh nhân <b>Nguyễn Tiến Dũng</b>, lịch khám của bạn đã được ghi nhận trên hệ thống. Dưới đây là thông tin chi tiết:
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bác sĩ:</span>
                  <span className="font-bold text-slate-800">BS.CKII Nguyễn Văn An</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Chuyên khoa:</span>
                  <span className="font-semibold text-slate-800">Nội Tổng Quát</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian khám:</span>
                  <span className="font-bold text-teal-700">10:00 - 10:30, 15/11/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã phiếu hẹn:</span>
                  <span className="font-mono font-bold text-slate-800">APT-20261115-003</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-900">
                Lưu ý: Quý khách có thể tự hủy hoặc dời lịch khám trực tuyến trước giờ hẹn tối thiểu 2 giờ mà không phát sinh chi phí.
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
