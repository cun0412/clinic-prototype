import React, { useState, useRef, useEffect } from 'react';
import { 
  HeartPulse, 
  User, 
  Calendar, 
  Clock, 
  Bell, 
  Stethoscope, 
  CheckCircle2,
  LogOut,
  Users,
  LayoutDashboard,
  BarChart3,
  CreditCard,
  FileText,
  ShieldPlus,
  Tv,
  Menu,
  X,
  ChevronRight,
  Home,
  QrCode,
  Settings,
  TrendingUp
} from 'lucide-react';

// ── Helper: menu items per role ───────────────────────────────────────────────
const NAV_PRIMARY = {
  patient: [
    { view: 'home',             label: 'Trang chủ',     icon: Home,         color: 'text-teal-600' },
    { view: 'booking',          label: 'Đặt lịch khám', icon: Calendar,     color: 'text-teal-600' },
    { view: 'my-appointments',  label: 'Lịch của tôi',  icon: Clock,        color: 'text-cyan-600' },
    { view: 'queue',            label: 'Hàng đợi',      icon: Tv,           color: 'text-indigo-600' },
  ],
  staff: [
    { view: 'reception-dashboard', label: 'Dashboard',     icon: LayoutDashboard, color: 'text-teal-600' },
    { view: 'staff-timetable',     label: 'Lịch Bác sĩ',  icon: Calendar,        color: 'text-indigo-600' },
    { view: 'checkin',             label: 'Check-in',      icon: QrCode,          color: 'text-emerald-600' },
  ],
  doctor: [
    { view: 'doctor-exam',     label: 'Khám bệnh',    icon: Stethoscope, color: 'text-teal-600' },
    { view: 'doctor-schedule', label: 'Lịch làm việc', icon: Clock,       color: 'text-indigo-600' },
  ],
  admin: [
    { view: 'analytics', label: 'Báo cáo & Phân tích BA', icon: BarChart3, color: 'text-teal-600' },
  ],
};

// Items that live in the hamburger menu (secondary / Could Have)
const NAV_SECONDARY = {
  patient: [
    { view: 'payment',               label: 'Thanh toán viện phí',    icon: CreditCard, color: 'text-emerald-600', badge: null },
    { view: 'emr',                   label: 'Hồ sơ bệnh án (EMR)',    icon: FileText,   color: 'text-teal-600',    badge: 'Could Have' },
    { view: 'bhyt',                  label: 'Tra cứu thẻ BHYT',       icon: ShieldPlus, color: 'text-cyan-600',    badge: 'Could Have' },
    { view: 'notification-settings', label: 'Cài đặt nhắc lịch',      icon: Settings,   color: 'text-amber-500',   badge: null },
  ],
  staff:  [],
  doctor: [],
  admin:  [
    { view: 'analytics', label: 'Báo cáo tháng / quý', icon: TrendingUp, color: 'text-cyan-600', badge: 'Could Have' },
  ],
};

// Role configs for the switcher pill
const ROLES = [
  { key: 'patient', label: 'Bệnh nhân', defaultView: 'home',                 Icon: User,        active: 'bg-white text-teal-700 shadow' },
  { key: 'staff',   label: 'Lễ tân',    defaultView: 'reception-dashboard',   Icon: Users,       active: 'bg-teal-600 text-white shadow' },
  { key: 'doctor',  label: 'Bác sĩ',    defaultView: 'doctor-exam',           Icon: Stethoscope, active: 'bg-indigo-600 text-white shadow' },
  { key: 'admin',   label: 'Quản lý',   defaultView: 'analytics',             Icon: BarChart3,   active: 'bg-slate-900 text-white shadow' },
];

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  currentView, 
  setCurrentView, 
  user, 
  onOpenAuth, 
  onLogout,
  notificationsCount,
  onOpenNotifications
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const primary   = NAV_PRIMARY[currentRole]   || [];
  const secondary = NAV_SECONDARY[currentRole] || [];

  const navigate = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    const def = ROLES.find(r => r.key === currentRole)?.defaultView || 'home';
    setCurrentView(def);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* ── LOGO ─────────────────────────────────────────────── */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">
                  MediFlow
                </span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Clinic
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden lg:block">
                Hệ thống đặt lịch khám bệnh thông minh 24/7
              </p>
            </div>
          </div>

          {/* ── PRIMARY NAV (always visible) ─────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {primary.map(({ view, label, icon: Icon, color }) => (
              <button
                key={view}
                onClick={() => navigate(view)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  currentView === view
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${currentView === view ? 'text-teal-600' : color}`} />
                {label}
              </button>
            ))}
          </nav>

          {/* ── RIGHT CLUSTER ────────────────────────────────────── */}
          <div className="flex items-center gap-1.5">

            {/* 4-Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-2xl border border-slate-200">
              {ROLES.map(({ key, label, defaultView, Icon, active }) => (
                <button
                  key={key}
                  onClick={() => { setCurrentRole(key); setCurrentView(defaultView); setMenuOpen(false); }}
                  title={label}
                  className={`px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                    currentRole === key ? active : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Notification bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Thông báo nhắc lịch SMS/Email"
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* User avatar / login */}
            {user ? (
              <div className="flex items-center gap-1 pl-0.5">
                <div className="w-8 h-8 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-800 font-bold text-xs shrink-0">
                  {user.name.split(' ').pop().charAt(0)}
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all"
              >
                Đăng nhập
              </button>
            )}

            {/* ── HAMBURGER (secondary items) ───────────────── */}
            {secondary.length > 0 && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(o => !o)}
                  className={`p-2 rounded-xl transition-colors ${
                    menuOpen
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  title="Thêm tính năng"
                  aria-label="Mở menu"
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Dropdown panel */}
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {/* Panel header */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Tính năng khác
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentRole === 'patient' ? 'Dành cho Bệnh nhân' : 
                         currentRole === 'staff' ? 'Dành cho Lễ tân' :
                         currentRole === 'doctor' ? 'Dành cho Bác sĩ' : 'Dành cho Quản lý'}
                      </p>
                    </div>

                    {/* Menu items */}
                    <div className="p-2 space-y-0.5">
                      {secondary.map(({ view, label, icon: Icon, color, badge }) => (
                        <button
                          key={view}
                          onClick={() => navigate(view)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                            currentView === view
                              ? 'bg-teal-50 text-teal-700'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            currentView === view ? 'bg-teal-100' : 'bg-slate-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${currentView === view ? 'text-teal-600' : color}`} />
                          </span>
                          <span className="flex-1 font-medium">{label}</span>
                          {badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono border border-slate-200 shrink-0">
                              {badge}
                            </span>
                          )}
                          {!badge && (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Footer hint */}
                    <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                      <p className="text-[10px] text-slate-400 font-medium">
                        💡 Prototype Đồ án BA · NEU · Ngô Tiến Dũng
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
