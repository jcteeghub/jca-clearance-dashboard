import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect, type CSSProperties } from "react";

const supabase = createClient(
  "https://dsomamtpsjqljkrgrtfs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzb21hbXRwc2pxbGprcmdydGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNjg0NTMsImV4cCI6MjA5MDk0NDQ1M30.s0SpVVEYjcBPCJRFiwDGwvZwUUCBBEZx8bGKQw4utTQ"
);

// ── CSS ──
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Montserrat', sans-serif; }
  body { background: #fff5ca; color: #5f110e; }
  .login-box { max-width: 400px; margin: 80px auto; padding: 32px; border: 1px solid #751413; border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.1); color: #333; }
  .login-box input { background: #fff; color: #333; }
  .login-box label { color: #751413; }
  .dash { max-width: 1200px; margin: 0 auto; padding: 24px; }
  .card { border: 1px solid #751413; border-radius: 8px; padding: 16px; margin-bottom: 16px; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.08); color: #333; }
  .tabs { display: flex; gap: 0; border-bottom: 2px solid #751413; margin-bottom: 20px; flex-wrap: wrap; }
  .tab { padding: 10px 18px; border: none; background: none; cursor: pointer; font-size: 13px; font-weight: 600; color: #8b6914; border-bottom: 3px solid transparent; margin-bottom: -2px; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
  .tab.on { color: #5f110e; border-bottom-color: #751413; text-shadow: 0 1px 2px rgba(0,0,0,0.15); }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
  .b-pend { background: #fef3c7; color: #92400e; }
  .b-appr { background: #d1fae5; color: #065f46; }
  .b-dis { background: #fee2e2; color: #991b1b; }
  .b-comp { background: #dbeafe; color: #1e40af; }
  .b-dnp { background: #f3f4f6; color: #6b7280; }
  .dg { display: grid; grid-template-columns: 160px 1fr; gap: 4px 12px; margin-bottom: 12px; }
  .dl { font-weight: 600; color: #751413; font-size: 13px; }
  .dv { font-size: 13px; color: #333; }
  .ct { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
  .ct th, .ct td { border: 1px solid #ddd; padding: 5px 8px; text-align: left; color: #333; }
  .ct th { background: #751413; font-weight: 600; color: #fff; }
  .ab { padding: 6px 14px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 13px; margin-right: 6px; }
  .ab:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-g { background: #10b981; color: white; }
  .btn-r { background: #ef4444; color: white; }
  .btn-b { background: #751413; color: #fff; }
  .btn-y { background: #f59e0b; color: white; }
  .btn-purple { background: #7c3aed; color: white; }
  .ri { width: 100%; padding: 6px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; resize: vertical; min-height: 45px; margin-top: 4px; background: #fff; color: #333; }
  .sec-t { font-size: 17px; font-weight: 700; margin: 20px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #751413; color: #5f110e; text-shadow: 0 1px 2px rgba(0,0,0,0.12); }
  .mbar { height: 22px; border-radius: 4px; }
  .filter-row { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
  .filter-row input, .filter-row select { padding: 6px 8px; border: 1px solid #751413; border-radius: 4px; font-size: 13px; background: #fff; color: #333; }
  .mini-metrics { display: flex; gap: 0; flex-wrap: wrap; margin-bottom: 16px; border: 1px solid #751413; border-radius: 8px; overflow: hidden; background: #fff; }
  .mini-m { text-align: center; padding: 8px 14px; border-right: 1px solid #ddd; flex: 1; min-width: 80px; }
  .mini-m:last-child { border-right: none; }
  .mini-m .num { font-size: 20px; font-weight: 700; color: #751413; }
  .mini-m .lbl { font-size: 10px; color: #666; }
  .clr-stmt { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #065f46; font-style: italic; margin-top: 10px; }
  @media print {
    .tabs, .filter-row, .mini-metrics, .ab, button { display: none !important; }
    .dash { padding: 0 !important; max-width: 100% !important; }
    .card { box-shadow: none !important; border: 1px solid #ccc !important; break-inside: avoid; }
    #report-area { border: none !important; box-shadow: none !important; }
    #report-area .ab { display: none !important; }
  }
  @media (max-width: 640px) {
    .login-box { margin: 24px 16px; padding: 20px; }
    .dash { padding: 12px; }
    .dg { grid-template-columns: 1fr; }
    .tab { padding: 6px 10px; font-size: 11px; }
    .ct { font-size: 10px; }
    .filter-row { flex-direction: column; }
    .mini-m { padding: 6px 8px; }
  }
`;

// ── Types ──
type Sub = { id: string; data: Record<string, any>; status: string; created_at: string };
type Clr = { id: string; submission_id: string; department: string; status: string; reviewed_by: string | null; reviewed_by_name: string | null; reviewed_at: string | null; remarks: string | null };
type Cat = { id: string; parent_reason: string; category_name: string };
type User = { department: string; email: string };

const SUPPORT = ["Finance", "PAGS", "ERC", "Guidance", "Clinic"];
const PRINCIPALS = ["Preschool", "Primary", "Intermediate", "Junior High School", "Senior High School", "Homeschool"];
const SHIFT_ROLES = ["Admissions", "Academic Affairs"];
const inp: CSSProperties = { width: "100%", padding: "6px 8px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13 };

// ── Helpers ──
const fmtDT = (iso: string | null) => {
  if (!iso) return "—";
  // Ensure UTC interpretation — append Z if no timezone info
  const safe = iso.includes("Z") || iso.includes("+") ? iso : iso + "Z";
  const d = new Date(safe);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Manila" }) + " " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Manila" });
};

const parseLevel = (grade: string) => {
  if (!grade) return { level: "Unknown", isHS: false };
  const g = grade.toLowerCase();
  const isHS = g.includes("homeschool");
  if (g.includes("toddler")) return { level: "Toddler", isHS };
  if (g.includes("nursery")) return { level: "Nursery", isHS };
  if (g.includes("kinder")) return { level: "Kinder", isHS };
  const m = g.match(/^(\d+)-/);
  if (m) return { level: "Grade " + m[1], isHS };
  return { level: grade, isHS };
};

const badgeClass = (s: string) => s === "approved" ? "b-appr" : s === "disapproved" ? "b-dis" : s === "completed" ? "b-comp" : s === "did_not_push_through" ? "b-dnp" : "b-pend";

const isTransferLOA = (t: string) => t === "Transfer to Another School" || t === "Leave of Absence";
const isShiftType = (t: string) => t === "Shift to Jubilee Homeschool" || t === "Shift to Jubilee In-school";

// ============================
// LOGIN
// ============================
function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const go = async () => {
    setErr("");
    if (!email || !pw) { setErr("Please enter email and password."); return; }
    setBusy(true);
    const { data, error } = await supabase.from("department_users").select("department, email").eq("email", email.trim().toLowerCase()).eq("password", pw).single();
    if (error || !data) { setErr("Invalid email or password."); setBusy(false); return; }
    onLogin({ department: data.department, email: data.email });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="login-box">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#751413" }}>Jubilee Christian Academy</h1>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: "4px 0 0", color: "#751413" }}>Clearance Dashboard</h2>
        </div>
        <label style={{ fontWeight: 600, fontSize: 13 }}>Email</label>
        <input type="email" style={{ ...inp, marginBottom: 12 }} placeholder="yourname@jca.edu.ph" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
        <label style={{ fontWeight: 600, fontSize: 13 }}>Password</label>
        <input type="password" style={{ ...inp, marginBottom: 12 }} placeholder="Enter password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
        {err && <div style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{err}</div>}
        <button onClick={go} disabled={busy} className="ab btn-b" style={{ width: "100%", padding: "10px 0", fontSize: 15 }}>{busy ? "Logging in..." : "Log In"}</button>
      </div>
    </>
  );
}

// ============================
// DASHBOARD
// ============================
function Dashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [clrs, setClrs] = useState<Clr[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [reviewerNames, setReviewerNames] = useState<Record<string, string>>({});
  const [tab, setTab] = useState("pending");
  const [filterName, setFilterName] = useState("");
  const [filterRef, setFilterRef] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "ref">("name");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  // Manual entry state
  const [manualData, setManualData] = useState<Record<string, any>>({ reasons: [], application_type: "Transfer to Another School" });
  // Category state
  const [newCatParent, setNewCatParent] = useState("");
  const [newCatName, setNewCatName] = useState("");

  const isRegistrar = user.department === "Registrar";
  const isAdmissions = user.department === "Admissions";
  const isAcadAffairs = user.department === "Academic Affairs";
  const isAdmin = isRegistrar || isAdmissions || isAcadAffairs;
  const isPrincipal = PRINCIPALS.includes(user.department);

  const fetch_ = async () => {
    const [r1, r2, r3] = await Promise.all([
      supabase.from("submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("clearances").select("*").order("created_at", { ascending: true }),
      supabase.from("reason_categories").select("*").order("category_name", { ascending: true }),
    ]);
    if (r1.data) setSubs(r1.data);
    if (r2.data) setClrs(r2.data);
    if (r3.data) setCats(r3.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch_();
    const ch1 = supabase.channel("s-ch").on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, () => fetch_()).subscribe();
    const ch2 = supabase.channel("c-ch").on("postgres_changes", { event: "*", schema: "public", table: "clearances" }, () => fetch_()).subscribe();
    return () => { supabase.removeChannel(ch1); supabase.removeChannel(ch2); };
  }, []);

  // ── Filtered submissions based on role ──
  // Registrar: only Transfer/LOA
  // Admissions: only Shift (all shift subs land here)
  // Academic Affairs: only Shift where BOTH principal AND admissions have approved
  const roleSubs = subs.filter((s) => {
    const t = s.data?.application_type || "";
    if (isRegistrar) return isTransferLOA(t);
    if (isAdmissions) return isShiftType(t);
    if (isAcadAffairs) {
      if (!isShiftType(t)) return false;
      const sc = clrs.filter((c) => c.submission_id === s.id);
      const princOk = sc.some((c) => PRINCIPALS.includes(c.department) && c.status === "approved");
      const admOk = sc.some((c) => c.department === "Admissions" && c.status === "approved");
      return princOk && admOk;
    }
    return true; // departments see all their clearances
  });

  const getClrs = (id: string) => clrs.filter((c) => c.submission_id === id);
  const myClr = (id: string) => clrs.find((c) => c.submission_id === id && c.department === user.department);

  // For departments
  const deptSubs = roleSubs.filter((s) => myClr(s.id));
  const deptPending = deptSubs.filter((s) => { const c = myClr(s.id); return c && c.status === "pending"; });
  const deptReviewed = deptSubs.filter((s) => { const c = myClr(s.id); return c && c.status !== "pending"; });

  // For admin (Registrar / Admissions)
  const adminPending = roleSubs.filter((s) => { const c = getClrs(s.id); return s.status === "pending" && c.some((x) => x.status === "pending") && !c.some((x) => x.status === "disapproved"); });
  const adminDisapproved = roleSubs.filter((s) => { const c = getClrs(s.id); return s.status === "pending" && c.some((x) => x.status === "disapproved"); });
  const adminApproved = roleSubs.filter((s) => { const c = getClrs(s.id); return s.status === "pending" && c.length > 0 && c.every((x) => x.status === "approved"); });
  const adminCompleted = roleSubs.filter((s) => s.status === "completed");

  // ── Filters ──
  const applyFilters = (arr: Sub[]) => {
    let f = [...arr];
    if (filterName) {
      const q = filterName.toLowerCase();
      f = f.filter((s) => {
        const d = s.data;
        return (d.last_name || "").toLowerCase().includes(q) || (d.first_name || "").toLowerCase().includes(q);
      });
    }
    if (filterRef) {
      const q = filterRef.toLowerCase();
      f = f.filter((s) => (s.data?.ref_number || "").toLowerCase().includes(q));
    }
    if (filterLevel) {
      f = f.filter((s) => (s.data?.grade || "") === filterLevel);
    }
    if (filterDateFrom) {
      f = f.filter((s) => (s.data?.date_filed || "") >= filterDateFrom);
    }
    if (filterDateTo) {
      f = f.filter((s) => (s.data?.date_filed || "") <= filterDateTo);
    }
    return f;
  };

  const applySorting = (arr: Sub[]) => {
    return [...arr].sort((a, b) => {
      if (sortBy === "date") return (b.data?.date_filed || "").localeCompare(a.data?.date_filed || "");
      if (sortBy === "ref") return (a.data?.ref_number || "").localeCompare(b.data?.ref_number || "");
      return ((a.data?.last_name || "").toLowerCase()).localeCompare((b.data?.last_name || "").toLowerCase());
    });
  };

  const filtered = (arr: Sub[]) => applySorting(applyFilters(arr));

  // All unique grades for filter dropdown
  const allGrades = Array.from(new Set(subs.map((s) => s.data?.grade).filter(Boolean))).sort();

  // ── Notify admin when all dept clearances are done ──
  const notifyAdminIfReady = async (cid: string) => {
    // Find which submission this clearance belongs to
    const clr = clrs.find((c) => c.id === cid);
    if (!clr) return;
    const sid = clr.submission_id;
    const sub = subs.find((s) => s.id === sid);
    if (!sub) return;

    // Re-fetch clearances for this submission to get latest state
    const { data: latest } = await supabase.from("clearances").select("*").eq("submission_id", sid);
    if (!latest) return;

    const allApproved = latest.length > 0 && latest.every((c) => c.status === "approved");
    if (!allApproved) return;

    // Determine who to notify
    const appType = sub.data?.application_type || "";
    const shift = isShiftType(appType);
    const notifyDepts = shift ? ["Admissions", "Academic Affairs"] : ["Registrar"];

    const { data: deptUsers } = await supabase.from("department_users").select("email, department").in("department", notifyDepts);
    const emails = (deptUsers || []).map((u) => u.email);
    if (!emails.length) return;

    const studentName = `${sub.data?.first_name} ${sub.data?.last_name}`;
    const grade = sub.data?.grade || "";
    const subject = encodeURIComponent(`Clearance Complete – ${studentName} (${grade})`);
    const body = encodeURIComponent(
      `All department clearances for ${studentName} of ${grade} have been completed.\n\nThe application for ${appType} is now ready for your review and approval.\n\nReference #: ${sub.data?.ref_number || "N/A"}\n\nThank you.`
    );
    window.open(`mailto:${emails.join(",")}?subject=${subject}&body=${body}`, "_blank");
  };

  // ── Actions ──
  const handleAction = async (cid: string, action: "approved" | "disapproved") => {
    const name = reviewerNames[cid] || "";
    if (!name.trim()) { alert("Please enter the name of the approver."); return; }
    const { error } = await supabase.from("clearances").update({
      status: action,
      reviewed_by: user.email,
      reviewed_by_name: name.trim(),
      reviewed_at: new Date().toISOString().replace("Z", "+00:00"),
      remarks: remarks[cid] || null,
    }).eq("id", cid);
    if (error) alert("Error: " + error.message);
    else {
      setRemarks((p) => ({ ...p, [cid]: "" })); setReviewerNames((p) => ({ ...p, [cid]: "" }));
      if (action === "approved") await notifyAdminIfReady(cid);
      fetch_();
    }
  };

  const handleReapproval = async (cid: string) => {
    if (!window.confirm("Send back to department for re-review?")) return;
    await supabase.from("clearances").update({ status: "pending", reviewed_by: null, reviewed_by_name: null, reviewed_at: null, remarks: null }).eq("id", cid);
    fetch_();
  };

  const handleComplete = async (sid: string) => {
    // Check all reasons are tagged with sub-categories before completing
    const sub = subs.find((s) => s.id === sid);
    if (sub) {
      const reasons: string[] = sub.data?.reasons || [];
      const tags: Record<string, string> = sub.data?.reason_tags || {};
      // Only check reasons that have available categories
      const untagged = reasons.filter((r) => {
        const available = cats.filter((c) => c.parent_reason === r);
        return available.length > 0 && !tags[r];
      });
      if (untagged.length > 0) {
        alert("Please categorize the following reasons before completing:\n\n• " + untagged.join("\n• ") + "\n\nGo to the submission card and use the 'Categorize Reasons' section.");
        return;
      }
    }
    await supabase.from("submissions").update({ status: "completed" }).eq("id", sid);
    fetch_();
  };

  const handleDelete = async (sid: string) => {
    if (!window.confirm("Are you sure you want to delete this submission? This action cannot be undone.")) return;
    // Delete clearances first (foreign key), then submission
    await supabase.from("clearances").delete().eq("submission_id", sid);
    await supabase.from("submissions").delete().eq("id", sid);
    fetch_();
  };

  const handleDidNotPush = async (sid: string) => {
    if (!window.confirm("Mark this student as 'Did not push through'? They will be removed from metrics and reports.")) return;
    await supabase.from("submissions").update({ status: "did_not_push_through" }).eq("id", sid);
    fetch_();
  };

  const handleAnnounce = async (sub: Sub) => {
    const d = sub.data;
    const name = `${d.first_name} ${d.last_name}`;
    const grade = d.grade || "";
    const type = d.application_type || "";
    const depts = getClrs(sub.id).map((c) => c.department);

    // Fetch department emails
    const { data: deptUsers } = await supabase.from("department_users").select("email, department").in("department", depts);
    const emails = (deptUsers || []).map((u) => u.email);

    const subject = `Approved Application – ${name} of ${grade}`;
    const body = `Please be informed that the application of ${name} of ${grade} for ${type} has been approved.\n\nKindly proceed with all necessary updates in your records and files, and take the appropriate actions relevant to your department.\n\nThank you.`;

    const mailto = `mailto:${emails.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
  };

  // ── Manual Entry (Registrar only) ──
  const handleManualSubmit = async () => {
    const d = manualData;
    if (!d.last_name?.trim() || !d.first_name?.trim() || !d.grade || d.grade === "Select") {
      alert("Please fill in Name and Grade Level."); return;
    }
    const { error } = await supabase.from("submissions").insert({
      data: { ...d, manual_entry: true, date_filed: new Date().toISOString().split("T")[0], school_year: "2025-2026" },
      status: "completed",
    });
    if (error) alert("Error: " + error.message);
    else { alert("Manual entry saved."); setManualData({ reasons: [], application_type: "Transfer to Another School" }); fetch_(); }
  };

  const manualCheckbox = (v: string) => {
    const cur: string[] = manualData.reasons || [];
    const up = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
    setManualData((p) => ({ ...p, reasons: up }));
  };

  // ── Category Management ──
  const addCategory = async () => {
    if (!newCatParent || !newCatName.trim()) { alert("Select a reason and enter category name."); return; }
    const exists = cats.some((c) => c.parent_reason === newCatParent && c.category_name.toLowerCase() === newCatName.trim().toLowerCase());
    if (exists) { alert("This category already exists."); return; }
    await supabase.from("reason_categories").insert({ parent_reason: newCatParent, category_name: newCatName.trim(), created_by: user.email });
    setNewCatName("");
    fetch_();
  };

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    await supabase.from("reason_categories").delete().eq("id", id);
    fetch_();
  };

  // ── Tag a reason for a submission ──
  const handleTagReason = async (subId: string, currentData: Record<string, any>, reason: string, category: string) => {
    const tags = { ...(currentData.reason_tags || {}), [reason]: category || undefined };
    // Remove empty tags
    Object.keys(tags).forEach((k) => { if (!tags[k]) delete tags[k]; });
    const updatedData = { ...currentData, reason_tags: tags };
    await supabase.from("submissions").update({ data: updatedData }).eq("id", subId);
    fetch_();
  };

  // ── Render: Reason Tagging (for Registrar / Admissions in admin card) ──
  const renderReasonTags = (sub: Sub) => {
    const d = sub.data;
    const reasons: string[] = d.reasons || [];
    if (!reasons.length || !(isRegistrar || isAdmissions)) return null;
    const tags: Record<string, string> = d.reason_tags || {};

    return (
      <div style={{ marginBottom: 12, padding: 10, background: "#f0fdf4", borderRadius: 6, border: "1px solid #bbf7d0" }}>
        <strong style={{ fontSize: 12, color: "#166534" }}>Categorize Reasons:</strong>
        <p style={{ fontSize: 11, color: "#666", margin: "2px 0 8px" }}>Tag each reason with a sub-category based on the applicant's additional details. This feeds into metrics.</p>
        {reasons.map((r) => {
          const available = cats.filter((c) => c.parent_reason === r);
          if (!available.length) return null;
          return (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 600, minWidth: 160 }}>{r}:</span>
              <select style={{ ...inp, width: "auto", minWidth: 140, fontSize: 12, padding: "3px 6px" }}
                value={tags[r] || ""}
                onChange={(e) => handleTagReason(sub.id, d, r, e.target.value)}>
                <option value="">— No tag —</option>
                {available.map((c) => <option key={c.id} value={c.category_name}>{c.category_name}</option>)}
              </select>
              {tags[r] && <span style={{ fontSize: 11, background: "#dbeafe", color: "#1e40af", padding: "1px 8px", borderRadius: 10, fontWeight: 600 }}>{tags[r]}</span>}
            </div>
          );
        })}
      </div>
    );
  };

  // ── Render: Personal Details ──
  const renderDetails = (d: Record<string, any>) => (
    <div className="dg">
      {d.ref_number && <><span className="dl">Ref #:</span><span className="dv" style={{ fontWeight: 700, color: "#1e3a8a", letterSpacing: 1 }}>{d.ref_number}</span></>}
      <span className="dl">Name:</span>
      <span className="dv">{d.last_name}, {d.first_name} {d.middle_name || ""}</span>
      <span className="dl">Grade / Level:</span><span className="dv">{d.grade}</span>
      {d.email && <><span className="dl">Email:</span><span className="dv">{d.email}</span></>}
      <span className="dl">Application:</span><span className="dv">{d.application_type}{d.manual_entry ? " (Manual)" : ""}</span>
      <span className="dl">Date Filed:</span><span className="dv">{d.date_filed}</span>
      <span className="dl">School Year:</span><span className="dv">{d.school_year}</span>
      {d.transfer_school && <><span className="dl">Transfer To:</span><span className="dv">{d.transfer_school} ({d.transfer_location})</span></>}
    </div>
  );

  // ── Render: Reasons (individual card — no global sub-categories) ──
  const renderReasons = (d: Record<string, any>) => {
    const reasons: string[] = d.reasons || [];
    if (!reasons.length) return null;
    const tags: Record<string, string> = d.reason_tags || {};
    return (
      <div style={{ marginBottom: 10 }}>
        <strong style={{ fontSize: 13, color: "#555" }}>Reasons:</strong>
        <ul style={{ margin: "4px 0", paddingLeft: 20, fontSize: 13 }}>
          {reasons.map((r, i) => (
            <li key={i}>
              {r}
              {tags[r] && <span style={{ marginLeft: 8, fontSize: 11, background: "#eff6ff", color: "#1e40af", padding: "1px 8px", borderRadius: 10, fontWeight: 600 }}>{tags[r]}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // ── Render: Follow-up Details ──
  const renderFollowUp = (d: Record<string, any>) => {
    const items: [string, string][] = [
      ["Sibling studying at", d.sibling_school],
      ["Health details", d.health_details],
      ["Destination country", d.destination_country],
      ["Preferred program / SHS strand", d.preferred_program],
      ["Consider JCA Homeschool", d.jca_homeschool],
      ["Scholarship introduced", d.scholarship_introduced],
      ["Open to scholarship contact", d.scholarship_contact],
      ["Disciplinary details", d.disciplinary_details],
      ["Other reasons", d.other_reasons],
    ].filter(([, v]) => v) as [string, string][];
    if (!items.length) return null;
    return (
      <div style={{ marginBottom: 12, padding: 10, background: "#f9fafb", borderRadius: 6, border: "1px solid #e5e7eb" }}>
        <strong style={{ fontSize: 12, color: "#555" }}>Additional Details:</strong>
        <div className="dg" style={{ marginTop: 6, marginBottom: 0 }}>
          {items.map(([l, v]) => <React.Fragment key={l}><span className="dl">{l}:</span><span className="dv">{v}</span></React.Fragment>)}
        </div>
      </div>
    );
  };

  // ── Render: Parent Letter ──
  const renderLetter = (d: Record<string, any>) => {
    if (!d.parent_letter) return null;
    return (
      <div style={{ marginBottom: 12, padding: 12, background: "#fefce8", borderRadius: 6, border: "1px solid #fde68a" }}>
        <strong style={{ fontSize: 12, color: "#92400e" }}>Parent Letter:</strong>
        <div style={{ fontSize: 13, marginTop: 6, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{d.parent_letter}</div>
      </div>
    );
  };

  // ── Render: Clearance Table ──
  const renderClrTable = (sid: string) => {
    const c = getClrs(sid);
    if (!c.length) return null;
    const allApproved = c.every((x) => x.status === "approved");
    return (
      <>
        <table className="ct">
          <thead><tr><th>Department</th><th>Status</th><th>Name</th><th>Email</th><th>Date & Time</th><th>Remarks</th>{isAdmin && <th>Action</th>}</tr></thead>
          <tbody>
            {c.map((x) => (
              <tr key={x.id}>
                <td>{x.department}</td>
                <td><span className={`badge ${badgeClass(x.status)}`}>{x.status}</span></td>
                <td>{x.reviewed_by_name || "—"}</td>
                <td>{x.reviewed_by || "—"}</td>
                <td>{fmtDT(x.reviewed_at)}</td>
                <td>{x.remarks || "—"}</td>
                {isAdmin && <td>{x.status === "disapproved" && <button className="ab btn-y" style={{ margin: 0, fontSize: 11, padding: "3px 8px" }} onClick={() => handleReapproval(x.id)}>Request Reapproval</button>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        {allApproved && (
          <div className="clr-stmt">
            The student has been cleared of all obligations. Processing and release of official records is hereby authorized.
          </div>
        )}
      </>
    );
  };

  // ── Render: Filters ──
  const renderFilters = () => (
    <div className="filter-row">
      <input placeholder="Search name..." value={filterName} onChange={(e) => setFilterName(e.target.value)} style={{ minWidth: 140 }} />
      <input placeholder="Ref #..." value={filterRef} onChange={(e) => setFilterRef(e.target.value)} style={{ minWidth: 110 }} />
      <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
        <option value="">All Levels</option>
        {allGrades.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>
      <label style={{ fontSize: 12, color: "#5f110e", fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>From:</label>
      <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
      <label style={{ fontSize: 12, color: "#5f110e", fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>To:</label>
      <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} />
      <label style={{ fontSize: 12, color: "#5f110e", fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>Sort:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
        <option value="name">Name (A-Z)</option>
        <option value="date">Date Filed (Newest)</option>
        <option value="ref">Ref # (A-Z)</option>
      </select>
      {(filterName || filterRef || filterLevel || filterDateFrom || filterDateTo) && (
        <button className="ab" style={{ background: "#6b7280", color: "white", fontSize: 12 }} onClick={() => { setFilterName(""); setFilterRef(""); setFilterLevel(""); setFilterDateFrom(""); setFilterDateTo(""); }}>Clear</button>
      )}
    </div>
  );

  // ── Render: Pending Mini Metrics ──
  const renderPendingMini = () => {
    const deptCounts: Record<string, number> = {};
    adminPending.forEach((s) => {
      getClrs(s.id).filter((c) => c.status === "pending").forEach((c) => {
        deptCounts[c.department] = (deptCounts[c.department] || 0) + 1;
      });
    });
    const depts = Object.entries(deptCounts).sort((a, b) => a[0].localeCompare(b[0]));
    if (!depts.length) return null;
    return (
      <div className="mini-metrics">
        {depts.map(([d, n]) => (
          <div className="mini-m" key={d}>
            <div className="num">{n}</div>
            <div className="lbl">{d}</div>
          </div>
        ))}
      </div>
    );
  };

  // ── Toggle expand/collapse ──
  const toggleExpand = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  // ── Compact card header (collapsed view) ──
  const renderCardHeader = (sub: Sub, extra?: React.ReactNode) => {
    const d = sub.data;
    const isOpen = expanded[sub.id];
    const sc = getClrs(sub.id);
    const approved = sc.filter((c) => c.status === "approved").length;
    const total = sc.length;
    const allCleared = total > 0 && approved === total && sub.status === "pending";
    const bgColor = isOpen ? "#f0f4ff" : allCleared ? "#ecfdf5" : "#fff";
    const borderColor = allCleared ? "#10b981" : "#ddd";
    return (
      <div onClick={() => toggleExpand(sub.id)}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 14px", background: bgColor, border: `${allCleared ? "2px" : "1px"} solid ${borderColor}`, borderRadius: isOpen ? "8px 8px 0 0" : 8, marginBottom: isOpen ? 0 : 8, userSelect: "none", flexWrap: "wrap" }}>
        <span style={{ fontSize: 16, color: "#999", flexShrink: 0 }}>{isOpen ? "▼" : "▶"}</span>
        {allCleared && <span style={{ fontSize: 11, background: "#10b981", color: "white", padding: "2px 8px", borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>READY</span>}
        {d.ref_number && <span style={{ fontWeight: 700, color: "#1e3a8a", fontSize: 12, letterSpacing: 1, background: "#eff6ff", padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>{d.ref_number}</span>}
        <span style={{ fontWeight: 600, fontSize: 14, color: "#333" }}>{d.last_name}, {d.first_name}</span>
        <span style={{ fontSize: 12, color: "#666" }}>{d.grade}</span>
        <span style={{ fontSize: 11, color: "#777" }}>{d.application_type}</span>
        {total > 0 && <span style={{ fontSize: 11, color: approved === total ? "#10b981" : "#f59e0b", fontWeight: 600, marginLeft: "auto" }}>{approved}/{total} cleared</span>}
        <span className={`badge ${badgeClass(sub.status)}`} style={{ fontSize: 11 }}>{sub.status}</span>
        {extra}
      </div>
    );
  };

  // ── Render: Admin Card ──
  const renderAdminCard = (sub: Sub, section: string) => {
    const d = sub.data;
    const subIsShift = isShiftType(d.application_type || "");
    const isHSDept = (d.grade || "").toLowerCase().includes("homeschool");
    const isOpen = expanded[sub.id];

    // For Admissions / Academic Affairs — find their own clearance
    const mc = myClr(sub.id);
    const mcPending = mc && mc.status === "pending";

    // Academic Affairs: check if principal AND admissions have approved
    const subClrs = getClrs(sub.id);
    const principalApproved = subClrs.some((c) => PRINCIPALS.includes(c.department) && c.status === "approved");
    const admissionsApproved = subClrs.some((c) => c.department === "Admissions" && c.status === "approved");
    const canAcadAct = principalApproved && admissionsApproved;

    return (
      <div key={sub.id} style={{ marginBottom: 4 }}>
        {renderCardHeader(sub)}
        {isOpen && (
          <div className="card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 0, borderTop: "none" }}>
            {renderDetails(d)}
            {renderReasons(d)}
            {renderFollowUp(d)}
            {renderReasonTags(sub)}
            {renderLetter(d)}

            {/* Send Email to Applicant */}
            {d.email && (
              <button className="ab" style={{ background: "#6366f1", color: "white", fontSize: 12, padding: "4px 12px", marginBottom: 8 }}
                onClick={() => {
                  const name = `${d.first_name} ${d.last_name}`;
                  const subject = encodeURIComponent(`Clearance Update – ${name} (${d.grade})`);
                  window.open(`mailto:${d.email}?subject=${subject}`, "_blank");
                }}>
                ✉ Send Email to Applicant
              </button>
            )}

            {/* All admin roles see the clearance table */}
            {renderClrTable(sub.id)}

            {/* Admissions: own action area for shift submissions */}
            {isAdmissions && subIsShift && mc && mcPending && (
              <div style={{ marginTop: 12, padding: 12, background: "#fef3c7", borderRadius: 6, border: "1px solid #fde68a" }}>
                <strong style={{ fontSize: 14, color: "#92400e" }}>Your Action — Admission Result</strong>
                <div style={{ marginTop: 8, marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Name of Approver <span style={{ color: "red" }}>*</span></label>
                  <input style={{ ...inp, marginTop: 4 }} placeholder="Enter approver's full name (required)" value={reviewerNames[mc.id] || ""} onChange={(e) => setReviewerNames((p) => ({ ...p, [mc.id]: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontWeight: 600, fontSize: 12 }}>Admission Result <span style={{ color: "red" }}>*</span></label>
                  <textarea className="ri" style={{ minHeight: 60 }} placeholder="Enter admission result..." value={admissionResult[mc.id] || ""} onChange={(e) => setAdmissionResult((p) => ({ ...p, [mc.id]: e.target.value }))} />
                </div>
                <label style={{ fontWeight: 600, fontSize: 13, display: "block" }}>Additional Remarks (optional):</label>
                <textarea className="ri" placeholder="Any additional remarks..." value={remarks[mc.id] || ""} onChange={(e) => setRemarks((p) => ({ ...p, [mc.id]: e.target.value }))} />
                <div style={{ marginTop: 8 }}>
                  <button className="ab btn-g" onClick={() => handleEndorseAction(mc.id, "approved", d)}>Submit Result & Approve</button>
                  <button className="ab btn-r" onClick={() => handleEndorseAction(mc.id, "disapproved", d)}>Disapprove</button>
                </div>
              </div>
            )}

            {/* Academic Affairs: final approval for shift submissions */}
            {isAcadAffairs && subIsShift && mc && mcPending && (
              <div style={{ marginTop: 12, padding: 12, background: "#ecfdf5", borderRadius: 6, border: "1px solid #a7f3d0" }}>
                <strong style={{ fontSize: 14, color: "#065f46" }}>
                  Final Approval — Academic Affairs Director
                </strong>
                <div style={{ marginTop: 8, marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Name of Approver <span style={{ color: "red" }}>*</span></label>
                  <input style={{ ...inp, marginTop: 4 }} placeholder="Enter approver's full name (required)" value={reviewerNames[mc.id] || ""} onChange={(e) => setReviewerNames((p) => ({ ...p, [mc.id]: e.target.value }))} />
                </div>
                <label style={{ fontWeight: 600, fontSize: 13, display: "block" }}>Remarks (optional):</label>
                <textarea className="ri" placeholder="Add remarks..." value={remarks[mc.id] || ""} onChange={(e) => setRemarks((p) => ({ ...p, [mc.id]: e.target.value }))} />
                <div style={{ marginTop: 8 }}>
                  <button className="ab btn-g" onClick={() => handleAction(mc.id, "approved")}>Approve (Final)</button>
                  <button className="ab btn-r" onClick={() => handleAction(mc.id, "disapproved")}>Disapprove</button>
                </div>
              </div>
            )}

            {section === "approved" && (
              <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                {(isRegistrar || (isAdmissions && subIsShift)) && (
                  <button className="ab btn-b" onClick={() => handleComplete(sub.id)}>Mark as Completed</button>
                )}
              </div>
            )}
            {section === "completed" && (
              <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                <span className="badge b-comp">COMPLETED</span>
                {(isRegistrar || (isAdmissions && subIsShift)) && (
                  <button className="ab btn-purple" style={{ fontSize: 12, padding: "4px 12px" }} onClick={() => handleAnnounce(sub)}>Announce to Departments</button>
                )}
              </div>
            )}

            {/* Delete (Registrar / Admissions only) */}
            {(isRegistrar || isAdmissions) && (
              <div style={{ marginTop: 10, borderTop: "1px solid #eee", paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                {sub.status !== "did_not_push_through" && sub.status !== "completed" && (
                  <button className="ab" style={{ fontSize: 11, padding: "3px 10px", background: "#6b7280", color: "white" }} onClick={() => handleDidNotPush(sub.id)}>Did Not Push Through</button>
                )}
                <button className="ab btn-r" style={{ fontSize: 11, padding: "3px 10px", opacity: 0.7, marginLeft: "auto" }} onClick={() => handleDelete(sub.id)}>Delete Entry</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ── Endorsement state for principal (shift) ──
  const [endorseAcademic, setEndorseAcademic] = useState<Record<string, string>>({});
  const [endorseDeportment, setEndorseDeportment] = useState<Record<string, string>>({});
  const [endorseHSCompliance, setEndorseHSCompliance] = useState<Record<string, string>>({});
  const [endorseNotes, setEndorseNotes] = useState<Record<string, string>>({});
  // Admission result state
  const [admissionResult, setAdmissionResult] = useState<Record<string, string>>({});

  const handleEndorseAction = async (cid: string, action: "approved" | "disapproved", subData: Record<string, any>) => {
    const name = reviewerNames[cid] || "";
    if (!name.trim()) { alert("Please enter the name of the approver."); return; }

    // Build endorsement remarks
    const parts: string[] = [];
    if (isPrincipal) {
      const acad = endorseAcademic[cid]; const dep = endorseDeportment[cid]; const hsc = endorseHSCompliance[cid]; const notes = endorseNotes[cid];
      if (acad) parts.push("Academic: " + acad);
      if (dep) parts.push("Deportment: " + dep);
      if (hsc) parts.push("Homeschool Compliance: " + hsc);
      if (notes) parts.push("Notes: " + notes);
      if (remarks[cid]) parts.push("Remarks: " + remarks[cid]);
    } else if (isAdmissions) {
      const res = admissionResult[cid];
      if (!res?.trim()) { alert("Please fill in the Admission Result."); return; }
      parts.push("Admission Result: " + res);
      if (remarks[cid]) parts.push("Remarks: " + remarks[cid]);
    } else {
      if (remarks[cid]) parts.push(remarks[cid]);
    }

    const { error } = await supabase.from("clearances").update({
      status: action,
      reviewed_by: user.email,
      reviewed_by_name: name.trim(),
      reviewed_at: new Date().toISOString().replace("Z", "+00:00"),
      remarks: parts.join(" | ") || null,
    }).eq("id", cid);
    if (error) alert("Error: " + error.message);
    else {
      setRemarks((p) => ({ ...p, [cid]: "" })); setReviewerNames((p) => ({ ...p, [cid]: "" }));
      if (action === "approved") await notifyAdminIfReady(cid);
      fetch_();
    }
  };

  // ── Render: Dept Card ──
  const renderDeptCard = (sub: Sub, pending: boolean) => {
    const d = sub.data;
    const mc = myClr(sub.id);
    if (!mc) return null;
    const isOpen = expanded[sub.id];

    const subIsShift = isShiftType(d.application_type || "");
    const isHSDept = (d.grade || "").toLowerCase().includes("homeschool");
    const showLetter = isPrincipal || isAdmissions || isRegistrar || isAcadAffairs;

    return (
      <div key={sub.id} style={{ marginBottom: 4 }}>
        {renderCardHeader(sub, <span className={`badge ${badgeClass(mc.status)}`} style={{ fontSize: 11 }}>My: {mc.status}</span>)}
        {isOpen && (
          <div className="card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 0, borderTop: "none" }}>
            {renderDetails(d)}
            {(isPrincipal || isAdmin) && renderReasons(d)}
            {renderFollowUp(d)}
            {showLetter && renderLetter(d)}

            {/* Show my clearance status */}
            <div style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 13 }}>My Clearance: </strong>
              <span className={`badge ${badgeClass(mc.status)}`}>{mc.status}</span>
              {mc.reviewed_at && <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>{fmtDT(mc.reviewed_at)}</span>}
              {mc.reviewed_by_name && <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>by {mc.reviewed_by_name}</span>}
            </div>
            {mc.remarks && <div style={{ fontSize: 12, color: "#666", marginBottom: 8, fontStyle: "italic" }}>Remarks: {mc.remarks}</div>}

            {/* Send Email to Applicant */}
            {d.email && (
              <button className="ab" style={{ background: "#6366f1", color: "white", fontSize: 12, padding: "4px 12px", marginBottom: 8 }}
                onClick={() => {
                  const name = `${d.first_name} ${d.last_name}`;
                  const subject = encodeURIComponent(`Clearance Update – ${name} (${d.grade})`);
                  window.open(`mailto:${d.email}?subject=${subject}`, "_blank");
                }}>
                ✉ Send Email to Applicant
              </button>
            )}

            {/* PENDING ACTIONS */}
            {pending && (
              <div style={{ marginTop: 10, padding: 12, background: "#f9fafb", borderRadius: 6 }}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Name of Approver <span style={{ color: "red" }}>*</span></label>
                  <input style={{ ...inp, marginTop: 4 }} placeholder="Enter approver's full name (required)" value={reviewerNames[mc.id] || ""} onChange={(e) => setReviewerNames((p) => ({ ...p, [mc.id]: e.target.value }))} />
                </div>

                {isPrincipal && subIsShift && (
                  <div style={{ marginBottom: 10, padding: 10, background: "#eff6ff", borderRadius: 6, border: "1px solid #bfdbfe" }}>
                    <strong style={{ fontSize: 13, color: "#1e40af" }}>Endorsement by Department Principal</strong>
                    <p style={{ fontSize: 12, color: "#555", margin: "4px 0 8px" }}>Clearance for:</p>
                    <div style={{ marginBottom: 6 }}>
                      <label style={{ fontWeight: 600, fontSize: 12 }}>Academic</label>
                      <select style={{ ...inp, marginTop: 2 }} value={endorseAcademic[mc.id] || ""} onChange={(e) => setEndorseAcademic((p) => ({ ...p, [mc.id]: e.target.value }))}>
                        <option value="">Select</option><option>Cleared</option><option>Not Cleared</option><option>With Conditions</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      <label style={{ fontWeight: 600, fontSize: 12 }}>Deportment</label>
                      <select style={{ ...inp, marginTop: 2 }} value={endorseDeportment[mc.id] || ""} onChange={(e) => setEndorseDeportment((p) => ({ ...p, [mc.id]: e.target.value }))}>
                        <option value="">Select</option><option>Cleared</option><option>Not Cleared</option><option>With Conditions</option>
                      </select>
                    </div>
                    {isHSDept && (
                      <div style={{ marginBottom: 6 }}>
                        <label style={{ fontWeight: 600, fontSize: 12 }}>Homeschool Compliance</label>
                        <select style={{ ...inp, marginTop: 2 }} value={endorseHSCompliance[mc.id] || ""} onChange={(e) => setEndorseHSCompliance((p) => ({ ...p, [mc.id]: e.target.value }))}>
                          <option value="">Select</option><option>Cleared</option><option>Not Cleared</option><option>With Conditions</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 12 }}>Remarks & Notes by Principal</label>
                      <textarea className="ri" placeholder="Additional notes..." value={endorseNotes[mc.id] || ""} onChange={(e) => setEndorseNotes((p) => ({ ...p, [mc.id]: e.target.value }))} />
                    </div>
                  </div>
                )}

                {isAdmissions && subIsShift && (
                  <div style={{ marginBottom: 10, padding: 10, background: "#fef3c7", borderRadius: 6, border: "1px solid #fde68a" }}>
                    <strong style={{ fontSize: 13, color: "#92400e" }}>Admission Result</strong>
                    <p style={{ fontSize: 12, color: "#555", margin: "4px 0 8px" }}>To be filled out by Admissions Officer:</p>
                    <textarea className="ri" style={{ minHeight: 60 }} placeholder="Enter admission result..." value={admissionResult[mc.id] || ""} onChange={(e) => setAdmissionResult((p) => ({ ...p, [mc.id]: e.target.value }))} />
                  </div>
                )}

                {!(isPrincipal && subIsShift) && !(isAdmissions && subIsShift) && (
                  <>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Remarks (optional):</label>
                    <textarea className="ri" placeholder="Add remarks..." value={remarks[mc.id] || ""} onChange={(e) => setRemarks((p) => ({ ...p, [mc.id]: e.target.value }))} />
                  </>
                )}
                {((isPrincipal && subIsShift) || (isAdmissions && subIsShift)) && (
                  <>
                    <label style={{ fontWeight: 600, fontSize: 13, marginTop: 6, display: "block" }}>Additional Remarks (optional):</label>
                    <textarea className="ri" placeholder="Any additional remarks..." value={remarks[mc.id] || ""} onChange={(e) => setRemarks((p) => ({ ...p, [mc.id]: e.target.value }))} />
                  </>
                )}

                <div style={{ marginTop: 8 }}>
                  {subIsShift && (isPrincipal || isAdmissions) ? (
                    <>
                      <button className="ab btn-g" onClick={() => handleEndorseAction(mc.id, "approved", d)}>
                        {isPrincipal ? "Endorse & Approve" : "Submit Result & Approve"}
                      </button>
                      <button className="ab btn-r" onClick={() => handleEndorseAction(mc.id, "disapproved", d)}>Disapprove</button>
                    </>
                  ) : (
                    <>
                      <button className="ab btn-g" onClick={() => handleAction(mc.id, "approved")}>Approve</button>
                      <button className="ab btn-r" onClick={() => handleAction(mc.id, "disapproved")}>Disapprove</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ── Render: Manual Entry Page ──
  const TRANSFER_REASONS = [
    "Personal Concerns", "Change of Residence", "Desire to be with siblings",
    "Security or Safety Concerns", "Health Reasons", "Moving Abroad",
    "Different academic program", "Discontinuation of Chinese Curriculum",
    "Dissatisfaction with Teaching Approach", "Dissatisfaction with the curriculum",
    "Transition to Homeschool", "Learning environment", "School Rules and Policies",
    "Student Experience", "School Fees", "2nd retention in the department",
    "2nd year of failure in Chinese", "Failure to meet Probation",
    "2 or more C- ratings", "Dropped",
  ];

  const GRADE_OPTIONS = [
    "Toddler Sunshine",
    "Nursery Joy", "Nursery Love", "Nursery Peace", "Nursery Homeschool",
    "Kinder Abraham", "Kinder David", "Kinder Moses", "Kinder Noah", "Kinder Samuel", "Kinder Homeschool",
    "1- Jasmine", "1- Lily", "1- Marigold", "1- Tulip", "1- Homeschool",
    "2- Confucius", "2- Lao Tze", "2- Mencius", "2- Sun Tzu", "2- Homeschool",
    "3- Daniel", "3- Ezra", "3- Isaiah", "3- Nehemiah", "3- Homeschool",
    "4- Kabayanihan", "4- Kalayaan", "4- Kaunlaran", "4- Homeschool",
    "5- Euclid", "5- Kepler", "5- Napier", "5- Homeschool",
    "6- Hemingway", "6- Keats", "6- Milton",
    "7- Justice", "7- Rizal", "7- Truth",
    "8- Aristotle", "8- Equality", "8- Righteousness",
    "9- Freedom", "9- Nobility", "9- Sun Yat Sen",
    "10- Purity", "10- Service", "10- Solomon",
    "11- Matthew", "11- Paul", "11- Peter",
    "12- Dwight Moody", "12- Hudson Taylor", "12- Martin Luther",
  ];

  const renderManualEntry = () => (
    <div>
      <div className="sec-t" style={{ color: "#751413", borderBottomColor: "#d4a84a" }}>Manual Entry — Students who left without filing</div>
      <div className="card">
        <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>Last Name *</label>
            <input style={{ ...inp, marginTop: 4 }} value={manualData.last_name || ""} onChange={(e) => setManualData((p) => ({ ...p, last_name: e.target.value }))} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>First Name *</label>
            <input style={{ ...inp, marginTop: 4 }} value={manualData.first_name || ""} onChange={(e) => setManualData((p) => ({ ...p, first_name: e.target.value }))} />
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>Middle Name</label>
            <input style={{ ...inp, marginTop: 4 }} value={manualData.middle_name || ""} onChange={(e) => setManualData((p) => ({ ...p, middle_name: e.target.value }))} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>Grade / Level *</label>
            <select style={{ ...inp, marginTop: 4 }} value={manualData.grade || "Select"} onChange={(e) => setManualData((p) => ({ ...p, grade: e.target.value }))}>
              <option>Select</option>
              {GRADE_OPTIONS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>Application Type</label>
            <select style={{ ...inp, marginTop: 4 }} value={manualData.application_type} onChange={(e) => setManualData((p) => ({ ...p, application_type: e.target.value, reasons: [] }))}>
              <option>Transfer to Another School</option>
              <option>Leave of Absence</option>
            </select>
          </div>
        </div>
        <label style={{ fontWeight: 600, fontSize: 12, marginBottom: 6, display: "block" }}>Reasons (check all that apply):</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 12 }}>
          {TRANSFER_REASONS.map((r) => (
            <label key={r} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <input type="checkbox" checked={(manualData.reasons || []).includes(r)} onChange={() => manualCheckbox(r)} />
              {r}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 600, fontSize: 12 }}>Other reason:</label>
          <input style={{ ...inp, marginTop: 4 }} value={manualData.other_reasons || ""} onChange={(e) => setManualData((p) => ({ ...p, other_reasons: e.target.value }))} />
        </div>
        <button className="ab btn-b" onClick={handleManualSubmit}>Save Manual Entry</button>
      </div>
    </div>
  );

  // ── Render: Category Management ──
  // Registrar reasons (Transfer / LOA)
  const REGISTRAR_CAT_REASONS = [
    "Different academic program",
    "Desire to be with siblings",
    "Health Reasons",
    "Moving Abroad",
    "Transition to Homeschool",
    "School Fees",
    "Disciplinary concerns",
    "Others",
  ];
  // Admissions reasons (Shift / Homeschool)
  const ADMISSIONS_CAT_REASONS = [
    "Disciplinary concerns",
    "Others",
  ];

  const activeCatReasons = isAdmissions ? ADMISSIONS_CAT_REASONS : REGISTRAR_CAT_REASONS;

  const renderCategories = () => (
    <div>
      <div className="sec-t" style={{ color: "#751413", borderBottomColor: "#d4a84a" }}>Sub-Answer Categories</div>
      <div className="card">
        <p style={{ fontSize: 13, color: "#666", marginTop: 0 }}>
          {isAdmissions
            ? "Create categories for Shift/Homeschool reasons (e.g. under \"Disciplinary concerns\" → \"Behavioral\", \"Academic Dishonesty\")."
            : "Create categories to classify sub-answers (e.g. under \"Different academic program\" → \"IB Program\", \"HUMSS\", \"Progressive\")."}
          {" "}These appear in metrics under their parent reason.
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ minWidth: 200 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>Parent Reason</label>
            <select style={{ ...inp, marginTop: 4 }} value={newCatParent} onChange={(e) => setNewCatParent(e.target.value)}>
              <option value="">Select reason...</option>
              {activeCatReasons.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label style={{ fontWeight: 600, fontSize: 12 }}>Category Name</label>
            <input style={{ ...inp, marginTop: 4 }} placeholder="e.g., IB Program" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
          </div>
          <button className="ab btn-g" onClick={addCategory}>Add</button>
        </div>
        {activeCatReasons.map((r) => {
          const rc = cats.filter((c) => c.parent_reason === r);
          if (!rc.length) return null;
          return (
            <div key={r} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 13 }}>{r}</strong>
              <div style={{ marginLeft: 16, marginTop: 4 }}>
                {rc.map((c) => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 2 }}>
                    <span>• {c.category_name}</span>
                    <button onClick={() => deleteCategory(c.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 11 }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Render: Metrics ──
  const renderMetrics = () => {
    // Exclude "did not push through" from metrics
    const metricSubs = roleSubs.filter((s) => s.status !== "did_not_push_through");
    const total = metricSubs.length;
    const byType: Record<string, number> = {};
    const byStatus = { pending: 0, completed: 0 };
    const transferReasons: Record<string, number> = {};
    const shiftReasons: Record<string, number> = {};
    const levelMap: Record<string, { inschool: number; homeschool: number }> = {};

    metricSubs.forEach((s) => {
      const d = s.data;
      const type = d.application_type || "Unknown";
      byType[type] = (byType[type] || 0) + 1;
      if (s.status === "completed") byStatus.completed++; else byStatus.pending++;

      // Level breakdown
      const { level, isHS } = parseLevel(d.grade || "");
      if (!levelMap[level]) levelMap[level] = { inschool: 0, homeschool: 0 };
      if (isHS) levelMap[level].homeschool++; else levelMap[level].inschool++;

      // Reasons
      const reasons: string[] = d.reasons || [];
      reasons.forEach((r) => {
        if (isShiftType(type)) shiftReasons[r] = (shiftReasons[r] || 0) + 1;
        else transferReasons[r] = (transferReasons[r] || 0) + 1;
      });
    });

    const colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16", "#06b6d4", "#e11d48", "#a855f7", "#0ea5e9", "#d946ef"];

    const bar = (label: string, count: number, max: number, color: string) => (
      <div key={label} style={{ marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 2 }}>
          <span>{label}</span><span style={{ fontWeight: 600 }}>{count}</span>
        </div>
        <div style={{ background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
          <div className="mbar" style={{ width: max > 0 ? `${(count / max) * 100}%` : "0%", background: color, minWidth: count > 0 ? 16 : 0 }} />
        </div>
      </div>
    );

    // Level order
    const levelOrder = ["Toddler", "Nursery", "Kinder", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
    const sortedLevels = levelOrder.filter((l) => levelMap[l]);

    const maxType = Math.max(...Object.values(byType), 1);

    // Count per-submission reason tags for sub-category metrics
    const tagCounts: Record<string, Record<string, number>> = {}; // { "Health Reasons": { "Physical": 2, "Mental": 1 } }
    metricSubs.forEach((s) => {
      const tags: Record<string, string> = s.data?.reason_tags || {};
      Object.entries(tags).forEach(([reason, cat]) => {
        if (!cat) return;
        if (!tagCounts[reason]) tagCounts[reason] = {};
        tagCounts[reason][cat] = (tagCounts[reason][cat] || 0) + 1;
      });
    });

    // For reason bars with counted sub-categories
    const renderReasonBars = (reasons: Record<string, number>, colorOffset: number) => {
      const maxR = Math.max(...Object.values(reasons), 1);
      const isOther = (s: string) => /^other/i.test(s);
      return Object.entries(reasons)
        .sort((a, b) => {
          if (isOther(a[0]) && !isOther(b[0])) return 1;
          if (!isOther(a[0]) && isOther(b[0])) return -1;
          return a[0].localeCompare(b[0]);
        })
        .map(([label, count], i) => {
        const subTags = tagCounts[label] || {};
        const tagEntries = Object.entries(subTags).sort((a, b) => b[1] - a[1]);
        return (
          <React.Fragment key={label}>
            {bar(label, count, maxR, colors[(i + colorOffset) % colors.length])}
            {tagEntries.map(([cat, n]) => (
              <div key={cat} style={{ marginLeft: 20, marginBottom: 3 }}>
                <div style={{ fontSize: 12, display: "flex", justifyContent: "space-between", maxWidth: 400 }}>
                  <span style={{ color: "#444" }}>↳ {cat}</span>
                  <span style={{ fontWeight: 600, color: "#555" }}>{n}</span>
                </div>
              </div>
            ))}
            {/* No uncategorized count shown */}
          </React.Fragment>
        );
      });
    };

    return (
      <div>
        {/* Overview */}
        <div className="card">
          <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>Overview</h3>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 700 }}>{total}</div><div style={{ fontSize: 12, color: "#666" }}>Total</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 700, color: "#f59e0b" }}>{byStatus.pending}</div><div style={{ fontSize: 12, color: "#666" }}>Pending</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 700, color: "#10b981" }}>{byStatus.completed}</div><div style={{ fontSize: 12, color: "#666" }}>Completed</div></div>
          </div>
        </div>

        {/* By Type */}
        <div className="card">
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>By Application Type</h3>
          {Object.entries(byType).map(([l, c], i) => bar(l, c, maxType, colors[i % colors.length]))}
        </div>

        {/* By Level with homeschool breakdown */}
        <div className="card">
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>By Level</h3>
          {sortedLevels.map((level) => {
            const d = levelMap[level];
            const t = d.inschool + d.homeschool;
            return (
              <div key={level} style={{ marginBottom: 10, padding: "8px 12px", background: "#f9fafb", borderRadius: 6 }}>
                {d.homeschool > 0 ? (
                  <>
                    <div style={{ fontSize: 13, display: "flex", justifyContent: "space-between" }}>
                      <span>{level} In-school</span><strong>{d.inschool}</strong>
                    </div>
                    <div style={{ fontSize: 13, display: "flex", justifyContent: "space-between" }}>
                      <span>{level} Homeschool</span><strong>{d.homeschool}</strong>
                    </div>
                    <div style={{ fontSize: 13, display: "flex", justifyContent: "space-between", borderTop: "1px solid #ddd", marginTop: 4, paddingTop: 4, fontWeight: 700 }}>
                      <span>{level} Total</span><span>{t}</span>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 13, display: "flex", justifyContent: "space-between" }}>
                    <span>{level}</span><strong>{t}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Transfer/LOA Reasons */}
        {(isRegistrar || isAdmissions || isAcadAffairs) && Object.keys(transferReasons).length > 0 && (
          <div className="card">
            <h3 style={{ margin: "0 0 4px", fontSize: 16 }}>Reasons — Transfer / Leave of Absence</h3>
            <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888" }}>From all Transfer and LOA submissions</p>
            {renderReasonBars(transferReasons, 0)}
          </div>
        )}

        {/* Shift Reasons */}
        {(isRegistrar || isAdmissions || isAcadAffairs) && Object.keys(shiftReasons).length > 0 && (
          <div className="card">
            <h3 style={{ margin: "0 0 4px", fontSize: 16 }}>Reasons — Shift (Homeschool / In-school)</h3>
            <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888" }}>From all Shift submissions</p>
            {renderReasonBars(shiftReasons, 5)}
          </div>
        )}
      </div>
    );
  };

  // ── Render: Report ──
  const renderReport = () => {
    const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Manila" });
    // Exclude "did not push through" from report
    const reportSubs = roleSubs.filter((s) => s.status !== "did_not_push_through");
    const byType: Record<string, Sub[]> = {};
    reportSubs.forEach((s) => {
      const t = s.data?.application_type || "Unknown";
      if (!byType[t]) byType[t] = [];
      byType[t].push(s);
    });
    const reasonCounts: Record<string, number> = {};
    const tagCountsR: Record<string, Record<string, number>> = {};
    reportSubs.forEach((s) => {
      const reasons: string[] = s.data?.reasons || [];
      const tags: Record<string, string> = s.data?.reason_tags || {};
      reasons.forEach((r) => {
        reasonCounts[r] = (reasonCounts[r] || 0) + 1;
        if (tags[r]) {
          if (!tagCountsR[r]) tagCountsR[r] = {};
          tagCountsR[r][tags[r]] = (tagCountsR[r][tags[r]] || 0) + 1;
        }
      });
    });
    const isOtherR = (s: string) => /^other/i.test(s);
    const sortedReasons = Object.entries(reasonCounts).sort((a, b) => {
      if (isOtherR(a[0]) && !isOtherR(b[0])) return 1;
      if (!isOtherR(a[0]) && isOtherR(b[0])) return -1;
      return a[0].localeCompare(b[0]);
    });

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="sec-t" style={{ margin: 0, color: "#751413", borderBottomColor: "#d4a84a" }}>Live Report</div>
          <button className="ab btn-b" style={{ fontSize: 12 }} onClick={() => window.print()}>Print / Export PDF</button>
        </div>
        <div id="report-area" className="card" style={{ padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 18, color: "#751413" }}>Jubilee Christian Academy</h2>
            <h3 style={{ margin: "4px 0", fontSize: 15, fontWeight: 600 }}>
              {isRegistrar ? "Transfer & LOA Report" : "Shift Applications Report"}
            </h3>
            <div style={{ fontSize: 12, color: "#666" }}>As of {now} — Live Data</div>
          </div>

          {/* Summary */}
          <table className="ct" style={{ marginBottom: 16 }}>
            <thead><tr><th>Metric</th><th style={{ textAlign: "right" }}>Count</th></tr></thead>
            <tbody>
              <tr><td>Total Submissions</td><td style={{ textAlign: "right", fontWeight: 700 }}>{reportSubs.length}</td></tr>
              <tr><td>Pending</td><td style={{ textAlign: "right", fontWeight: 700, color: "#f59e0b" }}>{reportSubs.filter((s) => s.status === "pending").length}</td></tr>
              <tr><td>Completed</td><td style={{ textAlign: "right", fontWeight: 700, color: "#10b981" }}>{reportSubs.filter((s) => s.status === "completed").length}</td></tr>
            </tbody>
          </table>

          {/* By Application Type */}
          <h4 style={{ fontSize: 14, margin: "16px 0 8px" }}>By Application Type</h4>
          <table className="ct" style={{ marginBottom: 16 }}>
            <thead><tr><th>Type</th><th style={{ textAlign: "right" }}>Count</th></tr></thead>
            <tbody>
              {Object.entries(byType).map(([t, arr]) => (
                <tr key={t}><td>{t}</td><td style={{ textAlign: "right", fontWeight: 600 }}>{arr.length}</td></tr>
              ))}
            </tbody>
          </table>

          {/* By Level */}
          <h4 style={{ fontSize: 14, margin: "16px 0 8px" }}>By Level</h4>
          {(() => {
            const lvlOrder = ["Toddler", "Nursery", "Kinder", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
            const lvlMap: Record<string, { inschool: number; homeschool: number }> = {};
            reportSubs.forEach((s) => {
              const { level, isHS } = parseLevel(s.data?.grade || "");
              if (!lvlMap[level]) lvlMap[level] = { inschool: 0, homeschool: 0 };
              if (isHS) lvlMap[level].homeschool++; else lvlMap[level].inschool++;
            });
            const sorted = lvlOrder.filter((l) => lvlMap[l]);
            let grandTotal = 0;
            return (
              <table className="ct" style={{ marginBottom: 16 }}>
                <thead><tr><th>Level</th><th style={{ textAlign: "right" }}>In-school</th><th style={{ textAlign: "right" }}>Homeschool</th><th style={{ textAlign: "right" }}>Total</th></tr></thead>
                <tbody>
                  {sorted.map((l) => {
                    const d = lvlMap[l];
                    const t = d.inschool + d.homeschool;
                    grandTotal += t;
                    return <tr key={l}><td>{l}</td><td style={{ textAlign: "right" }}>{d.inschool}</td><td style={{ textAlign: "right" }}>{d.homeschool || "—"}</td><td style={{ textAlign: "right", fontWeight: 600 }}>{t}</td></tr>;
                  })}
                  <tr style={{ borderTop: "2px solid #333" }}>
                    <td style={{ fontWeight: 700 }}>Grand Total</td>
                    <td></td><td></td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>{grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            );
          })()}

          {/* Reasons Breakdown */}
          <h4 style={{ fontSize: 14, margin: "16px 0 8px" }}>Reasons Breakdown</h4>
          <table className="ct" style={{ marginBottom: 16 }}>
            <thead><tr><th>Reason</th><th style={{ textAlign: "right" }}>Count</th></tr></thead>
            <tbody>
              {sortedReasons.map(([r, n]) => {
                const subTags = tagCountsR[r] || {};
                const tagEntries = Object.entries(subTags).sort((a, b) => a[0].localeCompare(b[0]));
                return (
                  <React.Fragment key={r}>
                    <tr><td style={{ fontWeight: 600 }}>{r}</td><td style={{ textAlign: "right", fontWeight: 600 }}>{n}</td></tr>
                    {tagEntries.map(([cat, cnt]) => (
                      <tr key={cat}><td style={{ paddingLeft: 28, color: "#555" }}>↳ {cat}</td><td style={{ textAlign: "right", color: "#555" }}>{cnt}</td></tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>

          {/* All Submissions List */}
          <h4 style={{ fontSize: 14, margin: "16px 0 8px" }}>All Submissions</h4>
          <table className="ct">
            <thead><tr><th>Ref #</th><th>Name</th><th>Grade</th><th>Type</th><th>Date Filed</th><th>Status</th></tr></thead>
            <tbody>
              {applySorting(reportSubs).map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: "#1e3a8a", fontSize: 11, letterSpacing: 1 }}>{s.data?.ref_number || "—"}</td>
                  <td>{s.data?.last_name}, {s.data?.first_name}</td>
                  <td>{s.data?.grade}</td>
                  <td>{s.data?.application_type}</td>
                  <td>{s.data?.date_filed}</td>
                  <td><span className={`badge ${badgeClass(s.status)}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ── Render: Department Report (completed students only) ──
  const renderDeptReport = () => {
    const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Manila" });
    // Show only students where this department had a clearance
    const myCompletedSubs = deptSubs.filter((s) => s.status === "completed" || s.status === "did_not_push_through");
    const activeSubs = myCompletedSubs.filter((s) => s.status === "completed");
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="sec-t" style={{ margin: 0, color: "#751413", borderBottomColor: "#d4a84a" }}>{user.department} — Clearance Report</div>
          <button className="ab btn-b" style={{ fontSize: 12 }} onClick={() => window.print()}>Print / Export PDF</button>
        </div>
        <div id="report-area" className="card" style={{ padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, color: "#751413" }}>Jubilee Christian Academy</h2>
            <h3 style={{ margin: "4px 0", fontSize: 15, fontWeight: 600 }}>{user.department} Department — Clearance Report</h3>
            <div style={{ fontSize: 12, color: "#666" }}>As of {now}</div>
          </div>
          <table className="ct">
            <thead><tr><th>#</th><th>Student's Name</th><th>Level</th><th>Status</th></tr></thead>
            <tbody>
              {activeSubs.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", color: "#999" }}>No completed records yet.</td></tr>}
              {applySorting(activeSubs).map((s, i) => {
                const mc2 = myClr(s.id);
                return (
                  <tr key={s.id}>
                    <td>{i + 1}</td>
                    <td>{s.data?.last_name}, {s.data?.first_name} {s.data?.middle_name || ""}</td>
                    <td>{s.data?.grade}</td>
                    <td><span className={`badge ${badgeClass(mc2?.status || "pending")}`}>{mc2?.status || "pending"}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) return <><style>{CSS}</style><div style={{ textAlign: "center", padding: 60, fontSize: 16 }}>Loading...</div></>;

  return (
    <>
      <style>{CSS}</style>
      <div className="dash">
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#5f110e", textShadow: "0 1px 2px rgba(0,0,0,0.12)" }}>
              {isRegistrar ? "Registrar Dashboard" : isAdmissions ? "Admissions Dashboard" : isAcadAffairs ? "Academic Affairs Dashboard" : "Clearance Dashboard"}
            </h1>
            <div style={{ fontSize: 12, color: "#5f110e", opacity: 0.8, marginTop: 2 }}>
              {user.email} — <strong>{user.department}</strong>
              {isRegistrar && <span style={{ opacity: 0.6 }}> (Transfer & LOA)</span>}
              {isAdmissions && <span style={{ opacity: 0.6 }}> (Shift to Homeschool / In-school)</span>}
              {isAcadAffairs && <span style={{ opacity: 0.6 }}> (Shift — Final Approval)</span>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="ab btn-b" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => window.location.reload()}>↻ Refresh</button>
            <button className="ab" style={{ background: "#fff", color: "#333", border: "1px solid #ccc", fontSize: 12, padding: "5px 12px" }} onClick={onLogout}>Log Out</button>
          </div>
        </div>

        {/* ======== ADMIN VIEW (Registrar / Admissions) ======== */}
        {isAdmin && (
          <>
            <div className="tabs">
              <button className={`tab ${tab === "pending" ? "on" : ""}`} onClick={() => setTab("pending")}>Pending ({adminPending.length})</button>
              <button className={`tab ${tab === "disapproved" ? "on" : ""}`} onClick={() => setTab("disapproved")}>Disapproved ({adminDisapproved.length})</button>
              <button className={`tab ${tab === "approved" ? "on" : ""}`} onClick={() => setTab("approved")}>Fully Approved ({adminApproved.length})</button>
              <button className={`tab ${tab === "completed" ? "on" : ""}`} onClick={() => setTab("completed")}>Completed ({adminCompleted.length})</button>
              {(isRegistrar || isAdmissions) && <button className={`tab ${tab === "dnp" ? "on" : ""}`} onClick={() => setTab("dnp")}>Did Not Push Through ({roleSubs.filter((s) => s.status === "did_not_push_through").length})</button>}
              <button className={`tab ${tab === "metrics" ? "on" : ""}`} onClick={() => setTab("metrics")}>Metrics</button>
              {(isRegistrar || isAdmissions) && <button className={`tab ${tab === "manual" ? "on" : ""}`} onClick={() => setTab("manual")}>Manual Entry</button>}
              {(isRegistrar || isAdmissions) && <button className={`tab ${tab === "categories" ? "on" : ""}`} onClick={() => setTab("categories")}>Categories</button>}
              {(isRegistrar || isAdmissions) && <button className={`tab ${tab === "report" ? "on" : ""}`} onClick={() => setTab("report")}>Report</button>}
            </div>

            {tab === "pending" && (
              <>
                {renderPendingMini()}
                {renderFilters()}
                <div className="sec-t">Pending Clearances ({filtered(adminPending).length})</div>
                {filtered(adminPending).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>No pending submissions.</p>}
                {filtered(adminPending).map((s) => renderAdminCard(s, "pending"))}
              </>
            )}
            {tab === "disapproved" && (
              <>
                {renderFilters()}
                <div className="sec-t">Disapproved — Needs Attention ({filtered(adminDisapproved).length})</div>
                {filtered(adminDisapproved).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>None.</p>}
                {filtered(adminDisapproved).map((s) => renderAdminCard(s, "pending"))}
              </>
            )}
            {tab === "approved" && (
              <>
                {renderFilters()}
                <div className="sec-t">Fully Approved — Ready for Release ({filtered(adminApproved).length})</div>
                {filtered(adminApproved).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>None.</p>}
                {filtered(adminApproved).map((s) => renderAdminCard(s, "approved"))}
              </>
            )}
            {tab === "completed" && (
              <>
                {renderFilters()}
                <div className="sec-t">Completed / Archive ({filtered(adminCompleted).length})</div>
                {filtered(adminCompleted).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>None.</p>}
                {filtered(adminCompleted).map((s) => renderAdminCard(s, "completed"))}
              </>
            )}
            {tab === "dnp" && (isRegistrar || isAdmissions) && (
              <>
                {renderFilters()}
                <div className="sec-t">Did Not Push Through ({filtered(roleSubs.filter((s) => s.status === "did_not_push_through")).length})</div>
                {filtered(roleSubs.filter((s) => s.status === "did_not_push_through")).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>None.</p>}
                {filtered(roleSubs.filter((s) => s.status === "did_not_push_through")).map((s) => renderAdminCard(s, "dnp"))}
              </>
            )}
            {tab === "metrics" && renderMetrics()}
            {tab === "manual" && (isRegistrar || isAdmissions) && renderManualEntry()}
            {tab === "categories" && (isRegistrar || isAdmissions) && renderCategories()}
            {tab === "report" && (isRegistrar || isAdmissions) && renderReport()}
          </>
        )}

        {/* ======== DEPARTMENT VIEW ======== */}
        {!isAdmin && (
          <>
            <div className="tabs">
              <button className={`tab ${tab === "pending" ? "on" : ""}`} onClick={() => setTab("pending")}>Pending ({deptPending.length})</button>
              <button className={`tab ${tab === "reviewed" ? "on" : ""}`} onClick={() => setTab("reviewed")}>Reviewed ({deptReviewed.length})</button>
              <button className={`tab ${tab === "deptreport" ? "on" : ""}`} onClick={() => setTab("deptreport")}>Report</button>
            </div>
            {tab === "pending" && (
              <>
                {renderFilters()}
                {filtered(deptPending).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>No pending clearances.</p>}
                {filtered(deptPending).map((s) => renderDeptCard(s, true))}
              </>
            )}
            {tab === "reviewed" && (
              <>
                {renderFilters()}
                {filtered(deptReviewed).length === 0 && <p style={{ color: "#8b6914", fontSize: 14 }}>None.</p>}
                {filtered(deptReviewed).map((s) => renderDeptCard(s, false))}
              </>
            )}
            {tab === "deptreport" && renderDeptReport()}
          </>
        )}
      </div>
    </>
  );
}

// ============================
// MAIN — with 8hr session
// ============================
const SESSION_KEY = "jca_user";
const SESSION_TS_KEY = "jca_session_ts";
const SESSION_HOURS = 8;

const saveSession = (u: User) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(u));
  localStorage.setItem(SESSION_TS_KEY, Date.now().toString());
};
const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_TS_KEY);
};
const loadSession = (): User | null => {
  try {
    const ts = localStorage.getItem(SESSION_TS_KEY);
    if (!ts) return null;
    const elapsed = Date.now() - parseInt(ts);
    if (elapsed > SESSION_HOURS * 60 * 60 * 1000) { clearSession(); return null; }
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export default function App() {
  const [user, setUser] = useState<User | null>(loadSession);

  const handleLogin = (u: User) => { saveSession(u); setUser(u); };
  const handleLogout = () => { clearSession(); setUser(null); };

  if (!user) return <Login onLogin={handleLogin} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}
