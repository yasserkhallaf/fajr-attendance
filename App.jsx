import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Download, LogOut, Search, UserPlus, Users, ShieldCheck, Database, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
];

const demoAccounts = [
  { username: "admin", password: "1234", role: "admin", name: "مدير النظام" },
  { username: "dharma", password: "1234", role: "supervisor", name: "مشرف ضرما" },
  { username: "hanakya", password: "1234", role: "supervisor", name: "مشرف الحناكية" },
  { username: "kdmi", password: "1234", role: "supervisor", name: "مشرف كدمي" }
];

const setupSql = `
create extension if not exists pgcrypto;

create table if not exists public.users_profile (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password text not null,
  display_name text not null,
  role text not null check (role in ('admin','supervisor')),
  created_at timestamptz default now()
);

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
  latitude numeric,
  longitude numeric,
  location_captured_at timestamptz,
  created_at timestamptz default now(),
  unique(attendance_date, worker_id)
);

alter table public.attendance add column if not exists latitude numeric;
alter table public.attendance add column if not exists longitude numeric;
alter table public.attendance add column if not exists location_captured_at timestamptz;

insert into public.users_profile (username, password, display_name, role)
values
  ('admin','1234','مدير النظام','admin'),
  ('dharma','1234','مشرف ضرما','supervisor'),
  ('hanakya','1234','مشرف الحناكية','supervisor'),
  ('kdmi','1234','مشرف كدمي','supervisor')
on conflict (username) do nothing;
`;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function monthStr() {
  return new Date().toISOString().slice(0, 7);
}

function exportCsv(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => `"${String(row[h] ?? "").replaceAll('"', '""')}"`).join(","))
  ].join("
");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function logoBlock(size = "large") {
  const logoSize = size === "large" ? "h-16" : "h-12";
  return (
    <div className="flex items-center gap-4">
      <img src="/logo.png" alt="فجر الطرق" className={`${logoSize} object-contain`} />
      <div>
        <div className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">مؤسسة فجر الطرق للمقاولات</div>
        <div className="text-sm text-slate-500">FAJR ROADS CONTRACTING FOUNDATION</div>
      </div>
    </div>
  );
}

