// Dữ liệu mẫu (Mock Data) mở rộng chuẩn nghiệp vụ y tế cho prototype MediFlow Clinic

export const DEPARTMENTS = [
  {
    id: 'dept-1',
    name: 'Nội Tổng Quát',
    icon: 'Stethoscope',
    description: 'Chẩn đoán và điều trị các bệnh lý nội khoa người lớn',
    color: 'from-blue-500 to-cyan-500',
    doctorsCount: 4
  },
  {
    id: 'dept-2',
    name: 'Nhi Khoa',
    icon: 'Baby',
    description: 'Chăm sóc sức khỏe toàn diện, tiêm chủng và dinh dưỡng cho trẻ',
    color: 'from-amber-500 to-orange-500',
    doctorsCount: 3
  },
  {
    id: 'dept-3',
    name: 'Tim Mạch',
    icon: 'HeartPulse',
    description: 'Thăm khám tim mạch chuyên sâu, điện tim, siêu âm Doppler',
    color: 'from-rose-500 to-pink-500',
    doctorsCount: 3
  },
  {
    id: 'dept-4',
    name: 'Tai Mũi Họng',
    icon: 'Activity',
    description: 'Nội soi tầm soát và điều trị các bệnh lý đường hô hấp trên',
    color: 'from-emerald-500 to-teal-500',
    doctorsCount: 3
  },
  {
    id: 'dept-5',
    name: 'Da Liễu & Thẩm Mỹ',
    icon: 'Sparkles',
    description: 'Khám da, trị mụn, dị ứng và phục hồi da liễu công nghệ cao',
    color: 'from-purple-500 to-indigo-500',
    doctorsCount: 2
  },
  {
    id: 'dept-6',
    name: 'Sản Phụ Khoa',
    icon: 'ShieldPlus',
    description: 'Khám thai định kỳ, sàng lọc dị tật và chăm sóc sức khỏe phụ nữ',
    color: 'from-pink-500 to-rose-400',
    doctorsCount: 3
  }
];

export const DOCTORS = [
  {
    id: 'doc-1',
    name: 'BS.CKII Nguyễn Văn An',
    title: 'Bác sĩ Chuyên khoa II - Trưởng khoa Nội',
    departmentId: 'dept-1',
    departmentName: 'Nội Tổng Quát',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 328,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    fee: 350000,
    room: 'Phòng 201 - Tầng 2, Nhà A',
    bio: 'Nguyên Phó Trưởng khoa Nội BV Bạch Mai, chuyên gia hàng đầu về đái tháo đường, tăng huyết áp và hội chứng chuyển hóa.',
    nextAvailable: 'Hôm nay, 14:00',
    workingDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    slotDurationMinutes: 30,
    maxPatientsPerSlot: 1
  },
  {
    id: 'doc-2',
    name: 'ThS.BS Trần Thị Mai Hương',
    title: 'Thạc sĩ - Bác sĩ Chuyên khoa Nhi',
    departmentId: 'dept-2',
    departmentName: 'Nhi Khoa',
    experienceYears: 12,
    rating: 5.0,
    reviewCount: 412,
    avatar: 'https://images.unsplash.com/photo-1594824813583-a4422e1cb166?w=300&auto=format&fit=crop&q=80',
    fee: 300000,
    room: 'Phòng 105 - Tầng 1, Nhà B (Khu Nhi)',
    bio: 'Bác sĩ từng tu nghiệp tại Bệnh viện Nhi Trung ương và Bệnh viện Hoàng gia Melbourne, đặc biệt nhẹ nhàng và thấu hiểu tâm lý trẻ.',
    nextAvailable: 'Ngày mai, 08:30',
    workingDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 6', 'Chủ nhật'],
    slotDurationMinutes: 30,
    maxPatientsPerSlot: 1
  },
  {
    id: 'doc-3',
    name: 'PGS.TS.BS Lê Hoàng Nam',
    title: 'Phó Giáo sư, Tiến sĩ - Cố vấn Tim Mạch',
    departmentId: 'dept-3',
    departmentName: 'Tim Mạch',
    experienceYears: 24,
    rating: 4.95,
    reviewCount: 520,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    fee: 500000,
    room: 'Phòng 304 - Tầng 3, Nhà A',
    bio: 'Giảng viên cao cấp ĐH Y Hà Nội, hơn 20 năm can thiệp mạch vành và điều trị suy tim phức tạp.',
    nextAvailable: 'Hôm nay, 15:30',
    workingDays: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
    slotDurationMinutes: 30,
    maxPatientsPerSlot: 1
  },
  {
    id: 'doc-4',
    name: 'BS.CKI Phạm Quốc Bảo',
    title: 'Bác sĩ Chuyên khoa I Tai Mũi Họng',
    departmentId: 'dept-4',
    departmentName: 'Tai Mũi Họng',
    experienceYears: 9,
    rating: 4.85,
    reviewCount: 194,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
    fee: 280000,
    room: 'Phòng 102 - Tầng 1, Nhà A',
    bio: 'Chuyên gia nội soi thanh quản và điều trị viêm xoang mạn, viêm amidan bằng sóng Radio cao tần.',
    nextAvailable: 'Hôm nay, 10:00',
    workingDays: ['Thứ 2', 'Thứ 4', 'Thứ 6', 'Chủ nhật'],
    slotDurationMinutes: 30,
    maxPatientsPerSlot: 1
  },
  {
    id: 'doc-5',
    name: 'BS.CKI Đỗ Thanh Thảo',
    title: 'Bác sĩ Da Liễu & Laser Thẩm Mỹ',
    departmentId: 'dept-5',
    departmentName: 'Da Liễu & Thẩm Mỹ',
    experienceYears: 10,
    rating: 4.9,
    reviewCount: 265,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    fee: 320000,
    room: 'Phòng 402 - Tầng 4, Nhà B',
    bio: 'Thành viên Hội Da Liễu Việt Nam, chuyên điều trị viêm da cơ địa, nám da và trẻ hóa da chuẩn y khoa.',
    nextAvailable: 'Ngày mai, 09:00',
    workingDays: ['Thứ 2', 'Thứ 3', 'Thứ 5', 'Thứ 7'],
    slotDurationMinutes: 30,
    maxPatientsPerSlot: 1
  }
];

