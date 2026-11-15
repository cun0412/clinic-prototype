import React from 'react';
import { X, Bell, Clock, CheckCircle2, MessageSquare, Mail, Sparkles } from 'lucide-react';

export default function NotificationsDrawer({ isOpen, onClose, appointments }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-left mt-16 sm:mt-20">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Hộp thư Nhắc lịch tự động</h4>
              <p className="text-[11px] text-slate-400">Mô phỏng tin nhắn SMS & Email gửi đến bệnh nhân</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Simulated Messages */}
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Message 1: 24h Reminder */}
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-800 flex items-center gap-1.5 text-[11px]">
                <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                <span>SMS NHẮC HẸN TRƯỚC 24 GIỜ</span>
              </span>
              <span className="text-[10px] text-teal-600 font-medium">Hôm qua, 08:00</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Xin chào <b>Nguyễn Tiến Dũng</b>, bạn có lịch khám định kỳ với BS.CKII Nguyễn Văn An vào lúc 10:00 ngày 15/11/2026 tại Phòng 201 - Nhà A. Vui lòng chuẩn bị thẻ BHYT và đến trước 10 phút.
            </p>
          </div>

          {/* Message 2: 1h Reminder */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-1.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>SMS NHẮC HẸN TRƯỚC 1 GIỜ</span>
              </span>
              <span className="text-[10px] text-amber-700 font-medium">Hôm nay, 09:00</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Lịch khám của bạn sẽ bắt đầu trong 60 phút nữa (10:00). Mã lịch hẹn: <b>APT-20261115-003</b>. Vui lòng quét mã QR tại ki-ốt quầy lễ tân để nhận STT khám.
            </p>
          </div>

          {/* Message 3: Confirmation */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>EMAIL XÁC NHẬN ĐẶT LỊCH THÀNH CÔNG</span>
              </span>
              <span className="text-[10px] text-slate-400">14/11/2026</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Hệ thống đã nhận đặt hẹn khám Nội Tổng Quát thành công. File xác nhận và vé điện tử đã được đính kèm trong hòm thư của bạn.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Tính năng tự động kích hoạt giúp giảm tỷ lệ quên lịch khám xuống dưới 5%
        </div>

      </div>
    </div>
  );
}
