import React, { useState } from 'react';
import { 
  QrCode, 
  Tv, 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  Stethoscope, 
  Sparkles, 
  Users, 
  ArrowRight, 
  ShieldCheck,
  RefreshCw,
  BellRing,
  Timer
} from 'lucide-react';
import CheckInView from '../staff/CheckInView';
import RealtimeQueueView from '../patient/RealtimeQueueView';

export default function CheckInAndQueueTrackingView({ appointments, onCheckInSuccess, user }) {
  // Default to scanner or queue board
  const [activeTab, setActiveTab] = useState('queue-board'); // 'queue-board' | 'receptionist-scanner'

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              Đón Tiếp Check-in & Giám Sát Hàng Đợi Trực Tiếp
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Theo dõi số thứ tự đang khám, thời gian chờ ước tính thời gian thực hoặc chuyển sang chế độ quét mã QR đón tiếp người bệnh tại quầy.
            </p>
          </div>

          {/* Sub-view switcher pill */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-2xl border border-slate-700 shrink-0 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setActiveTab('queue-board')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'queue-board'
                  ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Bảng hàng đợi trực tiếp</span>
            </button>

            <button
              onClick={() => setActiveTab('receptionist-scanner')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'receptionist-scanner'
                  ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Quét mã QR Check-in</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render selected sub-interface */}
      {activeTab === 'queue-board' ? (
        <RealtimeQueueView appointments={appointments} user={user} />
      ) : (
        <CheckInView appointments={appointments} onCheckInSuccess={onCheckInSuccess} />
      )}

    </div>
  );
}