export const TIME_SLOTS = [
  '08:00 - 08:30',
  '08:30 - 09:00',
  '09:00 - 09:30',
  '09:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '13:30 - 14:00',
  '14:00 - 14:30',
  '14:30 - 15:00',
  '15:00 - 15:30',
  '15:30 - 16:00',
  '16:00 - 16:30'
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-20261115-001',
    patientName: 'Trần Văn Mạnh',
    patientPhone: '0912 345 678',
    patientEmail: 'manh.tran@gmail.com',
    patientDob: '1985-06-12',
    gender: 'Nam',
    bhytCode: 'GD4010203040501',
    emrCode: 'EMR-88421',
    doctorId: 'doc-1',
    doctorName: 'BS.CKII Nguyễn Văn An',
    departmentName: 'Nội Tổng Quát',
    date: '2026-11-15',
    timeSlot: '08:30 - 09:00',
    room: 'Phòng 201 - Tầng 2, Nhà A',
    fee: 350000,
    status: 'completed',
    queueNumber: 1,
    reason: 'Tái khám huyết áp và xét nghiệm mỡ máu định kỳ',
    createdAt: '2026-11-10 14:20',
    diagnosis: 'Tăng huyết áp nguyên phát độ 2 - Rối loạn lipid máu hỗn hợp',
    prescription: [
      { name: 'Amlodipine 5mg', dosage: '1 viên / ngày (uống buổi sáng)', quantity: '30 viên' },
      { name: 'Atorvastatin 20mg', dosage: '1 viên / ngày (uống buổi tối)', quantity: '30 viên' }
    ],
    doctorNotes: 'Huyết áp kiểm soát tốt (125/80 mmHg). Hẹn tái khám sau 30 ngày.',
    paymentStatus: 'paid', // 'paid' | 'pending'
    paymentMethod: 'VietQR / Ngân hàng',
    reminder24hSent: true,
    reminder1hSent: true,
    channel: 'SMS + Email'
  },
  {
    id: 'APT-20261115-002',
    patientName: 'Lê Thu Trang',
    patientPhone: '0988 765 432',
    patientEmail: 'trang.le@outlook.com',
    patientDob: '1996-03-22',
    gender: 'Nữ',
    bhytCode: 'DN4010203040502',
    emrCode: 'EMR-92014',
    doctorId: 'doc-1',
    doctorName: 'BS.CKII Nguyễn Văn An',
    departmentName: 'Nội Tổng Quát',
    date: '2026-11-15',
    timeSlot: '09:00 - 09:30',
    room: 'Phòng 201 - Tầng 2, Nhà A',
    fee: 350000,
    status: 'in-progress', // Đang trong phòng khám
    queueNumber: 2,
    reason: 'Đau tức ngực trái khi gắng sức, khó thở nhẹ về đêm',
    createdAt: '2026-11-12 09:15',
    diagnosis: 'Theo dõi đau thắt ngực do gắng sức / Chỉ định đo ECG và Siêu âm tim Doppler',
    prescription: [],
    doctorNotes: 'Đang tiến hành đo điện tâm đồ tại phòng chức năng.',
    paymentStatus: 'paid',
    paymentMethod: 'MoMo',
    reminder24hSent: true,
    reminder1hSent: true,
    channel: 'SMS + Email'
  },
  {
    id: 'APT-20261115-003',
    patientName: 'Nguyễn Tiến Dũng',
    patientPhone: '0904 888 999',
    patientEmail: 'tiendung.ngo@neu.edu.vn',
    patientDob: '2004-10-15',
    gender: 'Nam',
    bhytCode: 'SV4010203040503',
    emrCode: 'EMR-11247',
    doctorId: 'doc-1',
    doctorName: 'BS.CKII Nguyễn Văn An',
    departmentName: 'Nội Tổng Quát',
    date: '2026-11-15',
    timeSlot: '10:00 - 10:30',
    room: 'Phòng 201 - Tầng 2, Nhà A',
    fee: 350000,
    status: 'checked-in', // Đã check in, đang chờ trong hàng đợi
    queueNumber: 3,
    reason: 'Đau dạ dày âm ỉ sau ăn kèm ợ hơi, chướng bụng kéo dài 1 tuần',
    createdAt: '2026-11-14 10:00',
    diagnosis: '',
    prescription: [],
    doctorNotes: '',
    paymentStatus: 'pending', // Chưa thanh toán
    paymentMethod: 'Thanh toán tại quầy',
    reminder24hSent: true,
    reminder1hSent: true,
    channel: 'SMS + Email'
  },
  {
    id: 'APT-20261115-004',
    patientName: 'Bé Hoàng Minh Triết (Mẹ: Phạm Lan)',
    patientPhone: '0977 123 999',
    patientEmail: 'lan.pham@gmail.com',
    patientDob: '2022-08-10',
    gender: 'Nam',
    bhytCode: 'TE4010203040504',
    emrCode: 'EMR-33190',
    doctorId: 'doc-2',
    doctorName: 'ThS.BS Trần Thị Mai Hương',
    departmentName: 'Nhi Khoa',
    date: '2026-11-15',
    timeSlot: '09:30 - 10:00',
    room: 'Phòng 105 - Tầng 1, Nhà B (Khu Nhi)',
    fee: 300000,
    status: 'confirmed',
    queueNumber: 4,
    reason: 'Sốt cao 38.5 độ ngày thứ 2, ho có đờm, biếng ăn',
    createdAt: '2026-11-14 18:30',
    diagnosis: '',
    prescription: [],
    doctorNotes: '',
    paymentStatus: 'paid',
    paymentMethod: 'VNPay-QR',
    reminder24hSent: true,
    reminder1hSent: false,
    channel: 'SMS'
  },
  {
    id: 'APT-20261115-005',
    patientName: 'Phạm Đức Hòa',
    patientPhone: '0936 555 777',
    patientEmail: 'hoa.pham@yahoo.com',
    patientDob: '1970-12-05',
    gender: 'Nam',
    bhytCode: 'HT4010203040505',
    emrCode: 'EMR-45129',
    doctorId: 'doc-3',
    doctorName: 'PGS.TS.BS Lê Hoàng Nam',
    departmentName: 'Tim Mạch',
    date: '2026-11-15',
    timeSlot: '14:00 - 14:30',
    room: 'Phòng 304 - Tầng 3, Nhà A',
    fee: 500000,
    status: 'confirmed',
    queueNumber: 5,
    reason: 'Khám kiểm tra sau đặt stent mạch vành 6 tháng',
    createdAt: '2026-11-13 11:00',
    diagnosis: '',
    prescription: [],
    doctorNotes: '',
    paymentStatus: 'pending',
    paymentMethod: 'Thanh toán tại quầy',
    reminder24hSent: true,
    reminder1hSent: false,
    channel: 'Email'
  }
];

