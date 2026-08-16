export interface PresetTheme {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  badge: string;
  description: string;
  prefixWords: string[];
  words: string[];
  sentences: string[];
}

export const PRESET_THEMES: Record<string, PresetTheme> = {
  latin: {
    id: "latin",
    name: "Classic Lorem Ipsum",
    subtitle: "Teks Latin Standar Cicero",
    iconName: "BookOpen",
    badge: "Klasik",
    description: "Teks latin klasik yang bersumber dari karya Cicero tahun 45 SM.",
    prefixWords: ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"],
    words: [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
      "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
      "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
      "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "in",
      "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
      "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
      "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
    ],
    sentences: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Curabitur pretium tincidunt lacus, nec gravida orci hendrerit vitae.",
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      "Mauris placerat eleifend leo, quiseque sit amet est et sapien ullamcorper pharetra."
    ]
  },
  nusantara: {
    id: "nusantara",
    name: "Nusantara & Indonesia",
    subtitle: "Budaya, Alam & Kuliner Khas Indonesia",
    iconName: "Compass",
    badge: "Lokal",
    description: "Kosakata kekayaan alam, sejarah, seni budaya, dan pesona nusantara.",
    prefixWords: ["Nusantara", "Indonesia", "bhinneka", "tunggal", "ika", "gotong", "royong", "semangat"],
    words: [
      "nusantara", "bhinneka", "gotong", "royong", "batik", "rendang", "borobudur", "prambanan",
      "komodo", "raja", "ampat", "garuda", "pancasila", "angklung", "gamelan", "wayang",
      "kopi", "tubruk", "sambal", "ijo", "keraton", "saung", "sawah", "terasering",
      "pantai", "kuta", "candi", "pusaka", "ramah", "tamah", "kearifan", "lokal",
      "tenun", "ikat", "rempah", "cengkeh", "pala", "rendang", "sate", "maranggi",
      "gudeg", "soto", "lamongan", "pempek", "palembang", "tempe", "mendoan", "sirih"
    ],
    sentences: [
      "Keindahan alam nusantara terhampar megah dari sabang sampai merauke dengan sejuta pesona kearifan lokal.",
      "Semangat gotong royong dan ramah tamah menjadi cermin kehangatan masyarakat Indonesia di setiap pelosok negeri.",
      "Aroma rempah cengkeh dan pala meresap sempurna ke dalam masakan rendang yang dimasak perlahan di atas tungku.",
      "Kain batik tulis legendaris dengan motif megamendung memancarkan filosofi kehidupan yang tenang dan bersahaja.",
      "Alunan alunan merdu musik gamelan dan angklung menghiasi suasana sore di pekarangan rumah tradisional.",
      "Candi Borobudur berdiri dengan anggun menyambut terbitnya matahari di antara kabut tipis pegunungan.",
      "Secangkir kopi tubruk hangat menemani obrolan santai warga di warung kopi pinggir jalan."
    ]
  },
  tech: {
    id: "tech",
    name: "Tech & Developer",
    subtitle: "Istilah Pemrograman, Cloud & System Design",
    iconName: "Code2",
    badge: "Coding",
    description: "Teks simulasi khusus untuk tampilan UI aplikasi web, dashboard, dan developer docs.",
    prefixWords: ["Frontend", "backend", "fullstack", "microservices", "deployment", "pipeline", "docker", "react"],
    words: [
      "algorithm", "backend", "compiler", "deployment", "event loop", "framework", "graphql",
      "hydration", "infrastructure", "javascript", "kubernetes", "latency", "microservices",
      "nextjs", "optimization", "pipeline", "query", "react", "state", "typescript",
      "ui", "ux", "virtual dom", "webassembly", "xml", "yarn", "zustand", "async",
      "breakpoint", "cache", "database", "endpoint", "refactor", "hook", "middleware", "token"
    ],
    sentences: [
      "Arsitektur microservices dideploy ke Kubernetes cluster dengan zero downtime deployment pipeline.",
      "Optimasi komponen React Server Components mengurangi waktu First Contentful Paint secara signifikan.",
      "Performa database query ditingkatkan dengan menerapkan caching strategy Redis pada API gateway.",
      "Refactoring legacy codebase menjadi TypeScript strict mode mencegah tipe error di environment produksi.",
      "State management terpusat mengalirkan data reaktif ke seluruh pohon komponen UI aplikasi web.",
      "Integrasi CI/CD workflow secara otomatis menjalankan unit test suite sebelum merger pull request."
    ]
  },
  corporate: {
    id: "corporate",
    name: "Corporate Buzzword",
    subtitle: "Bahasa Bisnis, KPI & Strategi Perusahaan",
    iconName: "Briefcase",
    badge: "Bisnis",
    description: "Teks placeholder bergaya laporan eksekutif, presentasi pitch, dan rencana bisnis.",
    prefixWords: ["Mengoptimalisasi", "sinergi", "skalabilitas", "pemangku", "kepentingan", "skenario", "bisnis"],
    words: [
      "sinergi", "kpi", "roi", "skalabilitas", "leverage", "actionable", "insights",
      "roadmap", "milestone", "stakeholder", "disrupsi", "paradigma", "benchmarking",
      "ekosistem", "kolaborasi", "optimalisasi", "monetisasi", "key performance",
      "brainstorming", "deliverable", "pencapaian", "proyeksi", "fleksibilitas", "strategis"
    ],
    sentences: [
      "Mengoptimalisasi sinergi lintas divisi untuk meningkatkan ROI dan mencapai milestone kuartal ketiga.",
      "Actionable insights dari analitik data memberikan keunggulan kompetitif dalam memetakan ekosistem bisnis.",
      "Penerapan inovasi berkelanjutan mendorong transformasi digital menuju skalabilitas enterprise yang solid.",
      "Melakukan re-aligning strategi pemasaran demi memperkuat value proposition di hadapan para stakeholder utama.",
      "Rapat koordinasi eksekutif merumuskan roadmap jangka panjang dengan fokus pada fleksibilitas operational."
    ]
  },
  slang: {
    id: "slang",
    name: "Bahasa Gaul & Santai",
    subtitle: "Bahasa Anak Muda, Slang & Daily Conversation",
    iconName: "Smile",
    badge: "Gaul",
    description: "Teks seru berbasis kata-kata populer sehari-hari khas anak muda & sosial media.",
    prefixWords: ["Jujurly", "vibesnya", "gaspro", "mantul", "spill", "checkout", "santai", "ngopi"],
    words: [
      "gaspro", "mantul", "spill", "checkout", "vibes", "slay", "santuy", "ngopi",
      "fyi", "asap", "bestie", "relate", "overthinking", "healing", "random", "gokil",
      "skuy", "gercep", "mabar", "bucin", "ambis", "auto", "kepo", "wfh", "healing"
    ],
    sentences: [
      "Jujurly vibes café sore ini dapet banget buat tempat healing sambil kerja santai bareng bestie.",
      "Auto checkout barang impian pas diskon tanggal kembar karena harganya gokil dan murah banget.",
      "Jangan overthinking melulu skuy gercep mabar game kesukaan biar pikiran makin fresh dan tenang.",
      "Spill dong rekomendasi resep kopi kekinian yang mantul dan gampang bikinnya di rumah.",
      "Anak-anak kantor lagi ambis banget nyelesein project biar akhir pekan bisa santuy liburan."
    ]
  },
  foodie: {
    id: "foodie",
    name: "Kuliner & Foodie",
    subtitle: "Deskripsi Makanan Lezat & Aroma Gourmet",
    iconName: "Utensils",
    badge: "Kuliner",
    description: "Teks lezat penuh dengan deskripsi tekstur makanan, rasa gurih, dan kepuasan kuliner.",
    prefixWords: ["Aroma", "gurih", "renyah", "lezat", "rempah", "lumer", "pedas", "manis"],
    words: [
      "gurih", "renyah", "lezat", "rempah", "lumer", "pedas", "manis", "juicy",
      "crispy", "gourmet", "aroma", "tekstur", "saus", "keju", "melted", "karamel",
      "panggangan", "kaldu", "daging", "tender", "sambal", "krispi", "segar", "hidangan"
    ],
    sentences: [
      "Aroma rempah gurih membumbung tinggi berpadu lezat dengan keju melted yang lumer di setiap gigitan.",
      "Daging panggang yang tender dan juicy disajikan bersama saus karamel gurih manis yang menggugah selera.",
      "Keripik krispi renyah berlapis bumbu pedas manis siap menemani santap siang keluarga.",
      "Keharmonisan cita rasa kaldu hangat dan rempah alami menciptakan sensasi kuliner gourmet tak terlupakan."
    ]
  }
};

