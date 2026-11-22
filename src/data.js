export const MOODS = {
  rant: { name: "RANT", color: "#1877F2", desc: "Gusto ko lang maglabas ng sama ng loob" },
  confession: { name: "CONFESSION", color: "#8B5CF6", desc: "Anonymous confession, wag kayo mag-judge" },
  vibes: { name: "GOOD VIBES", color: "#22C55E", desc: "Share ng good news / papuri" },
  chika: { name: "CHIKA", color: "#EAB308", desc: "May chika ako, pero lowkey lang" },
  help: { name: "HELP", color: "#EF4444", desc: "Need help ASAP, MSU related" },
  thoughts: { name: "THOUGHTS", color: "#9CA3AF", desc: "Random thought lang" }
};
export const ME = { id: "me", name: "Jo Caris", username: "jocaris", course: "BSIT", year: "4th Year", bio: "Database nerd. Layout artist. Kape muna bago capstone. \u2615" };
export const USERS = [
  { id: "u1", name: "Aisha Macaraya", username: "aishamac", course: "BSED", year: "3rd Year", bio: "Future teacher. Maranao pride." },
  { id: "u2", name: "Juan Dela Cruz", username: "juandc", course: "BSCS", year: "2nd Year", bio: "Bug hunter, pizza lover." },
  { id: "u3", name: "Rahma Pangandaman", username: "rahmap", course: "BSBA", year: "4th Year", bio: "Numbers and noodles." },
  { id: "u4", name: "Datu Amer", username: "datuamer", course: "BSN", year: "1st Year", bio: "Nursing life, send help." },
  { id: "u5", name: "Mariam Sultan", username: "mariams", course: "BSIT", year: "3rd Year", bio: "UI/UX and iced coffee." }
];
export const POSTS = [
  { id: "p1", uid: "u2", mood: "rant", text: "Naka-enroll na ba lahat? Ako wala pa, pila sa registrar grabe. 3 hours na ako nakatayo \u{1F62D}", time: "2h", likes: 128, replies: 24 },
  { id: "p2", uid: "u1", anon: true, mood: "confession", text: "Anonymous confession: crush ko yung nasa library kanina. Naka-blue na jacket, laging nasa 2nd floor. Hi po. \u{1F648}", time: "3h", likes: 342, replies: 57 },
  { id: "p3", uid: "u5", mood: "help", text: "Sino may notes sa IT Capstone? Help pls. Defense na namin sa Friday at wala pa kaming chapter 3.", time: "4h", likes: 46, replies: 18 },
  { id: "p4", uid: "u3", mood: "vibes", text: "Salamat sa guard sa Gate 2 na nag-return ng wallet ko. Walang kulang. Mabuhay ka, kuya! \u{1F49A}", time: "5h", likes: 512, replies: 33, img: "linear-gradient(135deg,#14532d,#22C55E)" },
  { id: "p5", uid: "u4", anon: true, mood: "chika", text: "Chika lang: may bagong coffee shop daw malapit sa CICS. Lowkey lang ha, baka maubusan tayo ng upuan.", time: "6h", likes: 89, replies: 12 },
  { id: "p6", uid: "u2", mood: "thoughts", text: "Bakit parang ang bilis ng sem pero ang bagal ng wifi sa dorm?", time: "7h", likes: 204, replies: 41 },
  { id: "p7", uid: "u1", mood: "rant", text: "Kinsa nagpa-uli sa mga tables sa canteen? Naa pa gihapon ang tira-tira. Sayang ang pangit nga ugali.", time: "9h", likes: 77, replies: 9 },
  { id: "p8", uid: "u3", anon: true, mood: "confession", text: "Confession: nag-fake ako na may sakit para di makapasok sa 7AM class. Sorry sir. \u{1F64F}", time: "11h", likes: 610, replies: 88 },
  { id: "p9", uid: "u5", mood: "vibes", text: "Sunset sa Marawi lake today was unreal. Pahinga muna, MSU. \u{1F305}", time: "1d", likes: 431, replies: 20, img: "linear-gradient(135deg,#7c2d12,#f59e0b,#1877F2)" },
  { id: "p10", uid: "u4", mood: "help", text: 'Lost: black umbrella near the Gym. May initials na "DA". Pls DM if nakita niyo.', time: "1d", likes: 15, replies: 6 }
];
export const REPLIES = [
  { id: "r1", uid: "u3", mood: "thoughts", text: "Same! Ako rin kahapon pa dito sa pila.", time: "1h", likes: 12, replies: 0 },
  { id: "r2", uid: "u5", mood: "chika", text: "Try mo mag-online enrollment, mas mabilis daw.", time: "1h", likes: 8, replies: 0 },
  { id: "r3", uid: "u4", anon: true, mood: "thoughts", text: "Pila lang yan, kaya natin yan.", time: "45m", likes: 5, replies: 0 },
  { id: "r4", uid: "u1", mood: "vibes", text: "Padayon, MSUans! \u{1F4AA}", time: "30m", likes: 21, replies: 0 }
];
export const TRENDS = [["#MSUEnroll", "2.4K"], ["#Capstone", "1.8K"], ["#MSUConfession", "1.2K"], ["#CICSWeek", "860"], ["#Marawi", "540"]];
export const NOTIFS = [
  { id: "n1", uid: "u2", text: "Juan mentioned you", prev: "@jocaris pwede ba humiram ng notes mo?", time: "5m", unread: true, anon: false },
  { id: "n2", uid: "u1", text: "Aisha liked your thread", prev: "Naka-enroll na ba lahat?...", time: "1h", unread: true, anon: false },
  { id: "n3", uid: "u3", text: "Someone replied to your anonymous post", prev: "Hi po, ako yan \u{1F602}", time: "3h", unread: false, anon: true },
  { id: "n4", uid: "u5", text: "Mariam started following you", prev: "", time: "1d", unread: false, anon: false }
];
export const CHATS = [
  { id: "c1", uid: "u1", last: "Kita tayo sa library later?", time: "2m", unread: true, msgs: [["t", "Hi Jo!"], ["m", "Uy Aisha, kumusta?"], ["t", "Kita tayo sa library later?"]] },
  { id: "c2", uid: "u2", last: "Thanks sa notes!", time: "1h", unread: false, msgs: [["m", "Sent na yung notes."], ["t", "Thanks sa notes!"]] },
  { id: "c3", uid: "u5", last: "Send mo yung Figma link", time: "1d", unread: false, msgs: [["t", "Send mo yung Figma link"]] }
];
