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
  ShieldCheck,
  Tv,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Home,
  QrCode,
  Settings,
  TrendingUp,
  Search,
  Building2
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../../mockData';

// ── Helper: menu items per role ───────────────────────────────────────────────
const NAV_PRIMARY = {
  patient: [
    { view: 'home',             label: 'Trang chủ', icon: Home,      color: 'text-teal-600' },
    { view: 'booking',          label: 'Đặt lịch',  icon: Calendar,  color: 'text-teal-600' },
    { view: 'my-appointments',  label: 'Lịch hẹn',  icon: Clock,     color: 'text-cyan-600' },
    { view: 'queue',            label: 'Hàng đợi',  icon: Tv,        color: 'text-indigo-600' },
  ],
  staff: [
    { view: 'reception-dashboard', label: 'Dashboard',   icon: LayoutDashboard, color: 'text-teal-600' },
    { view: 'staff-timetable',     label: 'Lịch BS',     icon: Calendar,        color: 'text-indigo-600' },
    { view: 'checkin',             label: 'Check-in',    icon: QrCode,          color: 'text-emerald-600' },
  ],
  doctor: [
    { view: 'doctor-exam',     label: 'Khám bệnh',  icon: Stethoscope, color: 'text-teal-600' },
    { view: 'doctor-schedule', label: 'Ca làm việc', icon: Clock,      color: 'text-indigo-600' },
  ],
  admin: [
    { view: 'admin-system', label: 'Quản trị hệ thống', icon: ShieldCheck, color: 'text-teal-600' },
    { view: 'analytics',    label: 'Báo cáo & Thống kê', icon: BarChart3,   color: 'text-indigo-600' },
  ],
};

// Items that live in the hamburger menu (secondary / Could Have)
const NAV_SECONDARY = {
  patient: [
    { view: 'payment',               label: 'Thanh toán & BHYT',      icon: CreditCard, color: 'text-emerald-600', badge: null },
    { view: 'queue',                 label: 'Check-in & Hàng đợi',    icon: Tv,         color: 'text-indigo-600',  badge: null },
    { view: 'emr',                   label: 'Hồ sơ bệnh án (EMR)',   icon: FileText,   color: 'text-teal-600',    badge: 'Could Have' },
    { view: 'bhyt',                  label: 'Tra cứu thẻ BHYT riêng', icon: ShieldPlus, color: 'text-cyan-600',    badge: 'Could Have' },
    { view: 'notification-settings', label: 'Cài đặt nhắc lịch',      icon: Settings,   color: 'text-amber-500',   badge: null },
  ],
  staff:  [
    { view: 'checkin',               label: 'Check-in & Hàng đợi',    icon: QrCode,     color: 'text-emerald-600', badge: null },
  ],
  doctor: [],
  admin:  [
    { view: 'admin-system',          label: 'Quản trị hệ thống',      icon: ShieldCheck, color: 'text-teal-600', badge: null },
    { view: 'analytics',             label: 'Báo cáo tháng / quý',    icon: TrendingUp,  color: 'text-cyan-600',  badge: 'Could Have' },
  ],
};