export const DUMMY_NAMES_INDO = {
  firstNamesMale: [
    "Aditya", "Bima", "Candra", "Dewa", "Eka", "Fajar", "Gilang", "Hendra", "Irfan", "Joko",
    "Kevin", "Lukman", "Mahendra", "Nanda", "Okta", "Pratama", "Rian", "Surya", "Tegar", "Utama",
    "Vino", "Wahyu", "Yoga", "Zack"
  ],
  firstNamesFemale: [
    "Anisa", "Bunga", "Citra", "Dian", "Elsa", "Fitri", "Gita", "Hani", "Indah", "Jessica",
    "Kartika", "Laras", "Maya", "Nadia", "Olivia", "Putri", "Rina", "Siti", "Tari", "Utami",
    "Vina", "Winda", "Yulia", "Zahra"
  ],
  lastNames: [
    "Pratama", "Wijaya", "Santoso", "Saputra", "Kusuma", "Hidayat", "Setiawan", "Utomo", "Nugroho", "Wibowo",
    "Permana", "Hardianto", "Rahman", "Gunawan", "Susanto", "Kurniawan", "Suryadi", "Siregar", "Nasution", "Wahyudi"
  ],
  cities: [
    "Jakarta Selatan", "Bandung", "Surabaya", "Yogyakarta", "Semarang", "Medan", "Denpasar", "Makassar",
    "Malang", "Bogor", "Tangerang Selatan", "Bekasi", "Depok", "Palembang", "Balikpapan"
  ],
  professions: [
    "Frontend Developer", "UI/UX Designer", "Product Manager", "Backend Engineer", "Data Scientist",
    "Digital Marketer", "DevOps Engineer", "Graphic Designer", "Content Creator", "Financial Analyst",
    "Software Architect", "Cybersecurity Specialist", "QA Automation Engineer", "SEO Specialist"
  ],
  companies: [
    "Nusantara Tech", "Bukalapak", "Tokopedia", "Gojek", "Traveloka", "BCA Digital", "Telkomsel",
    "Ruangguru", "Bibit", "Sirclo", "Xendit", "Midtrans", "Kopi Kenangan", "Erigo", "Halodoc"
  ]
};
