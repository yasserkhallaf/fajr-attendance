import React, { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const APP_VERSION = 'FAJR-ATTENDANCE-V8'

const defaultUsers = [
  {
    username: 'yasserkhallaf',
    password_hash: 'd1b39203547a4ae06260a3c3f4f6b1c8e218e3518de869d4bfa899f6ebed3d8d',
    display_name: 'ياسر خلاف',
    role: 'admin',
    site_scope: 'الكل',
  },
  {
    username: 'Ahmed208',
    password_hash: 'aae9ee5b6b7b41c2528dec1714e2b385d69b8c7dde33e6fea8c8973a99a49c7a',
    display_name: 'أحمد الصعيدي',
    role: 'supervisor',
    site_scope: 'فجر الطرق',
  },
  {
    username: 'Mostafaelfwe',
    password_hash: 'f3b0bcb03688d953b52596ceba8e7f04f9ef41231a2f56e354c1e9dd4084a262',
    display_name: 'مصطفى الفوي',
    role: 'supervisor',
    site_scope: 'كدمي جازان',
  },
  {
    username: 'Dhurma Project',
    password_hash: '9a4ad8033839a886928cbe17a09db4d005efa540180e5841ad434c7c73c0b650',
    display_name: 'مشرف مشروع ضرما',
    role: 'supervisor',
    site_scope: 'ضرما',
  },
]

const setupSql = `
create extension if not exists pgcrypto;

create table if not exists public.users_profile (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password text,
  password_hash text,
  display_name text not null,
  role text not null default 'supervisor',
  site_scope text default 'الكل',
  created_at timestamptz default now()
);

alter table public.users_profile add column if not exists password text;
alter table public.users_profile add column if not exists password_hash text;
alter table public.users_profile add column if not exists display_name text;
alter table public.users_profile add column if not exists role text default 'supervisor';
alter table public.users_profile add column if not exists site_scope text default 'الكل';

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

create table if not exists public.workers (
  id uuid primary key default gen_random_uuid(),
  employee_no text unique not null,
  name text not null,
  job_title text,
  site_name text,
  wage_type text default 'شهري',
  daily_rate numeric default 30,
  mobile text,
  national_id text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.workers add column if not exists job_title text;
alter table public.workers add column if not exists site_name text;
alter table public.workers add column if not exists wage_type text default 'شهري';
alter table public.workers add column if not exists daily_rate numeric default 30;
alter table public.workers add column if not exists mobile text;
alter table public.workers add column if not exists national_id text;
alter table public.workers add column if not exists is_active boolean default true;
alter table public.workers add column if not exists updated_at timestamptz default now();

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  attendance_date date not null,
  worker_id uuid not null references public.workers(id) on delete cascade,
  status text not null default 'حاضر',
  check_in_time time,
  check_out_time time,
  overtime_hours numeric default 0,
  notes text,
  supervisor_username text,
  recorded_site text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(attendance_date, worker_id)
);

alter table public.attendance add column if not exists check_in_time time;
alter table public.attendance add column if not exists check_out_time time;
alter table public.attendance add column if not exists overtime_hours numeric default 0;
alter table public.attendance add column if not exists notes text;
alter table public.attendance add column if not exists supervisor_username text;
alter table public.attendance add column if not exists recorded_site text;
alter table public.attendance add column if not exists updated_at timestamptz default now();

create table if not exists public.daily_reports (
  id uuid primary key default gen_random_uuid(),
  report_date date not null,
  site_name text not null,
  supervisor_name text,
  workers_count integer default 0,
  equipment text,
  work_done text,
  notes text,
  image_urls text[] default '{}',
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.daily_reports add column if not exists supervisor_name text;
alter table public.daily_reports add column if not exists workers_count integer default 0;
alter table public.daily_reports add column if not exists equipment text;
alter table public.daily_reports add column if not exists work_done text;
alter table public.daily_reports add column if not exists notes text;
alter table public.daily_reports add column if not exists image_urls text[] default '{}';
alter table public.daily_reports add column if not exists created_by text;
alter table public.daily_reports add column if not exists updated_at timestamptz default now();

alter table public.users_profile disable row level security;
alter table public.sites disable row level security;
alter table public.workers disable row level security;
alter table public.attendance disable row level security;
alter table public.daily_reports disable row level security;

insert into public.users_profile (username, password_hash, display_name, role, site_scope) values
('yasserkhallaf','d1b39203547a4ae06260a3c3f4f6b1c8e218e3518de869d4bfa899f6ebed3d8d','ياسر خلاف','admin','الكل'),
('Ahmed208','aae9ee5b6b7b41c2528dec1714e2b385d69b8c7dde33e6fea8c8973a99a49c7a','أحمد الصعيدي','supervisor','فجر الطرق'),
('Mostafaelfwe','f3b0bcb03688d953b52596ceba8e7f04f9ef41231a2f56e354c1e9dd4084a262','مصطفى الفوي','supervisor','كدمي جازان'),
('Dhurma Project','9a4ad8033839a886928cbe17a09db4d005efa540180e5841ad434c7c73c0b650','مشرف مشروع ضرما','supervisor','ضرما')
on conflict (username) do update set
password_hash = excluded.password_hash,
display_name = excluded.display_name,
role = excluded.role,
site_scope = excluded.site_scope;

insert into public.sites (name) values
('فجر الطرق'),
('ضرما'),
('كدمي جازان'),
('المحاني'),
('المدينة'),
('الحناكية'),
('الموية'),
('الطائف'),
('قلوة'),
('غير محدد')
on conflict (name) do nothing;

insert into storage.buckets (id, name, public)
values ('daily-reports', 'daily-reports', true)
on conflict (id) do update set public = true;

drop policy if exists daily_reports_public_read on storage.objects;
drop policy if exists daily_reports_public_insert on storage.objects;
drop policy if exists daily_reports_public_update on storage.objects;

create policy daily_reports_public_read on storage.objects
for select using (bucket_id = 'daily-reports');

create policy daily_reports_public_insert on storage.objects
for insert with check (bucket_id = 'daily-reports');

create policy daily_reports_public_update on storage.objects
for update using (bucket_id = 'daily-reports');
`

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function monthStr() {
  return new Date().toISOString().slice(0, 7)
}

function nowTime() {
  return new Date().toTimeString().slice(0, 5)
}

async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function exportCsv(filename, rows) {
  if (!rows.length) {
    alert('لا توجد بيانات للتصدير')
    return
  }
  const headers = Object.keys(rows[0])
  const csv = [
    headers.join(';'),
    ...rows.map((row) =>
      headers.map((h) => `"${String(row[h] ?? '').replaceAll('"', '""')}"`).join(';')
    ),
  ].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const colors = {
  dark: '#0f172a',
  slate: '#475569',
  muted: '#64748b',
  bg: '#f5f7fb',
  card: '#ffffff',
  border: '#e2e8f0',
  green: '#16a34a',
  red: '#dc2626',
  amber: '#d97706',
  blue: '#2563eb',
}

function cardStyle(extra = {}) {
  return {
    background: colors.card,
    borderRadius: 22,
    padding: 18,
    boxShadow: '0 12px 35px rgba(15, 23, 42, 0.06)',
    border: `1px solid ${colors.border}`,
    ...extra,
  }
}

function inputStyle(extra = {}) {
  return {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: `1px solid ${colors.border}`,
    background: '#fff',
    outline: 'none',
    fontSize: 14,
    color: colors.dark,
    boxSizing: 'border-box',
    ...extra,
  }
}

function buttonStyle(kind = 'primary', extra = {}) {
  const common = {
    padding: '11px 16px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 14,
    whiteSpace: 'nowrap',
    ...extra,
  }
  if (kind === 'outline') return { ...common, background: '#fff', color: colors.dark, border: `1px solid ${colors.border}` }
  if (kind === 'secondary') return { ...common, background: '#e9eef6', color: colors.dark }
  if (kind === 'success') return { ...common, background: colors.green, color: '#fff' }
  if (kind === 'danger') return { ...common, background: colors.red, color: '#fff' }
  if (kind === 'warning') return { ...common, background: colors.amber, color: '#fff' }
  if (kind === 'blue') return { ...common, background: colors.blue, color: '#fff' }
  return { ...common, background: colors.dark, color: '#fff' }
}

function labelStyle() {
  return { display: 'block', marginBottom: 7, color: colors.slate, fontSize: 13, fontWeight: 800 }
}

function tdStyle() {
  return { padding: 12, borderBottom: `1px solid ${colors.border}`, verticalAlign: 'middle' }
}

function PageTitle({ children, hint }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ margin: 0, fontSize: 26, color: colors.dark }}>{children}</h2>
      {hint ? <p style={{ margin: '6px 0 0', color: colors.slate }}>{hint}</p> : null}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={labelStyle()}>{label}</label>
      {children}
    </div>
  )
}

