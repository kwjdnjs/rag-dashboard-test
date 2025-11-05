// Mock data for the application

export interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  department: string;
  position: string;
  role: 'User' | 'Admin' | 'Master' | 'Super Master';
  profileImage?: string;
}

export interface Department {
  id: string;
  name: string;
  parentId?: string;
  organizationId: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  departmentId: string;
  tags: string[];
  accessLevel: 'public' | 'department' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  departmentId: string;
  createdAt: string;
  createdBy: string;
  references?: string[];
}

export interface ChatLog {
  id: string;
  userId: string;
  userName: string;
  question: string;
  answer: string;
  responseType: 'FAQ' | '용어정의' | '스몰톡';
  responseTime: number;
  timestamp: string;
  feedback?: 'positive' | 'negative';
  referencedDocuments?: string[];
}

export interface DashboardStats {
  totalQueries: number;
  successRate: number;
  avgResponseTime: number;
  userSatisfaction: number;
  dailyQueries: { date: string; count: number }[];
  responseTypes: { type: string; count: number }[];
  topDocuments: { name: string; count: number }[];
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: '김관리',
    nickname: '관리자',
    department: 'IT',
    position: '팀장',
    role: 'Master',
  },
  {
    id: '2',
    email: 'user@company.com',
    name: '이사용',
    nickname: '사용자1',
    department: 'HR',
    position: '사원',
    role: 'User',
  },
];

// Mock Departments
export const mockDepartments: Department[] = [
  { id: '1', name: '경영지원', organizationId: '1' },
  { id: '2', name: 'IT', parentId: '1', organizationId: '1' },
  { id: '3', name: 'HR', parentId: '1', organizationId: '1' },
  { id: '4', name: '재무', parentId: '1', organizationId: '1' },
  { id: '5', name: '마케팅', organizationId: '1' },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: '1',
    name: '직원 복지 가이드.pdf',
    type: 'pdf',
    size: 2048576,
    uploadDate: '2024-11-01',
    uploadedBy: '김관리',
    departmentId: '3',
    tags: ['HR', '복지', '가이드'],
    accessLevel: 'public',
    status: 'approved',
  },
  {
    id: '2',
    name: 'IT 보안 정책.docx',
    type: 'docx',
    size: 1024000,
    uploadDate: '2024-11-02',
    uploadedBy: '김관리',
    departmentId: '2',
    tags: ['IT', '보안', '정책'],
    accessLevel: 'department',
    status: 'approved',
  },
  {
    id: '3',
    name: '2024년 예산 계획.xlsx',
    type: 'xlsx',
    size: 3145728,
    uploadDate: '2024-11-03',
    uploadedBy: '박재무',
    departmentId: '4',
    tags: ['재무', '예산', '2024'],
    accessLevel: 'admin',
    status: 'pending',
  },
  {
    id: '4',
    name: '신입사원 온보딩 매뉴얼.pdf',
    type: 'pdf',
    size: 4194304,
    uploadDate: '2024-10-28',
    uploadedBy: '이인사',
    departmentId: '3',
    tags: ['HR', '온보딩', '교육'],
    accessLevel: 'public',
    status: 'approved',
  },
];

// Mock FAQs
export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: '연차는 어떻게 신청하나요?',
    answer: '사내 포털의 전자결재 시스템에서 "휴가신청" 메뉴를 선택하여 신청할 수 있습니다.',
    tags: ['HR', '휴가', '연차'],
    departmentId: '3',
    createdAt: '2024-10-15',
    createdBy: '이인사',
  },
  {
    id: '2',
    question: 'VPN 접속이 안 될 때는 어떻게 하나요?',
    answer: 'IT 헬프데스크(내선 1234)로 연락하시거나, support@company.com으로 문의해 주세요.',
    tags: ['IT', 'VPN', '기술지원'],
    departmentId: '2',
    createdAt: '2024-10-20',
    createdBy: '김기술',
  },
  {
    id: '3',
    question: '출장비는 어떻게 정산하나요?',
    answer: '출장 종료 후 7일 이내에 영수증과 함께 경비정산 시스템에 등록하시면 됩니다.',
    tags: ['재무', '출장', '정산'],
    departmentId: '4',
    createdAt: '2024-10-25',
    createdBy: '박재무',
  },
];

