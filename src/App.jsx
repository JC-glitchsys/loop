import { useState } from "react";
import { Home, Search, Plus, Bell, User as UserI, ArrowLeft, Heart, MessageCircle, Repeat2, Send, Bookmark, Settings as Cog, Image as Img, BarChart3, MapPin, Film, Mic, ChevronRight, Pencil } from "lucide-react";
import { MOODS, USERS, ME, POSTS, REPLIES, TRENDS, NOTIFS, CHATS } from "./data";
const uOf = (id) => [ME, ...USERS].find((u) => u.id === id) || ME;
const MK = Object.keys(MOODS);
const btn = "h-12 rounded-full bg-fb hover:bg-fbh text-white font-semibold w-full";
const inp = "w-full bg-card border border-line rounded-2xl p-3.5 text-txt placeholder:text-mut";
const Av = ({ u, anon, ring, s = 40 }) => <div className="rounded-full grid place-items-center shrink-0 font-semibold text-white" style={{ width: s, height: s, fontSize: s / 2.4, background: anon ? "#4B5563" : "#3A3A3A", boxShadow: ring ? `0 0 0 2px #212121,0 0 0 4px ${ring}` : void 0 }}>{anon ? "?" : u.name[0]}</div>;
const Pill = ({ k }) => <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: MOODS[k].color + "33", color: MOODS[k].color }}>{MOODS[k].name}</span>;
const Toggle = ({ on, set }) => <button onClick={() => set(!on)} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-fb" : "bg-hov"}`}><div className={`w-5 h-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : ""}`} /></button>;
const Top = ({ t, c, right }) => <div className="h-14 shrink-0 flex items-center gap-3 px-4 border-b border-hov bg-bg"><button onClick={c.back} className="p-1 -ml-1 rounded-full hover:bg-hov"><ArrowLeft size={22} /></button><div className="font-bold text-lg flex-1">{t}</div>{right}</div>;
const Logo = ({ s = 20 }) => <span className="font-bold" style={{ fontSize: s }}>LOOP<span className="text-fb">.</span></span>;
function PostItem({ p, c, big }) {
  const u = uOf(p.uid), liked = c.likes.has(p.id), col = p.anon ? MOODS.confession.color : MOODS[p.mood].color, st = (f) => (e) => {
    e.stopPropagation();
    f();
  };
  const A = (I, n, f, on) => <button onClick={st(f)} className={`flex items-center gap-1.5 text-[13px] hover:bg-hov rounded-full p-1 ${on ? "text-act" : "text-mut"}`}><I size={18} fill={on ? "#2D8CFF" : "none"} />{n}</button>;
  return <div onClick={() => c.go("thread", p)} className="flex gap-3 p-4 border-b border-hov hover:bg-hov/40 cursor-pointer" style={{ borderLeft: `4px solid ${col}` }}><div onClick={st(() => !p.anon && c.go("user", u))}><Av u={u} anon={p.anon} ring={col} /></div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><Pill k={p.mood} /></div><div className="mt-1 flex items-baseline gap-1.5 flex-wrap" onClick={st(() => !p.anon && c.go("user", u))}><span className="text-[15px] font-semibold">{p.anon ? "Anonymous \u2022 MSU Student" : u.name}</span>{!p.anon && <span className="text-[13px] text-mut">@{u.username} • {p.time} • {u.course}</span>}{p.anon && <span className="text-[13px] text-mut">{p.time}</span>}</div><p className={`mt-1 text-[15px] text-txt ${big ? "text-[17px]" : ""}`}>{p.text}</p>{p.img && <div className="mt-3 h-48 rounded-2xl" style={{ background: p.img }} />}<div className="mt-3 flex gap-6 -ml-1">{A(Heart, p.likes + (liked ? 1 : 0), () => c.like(p.id), liked)}{A(MessageCircle, p.replies, () => c.go("thread", p))}{A(Repeat2, "", () => c.go("thread", p))}{A(Send, "", () => c.go("chats"))}{A(Bookmark, "", () => c.save(p.id), c.saved.has(p.id))}</div></div></div>;
}
function Splash({ c }) {
  return <div className="flex-1 flex flex-col items-center justify-center px-4 gap-3"><div className="text-5xl"><Logo s={48} /></div><p className="text-sm text-mut">MSU, in a loop.</p><div className="w-full mt-8"><button className={btn} onClick={() => c.go("login")}>Continue with MSU Email</button></div><p className="text-xs text-mut">Only for @msu.edu.ph</p></div>;
}
function Auth({ c, signup }) {
  const F = (p, t = "text") => <input key={p} type={t} placeholder={p} className={inp} />;
  return <div className="flex-1 overflow-y-auto no-sb"><div className="h-14 flex items-center px-4"><button onClick={c.back} className="p-1 rounded-full hover:bg-hov"><ArrowLeft size={22} /></button></div><div className="px-4 flex flex-col gap-3 pb-8"><h1 className="text-2xl font-bold">{signup ? "Join LOOP" : "Welcome back to LOOP"}</h1><p className="text-sm text-mut mb-2">{signup ? "Your campus, your voice." : "Log in to see what MSU is saying."}</p>{signup ? <>{F("Full Name")}{F("Username")}<select className={inp + " text-mut"}>{["BSIT", "BSED", "BSBA", "BSCS", "BSN", "BSA", "BSCE"].map((x) => <option key={x}>{x}</option>)}</select><select className={inp + " text-mut"}>{["1st Year", "2nd Year", "3rd Year", "4th Year"].map((x) => <option key={x}>{x}</option>)}</select>{F("MSU Email", "email")}{F("Password", "password")}<button className={btn + " mt-2"} onClick={() => c.reset("home")}>Create Account</button></> : <>{F("MSU Email", "email")}{F("Password", "password")}<button className={btn + " mt-2"} onClick={() => c.reset("home")}>Log In</button><button className="h-12 rounded-full bg-hov hover:bg-line font-semibold" onClick={() => c.reset("home")}>Continue as Guest (Anonymous)</button><button className="text-act text-sm font-semibold mt-2" onClick={() => c.go("signup")}>Create account</button></>}</div></div>;
}
function Feed({ c }) {
  const [tab, setTab] = useState("For You"), [ref, setRef] = useState(false);
  let l = c.posts.filter((p) => c.mood === "all" || p.mood === c.mood);
  if (tab === "Anonymous") l = l.filter((p) => p.anon);
  if (tab === "Following") l = l.filter((p) => c.follow.has(p.uid) || p.uid === "me");
  return <div className="flex-1 flex flex-col min-h-0 relative"><div className="h-14 shrink-0 flex items-center justify-between px-4 bg-bg"><Logo /><div className="flex gap-1"><button className="p-2 rounded-full hover:bg-hov" onClick={() => c.go("search")}><Search size={22} /></button><button className="p-2 rounded-full hover:bg-hov relative" onClick={() => c.go("notifs")}><Bell size={22} /><i className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]" /></button></div></div><div className="flex border-b border-hov">{["For You", "Following", "Anonymous"].map((t) => <button key={t} onClick={() => setTab(t)} className={`flex-1 h-11 text-sm font-semibold border-b-2 ${tab === t ? "text-white border-fb" : "text-mut border-transparent"}`}>{t}</button>)}</div><div className="flex-1 overflow-y-auto no-sb"><div className="flex gap-2 overflow-x-auto no-sb px-4 py-3">{["all", ...MK].map((k) => <button key={k} onClick={() => c.setMood(k)} className={`px-3 h-8 rounded-full text-[13px] font-medium shrink-0 flex items-center gap-1.5 ${c.mood === k ? "bg-white text-black" : "bg-card text-txt hover:bg-hov"}`}>{k !== "all" && <i className="w-2 h-2 rounded-full" style={{ background: MOODS[k].color }} />}{k === "all" ? "All" : MOODS[k].name}</button>)}</div><div onClick={() => c.go("create")} className="flex items-center gap-3 px-4 py-3 border-y border-hov hover:bg-hov/40 cursor-pointer"><Av u={ME} /><span className="flex-1 text-sm text-mut">What's on your mind, MSU?</span><span className="text-xs text-mut flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-fb" />Mood</span><span className="bg-fb text-white text-xs font-semibold px-4 py-1.5 rounded-full">Post</span></div><button onClick={() => {
    setRef(true);
    setTimeout(() => setRef(false), 900);
  }} className="w-full text-xs text-mut py-2">{ref ? "Refreshing\u2026" : "Pull to refresh"}</button>{l.length ? l.map((p) => <PostItem key={p.id} p={p} c={c} />) : <p className="p-8 text-center text-mut text-sm">Wala pang posts dito. Be the first!</p>}</div><button onClick={() => c.go("create")} className="absolute right-4 bottom-4 w-14 h-14 rounded-full bg-fb hover:bg-fbh grid place-items-center shadow-[0_1px_2px_rgba(0,0,0,.2)]"><Plus size={28} color="#fff" /></button></div>;
}
function Create({ c }) {
  const [txt, setTxt] = useState(""), [mood, setMood] = useState("thoughts"), [anon, setAnon] = useState(c.anonDef), [who, setWho] = useState("Everyone");
  const post = () => {
    c.addPost({ id: "n" + Date.now(), uid: "me", anon, mood, text: txt || "Random thought lang.", time: "now", likes: 0, replies: 0 });
    c.reset("home");
  };
  return <div className="flex-1 flex flex-col min-h-0"><div className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-hov"><button onClick={c.back} className="text-sm">Cancel</button><b className="text-lg">New Thread</b><button onClick={post} className="bg-fb hover:bg-fbh text-white text-sm font-semibold px-4 h-8 rounded-full">Post</button></div><div className="flex-1 overflow-y-auto no-sb p-4 flex flex-col gap-4"><div className="flex items-center gap-3"><Av u={ME} anon={anon} ring={anon ? MOODS.confession.color : MOODS[mood].color} /><div className="flex-1"><div className="font-semibold text-[15px]">{anon ? "Anonymous \u2022 MSU Student" : ME.name}</div><div className="text-[13px] text-mut">{anon ? "Identity hidden" : "@" + ME.username + " \u2022 " + ME.course}</div></div><span className="text-xs text-mut">Anonymous</span><Toggle on={anon} set={setAnon} /></div><textarea value={txt} onChange={(e) => {
    setTxt(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }} placeholder="What's happening in MSU?" rows={3} className="bg-transparent text-base text-white placeholder:text-mut resize-none" /><div className="text-sm font-semibold">Pick your mood</div><div className="grid grid-cols-3 gap-2">{MK.map((k) => <button key={k} onClick={() => setMood(k)} className="bg-card rounded-2xl p-3 text-left" style={{ border: mood === k ? "2px solid #1877F2" : "2px solid transparent" }}><i className="block w-3 h-3 rounded-full mb-2" style={{ background: MOODS[k].color }} /><div className="text-xs font-bold">{MOODS[k].name}</div><div className="text-[10px] text-mut leading-tight mt-1">{MOODS[k].desc}</div></button>)}</div><div className="flex gap-2 text-mut">{[Img, BarChart3, MapPin, Film].map((I, i) => <button key={i} onClick={() => c.go("info", "Add-ons")} className="p-2 rounded-full hover:bg-hov"><I size={22} /></button>)}<span className="text-xs self-center">MSU Main Campus</span></div><div><div className="text-sm font-semibold mb-2">Who can reply?</div><div className="flex gap-2">{["Everyone", "Followers", "No one"].map((w) => <button key={w} onClick={() => setWho(w)} className={`px-3 h-8 rounded-full text-[13px] ${who === w ? "bg-fb text-white" : "bg-card hover:bg-hov"}`}>{w}</button>)}</div></div></div></div>;
}
function Thread({ c, p }) {
  const [rs, setRs] = useState(REPLIES), [t, setT] = useState("");
  const send = () => {
    if (!t.trim()) return;
    setRs([...rs, { id: "x" + Date.now(), uid: "me", mood: "thoughts", text: t, time: "now", likes: 0, replies: 0 }]);
    setT("");
  };
  return <div className="flex-1 flex flex-col min-h-0"><Top t="Thread" c={c} /><div className="flex-1 overflow-y-auto no-sb"><PostItem p={p} c={c} big /><div className="px-4 pt-4 pb-2 font-semibold">Replies</div>{rs.map((r) => <div key={r.id} className="pl-3"><PostItem p={r} c={c} /></div>)}</div><div className="shrink-0 flex items-center gap-3 p-3 border-t border-hov bg-bg"><Av u={ME} s={32} /><input value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Reply to this thread…" className="flex-1 h-10 bg-card rounded-full px-4 text-sm" /><button onClick={send} className="text-act p-2"><Send size={20} /></button></div></div>;
}
function Explore({ c }) {
  return <div className="flex-1 overflow-y-auto no-sb p-4 flex flex-col gap-4"><div className="flex items-center gap-2 bg-card rounded-full px-4 h-11"><Search size={18} className="text-mut" /><input placeholder="Search MSU, people, topics" className="flex-1 bg-transparent text-sm" /></div><div className="flex gap-2 overflow-x-auto no-sb">{MK.map((k) => <button key={k} onClick={() => {
    c.setMood(k);
    c.reset("home");
  }} className="px-3 h-8 rounded-full text-[13px] bg-card hover:bg-hov shrink-0 flex items-center gap-1.5"><i className="w-2 h-2 rounded-full" style={{ background: MOODS[k].color }} />{MOODS[k].name}</button>)}</div><h2 className="font-semibold">Trending in MSU</h2><div>{TRENDS.map(([t, n]) => <button key={t} onClick={() => {
    c.setMood("all");
    c.reset("home");
  }} className="w-full text-left py-2 hover:bg-hov rounded-xl px-2"><div className="font-semibold text-[15px]">{t}</div><div className="text-[13px] text-mut">{n} posts</div></button>)}</div><h2 className="font-semibold">Suggested Users</h2>{USERS.map((u) => <div key={u.id} className="flex items-center gap-3"><button onClick={() => c.go("user", u)} className="flex items-center gap-3 flex-1 text-left"><Av u={u} /><div><div className="text-[15px] font-semibold">{u.name}</div><div className="text-[13px] text-mut">@{u.username}</div></div></button><FollowBtn u={u} c={c} /></div>)}</div>;
}
const FollowBtn = ({ u, c }) => {
  const f = c.follow.has(u.id);
  return <button onClick={() => c.toggleFollow(u.id)} className={`px-4 h-8 rounded-full text-[13px] font-semibold ${f ? "bg-hov text-txt" : "bg-fb text-white hover:bg-fbh"}`}>{f ? "Following" : "Follow"}</button>;
};
function Notifs({ c }) {
  const [tab, setTab] = useState("All");
  const l = NOTIFS.filter((n) => tab === "All" || (tab === "Anonymous" ? n.anon : n.text.includes("mentioned")));
  return <div className="flex-1 flex flex-col min-h-0"><div className="h-14 shrink-0 flex items-center px-4 font-bold text-lg">Notifications</div><div className="flex border-b border-hov">{["All", "Mentions", "Anonymous"].map((t) => <button key={t} onClick={() => setTab(t)} className={`flex-1 h-11 text-sm font-semibold border-b-2 ${tab === t ? "text-white border-fb" : "text-mut border-transparent"}`}>{t}</button>)}</div><div className="flex-1 overflow-y-auto no-sb">{l.map((n) => <button key={n.id} onClick={() => c.go("thread", c.posts[0])} className={`w-full text-left flex gap-3 p-4 border-b border-hov ${n.unread ? "bg-card" : ""}`}><Av u={uOf(n.uid)} anon={n.anon} /><div className="flex-1"><div className="text-sm">{n.text} <span className="text-xs text-mut">{n.time}</span></div>{n.prev && <div className="text-[13px] text-mut mt-1">{n.prev}</div>}</div>{n.unread && <i className="w-2 h-2 rounded-full bg-fb mt-2" />}</button>)}{!l.length && <p className="p-8 text-center text-mut text-sm">Wala pa.</p>}</div></div>;
}
function Profile({ c, u, mine }) {
  const [tab, setTab] = useState("Threads");
  const tabs = ["Threads", "Replies", "Media", ...mine ? ["Anonymous Posts"] : []];
  let l = c.posts.filter((p) => p.uid === u.id);
  if (tab === "Anonymous Posts") l = l.filter((p) => p.anon);
  else if (tab === "Media") l = l.filter((p) => p.img);
  else if (tab === "Replies") l = [];
  else if (mine) l = l.filter((p) => !p.anon);
  return <div className="flex-1 overflow-y-auto no-sb"><div className="h-[120px] bg-card relative"><div className="absolute top-3 left-3">{!mine && <button onClick={c.back} className="p-2 rounded-full bg-bg/60"><ArrowLeft size={20} /></button>}</div><div className="absolute top-3 right-3 flex gap-2">{mine && <><button onClick={() => c.go("edit")} className="p-2 rounded-full bg-bg/60"><Pencil size={18} /></button><button onClick={() => c.go("settings")} className="p-2 rounded-full bg-bg/60"><Cog size={18} /></button></>}</div></div><div className="px-4 -mt-10"><div className="rounded-full w-20 h-20 grid place-items-center text-3xl font-bold bg-hov border-4 border-bg">{u.name[0]}</div><h1 className="text-xl font-bold mt-2">{u.name}</h1><div className="text-sm text-mut">@{u.username}</div><p className="text-sm mt-2">{u.bio}</p><div className="text-[13px] text-mut mt-2 flex gap-3 flex-wrap"><span>🎓 {u.course}</span><span>{u.year}</span><span>📍 MSU Main</span></div><div className="flex gap-4 text-sm mt-3"><span><b>120</b> <span className="text-mut">Following</span></span><span><b>340</b> <span className="text-mut">Followers</span></span><span><b>{l.length + 45}</b> <span className="text-mut">Threads</span></span></div><div className="flex gap-2 my-4">{mine ? <><button onClick={() => c.go("edit")} className="flex-1 h-10 rounded-full bg-hov hover:bg-line text-sm font-semibold">Edit Profile</button><button onClick={() => c.go("info", "Share Profile")} className="flex-1 h-10 rounded-full border border-fb text-act text-sm font-semibold">Share Profile</button></> : <><div className="flex-1"><button onClick={() => c.toggleFollow(u.id)} className={btn + " !h-10 text-sm " + (c.follow.has(u.id) ? "!bg-hov" : "")}>{c.follow.has(u.id) ? "Following" : "Follow"}</button></div><button onClick={() => c.go("chat", CHATS.find((x) => x.uid === u.id) || CHATS[0])} className="flex-1 h-10 rounded-full bg-hov hover:bg-line text-sm font-semibold">Message</button></>}</div></div><div className="flex border-b border-hov overflow-x-auto no-sb">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`flex-1 px-3 h-11 text-sm font-semibold whitespace-nowrap border-b-2 ${tab === t ? "text-white border-fb" : "text-mut border-transparent"}`}>{t}</button>)}</div>{l.map((p) => <PostItem key={p.id} p={p} c={c} />)}{!l.length && <p className="p-8 text-center text-mut text-sm">Wala pang laman.</p>}</div>;
}
function Edit({ c }) {
  const [a, setA] = useState(c.anonDef);
  return <div className="flex-1 flex flex-col min-h-0"><Top t="Edit Profile" c={c} /><div className="flex-1 overflow-y-auto no-sb p-4 flex flex-col gap-3"><button onClick={() => c.go("info", "Change photo")} className="self-center w-20 h-20 rounded-full bg-hov grid place-items-center text-3xl font-bold">J</button><input defaultValue={ME.name} className={inp} /><textarea defaultValue={ME.bio} rows={3} className={inp + " resize-none"} /><input defaultValue={ME.course} className={inp} /><input defaultValue={ME.year} className={inp} /><div className="flex items-center justify-between"><span className="text-sm">Post anonymously by default</span><Toggle on={a} set={(v) => {
    setA(v);
    c.setAnonDef(v);
  }} /></div><button className={btn} onClick={c.back}>Save</button></div></div>;
}
function Chats({ c }) {
  return <div className="flex-1 flex flex-col min-h-0"><Top t="Messages" c={c} /><div className="flex-1 overflow-y-auto no-sb">{CHATS.map((h) => <button key={h.id} onClick={() => c.go("chat", h)} className="w-full text-left flex items-center gap-3 p-4 hover:bg-hov"><Av u={uOf(h.uid)} s={48} /><div className="flex-1 min-w-0"><div className="font-semibold text-[15px]">{uOf(h.uid).name}</div><div className="text-[13px] text-mut truncate">{h.last}</div></div><div className="text-xs text-mut">{h.time}</div>{h.unread && <i className="w-2.5 h-2.5 rounded-full bg-fb" />}</button>)}</div></div>;
}
function Chat({ c, h }) {
  const [m, setM] = useState(h.msgs), [t, setT] = useState("");
  const send = () => {
    if (!t.trim()) return;
    setM([...m, ["m", t]]);
    setT("");
  };
  return <div className="flex-1 flex flex-col min-h-0"><Top t={uOf(h.uid).name} c={c} /><div className="flex-1 overflow-y-auto no-sb p-4 flex flex-col gap-2">{m.map(([w, x], i) => <div key={i} className={`max-w-[75%] text-sm px-4 py-3 rounded-2xl ${w === "m" ? "bg-fb self-end text-white" : "bg-card self-start"}`}>{x}</div>)}</div><div className="shrink-0 p-3 flex items-center gap-2"><div className="flex-1 flex items-center bg-card rounded-full px-4 h-11"><input value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message" className="flex-1 bg-transparent text-sm" /><Mic size={20} className="text-mut" /></div><button onClick={send} className="w-11 h-11 rounded-full bg-fb grid place-items-center"><Send size={18} color="#fff" /></button></div></div>;
}
function Settings({ c }) {
  const rows = [["Profile", "profile"], ["Privacy", "info"], ["Notifications", "info"], ["Mood Legend", "legend"], ["Help", "info"]];
  return <div className="flex-1 flex flex-col min-h-0"><Top t="Settings" c={c} /><div className="flex-1 overflow-y-auto no-sb">{rows.map(([n, s]) => <button key={n} onClick={() => s === "info" ? c.go("info", n) : c.go(s)} className="w-full flex items-center justify-between p-4 hover:bg-hov border-b border-hov">{n}<ChevronRight size={18} className="text-mut" /></button>)}<div className="flex items-center justify-between p-4 border-b border-hov">Anonymous Mode<Toggle on={c.anonDef} set={c.setAnonDef} /></div><div className="flex items-center justify-between p-4 border-b border-hov">Appearance<span className="text-sm text-mut">Dark (locked)</span></div><button onClick={() => c.reset("login")} className="w-full text-left p-4 text-[#EF4444] hover:bg-hov">Log Out</button></div></div>;
}
const Legend = ({ c }) => <div className="flex-1 flex flex-col min-h-0"><Top t="Mood Legend" c={c} /><div className="p-4 flex flex-col gap-3 overflow-y-auto no-sb">{MK.map((k) => <div key={k} className="bg-card rounded-2xl p-4 flex gap-3 items-center"><i className="w-1 h-10 rounded-full" style={{ background: MOODS[k].color }} /><div><Pill k={k} /><div className="text-sm text-mut mt-1">{MOODS[k].desc}</div></div></div>)}</div></div>;
const Info = ({ c, t }) => <div className="flex-1 flex flex-col min-h-0"><Top t={t} c={c} /><div className="p-4 flex flex-col gap-3">{["Everyone on LOOP is verified MSU", "Anonymous posts hide your name", "Preview only \u2014 frontend demo"].map((x) => <div key={x} className="bg-card rounded-2xl p-4 text-sm flex justify-between">{x}<ChevronRight size={18} className="text-mut" /></div>)}<button className={btn} onClick={c.back}>Done</button></div></div>;
export default function App() {
  const [stack, setStack] = useState([{ s: "splash" }]), [posts, setPosts] = useState(POSTS), [likes, setLikes] = useState(/* @__PURE__ */ new Set()), [saved, setSaved] = useState(/* @__PURE__ */ new Set()), [follow, setFollow] = useState(/* @__PURE__ */ new Set(["u1"])), [mood, setMood] = useState("all"), [anonDef, setAnonDef] = useState(false);
  const tg = (S, f, id) => {
    const n = new Set(S);
    n.has(id) ? n.delete(id) : n.add(id);
    f(n);
  };
  const c = {
    posts,
    likes,
    saved,
    follow,
    mood,
    anonDef,
    setMood,
    setAnonDef,
    go: (s2, p2) => setStack((x) => [...x, { s: s2, p: p2 }]),
    back: () => setStack((x) => x.length > 1 ? x.slice(0, -1) : x),
    reset: (s2) => setStack([{ s: s2 }]),
    tab: (s2) => setStack([{ s: s2 }]),
    like: (id) => tg(likes, setLikes, id),
    save: (id) => tg(saved, setSaved, id),
    toggleFollow: (id) => tg(follow, setFollow, id),
    addPost: (p2) => setPosts((x) => [p2, ...x])
  };
  const { s, p } = stack[stack.length - 1];
  const nav = !["splash", "login", "signup"].includes(s);
  const body = { splash: <Splash c={c} />, login: <Auth c={c} />, signup: <Auth c={c} signup />, home: <Feed c={c} />, create: <Create c={c} />, thread: <Thread c={c} p={p} />, search: <Explore c={c} />, notifs: <Notifs c={c} />, profile: <Profile c={c} u={ME} mine />, user: <Profile c={c} u={p} />, edit: <Edit c={c} />, chats: <Chats c={c} />, chat: <Chat c={c} h={p} />, settings: <Settings c={c} />, legend: <Legend c={c} />, info: <Info c={c} t={p || "Info"} /> };
  const tabs = [["home", Home], ["search", Search], ["create", Plus], ["notifs", Bell], ["profile", UserI]];
  const root = ["home", "search", "notifs", "profile"].includes(s);
  return <div className="min-h-screen bg-[#0A0A0A] flex justify-center items-center md:py-6"><div className="w-full max-w-[430px] h-screen md:h-[860px] bg-bg flex flex-col overflow-hidden md:rounded-[40px] md:border md:border-hov relative font-sans">{body[s]}{nav && <div className="h-16 shrink-0 bg-bg border-t border-hov flex items-center justify-around">{tabs.map(([k, I]) => k === "create" ? <button key={k} onClick={() => c.go("create")} className="w-14 h-14 rounded-full bg-fb hover:bg-fbh grid place-items-center -mt-2"><I size={28} color="#fff" /></button> : <button key={k} onClick={() => c.tab(k)} className="flex flex-col items-center gap-1 p-2 rounded-full hover:bg-hov"><I size={24} color={root && s === k ? "#fff" : "#A0A0A0"} /><i className={`w-1 h-1 rounded-full ${root && s === k ? "bg-act" : "bg-transparent"}`} /></button>)}</div>}</div></div>;
}