// Role configs for the switcher pill
const ROLES = [
  { key: 'patient', label: 'Bệnh nhân', defaultView: 'home',                 Icon: User,        active: 'bg-white text-teal-700 shadow' },
  { key: 'staff',   label: 'Lễ tân',    defaultView: 'reception-dashboard',   Icon: Users,       active: 'bg-teal-600 text-white shadow' },
  { key: 'doctor',  label: 'Bác sĩ',    defaultView: 'doctor-exam',           Icon: Stethoscope, active: 'bg-indigo-600 text-white shadow' },
  { key: 'admin',   label: 'Quản lý',   defaultView: 'admin-system',          Icon: BarChart3,   active: 'bg-slate-900 text-white shadow' },
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Search results
  const q = searchQuery.trim().toLowerCase();
  const matchedDoctors = q.length >= 1
    ? DOCTORS.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.departmentName.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];
  const matchedDepts = q.length >= 1
    ? DEPARTMENTS.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];
  const hasResults = matchedDoctors.length > 0 || matchedDepts.length > 0;

  const handleSearchSelect = (type, item) => {
    setSearchQuery('');
    setSearchOpen(false);
    if (type === 'doctor') {
      setCurrentRole('patient');
      setCurrentView('booking');
    } else {
      setCurrentRole('patient');
      setCurrentView('booking');
    }
  };

  const primary   = NAV_PRIMARY[currentRole]   || [];
  const secondary = NAV_SECONDARY[currentRole] || [];
  const currentRoleObj = ROLES.find(r => r.key === currentRole) || ROLES[0];
  const CurrentRoleIcon = currentRoleObj.Icon;

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
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {primary.map(({ view, label, icon: Icon, color }) => (
              <button
                key={view}
                onClick={() => navigate(view)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                  currentView === view
                    ? 'bg-teal-50 text-teal-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${currentView === view ? 'text-teal-600' : color}`} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* ── SEARCH BOX ───────────────────────────────────── */}
          <div className="relative hidden lg:block shrink-0" ref={searchRef}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              searchOpen
                ? 'border-teal-400 ring-2 ring-teal-100 bg-white w-52'
                : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 w-40'
            }`}>
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Tìm bác sĩ, khoa…"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                className="bg-transparent text-xs text-slate-700 placeholder:text-slate-400 outline-none w-full"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); }} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {searchOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                
                {/* Empty state */}
                {!q && (
                  <div className="p-4 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gợi ý tìm kiếm</p>
                    {[
                      { label: 'Tim Mạch', sub: 'Chuyên khoa' },
                      { label: 'BS Nguyễn Văn An', sub: 'Nội Tổng Quát' },
                      { label: 'Nhi Khoa', sub: 'Chuyên khoa' },
                      { label: 'BS Lê Hoàng Nam', sub: 'Tim Mạch' },
                    ].map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(s.label)}
                        className="w-full flex items-center gap-2 text-left hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
                      >
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-700">{s.label}</span>
                        <span className="text-xs text-slate-400 ml-auto">{s.sub}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Results */}
                {q && (
                  <div className="p-2">
                    {/* Doctors */}
                    {matchedDoctors.length > 0 && (
                      <div>
                        <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Bác sĩ</p>
                        {matchedDoctors.map(doc => (
                          <button
                            key={doc.id}
                            onClick={() => handleSearchSelect('doctor', doc)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors text-left"
                          >
                            <img src={doc.avatar} alt={doc.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate">{doc.name}</p>
                              <p className="text-xs text-slate-500 truncate">{doc.departmentName} · ⭐ {doc.rating}</p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Departments */}
                    {matchedDepts.length > 0 && (
                      <div>
                        <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Chuyên khoa</p>
                        {matchedDepts.map(dept => (
                          <button
                            key={dept.id}
                            onClick={() => handleSearchSelect('dept', dept)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                              <Building2 className="w-4 h-4 text-teal-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate">{dept.name}</p>
                              <p className="text-xs text-slate-500 truncate">{dept.doctorsCount} bác sĩ</p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* No result */}
                    {!hasResults && (
                      <div className="py-6 text-center">
                        <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">Không tìm thấy kết quả cho "<span className="font-semibold text-slate-600">{q}</span>"</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-slate-100 px-4 py-2 bg-slate-50">
                  <p className="text-[10px] text-slate-400">Nhấn kết quả để đặt lịch khám</p>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT CLUSTER ────────────────────────────────────── */}
          <div className="flex items-center gap-1.5 shrink-0">

            {/* Compact Role Selector Pill */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 border border-slate-200 transition-all shrink-0 cursor-pointer"
              title="Nhấn để đổi vai trò demo"
            >
              <CurrentRoleIcon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="whitespace-nowrap">{currentRoleObj?.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

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

            {/* ── HAMBURGER MENU (Role switcher + Secondary items) ───────────────── */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(o => !o)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  menuOpen
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title="Menu chức năng & Vai trò"
                aria-label="Mở menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Dropdown panel */}
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  
                  {/* Role Switcher Section */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/80">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Chuyển vai trò Demo
                      </p>
                      <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 font-semibold">
                        {currentRoleObj?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {ROLES.map(({ key, label, defaultView, Icon }) => {
                        const isActive = currentRole === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setCurrentRole(key);
                              setCurrentView(defaultView);
                              setMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{label}</span>
                            {isActive && <CheckCircle2 className="w-3 h-3 ml-auto text-teal-200 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Secondary Features Section */}
                  {secondary.length > 0 && (
                    <div className="p-2 border-b border-slate-100 space-y-0.5">
                      <p className="px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Tính năng khác ({currentRoleObj?.label})
                      </p>
                      {secondary.map(({ view, label, icon: Icon, color, badge }) => (
                        <button
                          key={view}
                          onClick={() => navigate(view)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                            currentView === view
                              ? 'bg-teal-50 text-teal-700 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            currentView === view ? 'bg-teal-100' : 'bg-slate-100'
                          }`}>
                            <Icon className={`w-3.5 h-3.5 ${currentView === view ? 'text-teal-600' : color}`} />
                          </span>
                          <span className="flex-1 font-medium truncate">{label}</span>
                          {badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono border border-slate-200 shrink-0">
                              {badge}
                            </span>
                          )}
                          {!badge && (
                            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Footer hint */}
                  <div className="px-3.5 py-2 bg-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>MediFlow Clinic</span>
                    <span>Nhóm 7 · BA NEU</span>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
