import React, { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const appUsers = [
  {
    username: 'yasserkhallaf',
    password_hash: 'd1b39203547a4ae06260a3c3f4f6b1c8e218e3518de869d4bfa899f6ebed3d8d',
    display_name: 'ياسر خلاف',
    role: 'admin',
    site_scope: 'الكل'
  },
  {
    username: 'Ahmed208',
    password_hash: 'aae9ee5b6b7b41c2528dec1714e2b385d69b8c7dde33e6fea8c8973a99a49c7a',
    display_name: 'أحمد الصعيدي',
    role: 'supervisor',
    site_scope: 'فجر الطرق'
  },
  {
    username: 'Mostafaelfwe',
    password_hash: 'f3b0bcb03688d953b52596ceba8e7f04f9ef41231a2f56e354c1e9dd4084a262',
    display_name: 'مصطفى الفوي',
    role: 'supervisor',
    site_scope: 'كدمي جازان'
  },
  {
    username: 'Dhurma Project',
    password_hash: '9a4ad8033839a886928cbe17a09db4d005efa540180e5841ad434c7c73c0b650',
    display_name: 'مشرف مشروع ضرما',
    role: 'supervisor',
    site_scope: 'ضرما'
  }
]

const seedWorkers = [
  { employee_no: "1001", name: "مصطفى حسن عبد المتعال الفوي", job_title: "مهندس", site_name: "كدمي جازان", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1002", name: "إبراهيم اسعد امين محمود", job_title: "مهندس", site_name: "ضرما", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1003", name: "عبدالرحمن علي عبد العال علي", job_title: "مساح", site_name: "فجر الطرق", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1004", name: "مصطفي كامل عثان محمود", job_title: "مراقب", site_name: "المحاني", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1005", name: "عبدالله محمد هريدي عثمان", job_title: "مراقب", site_name: "كدمي جازان", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1006", name: "محمد عاقب جافيد", job_title: "عامل", site_name: "فجر الطرق", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1007", name: "أحمد السيد محمد محمد", job_title: "سواق بوكيت", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1008", name: "محمود صلاح محمود عامر", job_title: "سواق رصاصة", site_name: "فجر الطرق", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1009", name: "مصطفى علي", job_title: "مراقب", site_name: "المحاني", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1010", name: "مروان", job_title: "مراقب سيفتي", site_name: "ضرما", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1011", name: "أحمد عبد الرحيم وزيري", job_title: "مساح", site_name: "كدمي جازان", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1012", name: "مد حسين", job_title: "عامل مساحة", site_name: "كدمي جازان", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1013", name: "علي", job_title: "عامل جريدر", site_name: "كدمي جازان", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1014", name: "محمد عبد الرحمن", job_title: "عامل", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1015", name: "محمد توفيق", job_title: "عامل", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1016", name: "السيد مصطفى", job_title: "سواق رصاصة", site_name: "كدمي جازان", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1017", name: "محمد العنزي", job_title: "عامل", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1018", name: "عنتر", job_title: "عامل", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1019", name: "محمد بشمو", job_title: "عامل", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1020", name: "أنس", job_title: "عامل", site_name: "عبد الاله", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1021", name: "قسم", job_title: "سواق وايت", site_name: "غير محدد", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1022", name: "احمد حامد محمود الصعيدي", job_title: "مساح", site_name: "فجر الطرق", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1023", name: "محمد عرفان لياقت على", job_title: "سائق دينا", site_name: "فجر الطرق", wage_type: "شهري", daily_rate: 30 },
  { employee_no: "1024", name: "محمود علي على خلاف", job_title: "مساح كميات", site_name: "فجر الطرق", wage_type: "شهري", daily_rate: 30 }
]

const setupSql = `create extension if not exists pgcrypto;

create table if not exists public.users_profile (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password text,
  password_hash text,
  display_name text not null,
  role text not null check (role in ('admin','supervisor')),
  site_scope text default 'الكل',
  created_at timestamptz default now()
);

alter table public.users_profile add column if not exists password text;
alter table public.users_profile alter column password drop not null;
alter table public.users_profile add column if not exists password_hash text;
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
  wage_type text,
  daily_rate numeric default 30,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  attendance_date date not null,
  worker_id uuid not null references public.workers(id) on delete cascade,
  status text not null check (status in ('حاضر','غائب','إجازة','راحة')),
  overtime_hours numeric default 0,
  notes text,
  supervisor_username text,
  recorded_site text,
  created_at timestamptz default now(),
  unique(attendance_date, worker_id)
);

delete from public.users_profile
where username in ('admin','dharma','hanakya','kdmi');

insert into public.users_profile (username, password_hash, display_name, role, site_scope)
values
  ('yasserkhallaf','d1b39203547a4ae06260a3c3f4f6b1c8e218e3518de869d4bfa899f6ebed3d8d','ياسر خلاف','admin','الكل'),
  ('Ahmed208','aae9ee5b6b7b41c2528dec1714e2b385d69b8c7dde33e6fea8c8973a99a49c7a','أحمد الصعيدي','supervisor','فجر الطرق'),
  ('Mostafaelfwe','f3b0bcb03688d953b52596ceba8e7f04f9ef41231a2f56e354c1e9dd4084a262','مصطفى الفوي','supervisor','كدمي جازان'),
  ('Dhurma Project','9a4ad8033839a886928cbe17a09db4d005efa540180e5841ad434c7c73c0b650','مشرف مشروع ضرما','supervisor','ضرما')
on conflict (username) do update set
  password_hash = excluded.password_hash,
  display_name = excluded.display_name,
  role = excluded.role,
  site_scope = excluded.site_scope;

insert into public.sites (name)
values
  ('كدمي جازان'),
  ('ضرما'),
  ('فجر الطرق'),
  ('المحاني'),
  ('غير محدد'),
  ('عبد الاله')
on conflict (name) do nothing;`

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function monthStr() {
  return new Date().toISOString().slice(0, 7)
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
    )
  ].join('\n')

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function cardStyle(extra = {}) {
  return {
    background: '#ffffff',
    borderRadius: 22,
    padding: 18,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
    border: '1px solid #e9edf5',
    ...extra
  }
}