function Empty({ text = 'لا توجد بيانات' }) {
  return <div style={{ padding: 24, textAlign: 'center', color: colors.slate }}>{text}</div>
}

function StatusBadge({ value }) {
  const map = {
    حاضر: { bg: '#dcfce7', color: '#166534' },
    غائب: { bg: '#fee2e2', color: '#991b1b' },
    إجازة: { bg: '#fef3c7', color: '#92400e' },
    راحة: { bg: '#dbeafe', color: '#1e40af' },
    موقوف: { bg: '#e2e8f0', color: '#334155' },
  }
  const item = map[value] || { bg: '#e2e8f0', color: colors.dark }
  return <span style={{ background: item.bg, color: item.color, borderRadius: 999, padding: '6px 10px', fontWeight: 900 }}>{value}</span>
}

function Tabs({ active, setActive, role }) {
  const tabs = [
    ['dashboard', 'الرئيسية'],
    ['attendance', 'الحضور والانصراف'],
    ['dailyReport', 'التقرير اليومي'],
    ...(role === 'admin'
      ? [
          ['employees', 'إدارة الموظفين'],
          ['reports', 'التقارير'],
          ['setup', 'الإعداد'],
        ]
      : []),
  ]

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '18px 0' }}>
      {tabs.map(([key, label]) => (
        <button key={key} onClick={() => setActive(key)} style={buttonStyle(active === key ? 'primary' : 'outline')}>
          {label}
        </button>
      ))}
    </div>
  )
}