export const MOCK_NOTIFICATION_SETTINGS = {
  smsEnabled: true,
  emailEnabled: true,
  reminder24h: true,
  reminder1h: true,
  queueStatusUpdates: true,
  phoneNumber: '0904 888 999',
  email: 'tiendung.ngo@neu.edu.vn'
};

// Dữ liệu tra cứu BHYT mẫu (Màn 16)
export const MOCK_BHYT_REGISTRY = {
  'SV4010203040503': {
    code: 'SV4010203040503',
    patientName: 'NGUYỄN TIẾN DŨNG',
    dob: '15/10/2004',
    gender: 'Nam',
    registeredHospital: '01-014 - Bệnh viện Bạch Mai (Hà Nội)',
    benefitRate: 80, // Hưởng 80%
    validFrom: '01/01/2026',
    validTo: '31/12/2026',
    status: 'active',
    statusText: 'Thẻ BHYT đang có hiệu lực sử dụng'
  },
  'DN4010203040506': {
    code: 'DN4010203040506',
    patientName: 'NGUYỄN TIẾN DŨNG',
    dob: '15/10/2004',
    gender: 'Nam',
    registeredHospital: '01-002 - Bệnh viện Đa khoa Đống Đa',
    benefitRate: 80,
    validFrom: '01/01/2026',
    validTo: '31/12/2026',
    status: 'active',
    statusText: 'Thẻ BHYT đang có hiệu lực sử dụng'
  },
  'TE4010203040504': {
    code: 'TE4010203040504',
    patientName: 'HOÀNG MINH TRIẾT',
    dob: '10/08/2022',
    gender: 'Nam',
    registeredHospital: '01-016 - Bệnh viện Nhi Trung ương',
    benefitRate: 100, // Trẻ em < 6 tuổi hưởng 100%
    validFrom: '10/08/2022',
    validTo: '10/08/2028',
    status: 'active',
    statusText: 'Đối tượng trẻ em dưới 6 tuổi (Hưởng 100% BHYT)'
  }
};