// Mock Chat Logs
export const mockChatLogs: ChatLog[] = [
  {
    id: '1',
    userId: '2',
    userName: '이사용',
    question: '연차 신청 방법이 궁금합니다',
    answer: '사내 포털의 전자결재 시스템에서 "휴가신청" 메뉴를 선택하여 신청할 수 있습니다.',
    responseType: 'FAQ',
    responseTime: 1.2,
    timestamp: '2024-11-05 09:15:30',
    feedback: 'positive',
    referencedDocuments: ['직원 복지 가이드.pdf'],
  },
  {
    id: '2',
    userId: '2',
    userName: '이사용',
    question: 'VPN이 연결되지 않아요',
    answer: 'IT 헬프데스크(내선 1234)로 연락하시거나, support@company.com으로 문의해 주세요.',
    responseType: 'FAQ',
    responseTime: 0.8,
    timestamp: '2024-11-05 10:30:15',
    feedback: 'positive',
    referencedDocuments: ['IT 보안 정책.docx'],
  },
  {
    id: '3',
    userId: '3',
    userName: '박신입',
    question: '안녕하세요!',
    answer: '안녕하세요! 무엇을 도와드릴까요?',
    responseType: '스몰톡',
    responseTime: 0.3,
    timestamp: '2024-11-05 11:45:22',
    feedback: 'positive',
  },
  {
    id: '4',
    userId: '4',
    userName: '최직원',
    question: 'ROI가 무엇인가요?',
    answer: 'ROI(Return on Investment)는 투자 대비 수익률을 의미하며, 투자로 인한 이익을 투자 비용으로 나눈 값입니다.',
    responseType: '용어정의',
    responseTime: 1.5,
    timestamp: '2024-11-05 14:20:18',
    feedback: 'positive',
  },
];

// Mock Dashboard Statistics
export const mockDashboardStats: DashboardStats = {
  totalQueries: 1247,
  successRate: 94.5,
  avgResponseTime: 1.3,
  userSatisfaction: 4.2,
  dailyQueries: [
    { date: '10/30', count: 45 },
    { date: '10/31', count: 52 },
    { date: '11/01', count: 48 },
    { date: '11/02', count: 38 },
    { date: '11/03', count: 42 },
    { date: '11/04', count: 55 },
    { date: '11/05', count: 61 },
  ],
  responseTypes: [
    { type: 'FAQ', count: 580 },
    { type: '용어정의', count: 320 },
    { type: '스몰톡', count: 347 },
  ],
  topDocuments: [
    { name: '직원 복지 가이드.pdf', count: 145 },
    { name: 'IT 보안 정책.docx', count: 98 },
    { name: '신입사원 온보딩 매뉴얼.pdf', count: 87 },
    { name: '출장비 정산 가이드.pdf', count: 72 },
    { name: '재택근무 규정.pdf', count: 65 },
  ],
};

// Mock FAQ Suggestions
export const mockFAQSuggestions = [
  {
    id: '1',
    question: '재택근무 신청은 어떻게 하나요?',
    frequency: 15,
    suggestedAnswer: '근무 3일 전까지 팀장 승인을 받아 시스템에 등록하시면 됩니다.',
    status: 'pending',
  },
  {
    id: '2',
    question: '사내 카페 운영시간은?',
    frequency: 12,
    suggestedAnswer: '평일 오전 8시부터 오후 6시까지 운영됩니다.',
    status: 'pending',
  },
  {
    id: '3',
    question: '명함 제작 신청 방법은?',
    frequency: 8,
    suggestedAnswer: '총무팀에 이메일로 신청하시면 됩니다. (필요정보: 이름, 부서, 직급, 연락처)',
    status: 'pending',
  },
];
