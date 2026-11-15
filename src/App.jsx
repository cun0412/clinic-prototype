import React, { useState } from 'react';
import Header from './components/common/Header';

// Must Have (Screens 1 - 10)
import HomeView from './components/patient/HomeView';
import BookingWizard from './components/patient/BookingWizard';
import MyAppointmentsView from './components/patient/MyAppointmentsView';
import NotificationSettingsView from './components/patient/NotificationSettingsView';
import AuthModal from './components/patient/AuthModal';
import ReceptionDashboardView from './components/staff/ReceptionDashboardView';
import StaffTimetableView from './components/staff/StaffTimetableView';
import CheckInView from './components/staff/CheckInView';
import NotificationsDrawer from './components/common/NotificationsDrawer';

// Should Have (Screens 11 - 14 & Interfaces 4.1.13, 4.1.14)
import RealtimeQueueView from './components/patient/RealtimeQueueView';
import DoctorPortalView from './components/doctor/DoctorPortalView';
import DoctorScheduleManagementView from './components/doctor/DoctorScheduleManagementView';
import PaymentBillingView from './components/patient/PaymentBillingView';
import CheckInAndQueueTrackingView from './components/common/CheckInAndQueueTrackingView';

// Could Have & Admin (Screens 15 - 17 & Interface 4.1.15)
import EmrRecordsView from './components/patient/EmrRecordsView';
import InsuranceBhytView from './components/patient/InsuranceBhytView';
import AnalyticsReportsView from './components/admin/AnalyticsReportsView';
import SystemAdministrationView from './components/admin/SystemAdministrationView';

import { 
  INITIAL_APPOINTMENTS, 
  MOCK_NOTIFICATION_SETTINGS, 
  DOCTORS, 
  DEPARTMENTS 
} from './mockData';

import { 
  Calendar, 
  Home, 
  Clock, 
  Bell, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  HeartPulse,
  Tv,
  CreditCard,
  FileText,
  ShieldPlus,
  Stethoscope,
  BarChart3,
  Layers
} from 'lucide-react';