// Dữ liệu Hồ sơ bệnh án điện tử EMR mẫu (Màn 15)
export const MOCK_PATIENT_EMR = {
  emrCode: 'EMR-11247',
  patientName: 'Nguyễn Tiến Dũng',
  dob: '15/10/2004',
  gender: 'Nam',
  bloodGroup: 'O+',
  allergies: 'Không ghi nhận dị ứng thuốc (Penicillin âm tính)',
  chronicDiseases: 'Viêm dạ dày Hp âm tính (đợt tái phát), Tiền sử trào ngược dạ dày thực quản (GERD)',
  emergencyContact: 'Nguyễn Văn Hùng (Bố) - 0913 222 111',
  history: [
    {
      date: '10/08/2026',
      department: 'Nội Tổng Quát',
      doctor: 'BS.CKII Nguyễn Văn An',
      diagnosis: 'Trào ngược dạ dày thực quản độ A (GERD)',
      prescription: 'Esomeprazole 40mg, Gaviscon Dual Action',
      notes: 'Hết triệu chứng sau 2 tuần điều trị, khuyên kiêng đồ chua cay và ăn khuya.'
    },
    {
      date: '15/03/2026',
      department: 'Tai Mũi Họng',
      doctor: 'BS.CKI Phạm Quốc Bảo',
      diagnosis: 'Viêm mũi xoang xuất tiết cấp do thời tiết',
      prescription: 'Clarityne 10mg, Xịt mũi Nasonex',
      notes: 'Rửa mũi nước muối sinh lý hàng ngày.'
    }
  ]
};

// Dữ liệu Báo cáo Thống kê Quản lý (Màn 17)
export const MOCK_ANALYTICS = {
  summary: {
    totalAppointmentsMonth: 842,
    completedRate: 91.2,
    cancellationRate: 5.4,
    noShowRate: 3.4,
    avgWaitTimeMinutes: 12.8,
    peakHour: '08:30 - 10:00'
  },
  dailyBookings: [
    { day: 'T2 (10/11)', count: 128 },
    { day: 'T3 (11/11)', count: 142 },
    { day: 'T4 (12/11)', count: 135 },
    { day: 'T5 (13/11)', count: 156 },
    { day: 'T6 (14/11)', count: 164 },
    { day: 'T7 (15/11)', count: 117 }
  ],
  departmentShare: [
    { name: 'Nội Tổng Quát', percentage: 34, color: 'bg-blue-500' },
    { name: 'Nhi Khoa', percentage: 26, color: 'bg-amber-500' },
    { name: 'Tim Mạch', percentage: 18, color: 'bg-rose-500' },
    { name: 'Tai Mũi Họng', percentage: 14, color: 'bg-emerald-500' },
    { name: 'Da Liễu & Khác', percentage: 8, color: 'bg-purple-500' }
  ]
};