export default function AttendanceWebApp() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginErr, setLoginErr] = useState("");
  const [sites, setSites] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [selectedMonth, setSelectedMonth] = useState(monthStr());
  const [siteFilter, setSiteFilter] = useState("الكل");
  const [recordedSite, setRecordedSite] = useState("الكل");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gps, setGps] = useState({ lat: "", lng: "", status: "" });
  const [newWorker, setNewWorker] = useState({ employee_no: "", name: "", job_title: "", site_name: "", wage_type: "شهري", daily_rate: 30 });

  const envReady = Boolean(supabase);
  const isAdmin = user?.role === "admin";
  const availableTabs = isAdmin ? ["attendance", "reports", "setup"] : ["attendance"];
  const [activeTab, setActiveTab] = useState("attendance");

  useEffect(() => {
    const savedUser = localStorage.getItem("fajr_user_v3");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (!availableTabs.includes(activeTab)) setActiveTab("attendance");
  }, [user]);

  useEffect(() => {
    if (user && envReady) {
      loadAll();
    }
  }, [user, envReady]);

  async function loadAll() {
    setLoading(true);
    const [sitesRes, workersRes, attendanceRes] = await Promise.all([
      supabase.from("sites").select("*").order("name"),
      supabase.from("workers").select("*").order("employee_no"),
      supabase.from("attendance").select("*, workers(name, employee_no, site_name, job_title, wage_type, daily_rate)").order("attendance_date", { ascending: false })
    ]);
    if (!sitesRes.error) setSites(sitesRes.data || []);
    if (!workersRes.error) setWorkers(workersRes.data || []);
    if (!attendanceRes.error) setAttendance(attendanceRes.data || []);
    setLoading(false);
  }

  async function handleLogin() {
    if (!envReady) {
      const fallback = demoAccounts.find((a) => a.username === login.username && a.password === login.password);
      if (!fallback) return setLoginErr("بيانات الدخول غير صحيحة");
      setUser(fallback);
      localStorage.setItem("fajr_user_v3", JSON.stringify(fallback));
      setLoginErr("");
      return;
    }

    const { data, error } = await supabase
      .from("users_profile")
      .select("username, password, display_name, role")
      .eq("username", login.username)
      .single();

    if (error || !data || data.password !== login.password) {
      setLoginErr("بيانات الدخول غير صحيحة");
      return;
    }

    const logged = { username: data.username, name: data.display_name, role: data.role };
    setUser(logged);
    localStorage.setItem("fajr_user_v3", JSON.stringify(logged));
    setLoginErr("");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("fajr_user_v3");
  }

  function captureLocation() {
    if (!navigator.geolocation) {
      setGps({ lat: "", lng: "", status: "المتصفح لا يدعم تحديد الموقع" });
      return;
    }

    setGps((prev) => ({ ...prev, status: "جارٍ تحديد الموقع..." }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({
          lat: Number(position.coords.latitude).toFixed(6),
          lng: Number(position.coords.longitude).toFixed(6),
          status: "تم تحديد الموقع بنجاح"
        });
      },
      () => {
        setGps({ lat: "", lng: "", status: "تعذر الوصول للموقع. فعّل إذن الموقع من الجوال أو المتصفح" });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  async function seedDatabase() {
    if (!envReady) return;
    setLoading(true);
    const uniqueSites = [...new Set(seedWorkers.map((w) => w.site_name).filter(Boolean))].map((name) => ({ name }));
    await supabase.from("sites").upsert(uniqueSites, { onConflict: "name" });
    await supabase.from("workers").upsert(seedWorkers, { onConflict: "employee_no" });
    await loadAll();
    setLoading(false);
  }

  async function addWorker() {
    if (!envReady) return;
    const payload = {
      employee_no: newWorker.employee_no,
      name: newWorker.name,
      job_title: newWorker.job_title,
      site_name: newWorker.site_name,
      wage_type: newWorker.wage_type,
      daily_rate: Number(newWorker.daily_rate || 30),
      is_active: true
    };
    const { error } = await supabase.from("workers").insert(payload);
    if (!error) {
      setDialogOpen(false);
      setNewWorker({ employee_no: "", name: "", job_title: "", site_name: "", wage_type: "شهري", daily_rate: 30 });
      loadAll();
    }
  }

  async function saveAttendanceRow(workerId, patch) {
    if (!envReady) return;
    const worker = workers.find((w) => w.id === workerId);
    const payload = {
      attendance_date: selectedDate,
      worker_id: workerId,
      status: patch.status ?? "حاضر",
      overtime_hours: Number(patch.overtime_hours ?? 0),
      notes: patch.notes ?? "",
      supervisor_username: user?.username || "",
      recorded_site: recordedSite === "الكل" ? worker?.site_name || "" : recordedSite,
      latitude: gps.lat || null,
      longitude: gps.lng || null,
      location_captured_at: gps.lat && gps.lng ? new Date().toISOString() : null
    };
    await supabase.from("attendance").upsert(payload, { onConflict: "attendance_date,worker_id" });
    loadAll();
  }

  const visibleWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchesSearch = !search || w.name?.includes(search) || w.employee_no?.includes(search);
      const matchesSite = siteFilter === "الكل" || w.site_name === siteFilter;
      return matchesSearch && matchesSite && w.is_active !== false;
    });
  }, [workers, search, siteFilter]);

  const dailyRows = useMemo(() => {
    return visibleWorkers.map((worker) => {
      const row = attendance.find((a) => a.attendance_date === selectedDate && a.worker_id === worker.id);
      return {
        ...worker,
        status: row?.status || "حاضر",
        overtime_hours: row?.overtime_hours || 0,
        notes: row?.notes || ""
      };
    });
  }, [visibleWorkers, attendance, selectedDate]);

  const monthlyRows = useMemo(() => {
    const filtered = attendance.filter((a) => a.attendance_date?.startsWith(selectedMonth));
    const grouped = {};
    filtered.forEach((a) => {
      const w = a.workers;
      if (!w) return;
      if (siteFilter !== "الكل" && w.site_name !== siteFilter) return;
      const key = a.worker_id;
      if (!grouped[key]) {
        grouped[key] = {
          "الرقم الوظيفي": w.employee_no,
          "اسم العامل": w.name,
          "المسمى الوظيفي": w.job_title || "",
          "الموقع": w.site_name || "",
          "نوع الأجر": w.wage_type || "",
          "أيام الحضور": 0,
          "أيام الغياب": 0,
          "أيام الإجازة": 0,
          "أيام الراحة": 0,
          "ساعات إضافية": 0,
          "الأجر اليومي": Number(w.daily_rate || 0),
          "الإجمالي": 0
        };
      }
      if (a.status === "حاضر") grouped[key]["أيام الحضور"] += 1;
      if (a.status === "غائب") grouped[key]["أيام الغياب"] += 1;
      if (a.status === "إجازة") grouped[key]["أيام الإجازة"] += 1;
      if (a.status === "راحة") grouped[key]["أيام الراحة"] += 1;
      grouped[key]["ساعات إضافية"] += Number(a.overtime_hours || 0);
    });
    return Object.values(grouped).map((r) => ({ ...r, "الإجمالي": r["أيام الحضور"] * r["الأجر اليومي"] + r["ساعات إضافية"] * 5 }));
  }, [attendance, selectedMonth, siteFilter]);

  const stats = useMemo(() => {
    return {
      workers: visibleWorkers.length,
      attendanceDays: monthlyRows.reduce((s, r) => s + Number(r["أيام الحضور"] || 0), 0),
      overtime: monthlyRows.reduce((s, r) => s + Number(r["ساعات إضافية"] || 0), 0),
      payroll: monthlyRows.reduce((s, r) => s + Number(r["الإجمالي"] || 0), 0)
    };
  }, [visibleWorkers, monthlyRows]);

  function exportAttendanceReport() {
    const rows = attendance
      .filter((a) => a.attendance_date?.startsWith(selectedMonth))
      .filter((a) => siteFilter === "الكل" || a.workers?.site_name === siteFilter)
      .map((a) => ({
        التاريخ: a.attendance_date,
        الرقم_الوظيفي: a.workers?.employee_no || "",
        العامل: a.workers?.name || "",
        الموقع: a.workers?.site_name || a.recorded_site || "",
        الحالة: a.status,
        اضافي_ساعات: a.overtime_hours,
        خط_العرض: a.latitude || "",
        خط_الطول: a.longitude || "",
        المشرف: a.supervisor_username || "",
        ملاحظات: a.notes || ""
      }));
    exportCsv(`attendance-${selectedMonth}.csv`, rows);
  }

  function exportPayrollReport() {
    exportCsv(`payroll-${selectedMonth}.csv`, monthlyRows);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md rounded-[28px] shadow-xl border-0 overflow-hidden">
          <CardContent className="p-8 space-y-5">
            <div className="space-y-4 text-center">
              <div className="flex justify-center">{logoBlock()}</div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">دخول النظام</h1>
                <p className="text-slate-500 mt-2">حضور المواقع وتسجيل العمال فقط</p>
              </div>
            </div>
            {!envReady && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                أضف متغيرات البيئة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY لتفعيل قاعدة البيانات.
              </div>
            )}
            <div>
              <Label>اسم المستخدم</Label>
              <Input className="mt-2 rounded-2xl h-11" value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} />
            </div>
            <div>
              <Label>كلمة المرور</Label>
              <Input type="password" className="mt-2 rounded-2xl h-11" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            </div>
            {loginErr ? <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl p-3">{loginErr}</div> : null}
            <Button className="w-full rounded-2xl h-11 text-base" onClick={handleLogin}>دخول</Button>
            <div className="text-center text-xs text-slate-400 pt-2">Design by Yasser Khallaf</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="rounded-[30px] border-0 shadow-sm overflow-hidden bg-gradient-to-l from-white to-emerald-50/60">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                {logoBlock("small")}
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">نظام حضور العمال والإضافي</h1>
                  <p className="text-slate-600 mt-2">{isAdmin ? "لوحة المدير للتصدير والإعداد والمتابعة" : "تسجيل الحضور اليومي للموقع فقط"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-xl px-3 py-2 gap-1 bg-emerald-600 hover:bg-emerald-600"><ShieldCheck className="h-4 w-4" /> {user.name || user.username}</Badge>
                {isAdmin ? <Button onClick={exportAttendanceReport} className="rounded-2xl gap-2"><Download className="h-4 w-4" /> تقرير الحضور</Button> : null}
                {isAdmin ? <Button onClick={exportPayrollReport} variant="secondary" className="rounded-2xl gap-2"><Download className="h-4 w-4" /> مسير الرواتب</Button> : null}
                <Button onClick={logout} variant="outline" className="rounded-2xl gap-2"><LogOut className="h-4 w-4" /> خروج</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5"><div className="text-slate-500 text-sm">العمال النشطون</div><div className="text-3xl font-extrabold mt-2 text-slate-900">{stats.workers}</div></CardContent></Card>
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5"><div className="text-slate-500 text-sm">أيام الحضور</div><div className="text-3xl font-extrabold mt-2 text-slate-900">{stats.attendanceDays}</div></CardContent></Card>
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5"><div className="text-slate-500 text-sm">ساعات الإضافي</div><div className="text-3xl font-extrabold mt-2 text-slate-900">{stats.overtime}</div></CardContent></Card>
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5"><div className="text-slate-500 text-sm">إجمالي المستحق</div><div className="text-3xl font-extrabold mt-2 text-slate-900">{stats.payroll}</div></CardContent></Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className={`grid ${isAdmin ? "grid-cols-3" : "grid-cols-1"} rounded-2xl h-auto p-1`}>
            <TabsTrigger value="attendance" className="rounded-2xl">تسجيل الحضور</TabsTrigger>
            {isAdmin ? <TabsTrigger value="reports" className="rounded-2xl">التقارير</TabsTrigger> : null}
            {isAdmin ? <TabsTrigger value="setup" className="rounded-2xl">الإعداد</TabsTrigger> : null}
          </TabsList>

          <TabsContent value="attendance">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader><CardTitle>التسجيل اليومي للموقع</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label>التاريخ</Label>
                    <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-2 rounded-2xl" />
                  </div>
                  <div>
                    <Label>موقع التسجيل اليوم</Label>
                    <Select value={recordedSite} onValueChange={setRecordedSite}>
                      <SelectTrigger className="mt-2 rounded-2xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الكل">الكل</SelectItem>
                        {sites.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>فلترة الموقع</Label>
                    <Select value={siteFilter} onValueChange={setSiteFilter}>
                      <SelectTrigger className="mt-2 rounded-2xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الكل">الكل</SelectItem>
                        {sites.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>بحث</Label>
                    <div className="relative mt-2">
                      <Search className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
                      <Input value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-2xl pr-9" placeholder="اسم العامل أو الرقم الوظيفي" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-emerald-50/60 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> تحديد الموقع الحالي</div>
                    <div className="text-sm text-slate-600">{gps.status || "يفضل تسجيل الموقع قبل الحفظ"}</div>
                    {gps.lat && gps.lng ? <div className="text-xs text-slate-500">Lat: {gps.lat} | Lng: {gps.lng}</div> : null}
                  </div>
                  <Button onClick={captureLocation} className="rounded-2xl">تحديد الموقع GPS</Button>
                </div>

                <div className="overflow-x-auto rounded-2xl border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الرقم</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>المسمى</TableHead>
                        <TableHead>الموقع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإضافي</TableHead>
                        <TableHead>ملاحظات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.employee_no}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.job_title}</TableCell>
                          <TableCell>{row.site_name}</TableCell>
                          <TableCell>
                            <Select value={row.status} onValueChange={(value) => saveAttendanceRow(row.id, { status: value, overtime_hours: row.overtime_hours, notes: row.notes })}>
                              <SelectTrigger className="w-[120px] rounded-2xl"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="حاضر">حاضر</SelectItem>
                                <SelectItem value="غائب">غائب</SelectItem>
                                <SelectItem value="إجازة">إجازة</SelectItem>
                                <SelectItem value="راحة">راحة</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input type="number" min="0" defaultValue={row.overtime_hours} className="w-[90px] rounded-2xl" onBlur={(e) => saveAttendanceRow(row.id, { status: row.status, overtime_hours: Number(e.target.value || 0), notes: row.notes })} />
                          </TableCell>
                          <TableCell>
                            <Input defaultValue={row.notes} className="min-w-[180px] rounded-2xl" onBlur={(e) => saveAttendanceRow(row.id, { status: row.status, overtime_hours: row.overtime_hours, notes: e.target.value })} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin ? (
            <TabsContent value="reports">
              <Card className="rounded-3xl border-0 shadow-sm">
                <CardHeader><CardTitle>التقارير الشهرية</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>الشهر</Label>
                      <Input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="mt-2 rounded-2xl" />
                    </div>
                    <div>
                      <Label>الموقع</Label>
                      <Select value={siteFilter} onValueChange={setSiteFilter}>
                        <SelectTrigger className="mt-2 rounded-2xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="الكل">الكل</SelectItem>
                          {sites.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button onClick={exportAttendanceReport} className="rounded-2xl">تصدير حضور</Button>
                      <Button onClick={exportPayrollReport} variant="secondary" className="rounded-2xl">تصدير رواتب</Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {monthlyRows[0] && Object.keys(monthlyRows[0]).map((k) => <TableHead key={k}>{k}</TableHead>)}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyRows.map((row, idx) => (
                          <TableRow key={idx}>
                            {Object.values(row).map((v, i) => <TableCell key={i}>{v}</TableCell>)}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ) : null}

          {isAdmin ? (
            <TabsContent value="setup">
              <div className="grid lg:grid-cols-2 gap-4">
                <Card className="rounded-3xl border-0 shadow-sm">
                  <CardHeader><CardTitle>إعداد قاعدة البيانات</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-2xl bg-slate-100 p-4 text-sm whitespace-pre-wrap max-h-[380px] overflow-auto">{setupSql}</div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={seedDatabase} className="rounded-2xl gap-2" disabled={!envReady || loading}><Database className="h-4 w-4" /> تعبئة البيانات الأساسية</Button>
                      <Badge variant="outline" className="rounded-xl">{envReady ? "Supabase جاهز" : "أضف متغيرات البيئة أولاً"}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>إضافة موظف</CardTitle>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="rounded-2xl gap-2"><UserPlus className="h-4 w-4" /> موظف جديد</Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl" dir="rtl">
                        <DialogHeader><DialogTitle>إضافة موظف جديد</DialogTitle></DialogHeader>
                        <div className="space-y-3">
                          <Input placeholder="الرقم الوظيفي" value={newWorker.employee_no} onChange={(e) => setNewWorker({ ...newWorker, employee_no: e.target.value })} />
                          <Input placeholder="اسم الموظف" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} />
                          <Input placeholder="المسمى الوظيفي" value={newWorker.job_title} onChange={(e) => setNewWorker({ ...newWorker, job_title: e.target.value })} />
                          <Input placeholder="الموقع" value={newWorker.site_name} onChange={(e) => setNewWorker({ ...newWorker, site_name: e.target.value })} />
                          <Input placeholder="نوع الأجر" value={newWorker.wage_type} onChange={(e) => setNewWorker({ ...newWorker, wage_type: e.target.value })} />
                          <Input type="number" placeholder="الأجر اليومي" value={newWorker.daily_rate} onChange={(e) => setNewWorker({ ...newWorker, daily_rate: e.target.value })} />
                          <Button onClick={addWorker} className="w-full rounded-2xl" disabled={!envReady}>حفظ الموظف</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto rounded-2xl border bg-white max-h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>الرقم</TableHead>
                            <TableHead>الاسم</TableHead>
                            <TableHead>المسمى</TableHead>
                            <TableHead>الموقع</TableHead>
                            <TableHead>نوع الأجر</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {workers.map((w) => (
                            <TableRow key={w.id}>
                              <TableCell>{w.employee_no}</TableCell>
                              <TableCell>{w.name}</TableCell>
                              <TableCell>{w.job_title}</TableCell>
                              <TableCell>{w.site_name}</TableCell>
                              <TableCell>{w.wage_type}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ) : null}
        </Tabs>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5 flex items-start gap-3"><Users className="h-5 w-5 mt-1 text-emerald-600" /><div><div className="font-semibold">تسجيل للمواقع فقط</div><div className="text-sm text-slate-600 mt-1">المشرف يسجل الحضور فقط، والمدير يصدر التقارير.</div></div></CardContent></Card>
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5 flex items-start gap-3"><Database className="h-5 w-5 mt-1 text-emerald-600" /><div><div className="font-semibold">ربط قاعدة بيانات</div><div className="text-sm text-slate-600 mt-1">البيانات محفوظة في Supabase بدل الجهاز.</div></div></CardContent></Card>
          <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-5 flex items-start gap-3"><ShieldCheck className="h-5 w-5 mt-1 text-emerald-600" /><div><div className="font-semibold">GPS وتقارير</div><div className="text-sm text-slate-600 mt-1">تسجيل الموقع الجغرافي مع الحضور وتصدير CSV.</div></div></CardContent></Card>
        </div>
      </div>
    </div>
  );
}