export default function App() {
  // Current active role: 'patient' | 'staff' | 'doctor' | 'admin'
  const [currentRole, setCurrentRole] = useState('patient');

  // Current view in active role
  // Patient: 'home' | 'booking' | 'my-appointments' | 'queue' | 'payment' | 'emr' | 'bhyt' | 'notification-settings'
  // Staff: 'reception-dashboard' | 'staff-timetable' | 'checkin'
  // Doctor: 'doctor-exam' | 'doctor-schedule'
  // Admin: 'analytics'
  const [currentView, setCurrentView] = useState('home');

  // Appointments state (reactive throughout the entire application)
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  // User state
  const [user, setUser] = useState({
    id: 'user-01',
    name: 'Nguyễn Tiến Dũng',
    phone: '0904 888 999',
    email: 'tiendung.ngo@neu.edu.vn',
    role: 'patient',
    emrCode: 'EMR-11247'
  });

  // Wizard pre-selection props
  const [bookingPrefillDept, setBookingPrefillDept] = useState('');
  const [bookingPrefillDoctorId, setBookingPrefillDoctorId] = useState('');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState(MOCK_NOTIFICATION_SETTINGS);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Add new appointment (Screens 3, 5, 9)
  const handleAddAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
    showToast(`Đặt lịch hẹn thành công! Mã số: ${newApt.id}`, 'success');
  };

  // 2. Cancel appointment (Screen 6)
  const handleCancelAppointment = (aptId, reason) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { ...a, status: 'cancelled', cancellationReason: reason };
      }
      return a;
    }));
    showToast(`Đã hủy lịch hẹn ${aptId}. Khung giờ đã được giải phóng trở lại!`, 'info');
  };

  // 3. Reschedule appointment (Screen 6)
  const handleRescheduleAppointment = (aptId, newDate, newTimeSlot) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { ...a, date: newDate, timeSlot: newTimeSlot, status: 'confirmed' };
      }
      return a;
    }));
    showToast(`Đổi lịch hẹn thành công sang ${newTimeSlot} (${newDate})`, 'success');
  };

  // 4. Check-In (Screens 8 & 10)
  const handleCheckInSuccess = (aptId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { ...a, status: 'checked-in' };
      }
      return a;
    }));
    showToast(`Check-in thành công cho lịch hẹn ${aptId}! Đã cấp số thứ tự vào hàng đợi.`, 'success');
  };

  // 5. Update appointment status (Doctor exam - Screen 12)
  const handleUpdateAppointmentStatus = (aptId, newStatus) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { ...a, status: newStatus };
      }
      return a;
    }));
    const statusLabels = {
      'in-progress': 'Bác sĩ đã bắt đầu khám',
      'completed': 'Đã hoàn tất ca khám',
      'no-show': 'Đã đánh dấu vắng mặt'
    };
    showToast(`${statusLabels[newStatus] || 'Cập nhật trạng thái'}: ${aptId}`, 'info');
  };

  // 6. Complete examination & save diagnosis (Screen 12)
  const handleCompleteExam = (aptId, examData) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { 
          ...a, 
          status: 'completed',
          diagnosis: examData.diagnosis,
          prescription: examData.prescription,
          doctorNotes: examData.notes
        };
      }
      return a;
    }));
    showToast(`Đã lưu kết quả khám & đơn thuốc cho lịch ${aptId} vào hồ sơ EMR!`, 'success');
  };

  // 7. Payment success (Screen 14)
  const handlePaymentSuccess = (aptId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === aptId) {
        return { ...a, paymentStatus: 'paid' };
      }
      return a;
    }));
    showToast(`Thanh toán thành công viện phí! Đã xuất hóa đơn điện tử (E-Receipt).`, 'success');
  };

  // Start booking triggers
  const handleStartBooking = (dept = '', docId = '') => {
    setBookingPrefillDept(dept);
    setBookingPrefillDoctorId(docId);
    setCurrentRole('patient');
    setCurrentView('booking');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold text-white max-w-md ${
            toastMessage.type === 'success' 
              ? 'bg-slate-900 border-teal-500/50' 
              : toastMessage.type === 'error'
                ? 'bg-rose-700 border-rose-500'
                : 'bg-teal-800 border-teal-600'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={(role) => {
          setCurrentRole(role);
          if (role === 'patient') setCurrentView('home');
          else if (role === 'staff') setCurrentView('reception-dashboard');
          else if (role === 'doctor') setCurrentView('doctor-exam');
          else if (role === 'admin') setCurrentView('admin-system');
        }}
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setUser(null);
          showToast('Đã đăng xuất tài khoản', 'info');
        }}
        notificationsCount={2}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />



      {/* Main View Area */}
      <main className="flex-1">
        
        {/* ========================================================= */}
        {/* 1. PATIENT PORTAL VIEWS (Screens 1 - 7, 11, 14 - 16)      */}
        {/* ========================================================= */}
        {currentRole === 'patient' && (
          <>
            {/* Screen 1: Home Landing Page */}
            {currentView === 'home' && (
              <HomeView
                onStartBooking={() => handleStartBooking()}
                onSelectDepartment={(deptName) => handleStartBooking(deptName, '')}
                onSelectDoctor={(docId) => handleStartBooking('', docId)}
              />
            )}

            {/* Screens 3, 4, 5: Booking Wizard + Double Booking Alert + Confirmation QR */}
            {currentView === 'booking' && (
              <BookingWizard
                initialDepartment={bookingPrefillDept}
                initialDoctorId={bookingPrefillDoctorId}
                user={user}
                appointments={appointments}
                onAddAppointment={handleAddAppointment}
                onCancel={() => setCurrentView('home')}
                onGoToMyAppointments={() => setCurrentView('my-appointments')}
              />
            )}

            {/* Screen 6: My Appointments + Cancel & Reschedule Modals */}
            {currentView === 'my-appointments' && (
              <MyAppointmentsView
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                onRescheduleAppointment={handleRescheduleAppointment}
                onStartBooking={() => handleStartBooking()}
              />
            )}

            {/* Screen 7: Notification Settings (SMS/Email 24h & 1h) */}
            {currentView === 'notification-settings' && (
              <NotificationSettingsView
                settings={notificationSettings}
                onUpdateSettings={(newSettings) => {
                  setNotificationSettings(newSettings);
                  showToast('Đã lưu cấu hình nhắc lịch tự động!', 'success');
                }}
              />
            )}

            {/* Giao diện 4.1.13: Check-in and Real-Time Queue Tracking Interface (FR-12, FR-13, UC-04) */}
            {currentView === 'queue' && (
              <CheckInAndQueueTrackingView
                appointments={appointments}
                onCheckInSuccess={handleCheckInSuccess}
                user={user}
              />
            )}

            {/* Giao diện 4.1.14: Payment and Health Insurance Verification Interface (FR-19, FR-20, UC-09) */}
            {currentView === 'payment' && (
              <PaymentBillingView
                appointment={appointments.find(a => a.id === 'APT-20261115-003') || appointments[0]}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}

            {/* Screen 15: Longitudinal EMR Records (Could Have) */}
            {currentView === 'emr' && (
              <EmrRecordsView />
            )}

            {/* Screen 16: BHYT Health Insurance Lookup (Could Have) */}
            {currentView === 'bhyt' && (
              <InsuranceBhytView />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* 2. STAFF PORTAL VIEWS (Screens 8 - 10)                     */}
        {/* ========================================================= */}
        {currentRole === 'staff' && (
          <>
            {/* Screen 8: Reception Dashboard */}
            {currentView === 'reception-dashboard' && (
              <ReceptionDashboardView
                appointments={appointments}
                onQuickCheckIn={handleCheckInSuccess}
                onNavigateToTimetable={() => setCurrentView('staff-timetable')}
                onNavigateToCheckIn={() => setCurrentView('checkin')}
              />
            )}

            {/* Screen 9: Staff Timetable & Collision-Checked Proxy Booking */}
            {currentView === 'staff-timetable' && (
              <StaffTimetableView
                appointments={appointments}
                onAddAppointment={handleAddAppointment}
              />
            )}

            {/* Giao diện 4.1.13: Check-in and Real-Time Queue Tracking Interface (FR-12, FR-13, UC-04) */}
            {currentView === 'checkin' && (
              <CheckInAndQueueTrackingView
                appointments={appointments}
                onCheckInSuccess={handleCheckInSuccess}
                user={user}
              />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* 3. DOCTOR PORTAL VIEWS (Screens 12 - 13)                   */}
        {/* ========================================================= */}
        {currentRole === 'doctor' && (
          <>
            {/* Screen 12: Doctor Examination Dashboard & Call Patient */}
            {currentView === 'doctor-exam' && (
              <DoctorPortalView
                appointments={appointments}
                onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                onCompleteExam={handleCompleteExam}
              />
            )}

            {/* Screen 13: Doctor Shift, Slot Duration & Leave Management */}
            {currentView === 'doctor-schedule' && (
              <DoctorScheduleManagementView
                onSaveSuccess={() => showToast('Đã lưu cấu hình lịch làm việc của Bác sĩ!', 'success')}
              />
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* 4. ADMIN & MANAGEMENT PORTAL VIEWS (4.1.15 & Screen 17)   */}
        {/* ========================================================= */}
        {currentRole === 'admin' && (
          <>
            {/* Giao diện 4.1.15: System Administration Interface (FR-18, NFR-01, NFR-03, BR-02) */}
            {(currentView === 'admin-system' || currentView === 'home') && (
              <SystemAdministrationView />
            )}

            {/* Screen 17: Management Analytics, KPI & BA Evaluation */}
            {currentView === 'analytics' && (
              <AnalyticsReportsView />
            )}
          </>
        )}

      </main>

      {/* Screen 2: OTP Auth Modal (Usable across the whole system) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Chào mừng ${loggedInUser.name} đã đăng nhập!`, 'success');
        }}
      />

      {/* Drawer: Automated 24h & 1h Reminder Notifications */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        appointments={appointments}
      />

      {/* Mobile Bottom Quick Navigation */}
      <nav className="xl:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around text-[9px] font-semibold text-slate-500 shadow-lg">
        {currentRole === 'patient' && (
          <>
            <button
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg ${currentView === 'home' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Home className="w-4 h-4" />
              <span>Trang chủ</span>
            </button>
            <button
              onClick={() => handleStartBooking()}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg ${currentView === 'booking' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Đặt lịch</span>
            </button>
            <button
              onClick={() => setCurrentView('queue')}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg ${currentView === 'queue' ? 'text-indigo-600 font-bold' : ''}`}
            >
              <Tv className="w-4 h-4 text-indigo-600" />
              <span>Hàng đợi</span>
            </button>
            <button
              onClick={() => setCurrentView('my-appointments')}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg ${currentView === 'my-appointments' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>Lịch của tôi</span>
            </button>
            <button
              onClick={() => setCurrentView('payment')}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg ${currentView === 'payment' ? 'text-emerald-600 font-bold' : ''}`}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Thanh toán</span>
            </button>
          </>
        )}

        {currentRole === 'staff' && (
          <>
            <button
              onClick={() => setCurrentView('reception-dashboard')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg ${currentView === 'reception-dashboard' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Users className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentView('staff-timetable')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg ${currentView === 'staff-timetable' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Lịch Bác sĩ</span>
            </button>
            <button
              onClick={() => setCurrentView('checkin')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg ${currentView === 'checkin' ? 'text-teal-700 font-bold' : ''}`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Check-in</span>
            </button>
          </>
        )}

        {currentRole === 'doctor' && (
          <>
            <button
              onClick={() => setCurrentView('doctor-exam')}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg ${currentView === 'doctor-exam' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Khám bệnh</span>
            </button>
            <button
              onClick={() => setCurrentView('doctor-schedule')}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg ${currentView === 'doctor-schedule' ? 'text-teal-700 font-bold' : ''}`}
            >
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Lịch làm việc</span>
            </button>
          </>
        )}

        {currentRole === 'admin' && (
          <button
            onClick={() => setCurrentView('analytics')}
            className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-lg text-teal-700 font-bold`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Báo cáo Thống kê & Phân tích BA</span>
          </button>
        )}
      </nav>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-800 text-sm">
            <HeartPulse className="w-4 h-4 text-teal-600" />
            <span>MediFlow Clinic Appointment Booking System</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Bài tập nhóm môn Phân tích nghiệp vụ (Business Analysis) • Trường Công nghệ - Đại học Kinh tế Quốc dân (NEU)
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            Thực hiện: Nhóm 7
          </p>
        </div>
      </footer>

    </div>
  );
}