function Stat({ title, value, color = colors.dark }) {
  return (
    <div style={cardStyle({ minHeight: 115, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' })}>
      <div style={{ color: colors.slate, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 34, fontWeight: 900, color }}>{value}</div>
    </div>
  )
}

function AttendanceRow({ row, onSave, saveState }) {
  const [status, setStatus] = useState(row.status || 'حاضر')
  const [checkIn, setCheckIn] = useState(row.check_in_time ? String(row.check_in_time).slice(0, 5) : '')
  const [checkOut, setCheckOut] = useState(row.check_out_time ? String(row.check_out_time).slice(0, 5) : '')
  const [overtime, setOvertime] = useState(row.overtime_hours || 0)
  const [notes, setNotes] = useState(row.notes || '')

  useEffect(() => {
    setStatus(row.status || 'حاضر')
    setCheckIn(row.check_in_time ? String(row.check_in_time).slice(0, 5) : '')
    setCheckOut(row.check_out_time ? String(row.check_out_time).slice(0, 5) : '')
    setOvertime(row.overtime_hours || 0)
    setNotes(row.notes || '')
  }, [row.status, row.check_in_time, row.check_out_time, row.overtime_hours, row.notes])

  const payload = { status, check_in_time: checkIn || null, check_out_time: checkOut || null, overtime_hours: overtime, notes }

  return (
    <tr>
      <td style={tdStyle()}>{row.employee_no}</td>
      <td style={tdStyle()}><strong>{row.name}</strong></td>
      <td style={tdStyle()}>{row.job_title || '-'}</td>
      <td style={tdStyle()}>{row.site_name || '-'}</td>
      <td style={tdStyle()}>
        <select style={inputStyle({ minWidth: 105 })} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>حاضر</option>
          <option>غائب</option>
          <option>إجازة</option>
          <option>راحة</option>
        </select>
      </td>
      <td style={tdStyle()}>
        <input type="time" style={inputStyle({ minWidth: 120 })} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      </td>
      <td style={tdStyle()}>
        <input type="time" style={inputStyle({ minWidth: 120 })} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </td>
      <td style={tdStyle()}>
        <input type="number" min="0" step="0.5" style={inputStyle({ minWidth: 90 })} value={overtime} onChange={(e) => setOvertime(e.target.value)} />
      </td>
      <td style={tdStyle()}>
        <input style={inputStyle({ minWidth: 180 })} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="ملاحظة" />
      </td>
      <td style={tdStyle()}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={buttonStyle('success')} onClick={() => onSave({ ...payload, status: 'حاضر', check_in_time: checkIn || nowTime() })}>حضور</button>
          <button style={buttonStyle('blue')} onClick={() => onSave({ ...payload, check_out_time: checkOut || nowTime() })}>انصراف</button>
          <button style={buttonStyle('outline')} onClick={() => onSave(payload)}>{saveState === 'saving' ? 'حفظ...' : saveState === 'saved' ? 'تم' : 'حفظ'}</button>
        </div>
      </td>
    </tr>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [loginErr, setLoginErr] = useState('')
  const [tab, setTab] = useState('dashboard')
  const [sites, setSites] = useState([])
  const [workers, setWorkers] = useState([])
  const [attendance, setAttendance] = useState([])
  const [dailyReports, setDailyReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(todayStr())
  const [selectedMonth, setSelectedMonth] = useState(monthStr())
  const [siteFilter, setSiteFilter] = useState('الكل')
  const [search, setSearch] = useState('')
  const [saveState, setSaveState] = useState({})
  const [editingWorker, setEditingWorker] = useState(null)
  const [workerForm, setWorkerForm] = useState({
    employee_no: '',
    name: '',
    job_title: '',
    site_name: 'غير محدد',
    wage_type: 'شهري',
    daily_rate: 30,
    mobile: '',
    national_id: '',
    is_active: true,
  })
  const [reportForm, setReportForm] = useState({
    report_date: todayStr(),
    site_name: 'غير محدد',
    supervisor_name: '',
    workers_count: '',
    equipment: '',
    work_done: '',
    notes: '',
    files: [],
  })

  const envReady = Boolean(supabase)

  useEffect(() => {
    const saved = localStorage.getItem('fajr_user_v8')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUser(parsed)
        setReportForm((prev) => ({
          ...prev,
          supervisor_name: parsed.name || '',
          site_name: parsed.site_scope && parsed.site_scope !== 'الكل' ? parsed.site_scope : prev.site_name,
        }))
      } catch {
        localStorage.removeItem('fajr_user_v8')
      }
    }
  }, [])

  useEffect(() => {
    if (user && envReady) loadAll()
  }, [user])

  async function loadAll() {
    setLoading(true)
    const [sitesRes, workersRes, attendanceRes, reportsRes] = await Promise.all([
      supabase.from('sites').select('*').order('name'),
      supabase.from('workers').select('*').order('employee_no'),
      supabase
        .from('attendance')
        .select('*, workers(name, employee_no, site_name, job_title, wage_type, daily_rate, is_active)')
        .order('attendance_date', { ascending: false })
        .limit(5000),
      supabase.from('daily_reports').select('*').order('report_date', { ascending: false }).limit(500),
    ])

    if (!sitesRes.error) setSites(sitesRes.data || [])
    if (!workersRes.error) setWorkers(workersRes.data || [])
    if (!attendanceRes.error) setAttendance(attendanceRes.data || [])
    if (!reportsRes.error) setDailyReports(reportsRes.data || [])

    const errors = [sitesRes.error, workersRes.error, attendanceRes.error, reportsRes.error].filter(Boolean)
    if (errors.length) console.warn(errors)
    setLoading(false)
  }

  async function handleLogin() {
    setLoginErr('')
    if (!envReady) {
      setLoginErr('متغيرات Supabase غير موجودة في Vercel')
      return
    }
    const username = login.username.trim()
    const password = login.password
    if (!username || !password) {
      setLoginErr('اكتب اسم المستخدم وكلمة المرور')
      return
    }

    const { data, error } = await supabase
      .from('users_profile')
      .select('username, password_hash, display_name, role, site_scope')
      .eq('username', username)
      .single()

    if (error || !data?.password_hash) {
      setLoginErr('بيانات الدخول غير صحيحة أو جدول المستخدمين غير جاهز')
      return
    }

    const enteredHash = await sha256(password)
    if (enteredHash !== data.password_hash) {
      setLoginErr('بيانات الدخول غير صحيحة')
      return
    }

    const logged = {
      username: data.username,
      name: data.display_name,
      role: data.role,
      site_scope: data.site_scope || 'الكل',
    }
    setUser(logged)
    localStorage.setItem('fajr_user_v8', JSON.stringify(logged))
    setReportForm((prev) => ({
      ...prev,
      supervisor_name: logged.name || '',
      site_name: logged.site_scope && logged.site_scope !== 'الكل' ? logged.site_scope : prev.site_name,
    }))
  }

  function logout() {
    setUser(null)
    setTab('dashboard')
    localStorage.removeItem('fajr_user_v8')
  }

  const activeWorkers = useMemo(() => workers.filter((w) => w.is_active !== false), [workers])

  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const s = search.trim()
      const searchOk =
        !s ||
        String(w.employee_no || '').includes(s) ||
        String(w.name || '').includes(s) ||
        String(w.job_title || '').includes(s)
      const siteOk = siteFilter === 'الكل' || w.site_name === siteFilter
      return searchOk && siteOk
    })
  }, [workers, search, siteFilter])

  const dailyRows = useMemo(() => {
    return activeWorkers
      .filter((w) => {
        const s = search.trim()
        const searchOk =
          !s ||
          String(w.employee_no || '').includes(s) ||
          String(w.name || '').includes(s) ||
          String(w.job_title || '').includes(s)
        const siteOk = siteFilter === 'الكل' || w.site_name === siteFilter
        return searchOk && siteOk
      })
      .map((worker) => {
        const row = attendance.find((a) => a.attendance_date === selectedDate && a.worker_id === worker.id)
        return {
          ...worker,
          status: row?.status || 'حاضر',
          check_in_time: row?.check_in_time || '',
          check_out_time: row?.check_out_time || '',
          overtime_hours: row?.overtime_hours || 0,
          notes: row?.notes || '',
        }
      })
  }, [activeWorkers, attendance, selectedDate, search, siteFilter])

  const todayAttendance = useMemo(
    () => attendance.filter((a) => a.attendance_date === selectedDate),
    [attendance, selectedDate]
  )

  const monthlyRows = useMemo(() => {
    const filtered = attendance.filter((a) => a.attendance_date?.startsWith(selectedMonth))
    const grouped = {}
    filtered.forEach((a) => {
      const w = a.workers
      if (!w) return
      if (siteFilter !== 'الكل' && w.site_name !== siteFilter) return
      const key = a.worker_id
      if (!grouped[key]) {
        grouped[key] = {
          الرقم_الوظيفي: w.employee_no || '',
          الاسم: w.name || '',
          المسمى: w.job_title || '',
          الموقع: w.site_name || '',
          حاضر: 0,
          غائب: 0,
          إجازة: 0,
          راحة: 0,
          ساعات_إضافية: 0,
          الأجر_اليومي: Number(w.daily_rate || 0),
          الإجمالي: 0,
        }
      }
      if (a.status === 'حاضر') grouped[key].حاضر += 1
      if (a.status === 'غائب') grouped[key].غائب += 1
      if (a.status === 'إجازة') grouped[key].إجازة += 1
      if (a.status === 'راحة') grouped[key].راحة += 1
      grouped[key].ساعات_إضافية += Number(a.overtime_hours || 0)
    })
    return Object.values(grouped).map((r) => ({
      ...r,
      الإجمالي: Number((r.حاضر * r.الأجر_اليومي + r.ساعات_إضافية * 5).toFixed(2)),
    }))
  }, [attendance, selectedMonth, siteFilter])

  const dashboard = useMemo(() => {
    const present = todayAttendance.filter((a) => a.status === 'حاضر').length
    const absent = todayAttendance.filter((a) => a.status === 'غائب').length
    const leave = todayAttendance.filter((a) => a.status === 'إجازة').length
    const rest = todayAttendance.filter((a) => a.status === 'راحة').length
    return {
      totalWorkers: activeWorkers.length,
      present,
      absent,
      leave,
      rest,
      notRecorded: Math.max(activeWorkers.length - todayAttendance.length, 0),
      reportsToday: dailyReports.filter((r) => r.report_date === selectedDate).length,
    }
  }, [activeWorkers.length, todayAttendance, dailyReports, selectedDate])

  async function ensureSite(siteName) {
    if (!siteName) return
    const exists = sites.some((s) => s.name === siteName)
    if (!exists) await supabase.from('sites').insert({ name: siteName })
  }

  function resetWorkerForm() {
    setEditingWorker(null)
    setWorkerForm({
      employee_no: '',
      name: '',
      job_title: '',
      site_name: 'غير محدد',
      wage_type: 'شهري',
      daily_rate: 30,
      mobile: '',
      national_id: '',
      is_active: true,
    })
  }

  function startEditWorker(worker) {
    setEditingWorker(worker)
    setWorkerForm({
      employee_no: worker.employee_no || '',
      name: worker.name || '',
      job_title: worker.job_title || '',
      site_name: worker.site_name || 'غير محدد',
      wage_type: worker.wage_type || 'شهري',
      daily_rate: worker.daily_rate || 30,
      mobile: worker.mobile || '',
      national_id: worker.national_id || '',
      is_active: worker.is_active !== false,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function saveWorker() {
    if (user?.role !== 'admin') return
    if (!workerForm.employee_no || !workerForm.name) {
      alert('الرقم الوظيفي واسم الموظف مطلوبين')
      return
    }

    const payload = {
      employee_no: String(workerForm.employee_no).trim(),
      name: String(workerForm.name).trim(),
      job_title: workerForm.job_title || '',
      site_name: workerForm.site_name || 'غير محدد',
      wage_type: workerForm.wage_type || 'شهري',
      daily_rate: Number(workerForm.daily_rate || 0),
      mobile: workerForm.mobile || '',
      national_id: workerForm.national_id || '',
      is_active: workerForm.is_active !== false,
      updated_at: new Date().toISOString(),
    }

    await ensureSite(payload.site_name)

    const res = editingWorker
      ? await supabase.from('workers').update(payload).eq('id', editingWorker.id)
      : await supabase.from('workers').insert(payload)

    if (res.error) {
      alert('لم يتم الحفظ: ' + res.error.message)
      return
    }

    resetWorkerForm()
    await loadAll()
    alert(editingWorker ? 'تم تعديل الموظف' : 'تمت إضافة الموظف')
  }

  async function toggleWorker(worker) {
    if (user?.role !== 'admin') return
    const action = worker.is_active === false ? 'تفعيل' : 'إيقاف'
    const ok = confirm(`تأكيد ${action} الموظف: ${worker.name}؟`)
    if (!ok) return
    const { error } = await supabase
      .from('workers')
      .update({ is_active: worker.is_active === false, updated_at: new Date().toISOString() })
      .eq('id', worker.id)
    if (error) {
      alert(error.message)
      return
    }
    await loadAll()
  }

  async function saveAttendance(workerId, payload) {
    setSaveState((prev) => ({ ...prev, [workerId]: 'saving' }))
    const worker = workers.find((w) => w.id === workerId)
    const row = {
      attendance_date: selectedDate,
      worker_id: workerId,
      status: payload.status,
      check_in_time: payload.check_in_time || null,
      check_out_time: payload.check_out_time || null,
      overtime_hours: Number(payload.overtime_hours || 0),
      notes: payload.notes || '',
      supervisor_username: user?.username || '',
      recorded_site: worker?.site_name || '',
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('attendance').upsert(row, { onConflict: 'attendance_date,worker_id' })
    if (error) {
      setSaveState((prev) => ({ ...prev, [workerId]: 'error' }))
      alert('فشل الحفظ: ' + error.message)
      return
    }
    await loadAll()
    setSaveState((prev) => ({ ...prev, [workerId]: 'saved' }))
    setTimeout(() => setSaveState((prev) => ({ ...prev, [workerId]: '' })), 2000)
  }

  async function saveAllPresent() {
    const ok = confirm('سيتم تسجيل كل الظاهرين في القائمة كحاضر. هل تريد المتابعة؟')
    if (!ok) return
    setLoading(true)
    const time = nowTime()
    const rows = dailyRows.map((w) => ({
      attendance_date: selectedDate,
      worker_id: w.id,
      status: 'حاضر',
      check_in_time: w.check_in_time || time,
      check_out_time: w.check_out_time || null,
      overtime_hours: Number(w.overtime_hours || 0),
      notes: w.notes || '',
      supervisor_username: user?.username || '',
      recorded_site: w.site_name || '',
      updated_at: new Date().toISOString(),
    }))
    const { error } = await supabase.from('attendance').upsert(rows, { onConflict: 'attendance_date,worker_id' })
    setLoading(false)
    if (error) {
      alert(error.message)
      return
    }
    await loadAll()
    alert('تم تسجيل الحضور للكل')
  }

  async function uploadReportImages(files, siteName, reportDate) {
    if (!files?.length) return []
    const uploadedUrls = []
    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
      const path = `${siteName || 'site'}/${reportDate}/${Date.now()}-${safeName}`
      const { error } = await supabase.storage.from('daily-reports').upload(path, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from('daily-reports').getPublicUrl(path)
      if (data?.publicUrl) uploadedUrls.push(data.publicUrl)
    }
    return uploadedUrls
  }

  async function saveDailyReport() {
    if (!reportForm.report_date || !reportForm.site_name) {
      alert('اختار التاريخ والموقع')
      return
    }
    if (!reportForm.work_done && !reportForm.notes && !reportForm.files.length) {
      alert('اكتب الأعمال المنفذة أو الملاحظات أو ارفع صورة')
      return
    }

    setLoading(true)
    try {
      const imageUrls = await uploadReportImages(reportForm.files, reportForm.site_name, reportForm.report_date)
      const payload = {
        report_date: reportForm.report_date,
        site_name: reportForm.site_name,
        supervisor_name: reportForm.supervisor_name || user?.name || '',
        workers_count: Number(reportForm.workers_count || 0),
        equipment: reportForm.equipment || '',
        work_done: reportForm.work_done || '',
        notes: reportForm.notes || '',
        image_urls: imageUrls,
        created_by: user?.username || '',
        updated_at: new Date().toISOString(),
      }
      const { error } = await supabase.from('daily_reports').insert(payload)
      if (error) throw error
      setReportForm({
        report_date: todayStr(),
        site_name: user?.site_scope && user.site_scope !== 'الكل' ? user.site_scope : 'غير محدد',
        supervisor_name: user?.name || '',
        workers_count: '',
        equipment: '',
        work_done: '',
        notes: '',
        files: [],
      })
      await loadAll()
      alert('تم حفظ التقرير اليومي')
    } catch (err) {
      alert('لم يتم حفظ التقرير: ' + (err?.message || err))
    } finally {
      setLoading(false)
    }
  }

  function exportAttendanceReport() {
    const rows = attendance
      .filter((a) => a.attendance_date?.startsWith(selectedMonth))
      .filter((a) => siteFilter === 'الكل' || a.workers?.site_name === siteFilter)
      .map((a) => ({
        التاريخ: a.attendance_date,
        الرقم_الوظيفي: a.workers?.employee_no || '',
        الاسم: a.workers?.name || '',
        المسمى: a.workers?.job_title || '',
        الموقع: a.recorded_site || a.workers?.site_name || '',
        الحالة: a.status,
        وقت_الحضور: a.check_in_time ? String(a.check_in_time).slice(0, 5) : '',
        وقت_الانصراف: a.check_out_time ? String(a.check_out_time).slice(0, 5) : '',
        ساعات_إضافية: a.overtime_hours || 0,
        المشرف: a.supervisor_username || '',
        ملاحظات: a.notes || '',
      }))
    exportCsv(`attendance-${selectedMonth}.csv`, rows)
  }

  function exportPayrollReport() {
    exportCsv(`monthly-summary-${selectedMonth}.csv`, monthlyRows)
  }

  function exportEmployees() {
    const rows = workers.map((w) => ({
      الرقم_الوظيفي: w.employee_no || '',
      الاسم: w.name || '',
      المسمى: w.job_title || '',
      الموقع: w.site_name || '',
      نوع_الأجر: w.wage_type || '',
      الأجر_اليومي: w.daily_rate || 0,
      الجوال: w.mobile || '',
      الهوية: w.national_id || '',
      الحالة: w.is_active === false ? 'موقوف' : 'نشط',
    }))
    exportCsv('employees.csv', rows)
  }

  function exportDailyReports() {
    const rows = dailyReports.map((r) => ({
      التاريخ: r.report_date,
      الموقع: r.site_name,
      المشرف: r.supervisor_name || '',
      عدد_العمال: r.workers_count || 0,
      المعدات: r.equipment || '',
      الأعمال_المنفذة: r.work_done || '',
      ملاحظات: r.notes || '',
      الصور: Array.isArray(r.image_urls) ? r.image_urls.join(' | ') : '',
    }))
    exportCsv('daily-reports.csv', rows)
  }

  async function seedUsers() {
    if (user?.role !== 'admin') return
    const { error } = await supabase.from('users_profile').upsert(defaultUsers, { onConflict: 'username' })
    if (error) alert(error.message)
    else alert('تم تحديث الحسابات الأساسية')
  }

  if (!user) {
    return (
      <div dir="rtl" style={{ minHeight: '100vh', background: colors.bg, display: 'grid', placeItems: 'center', padding: 20, fontFamily: 'Tahoma, Arial, sans-serif' }}>
        <div style={cardStyle({ width: '100%', maxWidth: 440 })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: colors.dark, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900 }}>FR</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, color: colors.dark }}>فجر الطرق</h1>
              <p style={{ margin: '4px 0 0', color: colors.slate }}>نظام الحضور والتقارير اليومية</p>
            </div>
          </div>

          {!envReady ? (
            <div style={{ ...cardStyle({ background: '#fef2f2', color: '#991b1b', marginBottom: 12 }) }}>
              متغيرات Supabase غير موجودة في Vercel.
            </div>
          ) : null}

          <div style={{ display: 'grid', gap: 12 }}>
            <Field label="اسم المستخدم">
              <input style={inputStyle()} value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
            </Field>
            <Field label="كلمة المرور">
              <input style={inputStyle()} type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
            </Field>
            {loginErr ? <div style={{ color: colors.red, fontWeight: 800 }}>{loginErr}</div> : null}
            <button style={buttonStyle('primary', { width: '100%' })} onClick={handleLogin}>دخول</button>
            <button style={buttonStyle('outline', { width: '100%' })} onClick={() => navigator.clipboard.writeText(setupSql).then(() => alert('تم نسخ SQL'))}>نسخ SQL أول مرة</button>
          </div>

          <p style={{ textAlign: 'center', color: colors.slate, marginTop: 18, fontSize: 12 }}>Design by Yasser Khallaf — {APP_VERSION}</p>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: colors.bg, padding: 18, fontFamily: 'Tahoma, Arial, sans-serif', color: colors.dark }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <header style={cardStyle({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, background: colors.dark, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900 }}>FR</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 24 }}>نظام حضور العمال والتقارير</h1>
              <p style={{ margin: '5px 0 0', color: colors.slate }}>مرحبًا {user.name} — {user.role === 'admin' ? 'حساب رئيسي' : `مشرف: ${user.site_scope || 'الكل'}`}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button style={buttonStyle('outline')} onClick={loadAll}>{loading ? 'جاري التحميل...' : 'تحديث'}</button>
            <button style={buttonStyle('danger')} onClick={logout}>خروج</button>
          </div>
        </header>

        <Tabs active={tab} setActive={setTab} role={user.role} />

        {tab === 'dashboard' && (
          <section>
            <PageTitle hint="ملخص سريع عن الحضور والتقارير حسب التاريخ المختار">الرئيسية</PageTitle>
            <div style={cardStyle({ marginBottom: 14 })}>
              <Field label="تاريخ المتابعة">
                <input type="date" style={inputStyle({ maxWidth: 260 })} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
              <Stat title="إجمالي النشطين" value={dashboard.totalWorkers} />
              <Stat title="حاضر" value={dashboard.present} color={colors.green} />
              <Stat title="غائب" value={dashboard.absent} color={colors.red} />
              <Stat title="إجازة" value={dashboard.leave} color={colors.amber} />
              <Stat title="راحة" value={dashboard.rest} color={colors.blue} />
              <Stat title="لم يسجل" value={dashboard.notRecorded} />
              <Stat title="تقارير اليوم" value={dashboard.reportsToday} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14, marginTop: 14 }}>
              <div style={cardStyle()}>
                <h3 style={{ marginTop: 0 }}>آخر حركات الحضور</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {attendance.slice(0, 8).map((a) => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, borderBottom: `1px solid ${colors.border}`, paddingBottom: 9 }}>
                      <div>
                        <strong>{a.workers?.name || 'غير معروف'}</strong>
                        <div style={{ color: colors.slate, fontSize: 13 }}>{a.attendance_date} — {a.recorded_site || a.workers?.site_name || ''}</div>
                        <div style={{ color: colors.muted, fontSize: 12 }}>حضور: {a.check_in_time ? String(a.check_in_time).slice(0, 5) : '-'} / انصراف: {a.check_out_time ? String(a.check_out_time).slice(0, 5) : '-'}</div>
                      </div>
                      <StatusBadge value={a.status} />
                    </div>
                  ))}
                  {!attendance.length ? <Empty /> : null}
                </div>
              </div>

              <div style={cardStyle()}>
                <h3 style={{ marginTop: 0 }}>آخر التقارير اليومية</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  {dailyReports.slice(0, 6).map((r) => (
                    <div key={r.id} style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: 9 }}>
                      <strong>{r.site_name}</strong>
                      <div style={{ color: colors.slate, fontSize: 13 }}>{r.report_date} — {r.supervisor_name || 'بدون مشرف'}</div>
                      <div style={{ marginTop: 4 }}>{String(r.work_done || r.notes || '').slice(0, 90)}</div>
                    </div>
                  ))}
                  {!dailyReports.length ? <Empty /> : null}
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'attendance' && (
          <section>
            <PageTitle hint="سجل اليوم للعمال. المشرف يسجل الحضور والانصراف بدون GPS وبدون صورة لكل عامل.">الحضور والانصراف</PageTitle>
            <div style={cardStyle({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 14 })}>
              <Field label="التاريخ">
                <input type="date" style={inputStyle()} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </Field>
              <Field label="الموقع">
                <select style={inputStyle()} value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)}>
                  <option>الكل</option>
                  {sites.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <Field label="بحث">
                <input style={inputStyle()} placeholder="اسم / رقم / مهنة" value={search} onChange={(e) => setSearch(e.target.value)} />
              </Field>
              <div style={{ alignSelf: 'end', display: 'flex', gap: 8 }}>
                <button style={buttonStyle('success')} onClick={saveAllPresent}>تسجيل الكل حاضر</button>
              </div>
            </div>

            <div style={cardStyle({ overflowX: 'auto' })}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1250 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['الرقم', 'الاسم', 'المسمى', 'الموقع', 'الحالة', 'وقت الحضور', 'وقت الانصراف', 'الإضافي', 'ملاحظات', 'إجراء'].map((h) => (
                      <th key={h} style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyRows.map((row) => (
                    <AttendanceRow key={row.id} row={row} onSave={(payload) => saveAttendance(row.id, payload)} saveState={saveState[row.id]} />
                  ))}
                </tbody>
              </table>
              {!dailyRows.length ? <Empty text="لا توجد عمال مطابقين للفلتر" /> : null}
            </div>
          </section>
        )}

        {tab === 'dailyReport' && (
          <section>
            <PageTitle hint="المشرف يرفع تقرير الموقع وصور العمل مرة واحدة. لا يوجد GPS ولا تصوير لكل موظف.">التقرير اليومي للموقع</PageTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
              <div style={cardStyle()}>
                <h3 style={{ marginTop: 0 }}>إضافة تقرير يومي</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  <Field label="التاريخ">
                    <input type="date" style={inputStyle()} value={reportForm.report_date} onChange={(e) => setReportForm({ ...reportForm, report_date: e.target.value })} />
                  </Field>
                  <Field label="الموقع">
                    <select style={inputStyle()} value={reportForm.site_name} onChange={(e) => setReportForm({ ...reportForm, site_name: e.target.value })}>
                      <option>غير محدد</option>
                      {sites.map((s) => <option key={s.id}>{s.name}</option>)}
                    </select>
                  </Field>
                  <Field label="اسم المشرف">
                    <input style={inputStyle()} value={reportForm.supervisor_name} onChange={(e) => setReportForm({ ...reportForm, supervisor_name: e.target.value })} />
                  </Field>
                  <Field label="عدد العمال بالموقع">
                    <input type="number" style={inputStyle()} value={reportForm.workers_count} onChange={(e) => setReportForm({ ...reportForm, workers_count: e.target.value })} />
                  </Field>
                  <Field label="المعدات">
                    <textarea rows="3" style={inputStyle()} placeholder="مثال: شيول 1، قلاب 2، رصاصة 1" value={reportForm.equipment} onChange={(e) => setReportForm({ ...reportForm, equipment: e.target.value })} />
                  </Field>
                  <Field label="الأعمال المنفذة">
                    <textarea rows="4" style={inputStyle()} placeholder="اكتب الأعمال التي تمت اليوم" value={reportForm.work_done} onChange={(e) => setReportForm({ ...reportForm, work_done: e.target.value })} />
                  </Field>
                  <Field label="ملاحظات">
                    <textarea rows="3" style={inputStyle()} value={reportForm.notes} onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })} />
                  </Field>
                  <Field label="صور التقرير">
                    <input type="file" multiple accept="image/*" style={inputStyle()} onChange={(e) => setReportForm({ ...reportForm, files: Array.from(e.target.files || []) })} />
                  </Field>
                  <button style={buttonStyle('primary')} onClick={saveDailyReport}>{loading ? 'جاري الحفظ...' : 'حفظ التقرير'}</button>
                </div>
              </div>

              <div style={cardStyle()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>تقارير محفوظة</h3>
                  <button style={buttonStyle('outline')} onClick={exportDailyReports}>تصدير التقارير</button>
                </div>
                <div style={{ display: 'grid', gap: 12, maxHeight: 760, overflow: 'auto', paddingLeft: 4, marginTop: 12 }}>
                  {dailyReports.map((r) => (
                    <div key={r.id} style={{ border: `1px solid ${colors.border}`, borderRadius: 16, padding: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        <strong>{r.site_name}</strong>
                        <span style={{ color: colors.slate }}>{r.report_date}</span>
                      </div>
                      <div style={{ color: colors.slate, fontSize: 13, marginTop: 4 }}>المشرف: {r.supervisor_name || '-'} / العمال: {r.workers_count || 0}</div>
                      {r.equipment ? <div style={{ marginTop: 8, color: colors.slate }}>المعدات: {r.equipment}</div> : null}
                      <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{r.work_done || r.notes || '-'}</div>
                      {r.image_urls?.length ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                          {r.image_urls.map((url, i) => (
                            <a key={url} href={url} target="_blank" rel="noreferrer" style={{ color: colors.blue, fontWeight: 800 }}>صورة {i + 1}</a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {!dailyReports.length ? <Empty /> : null}
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'employees' && user.role === 'admin' && (
          <section>
            <PageTitle hint="إضافة وتعديل وإيقاف الموظفين من داخل التطبيق بدون فتح Supabase.">إدارة الموظفين</PageTitle>
            <div style={cardStyle({ marginBottom: 14 })}>
              <h3 style={{ marginTop: 0 }}>{editingWorker ? 'تعديل موظف' : 'إضافة موظف'}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                <Field label="الرقم الوظيفي">
                  <input style={inputStyle()} value={workerForm.employee_no} onChange={(e) => setWorkerForm({ ...workerForm, employee_no: e.target.value })} />
                </Field>
                <Field label="الاسم">
                  <input style={inputStyle()} value={workerForm.name} onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })} />
                </Field>
                <Field label="المهنة">
                  <input style={inputStyle()} value={workerForm.job_title} onChange={(e) => setWorkerForm({ ...workerForm, job_title: e.target.value })} />
                </Field>
                <Field label="الموقع">
                  <input list="sites-list" style={inputStyle()} value={workerForm.site_name} onChange={(e) => setWorkerForm({ ...workerForm, site_name: e.target.value })} />
                  <datalist id="sites-list">
                    {sites.map((s) => <option key={s.id} value={s.name} />)}
                  </datalist>
                </Field>
                <Field label="نوع الأجر">
                  <select style={inputStyle()} value={workerForm.wage_type} onChange={(e) => setWorkerForm({ ...workerForm, wage_type: e.target.value })}>
                    <option>شهري</option>
                    <option>يومي</option>
                    <option>مقطوع</option>
                  </select>
                </Field>
                <Field label="الأجر اليومي">
                  <input type="number" style={inputStyle()} value={workerForm.daily_rate} onChange={(e) => setWorkerForm({ ...workerForm, daily_rate: e.target.value })} />
                </Field>
                <Field label="رقم الجوال">
                  <input style={inputStyle()} value={workerForm.mobile} onChange={(e) => setWorkerForm({ ...workerForm, mobile: e.target.value })} />
                </Field>
                <Field label="رقم الهوية / الإقامة">
                  <input style={inputStyle()} value={workerForm.national_id} onChange={(e) => setWorkerForm({ ...workerForm, national_id: e.target.value })} />
                </Field>
                <Field label="الحالة">
                  <select style={inputStyle()} value={workerForm.is_active ? 'نشط' : 'موقوف'} onChange={(e) => setWorkerForm({ ...workerForm, is_active: e.target.value === 'نشط' })}>
                    <option>نشط</option>
                    <option>موقوف</option>
                  </select>
                </Field>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                <button style={buttonStyle('success')} onClick={saveWorker}>{editingWorker ? 'حفظ التعديل' : 'إضافة موظف'}</button>
                {editingWorker ? <button style={buttonStyle('outline')} onClick={resetWorkerForm}>إلغاء التعديل</button> : null}
                <button style={buttonStyle('outline')} onClick={exportEmployees}>تصدير الموظفين</button>
              </div>
            </div>

            <div style={cardStyle({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 14 })}>
              <Field label="بحث">
                <input style={inputStyle()} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="اسم / رقم / مهنة" />
              </Field>
              <Field label="فلترة الموقع">
                <select style={inputStyle()} value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)}>
                  <option>الكل</option>
                  {sites.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </Field>
            </div>

            <div style={cardStyle({ overflowX: 'auto' })}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['الرقم', 'الاسم', 'المهنة', 'الموقع', 'الجوال', 'الهوية', 'الحالة', 'إجراء'].map((h) => (
                      <th key={h} style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map((w) => (
                    <tr key={w.id}>
                      <td style={tdStyle()}>{w.employee_no}</td>
                      <td style={tdStyle()}><strong>{w.name}</strong></td>
                      <td style={tdStyle()}>{w.job_title || '-'}</td>
                      <td style={tdStyle()}>{w.site_name || '-'}</td>
                      <td style={tdStyle()}>{w.mobile || '-'}</td>
                      <td style={tdStyle()}>{w.national_id || '-'}</td>
                      <td style={tdStyle()}>{w.is_active === false ? <StatusBadge value="موقوف" /> : <span style={{ color: colors.green, fontWeight: 900 }}>نشط</span>}</td>
                      <td style={tdStyle()}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={buttonStyle('outline')} onClick={() => startEditWorker(w)}>تعديل</button>
                          <button style={buttonStyle(w.is_active === false ? 'success' : 'warning')} onClick={() => toggleWorker(w)}>{w.is_active === false ? 'تفعيل' : 'إيقاف'}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filteredWorkers.length ? <Empty /> : null}
            </div>
          </section>
        )}

        {tab === 'reports' && user.role === 'admin' && (
          <section>
            <PageTitle hint="ملخص شهري وتصدير Excel بصيغة CSV تفتح في Excel.">التقارير</PageTitle>
            <div style={cardStyle({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 14 })}>
              <Field label="الشهر">
                <input type="month" style={inputStyle()} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
              </Field>
              <Field label="الموقع">
                <select style={inputStyle()} value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)}>
                  <option>الكل</option>
                  {sites.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <div style={{ alignSelf: 'end', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button style={buttonStyle('outline')} onClick={exportAttendanceReport}>تصدير الحضور</button>
                <button style={buttonStyle('outline')} onClick={exportPayrollReport}>تصدير الملخص</button>
              </div>
            </div>
            <div style={cardStyle({ overflowX: 'auto' })}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {monthlyRows[0] ? Object.keys(monthlyRows[0]).map((h) => (
                      <th key={h} style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.border}` }}>{h}</th>
                    )) : null}
                  </tr>
                </thead>
                <tbody>
                  {monthlyRows.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((v, i) => <td key={i} style={tdStyle()}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!monthlyRows.length ? <Empty /> : null}
            </div>
          </section>
        )}

        {tab === 'setup' && user.role === 'admin' && (
          <section>
            <PageTitle hint="انسخ SQL وشغله في Supabase SQL Editor لو ظهرت مشكلة في جدول أو رفع الصور.">الإعداد</PageTitle>
            <div style={cardStyle()}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                <button style={buttonStyle('primary')} onClick={() => navigator.clipboard.writeText(setupSql).then(() => alert('تم نسخ SQL'))}>نسخ SQL</button>
                <button style={buttonStyle('outline')} onClick={seedUsers}>تحديث الحسابات الأساسية</button>
              </div>
              <pre dir="ltr" style={{ whiteSpace: 'pre-wrap', background: '#0b1020', color: '#e5e7eb', borderRadius: 16, padding: 16, overflow: 'auto', maxHeight: 520 }}>{setupSql}</pre>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