function statCardStyle() {
  return {
    ...cardStyle(),
    minHeight: 110,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}

function inputStyle() {
  return {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid #d6dce8',
    background: '#ffffff',
    outline: 'none',
    fontSize: 14,
    color: '#111827',
    boxSizing: 'border-box'
  }
}

function labelStyle() {
  return {
    marginBottom: 6,
    color: '#475569',
    fontSize: 13,
    fontWeight: 700
  }
}

function buttonStyle(kind = 'primary') {
  const common = {
    padding: '11px 16px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 14,
    transition: 'all 0.2s ease'
  }

  if (kind === 'secondary') return { ...common, background: '#e9eef6', color: '#0f172a' }
  if (kind === 'outline') return { ...common, background: '#fff', color: '#111827', border: '1px solid #d6dce8' }
  if (kind === 'danger') return { ...common, background: '#dc2626', color: '#fff' }
  if (kind === 'success') return { ...common, background: '#16a34a', color: '#fff' }

  return { ...common, background: '#0f172a', color: '#fff' }
}

function sectionTitleStyle() {
  return {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 26,
    fontWeight: 800,
    color: '#0f172a'
  }
}

function Tabs({ active, setActive, user }) {
  const tabs = [
    ['attendance', 'تسجيل الحضور'],
    ...(user?.role === 'admin'
      ? [
          ['reports', 'التقارير'],
          ['setup', 'الإعداد']
        ]
      : [])
  ]

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {tabs.map(([key, label]) => (
        <button
          key={key}
          onClick={() => setActive(key)}
          style={{
            ...buttonStyle(active === key ? 'primary' : 'outline'),
            minWidth: 140
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function NumberValue({ value }) {
  return (
    <div style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
      {value}
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [loginErr, setLoginErr] = useState('')
  const [tab, setTab] = useState('attendance')
  const [sites, setSites] = useState([])
  const [workers, setWorkers] = useState([])
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)
  const [saveState, setSaveState] = useState({})

  const [selectedDate, setSelectedDate] = useState(todayStr())
  const [selectedMonth, setSelectedMonth] = useState(monthStr())
  const [siteFilter, setSiteFilter] = useState('الكل')
  const [recordedSite, setRecordedSite] = useState('الكل')
  const [search, setSearch] = useState('')
  const [newWorker, setNewWorker] = useState({
    employee_no: '',
    name: '',
    job_title: '',
    site_name: '',
    wage_type: 'شهري',
    daily_rate: 30
  })

  const envReady = Boolean(supabase)

  const supervisorSite = user?.role === 'supervisor' && user?.site_scope && user.site_scope !== 'الكل'
    ? user.site_scope
    : null

  const visibleSites = useMemo(() => {
    if (!supervisorSite) return sites
    return sites.filter((s) => s.name === supervisorSite)
  }, [sites, supervisorSite])

  useEffect(() => {
    const savedUser = localStorage.getItem('fajr_user_v4')
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        setUser(parsed)
        if (parsed.role === 'supervisor' && parsed.site_scope && parsed.site_scope !== 'الكل') {
          setSiteFilter(parsed.site_scope)
          setRecordedSite(parsed.site_scope)
        }
      } catch {
        localStorage.removeItem('fajr_user_v4')
      }
    }
  }, [])

  useEffect(() => {
    if (user?.role === 'supervisor' && user?.site_scope && user.site_scope !== 'الكل') {
      setSiteFilter(user.site_scope)
      setRecordedSite(user.site_scope)
      setTab('attendance')
    }
  }, [user])

  useEffect(() => {
    if (user && envReady) {
      loadAll()
    }
  }, [user])

  async function loadAll() {
    setLoading(true)

    const [sitesRes, workersRes, attendanceRes] = await Promise.all([
      supabase.from('sites').select('*').order('name'),
      supabase.from('workers').select('*').order('employee_no'),
      supabase
        .from('attendance')
        .select('*, workers(name, employee_no, site_name, job_title, wage_type, daily_rate)')
        .order('attendance_date', { ascending: false })
    ])

    if (!sitesRes.error) setSites(sitesRes.data || [])
    if (!workersRes.error) setWorkers(workersRes.data || [])
    if (!attendanceRes.error) setAttendance(attendanceRes.data || [])

    if (sitesRes.error || workersRes.error || attendanceRes.error) {
      alert('يوجد مشكلة في الاتصال بقاعدة البيانات. راجع SQL والجداول.')
    }

    setLoading(false)
  }

  async function handleLogin() {
    setLoginErr('')

    if (!envReady) {
      setLoginErr('متغيرات Supabase غير مضافة')
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

    if (error || !data || !data.password_hash) {
      setLoginErr('بيانات الدخول غير صحيحة أو لم يتم تنفيذ SQL الجديد')
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
      site_scope: data.site_scope || 'الكل'
    }

    setUser(logged)
    localStorage.setItem('fajr_user_v4', JSON.stringify(logged))
    setLoginErr('')
  }

  function logout() {
    setUser(null)
    setTab('attendance')
    localStorage.removeItem('fajr_user_v4')
  }

  async function seedDatabase() {
    if (!envReady || user?.role !== 'admin') return

    setLoading(true)

    const uniqueSites = [...new Set(seedWorkers.map((w) => w.site_name).filter(Boolean))].map((name) => ({ name }))

    await supabase.from('sites').upsert(uniqueSites, { onConflict: 'name' })
    await supabase.from('workers').upsert(seedWorkers, { onConflict: 'employee_no' })
    await supabase.from('users_profile').upsert(appUsers, { onConflict: 'username' })

    await loadAll()
    setLoading(false)
    alert('تمت تعبئة البيانات الأساسية والحسابات')
  }

  async function addWorker() {
    if (!envReady || user?.role !== 'admin') return

    if (!newWorker.employee_no || !newWorker.name) {
      alert('اكتب الرقم الوظيفي واسم الموظف')
      return
    }

    const payload = {
      employee_no: newWorker.employee_no,
      name: newWorker.name,
      job_title: newWorker.job_title,
      site_name: newWorker.site_name,
      wage_type: newWorker.wage_type,
      daily_rate: Number(newWorker.daily_rate || 30),
      is_active: true
    }

    const { error } = await supabase.from('workers').insert(payload)

    if (error) {
      alert(error.message)
      return
    }

    setNewWorker({
      employee_no: '',
      name: '',
      job_title: '',
      site_name: '',
      wage_type: 'شهري',
      daily_rate: 30
    })

    await loadAll()
    alert('تمت إضافة الموظف')
  }

  async function saveAttendance(workerId, current) {
    if (!envReady) return

    const worker = workers.find((w) => w.id === workerId)
    if (!worker) return

    if (supervisorSite && worker.site_name !== supervisorSite) {
      alert('هذا الحساب غير مصرح له بتسجيل هذا الموقع')
      return
    }

    setSaveState((prev) => ({
      ...prev,
      [workerId]: 'saving'
    }))

    const payload = {
      attendance_date: selectedDate,
      worker_id: workerId,
      status: current.status,
      overtime_hours: Number(current.overtime_hours || 0),
      notes: current.notes || '',
      supervisor_username: user?.username || '',
      recorded_site: supervisorSite || (recordedSite === 'الكل' ? (worker?.site_name || '') : recordedSite)
    }

    const { error } = await supabase
      .from('attendance')
      .upsert(payload, { onConflict: 'attendance_date,worker_id' })

    if (error) {
      setSaveState((prev) => ({
        ...prev,
        [workerId]: 'error'
      }))
      alert('فشل الحفظ: ' + error.message)
      return
    }

    await loadAll()

    setSaveState((prev) => ({
      ...prev,
      [workerId]: 'saved'
    }))

    setTimeout(() => {
      setSaveState((prev) => ({
        ...prev,
        [workerId]: ''
      }))
    }, 2500)
  }

  const visibleWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchesSearch = !search || w.name?.includes(search) || w.employee_no?.includes(search)
      const matchesSiteByUser = !supervisorSite || w.site_name === supervisorSite
      const matchesSiteByFilter = supervisorSite || siteFilter === 'الكل' || w.site_name === siteFilter
      return matchesSearch && matchesSiteByUser && matchesSiteByFilter && w.is_active !== false
    })
  }, [workers, search, siteFilter, supervisorSite])

  const dailyRows = useMemo(() => {
    return visibleWorkers.map((worker) => {
      const row = attendance.find(
        (a) => a.attendance_date === selectedDate && a.worker_id === worker.id
      )

      return {
        ...worker,
        status: row?.status || 'حاضر',
        overtime_hours: row?.overtime_hours || 0,
        notes: row?.notes || ''
      }
    })
  }, [visibleWorkers, attendance, selectedDate])

  const monthlyRows = useMemo(() => {
    const filtered = attendance.filter((a) => a.attendance_date?.startsWith(selectedMonth))
    const grouped = {}

    filtered.forEach((a) => {
      const w = a.workers
      if (!w) return
      if (supervisorSite && w.site_name !== supervisorSite) return
      if (!supervisorSite && siteFilter !== 'الكل' && w.site_name !== siteFilter) return

      const key = a.worker_id

      if (!grouped[key]) {
        grouped[key] = {
          الرقم_الوظيفي: w.employee_no,
          اسم_العامل: w.name,
          المسمى_الوظيفي: w.job_title || '',
          الموقع: w.site_name || '',
          نوع_الأجر: w.wage_type || '',
          أيام_الحضور: 0,
          أيام_الغياب: 0,
          أيام_الإجازة: 0,
          أيام_الراحة: 0,
          ساعات_إضافية: 0,
          الأجر_اليومي: Number(w.daily_rate || 0),
          الإجمالي: 0
        }
      }

      if (a.status === 'حاضر') grouped[key].أيام_الحضور += 1
      if (a.status === 'غائب') grouped[key].أيام_الغياب += 1
      if (a.status === 'إجازة') grouped[key].أيام_الإجازة += 1
      if (a.status === 'راحة') grouped[key].أيام_الراحة += 1
      grouped[key].ساعات_إضافية += Number(a.overtime_hours || 0)
    })

    return Object.values(grouped).map((r) => ({
      ...r,
      الإجمالي: r.أيام_الحضور * r.الأجر_اليومي + r.ساعات_إضافية * 5
    }))
  }, [attendance, selectedMonth, siteFilter, supervisorSite])

  const stats = useMemo(() => ({
    workers: visibleWorkers.length,
    attendanceDays: monthlyRows.reduce((s, r) => s + Number(r.أيام_الحضور || 0), 0),
    overtime: monthlyRows.reduce((s, r) => s + Number(r.ساعات_إضافية || 0), 0),
    payroll: monthlyRows.reduce((s, r) => s + Number(r.الإجمالي || 0), 0)
  }), [visibleWorkers, monthlyRows])

  function exportAttendanceReport() {
    if (user?.role !== 'admin') return

    const rows = attendance
      .filter((a) => a.attendance_date?.startsWith(selectedMonth))
      .filter((a) => siteFilter === 'الكل' || a.workers?.site_name === siteFilter)
      .map((a) => ({
        التاريخ: a.attendance_date,
        الرقم_الوظيفي: a.workers?.employee_no || '',
        العامل: a.workers?.name || '',
        الموقع: a.recorded_site || a.workers?.site_name || '',
        الحالة: a.status,
        ساعات_إضافية: a.overtime_hours,
        المشرف: a.supervisor_username || '',
        ملاحظات: a.notes || ''
      }))

    exportCsv(`attendance-${selectedMonth}.csv`, rows)
  }

  function exportPayrollReport() {
    if (user?.role !== 'admin') return
    exportCsv(`payroll-${selectedMonth}.csv`, monthlyRows)
  }

  if (!user) {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: 16,
          background:
            'linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #edf7f2 100%)'
        }}
      >
        <div
          style={{
            ...cardStyle({
              width: '100%',
              maxWidth: 460,
              padding: 26,
              borderRadius: 26
            })
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                margin: '0 auto 14px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 30,
                fontWeight: 800,
                boxShadow: '0 14px 30px rgba(15,23,42,0.18)'
              }}
            >
              FR
            </div>

            <h1 style={{ margin: '0 0 8px 0', fontSize: 34, fontWeight: 900, color: '#0f172a' }}>
              فجر الطرق
            </h1>

            <p style={{ color: '#64748b', margin: 0, fontSize: 15 }}>
              نظام حضور العمال والإضافي
            </p>
          </div>

          {!envReady && (
            <div
              style={{
                background: '#fff7ed',
                border: '1px solid #fdba74',
                padding: 12,
                borderRadius: 12,
                marginBottom: 14,
                color: '#9a3412',
                fontSize: 14
              }}
            >
              أضف متغيرات البيئة في Vercel حتى يعمل النظام.
            </div>
          )}

          <div style={{ display: 'grid', gap: 12 }}>
            <input
              style={inputStyle()}
              placeholder="اسم المستخدم"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />

            <input
              style={inputStyle()}
              type="password"
              placeholder="كلمة المرور"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />

            {loginErr ? (
              <div
                style={{
                  color: '#dc2626',
                  fontSize: 14,
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  padding: 10,
                  borderRadius: 12
                }}
              >
                {loginErr}
              </div>
            ) : null}

            <button
              style={{
                ...buttonStyle(),
                padding: '13px 16px',
                borderRadius: 14,
                fontSize: 15
              }}
              onClick={handleLogin}
            >
              دخول
            </button>

            <button
              style={buttonStyle('outline')}
              onClick={() => navigator.clipboard.writeText(setupSql).then(() => alert('تم نسخ SQL'))}
            >
              نسخ SQL أول مرة
            </button>

            <div style={{ marginTop: 6, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
              Design by Yasser Khallaf
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
        padding: 16
      }}
    >
      <div style={{ maxWidth: 1450, margin: '0 auto' }}>
        <div
          style={{
            ...cardStyle({
              marginBottom: 16,
              padding: 22,
              borderRadius: 26
            })
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ color: '#16a34a', fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
                FAJR ROADS
              </div>
              <h1 style={{ margin: '0 0 6px 0', fontSize: 34, fontWeight: 900, color: '#0f172a' }}>
                نظام حضور العمال والإضافي
              </h1>
              <div style={{ color: '#64748b', fontSize: 15 }}>
                مرحبًا {user.name}
                {user.role === 'supervisor' && user.site_scope && user.site_scope !== 'الكل'
                  ? ` — موقعك: ${user.site_scope}`
                  : ' — حساب رئيسي'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user.role === 'admin' && (
                <>
                  <button style={buttonStyle('secondary')} onClick={exportAttendanceReport}>
                    تصدير الحضور
                  </button>
                  <button style={buttonStyle('secondary')} onClick={exportPayrollReport}>
                    تصدير الرواتب
                  </button>
                </>
              )}
              <button style={buttonStyle('outline')} onClick={logout}>
                خروج
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            marginBottom: 16
          }}
        >
          <div style={statCardStyle()}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>العمال النشطون</div>
            <NumberValue value={stats.workers} />
          </div>

          <div style={statCardStyle()}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>أيام الحضور</div>
            <NumberValue value={stats.attendanceDays} />
          </div>

          <div style={statCardStyle()}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>ساعات الإضافي</div>
            <NumberValue value={stats.overtime} />
          </div>

          <div style={statCardStyle()}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>إجمالي المستحق</div>
            <NumberValue value={user.role === 'admin' ? stats.payroll : '-'} />
          </div>
        </div>

        <div style={{ ...cardStyle({ marginBottom: 16, padding: 14 }) }}>
          <Tabs active={tab} setActive={setTab} user={user} />
        </div>

        {tab === 'attendance' && (
          <div style={cardStyle({ borderRadius: 24 })}>
            <h2 style={sectionTitleStyle()}>التسجيل اليومي</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginBottom: 18
              }}
            >
              <div>
                <div style={labelStyle()}>التاريخ</div>
                <input
                  style={inputStyle()}
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <div style={labelStyle()}>موقع التسجيل اليوم</div>
                <select
                  style={inputStyle()}
                  value={supervisorSite || recordedSite}
                  onChange={(e) => setRecordedSite(e.target.value)}
                  disabled={Boolean(supervisorSite)}
                >
                  {!supervisorSite && <option value="الكل">الكل</option>}
                  {visibleSites.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div style={labelStyle()}>فلترة الموقع</div>
                <select
                  style={inputStyle()}
                  value={supervisorSite || siteFilter}
                  onChange={(e) => setSiteFilter(e.target.value)}
                  disabled={Boolean(supervisorSite)}
                >
                  {!supervisorSite && <option value="الكل">الكل</option>}
                  {visibleSites.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div style={labelStyle()}>بحث</div>
                <input
                  style={inputStyle()}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="اسم العامل أو الرقم الوظيفي"
                />
              </div>
            </div>

            {loading && (
              <div style={{ marginBottom: 12, color: '#64748b', fontWeight: 700 }}>
                جاري تحميل البيانات...
              </div>
            )}

            <div
              style={{
                overflowX: 'auto',
                border: '1px solid #e5e7eb',
                borderRadius: 18,
                background: '#fff'
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: 1080
                }}
              >
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['الرقم', 'الاسم', 'المسمى', 'الموقع', 'الحالة', 'الإضافي', 'ملاحظات', 'حفظ'].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'right',
                          padding: 14,
                          borderBottom: '1px solid #e5e7eb',
                          color: '#334155',
                          fontSize: 14
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {dailyRows.map((row) => (
                    <AttendanceRow
                      key={row.id}
                      row={row}
                      saveState={saveState[row.id]}
                      onSave={(payload) => saveAttendance(row.id, payload)}
                    />
                  ))}

                  {!dailyRows.length && (
                    <tr>
                      <td colSpan="8" style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
                        لا توجد بيانات للعرض
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'reports' && user.role === 'admin' && (
          <div style={cardStyle({ borderRadius: 24 })}>
            <h2 style={sectionTitleStyle()}>التقارير الشهرية</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginBottom: 18
              }}
            >
              <div>
                <div style={labelStyle()}>الشهر</div>
                <input
                  style={inputStyle()}
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>

              <div>
                <div style={labelStyle()}>الموقع</div>
                <select
                  style={inputStyle()}
                  value={siteFilter}
                  onChange={(e) => setSiteFilter(e.target.value)}
                >
                  <option value="الكل">الكل</option>
                  {sites.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'end', flexWrap: 'wrap' }}>
                <button style={buttonStyle('secondary')} onClick={exportAttendanceReport}>
                  تصدير حضور
                </button>
                <button style={buttonStyle('secondary')} onClick={exportPayrollReport}>
                  تصدير رواتب
                </button>
              </div>
            </div>

            <div
              style={{
                overflowX: 'auto',
                border: '1px solid #e5e7eb',
                borderRadius: 18,
                background: '#fff'
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: 1250
                }}
              >
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {monthlyRows[0]
                      ? Object.keys(monthlyRows[0]).map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: 'right',
                              padding: 14,
                              borderBottom: '1px solid #e5e7eb',
                              color: '#334155',
                              fontSize: 14
                            }}
                          >
                            {h}
                          </th>
                        ))
                      : <th style={{ textAlign: 'right', padding: 14 }}>لا توجد بيانات</th>}
                  </tr>
                </thead>

                <tbody>
                  {monthlyRows.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((v, i) => (
                        <td
                          key={i}
                          style={{
                            padding: 14,
                            borderBottom: '1px solid #f1f5f9',
                            color: '#0f172a'
                          }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'setup' && user.role === 'admin' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 16
            }}
          >
            <div style={cardStyle({ borderRadius: 24 })}>
              <h2 style={sectionTitleStyle()}>إعداد قاعدة البيانات</h2>

              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: 16,
                  padding: 14,
                  whiteSpace: 'pre-wrap',
                  fontSize: 12,
                  lineHeight: 1.7,
                  maxHeight: 420,
                  overflow: 'auto',
                  border: '1px solid #e5e7eb',
                  direction: 'ltr',
                  textAlign: 'left'
                }}
              >
                {setupSql}
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                <button style={buttonStyle()} onClick={seedDatabase} disabled={loading}>
                  تعبئة البيانات الأساسية والحسابات
                </button>

                <button
                  style={buttonStyle('outline')}
                  onClick={() => navigator.clipboard.writeText(setupSql).then(() => alert('تم نسخ SQL'))}
                >
                  نسخ SQL
                </button>
              </div>
            </div>

            <div style={cardStyle({ borderRadius: 24 })}>
              <h2 style={sectionTitleStyle()}>إضافة موظف</h2>

              <div style={{ display: 'grid', gap: 10 }}>
                <input
                  style={inputStyle()}
                  placeholder="الرقم الوظيفي"
                  value={newWorker.employee_no}
                  onChange={(e) => setNewWorker({ ...newWorker, employee_no: e.target.value })}
                />

                <input
                  style={inputStyle()}
                  placeholder="اسم الموظف"
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                />

                <input
                  style={inputStyle()}
                  placeholder="المسمى الوظيفي"
                  value={newWorker.job_title}
                  onChange={(e) => setNewWorker({ ...newWorker, job_title: e.target.value })}
                />

                <input
                  style={inputStyle()}
                  placeholder="الموقع"
                  value={newWorker.site_name}
                  onChange={(e) => setNewWorker({ ...newWorker, site_name: e.target.value })}
                />

                <input
                  style={inputStyle()}
                  placeholder="نوع الأجر"
                  value={newWorker.wage_type}
                  onChange={(e) => setNewWorker({ ...newWorker, wage_type: e.target.value })}
                />

                <input
                  style={inputStyle()}
                  type="number"
                  placeholder="الأجر اليومي"
                  value={newWorker.daily_rate}
                  onChange={(e) => setNewWorker({ ...newWorker, daily_rate: e.target.value })}
                />

                <button style={buttonStyle()} onClick={addWorker}>
                  حفظ الموظف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AttendanceRow({ row, onSave, saveState }) {
  const [status, setStatus] = useState(row.status || 'حاضر')
  const [overtime, setOvertime] = useState(row.overtime_hours || 0)
  const [notes, setNotes] = useState(row.notes || '')

  useEffect(() => {
    setStatus(row.status || 'حاضر')
    setOvertime(row.overtime_hours || 0)
    setNotes(row.notes || '')
  }, [row.status, row.overtime_hours, row.notes])

  return (
    <tr style={{ background: saveState === 'saved' ? '#f0fdf4' : '#fff' }}>
      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>{row.employee_no}</td>
      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9', fontWeight: 700 }}>{row.name}</td>
      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>{row.job_title}</td>
      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>{row.site_name}</td>

      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>
        <select style={inputStyle()} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="حاضر">حاضر</option>
          <option value="غائب">غائب</option>
          <option value="إجازة">إجازة</option>
          <option value="راحة">راحة</option>
        </select>
      </td>

      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>
        <input
          style={inputStyle()}
          type="number"
          min="0"
          value={overtime}
          onChange={(e) => setOvertime(e.target.value)}
        />
      </td>

      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>
        <input
          style={inputStyle()}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="ملاحظات"
        />
      </td>

      <td style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>
        <button
          style={{
            ...buttonStyle(
              saveState === 'saved'
                ? 'success'
                : saveState === 'error'
                  ? 'danger'
                  : 'primary'
            ),
            opacity: saveState === 'saving' ? 0.7 : 1,
            cursor: saveState === 'saving' ? 'not-allowed' : 'pointer',
            minWidth: 118
          }}
          disabled={saveState === 'saving'}
          onClick={() => onSave({ status, overtime_hours: overtime, notes })}
        >
          {saveState === 'saving'
            ? 'جاري الحفظ...'
            : saveState === 'saved'
              ? '✅ تم الحفظ'
              : saveState === 'error'
                ? 'إعادة الحفظ'
                : 'حفظ'}
        </button>
      </td>
    </tr>
  )
}
