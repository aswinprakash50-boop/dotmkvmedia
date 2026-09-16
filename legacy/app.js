/**
 * dotMKV Production Studio Dashboard
 * Employee Work Status & Performance Analytics
 * Fully resilient with Chart.js and SVG fallback charts
 */

// Embedded September 2026 baseline data
const DEFAULT_TIMESHEET_DATA = {
  "source_file": "Timesheet-September2026.xlsx",
  "generated_at": "2026-09-16T08:41:15.966447",
  "employees": [
    "Sabyasachi",
    "Aswin",
    "Muskan",
    "Aviral",
    "Anmol",
    "Sourav"
  ],
  "tasks": [
    {
      "id": "sabyasachi-4",
      "employee": "Sabyasachi",
      "row": 4,
      "date": "2026-09-06",
      "client": "BasicwitReacts",
      "project": "The Martian",
      "hours": 6.5,
      "started": "2026-09-06",
      "delivered": "2026-09-07",
      "status": "Delivered",
      "tat_days": 2
    },
    {
      "id": "sabyasachi-5",
      "employee": "Sabyasachi",
      "row": 5,
      "date": "2026-09-07",
      "client": "BasicwitReacts",
      "project": "The Martian",
      "hours": 4.0,
      "started": "2026-09-06",
      "delivered": "2026-09-07",
      "status": "Delivered",
      "tat_days": 2
    },
    {
      "id": "sabyasachi-6",
      "employee": "Sabyasachi",
      "row": 6,
      "date": "2026-09-08",
      "client": "CinePALS",
      "project": "Alien VS Predator Timeline",
      "hours": 0.25,
      "started": "2026-09-08",
      "delivered": "2026-09-08",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "sabyasachi-7",
      "employee": "Sabyasachi",
      "row": 7,
      "date": "2026-09-08",
      "client": "CinePALS",
      "project": "Troy",
      "hours": 3.0,
      "started": "2026-09-08",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sabyasachi-8",
      "employee": "Sabyasachi",
      "row": 8,
      "date": "2026-09-10",
      "client": "KaliWali",
      "project": "Kingdom of Heaven",
      "hours": 6.0,
      "started": "2026-09-10",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sabyasachi-9",
      "employee": "Sabyasachi",
      "row": 9,
      "date": "2026-09-11",
      "client": "KaliWali",
      "project": "Kingdom of Heaven",
      "hours": 7.0,
      "started": null,
      "delivered": "2026-09-11",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "sabyasachi-10",
      "employee": "Sabyasachi",
      "row": 10,
      "date": "2026-09-12",
      "client": "CinePALS",
      "project": "Alien Covenant Timeline",
      "hours": 0.25,
      "started": "2026-09-12",
      "delivered": "2026-09-12",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "sabyasachi-11",
      "employee": "Sabyasachi",
      "row": 11,
      "date": "2026-09-13",
      "client": "BasicwitReacts",
      "project": "Project Hail Mary",
      "hours": 5.0,
      "started": "2026-09-13",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sabyasachi-12",
      "employee": "Sabyasachi",
      "row": 12,
      "date": "2026-09-14",
      "client": "BasicwitReacts",
      "project": "Project Hail Mary",
      "hours": 4.0,
      "started": "2026-09-13",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "aswin-4",
      "employee": "Aswin",
      "row": 4,
      "date": "2026-09-08",
      "client": "CinePALS",
      "project": "Dark knight rise",
      "hours": 6.0,
      "started": "2026-09-08",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "aswin-5",
      "employee": "Aswin",
      "row": 5,
      "date": "2026-09-10",
      "client": "CinePALS",
      "project": "Dark knight rise",
      "hours": 10.0,
      "started": null,
      "delivered": "2026-09-10",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "aswin-6",
      "employee": "Aswin",
      "row": 6,
      "date": "2026-09-11",
      "client": "CinePALS",
      "project": "Alien VS Predator",
      "hours": 6.0,
      "started": "2026-09-11",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "aswin-7",
      "employee": "Aswin",
      "row": 7,
      "date": "2026-09-12",
      "client": "CinePALS",
      "project": "Alien VS Predator",
      "hours": 8.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "aswin-8",
      "employee": "Aswin",
      "row": 8,
      "date": "2026-09-14",
      "client": "CinePALS",
      "project": "Alien VS Predator",
      "hours": 10.0,
      "started": null,
      "delivered": "2026-09-14",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "aswin-9",
      "employee": "Aswin",
      "row": 9,
      "date": "2026-09-15",
      "client": "CinePALS",
      "project": "Talk to me",
      "hours": 6.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "aswin-10",
      "employee": "Aswin",
      "row": 10,
      "date": "2026-09-16",
      "client": "CinePALS",
      "project": "Talk to me",
      "hours": 0.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "muskan-4",
      "employee": "Muskan",
      "row": 4,
      "date": "2026-09-07",
      "client": "That's What She Said (TTWS)",
      "project": "Hunger games 2",
      "hours": 8.0,
      "started": "2026-09-06",
      "delivered": "2026-09-08",
      "status": "Delivered",
      "tat_days": 3
    },
    {
      "id": "muskan-5",
      "employee": "Muskan",
      "row": 5,
      "date": "2026-09-08",
      "client": "Eralia",
      "project": "Thor love and Thunder",
      "hours": 8.0,
      "started": "2026-09-08",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "muskan-6",
      "employee": "Muskan",
      "row": 6,
      "date": "2026-09-09",
      "client": "Eralia",
      "project": "Thor love and Thunder",
      "hours": 8.0,
      "started": null,
      "delivered": "2026-09-09",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "muskan-7",
      "employee": "Muskan",
      "row": 7,
      "date": "2026-09-10",
      "client": "KaliWali",
      "project": "Kingdom of Heaven",
      "hours": 6.0,
      "started": "2026-09-10",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "muskan-8",
      "employee": "Muskan",
      "row": 8,
      "date": "2026-09-11",
      "client": "KaliWali",
      "project": "Kingdom of Heaven",
      "hours": 7.0,
      "started": null,
      "delivered": "2026-09-11",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "muskan-9",
      "employee": "Muskan",
      "row": 9,
      "date": "2026-09-13",
      "client": "Reel Movie Flicks",
      "project": "Age of Ultron",
      "hours": 6.0,
      "started": "2026-09-13",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "muskan-10",
      "employee": "Muskan",
      "row": 10,
      "date": "2026-09-14",
      "client": "Artizan TV",
      "project": "Life of chuck",
      "hours": 1.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "muskan-11",
      "employee": "Muskan",
      "row": 11,
      "date": "2026-09-15",
      "client": "Reel Movie Flicks",
      "project": "Age of Ultron",
      "hours": 4.0,
      "started": null,
      "delivered": "2026-09-15",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "muskan-12",
      "employee": "Muskan",
      "row": 12,
      "date": "2026-09-15",
      "client": "That's What She Said (TTWS)",
      "project": "Mockingjay 1",
      "hours": 1.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "aviral-4",
      "employee": "Aviral",
      "row": 4,
      "date": "2026-09-07",
      "client": "CinePALS",
      "project": "Dark knight",
      "hours": 6.5,
      "started": "2026-09-07",
      "delivered": "2026-09-07",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "aviral-5",
      "employee": "Aviral",
      "row": 5,
      "date": "2026-09-08",
      "client": "Eralia",
      "project": "Falcon and Winter Soldier 1x5",
      "hours": 7.5,
      "started": "2026-09-08",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "aviral-6",
      "employee": "Aviral",
      "row": 6,
      "date": "2026-09-09",
      "client": "Eralia",
      "project": "Falcon and Winter Soldier 1x6",
      "hours": 6.0,
      "started": null,
      "delivered": "2026-09-09",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "aviral-7",
      "employee": "Aviral",
      "row": 7,
      "date": "2026-09-10",
      "client": "Phoenix Nat",
      "project": "Airplane",
      "hours": 8.0,
      "started": "2026-09-10",
      "delivered": "2026-09-10",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "aviral-8",
      "employee": "Aviral",
      "row": 8,
      "date": "2026-09-11",
      "client": "CinePALS",
      "project": "Dark Knight",
      "hours": 3.0,
      "started": "2026-09-11",
      "delivered": "2026-09-11",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "aviral-9",
      "employee": "Aviral",
      "row": 9,
      "date": "2026-09-12",
      "client": "CinePALS",
      "project": "Alien Covenant",
      "hours": 8.0,
      "started": "2026-09-12",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "aviral-10",
      "employee": "Aviral",
      "row": 10,
      "date": "2026-09-14",
      "client": "CinePALS",
      "project": "Alien Covenant",
      "hours": 6.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "aviral-11",
      "employee": "Aviral",
      "row": 11,
      "date": "2026-09-15",
      "client": "CinePALS",
      "project": "Alien Covenant",
      "hours": 8.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-2",
      "employee": "Anmol",
      "row": 2,
      "date": "2026-09-07",
      "client": "Jess Tess",
      "project": "THG Ballad of Songbirds and Snakes",
      "hours": 8.0,
      "started": "2026-09-07",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "anmol-3",
      "employee": "Anmol",
      "row": 3,
      "date": "2026-09-08",
      "client": "Internal / Unspecified",
      "project": "General Project Work",
      "hours": 3.0,
      "started": "2026-09-08",
      "delivered": "2026-09-08",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "anmol-4",
      "employee": "Anmol",
      "row": 4,
      "date": "2026-09-08",
      "client": "Jess Tess",
      "project": "Spiderman Far From Home",
      "hours": 2.5,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-5",
      "employee": "Anmol",
      "row": 5,
      "date": "2026-09-09",
      "client": "Eralia",
      "project": "Falcon Winter Solder 1x5 - 1x6 Thumb, Thor Thumb",
      "hours": 1.5,
      "started": "2026-09-09",
      "delivered": "2026-09-09",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "anmol-6",
      "employee": "Anmol",
      "row": 6,
      "date": "2026-09-09",
      "client": "Jess Tess",
      "project": "Ted Lasso 4x6",
      "hours": 4.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-7",
      "employee": "Anmol",
      "row": 7,
      "date": "2026-09-09",
      "client": "Jess Tess",
      "project": "Spiderman Far From Home",
      "hours": 5.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-8",
      "employee": "Anmol",
      "row": 8,
      "date": "2026-09-10",
      "client": "Eralia",
      "project": "Thor Love & Thunder Thumb",
      "hours": 0.5,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-9",
      "employee": "Anmol",
      "row": 9,
      "date": "2026-09-10",
      "client": "Jess Tess",
      "project": "Ted Lasso 4x6",
      "hours": 0.5,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-10",
      "employee": "Anmol",
      "row": 10,
      "date": "2026-09-10",
      "client": "Jess Tess",
      "project": "Spiderman Far From Home",
      "hours": 1.0,
      "started": null,
      "delivered": "2026-09-10",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "anmol-11",
      "employee": "Anmol",
      "row": 11,
      "date": "2026-09-10",
      "client": "Jess Tess",
      "project": "Breaking Bad 3x4, 3x3",
      "hours": 4.0,
      "started": "2026-09-10",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "anmol-12",
      "employee": "Anmol",
      "row": 12,
      "date": "2026-09-12",
      "client": "Reel Movie Flicks",
      "project": "Antman",
      "hours": 2.0,
      "started": "2026-09-12",
      "delivered": "2026-09-12",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "anmol-13",
      "employee": "Anmol",
      "row": 13,
      "date": "2026-09-13",
      "client": "Jess Tess",
      "project": "Blade Runner 2049",
      "hours": 6.5,
      "started": "2026-09-13",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "anmol-14",
      "employee": "Anmol",
      "row": 14,
      "date": "2026-09-14",
      "client": "Internal / Unspecified",
      "project": "General Project Work",
      "hours": 4.5,
      "started": null,
      "delivered": "2026-09-14",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "anmol-15",
      "employee": "Anmol",
      "row": 15,
      "date": "2026-09-14",
      "client": "Reel Movie Flicks",
      "project": "Antman",
      "hours": 2.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "anmol-16",
      "employee": "Anmol",
      "row": 16,
      "date": "2026-09-15",
      "client": "Phoenix Nat",
      "project": "POTC Dead Man's Chest",
      "hours": 9.0,
      "started": "2026-09-15",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sourav-4",
      "employee": "Sourav",
      "row": 4,
      "date": "2026-09-01",
      "client": "Movieverse",
      "project": "XMen'97 Ssn2 6-7",
      "hours": 5.0,
      "started": "2026-09-01",
      "delivered": "2026-09-01",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "sourav-5",
      "employee": "Sourav",
      "row": 5,
      "date": "2026-09-02",
      "client": "Eralia",
      "project": "Falcon & Winter Soldier Ep 4",
      "hours": 4.0,
      "started": "2026-09-02",
      "delivered": "2026-09-02",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "sourav-6",
      "employee": "Sourav",
      "row": 6,
      "date": "2026-09-03",
      "client": "JRocks",
      "project": "FMA 10-12",
      "hours": 6.0,
      "started": "2026-09-03",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sourav-7",
      "employee": "Sourav",
      "row": 7,
      "date": "2026-09-04",
      "client": "JRocks",
      "project": "FMA 13-14",
      "hours": 3.5,
      "started": null,
      "delivered": "2026-09-04",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "sourav-8",
      "employee": "Sourav",
      "row": 8,
      "date": "2026-09-05",
      "client": "Movieverse",
      "project": "XMen'97 Ssn2 8-9",
      "hours": 5.0,
      "started": "2026-09-05",
      "delivered": "2026-09-05",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "sourav-9",
      "employee": "Sourav",
      "row": 9,
      "date": "2026-09-06",
      "client": "Movieverse",
      "project": "General Project Work",
      "hours": 0.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "sourav-10",
      "employee": "Sourav",
      "row": 10,
      "date": "2026-09-07",
      "client": "That's What She Said (TTWS)",
      "project": "NightCrawler",
      "hours": 4.5,
      "started": "2026-09-07",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sourav-11",
      "employee": "Sourav",
      "row": 11,
      "date": "2026-09-08",
      "client": "That's What She Said (TTWS)",
      "project": "NightCrawler",
      "hours": 7.5,
      "started": null,
      "delivered": "2026-09-08",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "sourav-12",
      "employee": "Sourav",
      "row": 12,
      "date": "2026-09-09",
      "client": "JRocks",
      "project": "FMA 15-16",
      "hours": 4.0,
      "started": "2026-09-09",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sourav-13",
      "employee": "Sourav",
      "row": 13,
      "date": "2026-09-10",
      "client": "JRocks",
      "project": "FMA 17-19",
      "hours": 6.0,
      "started": null,
      "delivered": "2026-09-10",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "sourav-14",
      "employee": "Sourav",
      "row": 14,
      "date": "2026-09-11",
      "client": "That's What She Said (TTWS)",
      "project": "Hunger Games- MockingJay 1",
      "hours": 2.0,
      "started": "2026-09-11",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sourav-15",
      "employee": "Sourav",
      "row": 15,
      "date": "2026-09-12",
      "client": "That's What She Said (TTWS)",
      "project": "Hunger Games- MockingJay 1",
      "hours": 7.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    },
    {
      "id": "sourav-16",
      "employee": "Sourav",
      "row": 16,
      "date": "2026-09-13",
      "client": "That's What She Said (TTWS)",
      "project": "Hunger Games- MockingJay 1",
      "hours": 5.0,
      "started": null,
      "delivered": "2026-09-13",
      "status": "Delivered",
      "tat_days": null
    },
    {
      "id": "sourav-17",
      "employee": "Sourav",
      "row": 17,
      "date": "2026-09-14",
      "client": "BasicwitReacts",
      "project": "Project Hail Mary",
      "hours": 7.0,
      "started": "2026-09-14",
      "delivered": "2026-09-14",
      "status": "Delivered",
      "tat_days": 1
    },
    {
      "id": "sourav-18",
      "employee": "Sourav",
      "row": 18,
      "date": "2026-09-15",
      "client": "Artizan TV",
      "project": "Life Of Chuck",
      "hours": 0.0,
      "started": "2026-09-15",
      "delivered": null,
      "status": "In Progress",
      "tat_days": null
    },
    {
      "id": "sourav-19",
      "employee": "Sourav",
      "row": 19,
      "date": "2026-09-16",
      "client": "Artizan TV",
      "project": "Life Of Chuck",
      "hours": 0.0,
      "started": null,
      "delivered": null,
      "status": "Pending",
      "tat_days": null
    }
  ]
};

// Global App State
let appState = {
  sourceName: DEFAULT_TIMESHEET_DATA.source_file,
  employees: [...DEFAULT_TIMESHEET_DATA.employees],
  tasks: [...DEFAULT_TIMESHEET_DATA.tasks],
  selectedEmployee: DEFAULT_TIMESHEET_DATA.employees[0] || 'Sabyasachi',
  activeTab: 'company',
  masterViewMode: 'projects', // 'projects' | 'entries'
  employeeViewMode: 'projects', // 'projects' | 'entries'
  expandedProjects: new Set(),
  filters: {
    search: '',
    employee: 'ALL',
    client: 'ALL',
    status: 'ALL',
    sortBy: 'hours',
    sortOrder: 'desc',
    page: 1,
    pageSize: 12
  }
};

// Active Chart.js instances
const chartInstances = {
  companyTrend: null,
  clientShare: null,
  employeeHours: null,
  employeeDaily: null,
  employeeClients: null,
  comparisonRadar: null
};

// ==========================================
// CANONICALIZATION & DEDUPLICATION HELPERS
// ==========================================

function normalizeClientName(client) {
  if (!client) return 'Internal / Unspecified';
  const c = String(client).trim();
  if (c === '-' || c === '' || c.toLowerCase() === 'none') return 'Internal / Unspecified';
  const lower = c.toLowerCase().replace(/-/g, ' ');
  if (lower.includes('that') || lower.includes('ttws')) return "That's What She Said (TTWS)";
  if (lower.includes('reel')) return 'Reel Movie Flicks';
  if (lower.includes('artizan')) return 'Artizan TV';
  if (lower.includes('basic')) return 'BasicwitReacts';
  if (lower.includes('cinepals')) return 'CinePALS';
  if (lower.includes('eralia')) return 'Eralia';
  if (lower.includes('jess')) return 'Jess Tess';
  if (lower.includes('phoenix')) return 'Phoenix Nat';
  if (lower.includes('kali')) return 'KaliWali';
  if (lower.includes('movieverse')) return 'Movieverse';
  if (lower.includes('jrocks')) return 'JRocks';
  return c;
}

function canonicalProjectKey(projectName, clientName) {
  const c = normalizeClientName(clientName);
  let p = String(projectName || 'General Project Work').trim().toLowerCase();
  p = p.replace(/\s+/g, ' ');
  p = p.replace(/-/g, ' ');
  p = p.replace(/\s+/g, ' ').trim();
  // Unique composite key: Client + Project
  return `${c}:::${p}`;
}

function aggregateProjects(tasks) {
  const projectMap = {};

  tasks.forEach(t => {
    const client = normalizeClientName(t.client);
    const key = canonicalProjectKey(t.project, client);
    if (!projectMap[key]) {
      projectMap[key] = {
        key: key,
        id: 'proj-' + key.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        projectName: (t.project || 'General Project Work').trim(),
        client: client,
        totalHours: 0.0,
        dailyLogs: [],
        team: new Set(),
        dates: [],
        startedDates: [],
        deliveredDates: [],
        hasDelivered: false,
        hasStarted: false
      };
    }

    const p = projectMap[key];
    if ((t.project || '').length > p.projectName.length) {
      p.projectName = t.project.trim();
    }
    p.client = client;

    p.totalHours += (t.hours || 0.0);
    p.dailyLogs.push(t);
    p.team.add(t.employee);

    if (t.date) p.dates.push(t.date);
    if (t.started && t.started !== '-') {
      p.startedDates.push(t.started);
      p.hasStarted = true;
    }
    if (t.delivered && t.delivered !== '-') {
      p.deliveredDates.push(t.delivered);
      p.hasDelivered = true;
    }
    if (t.status === 'Delivered') p.hasDelivered = true;
    if (t.status === 'In Progress') p.hasStarted = true;
  });

  return Object.values(projectMap).map(p => {
    p.totalHours = Math.round(p.totalHours * 100) / 100;
    p.dailyLogsCount = p.dailyLogs.length;
    p.team = Array.from(p.team).sort();

    p.earliestStart = p.startedDates.length > 0 ? p.startedDates.sort()[0] : (p.dates.length > 0 ? p.dates.sort()[0] : null);
    p.latestDelivered = p.deliveredDates.length > 0 ? p.deliveredDates.sort()[p.deliveredDates.length - 1] : null;

    p.tatDays = calculateTatDays(p.earliestStart, p.latestDelivered);

    if (p.hasDelivered) {
      p.status = 'Delivered';
    } else if (p.hasStarted || p.totalHours > 0) {
      p.status = 'In Progress';
    } else {
      p.status = 'Pending';
    }

    return p;
  });
}

function parseExcelDate(val, defaultYear = 2026, defaultMonth = 9) {
  if (val === null || val === undefined) return null;
  const strVal = String(val).trim();
  if (strVal === '' || strVal === '-' || strVal.toLowerCase() === 'none') return null;

  const num = Number(strVal);
  if (!isNaN(num) && num > 20000) {
    const d = new Date((num - 25569) * 86400 * 1000);
    return d.toISOString().split('T')[0];
  }

  const match = strVal.match(/^(\d{1,2})\s*[-/]?\s*([a-zA-Z]+)/);
  if (match) {
    const day = parseInt(match[1], 10);
    const monStr = match[2].toLowerCase().substring(0, 3);
    const monthMap = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
    };
    const mon = monthMap[monStr] || defaultMonth;
    return `${defaultYear}-${String(mon).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(strVal)) return strVal;
  return strVal;
}

function parseExcelHours(val) {
  if (val === null || val === undefined) return 0.0;
  const strVal = String(val).trim();
  if (strVal === '' || strVal === '-' || strVal.toLowerCase() === 'none') return 0.0;
  const num = parseFloat(strVal);
  if (isNaN(num)) return 0.0;

  if (num > 0 && num < 1.0) {
    return Math.round(num * 24.0 * 100) / 100;
  }
  return Math.round(num * 100) / 100;
}

function calculateTatDays(start, deliv) {
  if (!start || !deliv || start === '-' || deliv === '-') return null;
  try {
    const d1 = new Date(start);
    const d2 = new Date(deliv);
    if (isNaN(d1) || isNaN(d2)) return null;
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  } catch (e) {
    return null;
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const borderColors = {
    success: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/80',
    error: 'border-rose-500/50 text-rose-300 bg-rose-950/80',
    info: 'border-indigo-500/50 text-indigo-300 bg-indigo-950/80'
  };
  toast.className = `px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-3 text-sm font-medium transition-all duration-300 ${borderColors[type] || borderColors.info}`;
  toast.innerHTML = `
    <span class="pulse-dot ${type === 'success' ? 'bg-emerald-400' : type === 'error' ? 'bg-rose-400' : 'bg-indigo-400'}"></span>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast && toast.style) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
    }
    setTimeout(() => {
      if (toast && toast.remove) toast.remove();
    }, 300);
  }, 3800);
}

// ==========================================
// APP INITIALIZATION & EVENT BINDINGS
// ==========================================
function initApp() {
  initEventListeners();
  renderApp();
  showToast('dotMKV Studio Dashboard initialized successfully.', 'success');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      switchTab(btn.dataset.tab);
    };
  });

  // Master Log View Mode Toggles
  const btnViewProjects = document.getElementById('btn-view-projects');
  const btnViewEntries = document.getElementById('btn-view-entries');
  if (btnViewProjects && btnViewEntries) {
    btnViewProjects.onclick = function() {
      appState.masterViewMode = 'projects';
      btnViewProjects.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition-all flex items-center gap-1.5';
      btnViewEntries.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5';
      appState.filters.page = 1;
      renderMasterLogs();
    };

    btnViewEntries.onclick = function() {
      appState.masterViewMode = 'entries';
      btnViewEntries.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition-all flex items-center gap-1.5';
      btnViewProjects.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5';
      appState.filters.page = 1;
      renderMasterLogs();
    };
  }

  // Employee Hub View Mode Toggles
  const btnEmpViewProjects = document.getElementById('btn-emp-view-projects');
  const btnEmpViewEntries = document.getElementById('btn-emp-view-entries');
  if (btnEmpViewProjects && btnEmpViewEntries) {
    btnEmpViewProjects.onclick = function() {
      appState.employeeViewMode = 'projects';
      btnEmpViewProjects.className = 'px-3 py-1 rounded-lg font-semibold bg-indigo-600 text-white transition-all';
      btnEmpViewEntries.className = 'px-3 py-1 rounded-lg font-semibold bg-slate-800 text-slate-400 hover:text-slate-200 transition-all';
      renderSelectedEmployeeProfile(appState.selectedEmployee);
    };

    btnEmpViewEntries.onclick = function() {
      appState.employeeViewMode = 'entries';
      btnEmpViewEntries.className = 'px-3 py-1 rounded-lg font-semibold bg-indigo-600 text-white transition-all';
      btnEmpViewProjects.className = 'px-3 py-1 rounded-lg font-semibold bg-slate-800 text-slate-400 hover:text-slate-200 transition-all';
      renderSelectedEmployeeProfile(appState.selectedEmployee);
    };
  }

  // Upload Modal & Dropzone
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-upload-input');
  const uploadTriggerBtn = document.getElementById('btn-open-upload');
  const uploadCloseBtn = document.getElementById('btn-close-upload');
  const uploadModal = document.getElementById('upload-modal');
  const resetBtn = document.getElementById('btn-reset-data');

  if (uploadTriggerBtn && uploadModal) {
    uploadTriggerBtn.onclick = () => uploadModal.classList.remove('hidden');
  }
  if (uploadCloseBtn && uploadModal) {
    uploadCloseBtn.onclick = () => uploadModal.classList.add('hidden');
  }

  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();
    dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('dragover'); };
    dropzone.ondragleave = () => dropzone.classList.remove('dragover');
    dropzone.ondrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]);
    };
    fileInput.onchange = (e) => {
      if (e.target.files.length) handleFileUpload(e.target.files[0]);
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      appState.sourceName = DEFAULT_TIMESHEET_DATA.source_file;
      appState.employees = [...DEFAULT_TIMESHEET_DATA.employees];
      appState.tasks = [...DEFAULT_TIMESHEET_DATA.tasks];
      appState.selectedEmployee = appState.employees[0] || 'Sabyasachi';
      renderApp();
      showToast('Restored September 2026 baseline dataset.', 'info');
    };
  }

  // Filter controls
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      appState.filters.search = e.target.value.toLowerCase();
      appState.filters.page = 1;
      renderMasterLogs();
    };
  }

  const filterEmp = document.getElementById('filter-employee');
  if (filterEmp) {
    filterEmp.onchange = (e) => {
      appState.filters.employee = e.target.value;
      appState.filters.page = 1;
      renderMasterLogs();
    };
  }

  const filterClient = document.getElementById('filter-client');
  if (filterClient) {
    filterClient.onchange = (e) => {
      appState.filters.client = e.target.value;
      appState.filters.page = 1;
      renderMasterLogs();
    };
  }

  const filterStatus = document.getElementById('filter-status');
  if (filterStatus) {
    filterStatus.onchange = (e) => {
      appState.filters.status = e.target.value;
      appState.filters.page = 1;
      renderMasterLogs();
    };
  }

  // Export CSV
  const exportBtn = document.getElementById('btn-export-csv');
  if (exportBtn) {
    exportBtn.onclick = () => exportCurrentViewCSV();
  }
}

function switchTab(tab) {
  appState.activeTab = tab;
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-content-section').forEach(sec => {
    sec.classList.toggle('hidden', sec.id !== `tab-content-${tab}`);
  });

  if (tab === 'company') updateCompanyCharts();
  else if (tab === 'employee') renderEmployeeHub();
  else if (tab === 'comparison') renderTeamComparison();
  else if (tab === 'clients') renderClientMatrix();
  else if (tab === 'logs') renderMasterLogs();
}

// Handle Excel Upload
function handleFileUpload(file) {
  if (!file.name.match(/\.(xlsx|xls)$/i)) {
    showToast('Please select a valid Excel (.xlsx or .xls) file.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      if (typeof XLSX === 'undefined') throw new Error('SheetJS library not loaded.');

      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const parsedTasks = [];
      const parsedEmployees = [];

      workbook.SheetNames.forEach(sheetName => {
        if (['Summary', 'Overview', 'Master'].includes(sheetName)) return;

        parsedEmployees.push(sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

        let headerRowIndex = -1;
        let colMap = { date: -1, client: -1, project: -1, hours: -1, started: -1, delivered: -1 };

        for (let r = 0; r < Math.min(10, rows.length); r++) {
          const row = rows[r];
          if (!row || !Array.isArray(row)) continue;
          const strRow = row.map(cell => String(cell || '').trim().toUpperCase());
          if (strRow.some(c => c.includes('PROJECT') || c.includes('CLIENT') || c.includes('DATE'))) {
            headerRowIndex = r;
            row.forEach((colName, cIdx) => {
              const c = String(colName || '').trim().toUpperCase();
              if (c.includes('DATE') && colMap.date === -1) colMap.date = cIdx;
              if (c.includes('CLIENT') && colMap.client === -1) colMap.client = cIdx;
              if (c.includes('PROJECT') && !c.includes('HOURS') && colMap.project === -1) colMap.project = cIdx;
              if ((c.includes('TIME') || c.includes('HOURS')) && !c.includes('PROJECT') && colMap.hours === -1) colMap.hours = cIdx;
              if (c.includes('STARTED') && colMap.started === -1) colMap.started = cIdx;
              if (c.includes('DELIVERED') && colMap.delivered === -1) colMap.delivered = cIdx;
            });
            break;
          }
        }

        if (sheetName === 'Sourav' || colMap.hours === -1) {
          if (rows[headerRowIndex]) {
            rows[headerRowIndex].forEach((c, idx) => {
              const str = String(c || '').toUpperCase();
              if (str.includes('DAILY TIME')) colMap.hours = idx;
            });
          }
        }

        let lastDate = null;
        let lastClient = null;

        for (let r = headerRowIndex + 1; r < rows.length; r++) {
          const row = rows[r];
          if (!row) continue;

          const rawDate = colMap.date !== -1 ? row[colMap.date] : null;
          const rawClient = colMap.client !== -1 ? row[colMap.client] : null;
          const rawProject = colMap.project !== -1 ? row[colMap.project] : null;
          const rawHours = colMap.hours !== -1 ? row[colMap.hours] : null;
          const rawStarted = colMap.started !== -1 ? row[colMap.started] : null;
          const rawDelivered = colMap.delivered !== -1 ? row[colMap.delivered] : null;

          const parsedDate = parseExcelDate(rawDate);
          if (parsedDate) lastDate = parsedDate;

          const clientNormalized = normalizeClientName(rawClient);
          if (clientNormalized !== 'Internal / Unspecified') lastClient = clientNormalized;

          const projVal = rawProject && String(rawProject).trim() !== '-' ? String(rawProject).trim() : null;
          const hoursVal = parseExcelHours(rawHours);
          const startVal = parseExcelDate(rawStarted);
          const delivVal = parseExcelDate(rawDelivered);

          if (projVal || hoursVal > 0 || (clientNormalized && clientNormalized !== 'Internal / Unspecified')) {
            const status = delivVal && delivVal !== '-' ? 'Delivered' : (startVal && startVal !== '-' ? 'In Progress' : 'Pending');
            const tat = calculateTatDays(startVal, delivVal);

            parsedTasks.push({
              id: `${sheetName.toLowerCase()}-${r + 1}`,
              employee: sheetName,
              row: r + 1,
              date: parsedDate || lastDate,
              client: clientNormalized !== 'Internal / Unspecified' ? clientNormalized : (lastClient || 'Internal / Unspecified'),
              project: projVal || 'General Project Work',
              hours: hoursVal,
              started: startVal,
              delivered: delivVal,
              status: status,
              tat_days: tat
            });
          }
        }
      });

      if (parsedTasks.length === 0) {
        showToast('No valid progress records found in uploaded file.', 'error');
        return;
      }

      appState.sourceName = file.name;
      appState.employees = parsedEmployees;
      appState.tasks = parsedTasks;
      appState.selectedEmployee = parsedEmployees[0] || 'Sabyasachi';

      document.getElementById('upload-modal').classList.add('hidden');
      renderApp();

      const uniqueProjects = aggregateProjects(parsedTasks);
      showToast(`Imported ${parsedTasks.length} daily logs across ${uniqueProjects.length} distinct projects!`, 'success');

    } catch (err) {
      console.error(err);
      showToast('Error parsing Excel: ' + err.message, 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

// Global App Re-render
function renderApp() {
  const fileNameBadge = document.getElementById('current-filename-badge');
  if (fileNameBadge) fileNameBadge.textContent = appState.sourceName || 'Timesheet-September2026.xlsx';

  updateFilterDropdowns();
  renderExecutiveProfile();
  renderEmployeeHub();
  renderTeamComparison();
  renderClientMatrix();
  renderMasterLogs();
}

function updateFilterDropdowns() {
  const empSelect = document.getElementById('filter-employee');
  const clientSelect = document.getElementById('filter-client');

  if (empSelect) {
    const current = empSelect.value;
    empSelect.innerHTML = '<option value="ALL">All Employees</option>' +
      appState.employees.map(e => `<option value="${e}">${e}</option>`).join('');
    if (appState.employees.includes(current)) empSelect.value = current;
  }

  if (clientSelect) {
    const current = clientSelect.value;
    const clients = Array.from(new Set(appState.tasks.map(t => t.client).filter(c => c && c !== 'Internal / Unspecified'))).sort();
    clientSelect.innerHTML = '<option value="ALL">All Clients</option>' +
      clients.map(c => `<option value="${c}">${c}</option>`).join('');
    if (clients.includes(current)) clientSelect.value = current;
  }
}

// ==========================================
// 1. EXECUTIVE COMPANY PROFILE VIEW
// ==========================================
function renderExecutiveProfile() {
  const tasks = appState.tasks;
  const projects = aggregateProjects(tasks);

  const totalHours = tasks.reduce((sum, t) => sum + (t.hours || 0), 0);
  const totalDistinctProjects = projects.length;
  const deliveredProjects = projects.filter(p => p.status === 'Delivered').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
  const uniqueClients = new Set(projects.map(p => p.client).filter(c => c !== 'Internal / Unspecified'));

  const activeDates = new Set(tasks.map(t => t.date).filter(Boolean));
  const avgDailyHours = activeDates.size > 0 ? (totalHours / activeDates.size).toFixed(1) : '0';

  const completionRate = totalDistinctProjects > 0 ? Math.round((deliveredProjects / totalDistinctProjects) * 100) : 0;

  safeSetText('kpi-total-hours', totalHours.toFixed(1) + ' hrs');
  safeSetText('kpi-daily-company-avg', avgDailyHours + ' hrs/day');
  safeSetText('kpi-total-deliveries', deliveredProjects);
  safeSetText('kpi-completion-rate', completionRate + '%');
  safeSetText('kpi-active-team', appState.employees.length);
  safeSetText('kpi-unique-clients', uniqueClients.size);
  safeSetText('kpi-active-projects', totalDistinctProjects);
  safeSetText('kpi-active-projects-sub', `from ${tasks.length} daily progress logs (${inProgressProjects} active)`);
  safeSetText('heatmap-summary-badge', `${totalDistinctProjects} Projects • ${tasks.length} Daily Logs`);

  updateCompanyCharts(projects);
  renderActivityHeatmap();
  renderTopClientsTable(projects);
}

function updateCompanyCharts(projects) {
  if (!projects) projects = aggregateProjects(appState.tasks);
  const tasks = appState.tasks;

  // 1. Daily Workload Timeline
  const dateMap = {};
  tasks.forEach(t => {
    if (!t.date) return;
    dateMap[t.date] = (dateMap[t.date] || 0) + (t.hours || 0);
  });
  const sortedDates = Object.keys(dateMap).sort();
  const dailyHours = sortedDates.map(d => Math.round(dateMap[d] * 10) / 10);
  const formattedDates = sortedDates.map(d => d.split('-').slice(1).join('/'));

  const ctxTrend = document.getElementById('chart-company-trend');
  if (ctxTrend) {
    if (typeof Chart !== 'undefined') {
      clearSvgFallback(ctxTrend);
      if (chartInstances.companyTrend) chartInstances.companyTrend.destroy();
      chartInstances.companyTrend = new Chart(ctxTrend, {
        type: 'line',
        data: {
          labels: formattedDates,
          datasets: [{
            label: 'Production Hours Logged',
            data: dailyHours,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#818cf8',
            pointBorderColor: '#0f172a',
            pointBorderWidth: 2,
            pointRadius: 4
          }]
        },
        options: getChartBaseOptions('Hours Logged')
      });
    } else {
      renderSvgLineChart(ctxTrend, formattedDates, dailyHours);
    }
  }

  // 2. Client Hours Share Donut
  const clientMap = {};
  tasks.forEach(t => {
    const c = t.client || 'Internal / Unspecified';
    clientMap[c] = (clientMap[c] || 0) + (t.hours || 0);
  });
  const sortedClients = Object.entries(clientMap).sort((a, b) => b[1] - a[1]);
  const topClients = sortedClients.slice(0, 7);
  const otherClientsHours = sortedClients.slice(7).reduce((acc, curr) => acc + curr[1], 0);
  if (otherClientsHours > 0) topClients.push(['Other Studios', otherClientsHours]);

  const ctxClient = document.getElementById('chart-client-share');
  if (ctxClient) {
    if (typeof Chart !== 'undefined') {
      clearSvgFallback(ctxClient);
      if (chartInstances.clientShare) chartInstances.clientShare.destroy();
      chartInstances.clientShare = new Chart(ctxClient, {
        type: 'doughnut',
        data: {
          labels: topClients.map(c => c[0]),
          datasets: [{
            data: topClients.map(c => Math.round(c[1] * 10) / 10),
            backgroundColor: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#64748b'],
            borderColor: '#0f172a',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: '#94a3b8', boxWidth: 12, padding: 12, font: { size: 11 } } },
            tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.raw} hrs` } }
          },
          cutout: '68%'
        }
      });
    } else {
      renderSvgDonutChart(ctxClient, topClients);
    }
  }

  // 3. Employee Output (Hours vs Distinct Projects Handled & Delivered)
  const empMap = {};
  appState.employees.forEach(emp => {
    const empTasks = tasks.filter(t => t.employee === emp);
    const empProjects = aggregateProjects(empTasks);
    empMap[emp] = {
      hours: empTasks.reduce((s, t) => s + (t.hours || 0), 0),
      distinctProjects: empProjects.length,
      deliveredProjects: empProjects.filter(p => p.status === 'Delivered').length
    };
  });

  const empNames = Object.keys(empMap);
  const ctxEmp = document.getElementById('chart-employee-hours');
  if (ctxEmp) {
    if (typeof Chart !== 'undefined') {
      clearSvgFallback(ctxEmp);
      if (chartInstances.employeeHours) chartInstances.employeeHours.destroy();
      chartInstances.employeeHours = new Chart(ctxEmp, {
        type: 'bar',
        data: {
          labels: empNames,
          datasets: [
            {
              label: 'Total Hours',
              data: empNames.map(e => Math.round(empMap[e].hours * 10) / 10),
              backgroundColor: '#06b6d4',
              borderRadius: 6
            },
            {
              label: 'Unique Projects Delivered',
              data: empNames.map(e => empMap[e].deliveredProjects),
              backgroundColor: '#10b981',
              borderRadius: 6
            },
            {
              label: 'Distinct Projects Handled',
              data: empNames.map(e => empMap[e].distinctProjects),
              backgroundColor: 'rgba(99, 102, 241, 0.6)',
              borderRadius: 6
            }
          ]
        },
        options: getChartBaseOptions('Count / Hours')
      });
    } else {
      renderSvgBarChart(ctxEmp, empNames, empNames.map(e => empMap[e].hours));
    }
  }
}

// Activity Heatmap
function renderActivityHeatmap() {
  const container = document.getElementById('heatmap-container');
  if (!container) return;

  const tasks = appState.tasks;
  const dates = Array.from(new Set(tasks.map(t => t.date).filter(Boolean))).sort();
  if (dates.length === 0) return;

  let html = '<div class="overflow-x-auto pb-2"><table class="w-full text-xs"><thead><tr><th class="text-left py-2 pr-4 text-slate-400 font-semibold">Team Member</th>';
  dates.forEach(d => {
    const day = d.split('-')[2];
    html += `<th class="text-center px-1 py-2 text-slate-400 font-mono">${day}</th>`;
  });
  html += '<th class="text-right pl-4 py-2 text-slate-400 font-semibold">Total</th></tr></thead><tbody>';

  appState.employees.forEach(emp => {
    let empTotal = 0;
    html += `<tr class="border-t border-slate-800/60"><td class="py-2 pr-4 font-semibold text-slate-200 flex items-center gap-2">
      <span class="avatar-badge w-6 h-6 text-xs rounded-md">${emp.substring(0, 1)}</span>${emp}
    </td>`;

    dates.forEach(d => {
      const dayTasks = tasks.filter(t => t.employee === emp && t.date === d);
      const dayHours = dayTasks.reduce((acc, t) => acc + (t.hours || 0), 0);
      empTotal += dayHours;

      let cellBg = 'bg-slate-800/40 text-slate-600';
      if (dayHours > 8) cellBg = 'bg-rose-500/80 text-white font-bold';
      else if (dayHours >= 6) cellBg = 'bg-emerald-500/80 text-white font-semibold';
      else if (dayHours > 0) cellBg = 'bg-indigo-500/60 text-white';

      html += `<td class="text-center px-1 py-1"><div class="heatmap-cell flex items-center justify-center text-[10px] mx-auto ${cellBg}" title="${emp} on ${d}: ${dayHours.toFixed(1)} hrs">${dayHours > 0 ? (dayHours >= 1 ? Math.round(dayHours) : dayHours.toFixed(1)) : '·'}</div></td>`;
    });

    html += `<td class="text-right pl-4 py-2 font-mono font-bold text-indigo-400">${empTotal.toFixed(1)}h</td></tr>`;
  });

  html += '</tbody></table></div>';
  container.innerHTML = html;
}

// Top Clients Table
function renderTopClientsTable(projects) {
  const container = document.getElementById('top-clients-table-body');
  if (!container) return;

  const clientStats = {};
  projects.forEach(p => {
    const c = p.client;
    if (!c || c === 'Internal / Unspecified') return;
    if (!clientStats[c]) clientStats[c] = { hours: 0, distinctProjects: 0, deliveredProjects: 0, team: new Set() };
    clientStats[c].hours += p.totalHours;
    clientStats[c].distinctProjects += 1;
    if (p.status === 'Delivered') clientStats[c].deliveredProjects += 1;
    p.team.forEach(m => clientStats[c].team.add(m));
  });

  const sorted = Object.entries(clientStats).sort((a, b) => b[1].hours - a[1].hours).slice(0, 6);

  container.innerHTML = sorted.map(([client, stat]) => `
    <tr class="hover:bg-slate-800/30 transition-colors">
      <td class="py-3 px-4 font-semibold text-slate-100 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-indigo-400"></span>${client}
      </td>
      <td class="py-3 px-4 font-mono font-bold text-cyan-400">${stat.hours.toFixed(1)} hrs</td>
      <td class="py-3 px-4 text-slate-300">
        <span class="font-semibold text-white">${stat.distinctProjects} projects</span>
        <span class="text-xs text-emerald-400 ml-1">(${stat.deliveredProjects} completed)</span>
      </td>
      <td class="py-3 px-4">
        <div class="flex -space-x-2">
          ${Array.from(stat.team).map(m => `<span class="w-6 h-6 rounded-full bg-indigo-900 border border-slate-700 text-[10px] flex items-center justify-center font-bold text-indigo-200" title="${m}">${m.substring(0, 1)}</span>`).join('')}
        </div>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// 2. EMPLOYEE PERFORMANCE HUB VIEW
// ==========================================
function renderEmployeeHub() {
  const container = document.getElementById('employee-selector-cards');
  if (!container) return;

  container.innerHTML = appState.employees.map(emp => {
    const empTasks = appState.tasks.filter(t => t.employee === emp);
    const empProjects = aggregateProjects(empTasks);
    const empHours = empTasks.reduce((s, t) => s + (t.hours || 0), 0);
    const delivered = empProjects.filter(p => p.status === 'Delivered').length;
    const isSelected = emp === appState.selectedEmployee;

    return `
      <div class="emp-card-selector ${isSelected ? 'selected' : ''}" onclick="window.selectEmployee('${emp}')">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="avatar-badge">${emp.substring(0, 2).toUpperCase()}</div>
            <div>
              <div class="font-bold text-slate-100">${emp}</div>
              <div class="text-xs text-slate-400">${empProjects.length} distinct projects</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-mono font-bold text-cyan-400">${empHours.toFixed(1)}h</div>
            <div class="text-xs text-emerald-400 font-medium">${delivered} delivered</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderSelectedEmployeeProfile(appState.selectedEmployee);
}

function selectEmployee(emp) {
  appState.selectedEmployee = emp;
  renderEmployeeHub();
}

function renderSelectedEmployeeProfile(emp) {
  const empTasks = appState.tasks.filter(t => t.employee === emp);
  const empProjects = aggregateProjects(empTasks);

  const totalHours = empTasks.reduce((s, t) => s + (t.hours || 0), 0);
  const distinctProjectsCount = empProjects.length;
  const deliveredProjectsCount = empProjects.filter(p => p.status === 'Delivered').length;
  const inProgressProjectsCount = empProjects.filter(p => p.status === 'In Progress').length;
  const activeDays = new Set(empTasks.map(t => t.date).filter(Boolean)).size;
  const avgHours = activeDays > 0 ? (totalHours / activeDays).toFixed(1) : '0';

  const dateTotals = {};
  empTasks.forEach(t => {
    if (t.date) dateTotals[t.date] = (dateTotals[t.date] || 0) + (t.hours || 0);
  });
  const overtimeDays = Object.values(dateTotals).filter(h => h > 8.0).length;

  safeSetText('emp-profile-name', emp);
  safeSetText('emp-profile-name-initial', emp.substring(0, 2).toUpperCase());
  safeSetText('emp-profile-hours', totalHours.toFixed(1) + ' hrs');
  safeSetText('emp-profile-active-days', activeDays + ' days');
  safeSetText('emp-profile-avg-hours', avgHours + ' hrs/day');
  safeSetText('emp-profile-delivered', deliveredProjectsCount + ' projects');
  safeSetText('emp-profile-inprogress', inProgressProjectsCount + ' projects');
  safeSetText('emp-profile-distinct-projects', distinctProjectsCount);
  safeSetText('emp-profile-daily-logs-count', empTasks.length + ' progress updates');
  safeSetText('emp-profile-overtime', overtimeDays + ' peak days');

  // Chart 1: Daily pace
  const sortedDates = Object.keys(dateTotals).sort();
  const ctxDaily = document.getElementById('chart-emp-daily');
  if (ctxDaily) {
    if (typeof Chart !== 'undefined') {
      clearSvgFallback(ctxDaily);
      if (chartInstances.employeeDaily) chartInstances.employeeDaily.destroy();
      chartInstances.employeeDaily = new Chart(ctxDaily, {
        type: 'bar',
        data: {
          labels: sortedDates.map(d => d.split('-').slice(1).join('/')),
          datasets: [{
            label: 'Hours Logged',
            data: sortedDates.map(d => Math.round(dateTotals[d] * 10) / 10),
            backgroundColor: sortedDates.map(d => dateTotals[d] > 8 ? '#f43f5e' : (dateTotals[d] >= 6 ? '#10b981' : '#6366f1')),
            borderRadius: 6
          }]
        },
        options: getChartBaseOptions('Hours')
      });
    } else {
      renderSvgBarChart(ctxDaily, sortedDates.map(d => d.split('-').slice(1).join('/')), sortedDates.map(d => dateTotals[d]));
    }
  }

  // Chart 2: Client distribution
  const clientHours = {};
  empTasks.forEach(t => {
    const c = t.client || 'Internal / Unspecified';
    clientHours[c] = (clientHours[c] || 0) + (t.hours || 0);
  });
  const ctxEmpClients = document.getElementById('chart-emp-clients');
  if (ctxEmpClients) {
    if (typeof Chart !== 'undefined') {
      clearSvgFallback(ctxEmpClients);
      if (chartInstances.employeeClients) chartInstances.employeeClients.destroy();
      chartInstances.employeeClients = new Chart(ctxEmpClients, {
        type: 'doughnut',
        data: {
          labels: Object.keys(clientHours),
          datasets: [{
            data: Object.values(clientHours).map(h => Math.round(h * 10) / 10),
            backgroundColor: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'],
            borderWidth: 2,
            borderColor: '#0f172a'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 11 } } } },
          cutout: '60%'
        }
      });
    } else {
      renderSvgDonutChart(ctxEmpClients, Object.entries(clientHours));
    }
  }

  // Employee Ledger (Deduplicated Projects vs Daily Progress Logs)
  const ledgerThead = document.getElementById('emp-ledger-thead');
  const ledgerTbody = document.getElementById('emp-ledger-tbody');
  if (!ledgerTbody) return;

  if (appState.employeeViewMode === 'projects') {
    if (ledgerThead) {
      ledgerThead.innerHTML = `
        <tr>
          <th>Distinct Project</th>
          <th>Client Studio</th>
          <th>Total Hours</th>
          <th>Progress Updates</th>
          <th>Started On</th>
          <th>Delivered On</th>
          <th>Status</th>
        </tr>
      `;
    }
    ledgerTbody.innerHTML = empProjects.map(p => `
      <tr class="hover:bg-slate-800/30 transition-colors">
        <td class="py-3 px-4 font-semibold text-slate-100">${p.projectName}</td>
        <td class="py-3 px-4 text-xs text-indigo-300">${p.client}</td>
        <td class="py-3 px-4 font-mono font-bold text-cyan-400">${p.totalHours.toFixed(1)}h</td>
        <td class="py-3 px-4 text-xs text-slate-300">
          <span class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 font-mono">${p.dailyLogsCount} log${p.dailyLogsCount > 1 ? 's' : ''}</span>
        </td>
        <td class="py-3 px-4 text-xs text-slate-400 font-mono">${p.earliestStart || '-'}</td>
        <td class="py-3 px-4 text-xs text-slate-400 font-mono">${p.latestDelivered || '-'}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${p.status === 'Delivered' ? 'badge-delivered' : p.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'}">
            ${p.status}
          </span>
        </td>
      </tr>
    `).join('');
  } else {
    if (ledgerThead) {
      ledgerThead.innerHTML = `
        <tr>
          <th>Date</th>
          <th>Project / Title</th>
          <th>Client Studio</th>
          <th>Hours</th>
          <th>Started On</th>
          <th>Delivered On</th>
          <th>Status</th>
        </tr>
      `;
    }
    ledgerTbody.innerHTML = empTasks.map(t => `
      <tr class="hover:bg-slate-800/30 transition-colors">
        <td class="py-3 px-4 text-xs font-mono text-slate-400">${t.date || '-'}</td>
        <td class="py-3 px-4 font-semibold text-slate-200">${t.project}</td>
        <td class="py-3 px-4 text-slate-300 text-xs">${t.client}</td>
        <td class="py-3 px-4 font-mono font-bold text-cyan-400">${t.hours > 0 ? t.hours.toFixed(1) + 'h' : '-'}</td>
        <td class="py-3 px-4 text-xs text-slate-400">${t.started || '-'}</td>
        <td class="py-3 px-4 text-xs text-slate-400">${t.delivered || '-'}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${t.status === 'Delivered' ? 'badge-delivered' : t.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'}">
            ${t.status}
          </span>
        </td>
      </tr>
    `).join('');
  }
}

// ==========================================
// 3. TEAM COMPARISON MATRIX
// ==========================================
function renderTeamComparison() {
  const tbody = document.getElementById('comparison-table-body');
  if (!tbody) return;

  const tasks = appState.tasks;
  const metrics = appState.employees.map(emp => {
    const empTasks = tasks.filter(t => t.employee === emp);
    const empProjects = aggregateProjects(empTasks);

    const hours = empTasks.reduce((s, t) => s + (t.hours || 0), 0);
    const distinctProjectsCount = empProjects.length;
    const deliveredCount = empProjects.filter(p => p.status === 'Delivered').length;
    const inProgressCount = empProjects.filter(p => p.status === 'In Progress').length;
    const dailyLogsCount = empTasks.length;
    const days = new Set(empTasks.map(t => t.date).filter(Boolean)).size;
    const avg = days > 0 ? (hours / days).toFixed(1) : '0';
    const uniqueClients = new Set(empTasks.map(t => t.client).filter(c => c !== 'Internal / Unspecified')).size;

    return { emp, hours, distinctProjectsCount, deliveredCount, inProgressCount, dailyLogsCount, days, avg, uniqueClients };
  });

  metrics.sort((a, b) => b.hours - a.hours);

  tbody.innerHTML = metrics.map((m, rank) => `
    <tr class="hover:bg-slate-800/30 transition-colors border-b border-slate-800/50">
      <td class="py-3 px-4 font-bold text-slate-500">#${rank + 1}</td>
      <td class="py-3 px-4 font-semibold text-slate-100 flex items-center gap-2">
        <span class="avatar-badge w-7 h-7 text-xs rounded-lg">${m.emp.substring(0, 1)}</span>
        ${m.emp}
      </td>
      <td class="py-3 px-4 font-mono font-bold text-cyan-400">${m.hours.toFixed(1)} hrs</td>
      <td class="py-3 px-4 text-slate-300 font-mono">${m.days} days</td>
      <td class="py-3 px-4 font-mono font-semibold text-indigo-400">${m.avg} hrs/day</td>
      <td class="py-3 px-4 text-white font-bold">${m.distinctProjectsCount} projects</td>
      <td class="py-3 px-4 text-emerald-400 font-bold">${m.deliveredCount} completed</td>
      <td class="py-3 px-4 text-amber-400 font-mono text-xs">${m.dailyLogsCount} updates</td>
      <td class="py-3 px-4 text-purple-400 font-medium">${m.uniqueClients} studios</td>
    </tr>
  `).join('');

  const ctxComp = document.getElementById('chart-comparison-radar');
  if (ctxComp) {
    if (typeof Chart !== 'undefined') {
      clearSvgFallback(ctxComp);
      if (chartInstances.comparisonRadar) chartInstances.comparisonRadar.destroy();
      chartInstances.comparisonRadar = new Chart(ctxComp, {
        type: 'bar',
        data: {
          labels: metrics.map(m => m.emp),
          datasets: [
            {
              label: 'Total Hours',
              data: metrics.map(m => Math.round(m.hours)),
              backgroundColor: 'rgba(99, 102, 241, 0.7)',
              borderRadius: 6
            },
            {
              label: 'Unique Projects Delivered',
              data: metrics.map(m => m.deliveredCount),
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
              borderRadius: 6
            },
            {
              label: 'Distinct Projects Handled',
              data: metrics.map(m => m.distinctProjectsCount),
              backgroundColor: 'rgba(6, 182, 212, 0.7)',
              borderRadius: 6
            }
          ]
        },
        options: getChartBaseOptions('Count / Hours')
      });
    } else {
      renderSvgBarChart(ctxComp, metrics.map(m => m.emp), metrics.map(m => m.hours));
    }
  }
}

// ==========================================
// 4. CLIENT & PROJECT MATRIX
// ==========================================
function renderClientMatrix() {
  const container = document.getElementById('client-cards-grid');
  if (!container) return;

  const projects = aggregateProjects(appState.tasks);
  const clientMap = {};

  projects.forEach(p => {
    const c = p.client || 'Internal / Unspecified';
    if (!clientMap[c]) {
      clientMap[c] = {
        hours: 0,
        delivered: 0,
        inProgress: 0,
        projects: [],
        team: new Set()
      };
    }
    clientMap[c].hours += p.totalHours;
    if (p.status === 'Delivered') clientMap[c].delivered += 1;
    if (p.status === 'In Progress') clientMap[c].inProgress += 1;
    clientMap[c].projects.push(p);
    p.team.forEach(m => clientMap[c].team.add(m));
  });

  const sorted = Object.entries(clientMap).sort((a, b) => b[1].hours - a[1].hours);

  container.innerHTML = sorted.map(([client, stat]) => `
    <div class="glass-panel p-5 glass-panel-hover flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="font-bold text-lg text-slate-100">${client}</div>
          <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
            ${stat.hours.toFixed(1)} hrs
          </span>
        </div>
        <div class="text-xs text-slate-400 mb-4">
          ${stat.projects.length} distinct project${stat.projects.length > 1 ? 's' : ''} • <strong class="text-emerald-400">${stat.delivered} completed</strong> • <strong class="text-amber-400">${stat.inProgress} active</strong>
        </div>

        <div class="mb-4">
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Grouped Projects</div>
          <div class="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            ${stat.projects.map(p => `
              <span class="px-2 py-1 rounded text-[11px] bg-slate-900 border border-slate-700/60 text-slate-200 flex items-center gap-1.5" title="${p.totalHours} hrs across ${p.dailyLogsCount} progress logs">
                <span class="w-1.5 h-1.5 rounded-full ${p.status === 'Delivered' ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
                <span>${p.projectName}</span>
                <span class="text-slate-400 font-mono text-[10px]">(${p.totalHours.toFixed(1)}h)</span>
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span class="text-slate-400">Assigned Team</span>
        <div class="flex -space-x-1.5">
          ${Array.from(stat.team).map(m => `<span class="w-6 h-6 rounded-full bg-indigo-800 border border-slate-800 text-[10px] flex items-center justify-center font-bold text-indigo-100" title="${m}">${m.substring(0, 1)}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 5. MASTER WORK LOG LEDGER
// ==========================================
function toggleProjectExpansion(projId) {
  if (appState.expandedProjects.has(projId)) {
    appState.expandedProjects.delete(projId);
  } else {
    appState.expandedProjects.add(projId);
  }
  renderMasterLogs();
}

function renderMasterLogs() {
  const thead = document.getElementById('master-logs-thead');
  const tbody = document.getElementById('master-logs-tbody');
  const countBadge = document.getElementById('filtered-count-badge');
  if (!tbody) return;

  const { search, employee, client, status, page, pageSize } = appState.filters;

  if (appState.masterViewMode === 'projects') {
    const allProjects = aggregateProjects(appState.tasks);

    let filtered = allProjects.filter(p => {
      if (employee !== 'ALL' && !p.team.includes(employee)) return false;
      if (client !== 'ALL' && p.client !== client) return false;
      if (status !== 'ALL' && p.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchP = p.projectName.toLowerCase().includes(q);
        const matchC = p.client.toLowerCase().includes(q);
        const matchT = p.team.some(m => m.toLowerCase().includes(q));
        if (!matchP && !matchC && !matchT) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      let comp = 0;
      if (appState.filters.sortBy === 'hours') comp = a.totalHours - b.totalHours;
      else if (appState.filters.sortBy === 'name') comp = a.projectName.localeCompare(b.projectName);
      else if (appState.filters.sortBy === 'client') comp = a.client.localeCompare(b.client);
      else comp = a.totalHours - b.totalHours;
      return appState.filters.sortOrder === 'asc' ? comp : -comp;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} of ${allProjects.length} distinct projects`;
    }

    if (thead) {
      thead.innerHTML = `
        <tr>
          <th>Distinct Project</th>
          <th>Client Studio</th>
          <th>Total Cumulative Hours</th>
          <th>Daily Progress Updates</th>
          <th>Production Team</th>
          <th>Timeline</th>
          <th>Status</th>
          <th class="text-right">Breakdown</th>
        </tr>
      `;
    }

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const currPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (currPage - 1) * pageSize;
    const paginated = filtered.slice(startIdx, startIdx + pageSize);

    renderPaginationControls(totalPages, currPage);

    if (paginated.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-slate-500">No matching projects found.</td></tr>';
      return;
    }

    let rowsHtml = '';
    paginated.forEach(p => {
      const isExpanded = appState.expandedProjects.has(p.id);

      rowsHtml += `
        <tr class="hover:bg-slate-800/40 transition-colors border-b border-slate-800/50">
          <td class="py-3 px-4 font-bold text-slate-100 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${p.status === 'Delivered' ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
            <span>${p.projectName}</span>
          </td>
          <td class="py-3 px-4 text-xs text-indigo-300">${p.client}</td>
          <td class="py-3 px-4 font-mono font-bold text-cyan-400">${p.totalHours.toFixed(1)} hrs</td>
          <td class="py-3 px-4">
            <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-mono font-semibold">
              ${p.dailyLogsCount} daily log${p.dailyLogsCount > 1 ? 's' : ''}
            </span>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${p.team.map(m => `<span class="px-2 py-0.5 rounded text-[11px] bg-indigo-950 border border-indigo-800/60 text-indigo-200 font-semibold">${m}</span>`).join('')}
            </div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-400 font-mono">
            ${p.earliestStart || 'Start N/A'} → ${p.latestDelivered || 'In Progress'}
            ${p.tatDays ? `<span class="text-slate-500 ml-1">(${p.tatDays}d TAT)</span>` : ''}
          </td>
          <td class="py-3 px-4">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.status === 'Delivered' ? 'badge-delivered' : p.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'}">
              ${p.status}
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <button class="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-all inline-flex items-center gap-1" onclick="window.toggleProjectExpansion('${p.id}')">
              <span>${isExpanded ? 'Hide' : 'Logs'}</span>
              <svg class="w-3.5 h-3.5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </td>
        </tr>
      `;

      if (isExpanded) {
        rowsHtml += `
          <tr class="bg-slate-900/80 border-b border-indigo-900/30">
            <td colspan="8" class="p-4 pl-8">
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <div class="font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>Daily Progress Updates for <em>"${p.projectName}"</em></span>
                  <span class="text-slate-400 font-mono">${p.dailyLogs.length} updates logged</span>
                </div>
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="border-b border-slate-800 text-slate-400">
                      <th class="py-1.5 px-2">Date</th>
                      <th class="py-1.5 px-2">Employee</th>
                      <th class="py-1.5 px-2">Hours</th>
                      <th class="py-1.5 px-2">Started</th>
                      <th class="py-1.5 px-2">Delivered</th>
                      <th class="py-1.5 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${p.dailyLogs.map(l => `
                      <tr class="border-b border-slate-900 hover:bg-slate-800/40">
                        <td class="py-1.5 px-2 font-mono text-slate-400">${l.date || '-'}</td>
                        <td class="py-1.5 px-2 font-semibold text-slate-200">${l.employee}</td>
                        <td class="py-1.5 px-2 font-mono text-cyan-400 font-bold">${l.hours > 0 ? l.hours.toFixed(1) + 'h' : '-'}</td>
                        <td class="py-1.5 px-2 font-mono text-slate-400">${l.started || '-'}</td>
                        <td class="py-1.5 px-2 font-mono text-slate-400">${l.delivered || '-'}</td>
                        <td class="py-1.5 px-2"><span class="px-2 py-0.5 rounded text-[10px] ${l.status === 'Delivered' ? 'badge-delivered' : l.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'}">${l.status}</span></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        `;
      }
    });

    tbody.innerHTML = rowsHtml;

  } else {
    let filtered = appState.tasks.filter(t => {
      if (employee !== 'ALL' && t.employee !== employee) return false;
      if (client !== 'ALL' && t.client !== client) return false;
      if (status !== 'ALL' && t.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchP = t.project && t.project.toLowerCase().includes(q);
        const matchC = t.client && t.client.toLowerCase().includes(q);
        const matchE = t.employee && t.employee.toLowerCase().includes(q);
        const matchD = t.date && t.date.includes(q);
        if (!matchP && !matchC && !matchE && !matchD) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      let comp = 0;
      if (appState.filters.sortBy === 'date') comp = (a.date || '').localeCompare(b.date || '');
      else if (appState.filters.sortBy === 'hours') comp = (a.hours || 0) - (b.hours || 0);
      else if (appState.filters.sortBy === 'employee') comp = (a.employee || '').localeCompare(b.employee || '');
      else if (appState.filters.sortBy === 'client') comp = (a.client || '').localeCompare(b.client || '');
      return appState.filters.sortOrder === 'asc' ? comp : -comp;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} of ${appState.tasks.length} daily progress entries`;
    }

    if (thead) {
      thead.innerHTML = `
        <tr>
          <th>Date</th>
          <th>Employee</th>
          <th>Project / Progress Update</th>
          <th>Client Studio</th>
          <th>Hours</th>
          <th>Started On</th>
          <th>Delivered On</th>
          <th>Status</th>
        </tr>
      `;
    }

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const currPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (currPage - 1) * pageSize;
    const paginated = filtered.slice(startIdx, startIdx + pageSize);

    renderPaginationControls(totalPages, currPage);

    if (paginated.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-slate-500">No matching records found.</td></tr>';
      return;
    }

    tbody.innerHTML = paginated.map(t => `
      <tr class="hover:bg-slate-800/30 transition-colors border-b border-slate-800/40">
        <td class="py-3 px-4 font-mono text-xs text-slate-400">${t.date || '-'}</td>
        <td class="py-3 px-4 font-semibold text-slate-100 flex items-center gap-2">
          <span class="avatar-badge w-6 h-6 text-[10px] rounded-md">${t.employee.substring(0, 1)}</span>
          ${t.employee}
        </td>
        <td class="py-3 px-4 font-medium text-slate-200">${t.project}</td>
        <td class="py-3 px-4 text-xs text-indigo-300">${t.client}</td>
        <td class="py-3 px-4 font-mono font-bold text-cyan-400">${t.hours > 0 ? t.hours.toFixed(1) + 'h' : '-'}</td>
        <td class="py-3 px-4 text-xs text-slate-400 font-mono">${t.started || '-'}</td>
        <td class="py-3 px-4 text-xs text-slate-400 font-mono">${t.delivered || '-'}</td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${t.status === 'Delivered' ? 'badge-delivered' : t.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'}">
            ${t.status}
          </span>
        </td>
      </tr>
    `).join('');
  }
}

function renderPaginationControls(totalPages, currPage) {
  const container = document.getElementById('pagination-controls');
  if (!container) return;

  container.innerHTML = `
    <button class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700" ${currPage <= 1 ? 'disabled' : ''} onclick="window.changePage(${currPage - 1})">
      Previous
    </button>
    <span class="text-xs text-slate-400 font-mono">Page ${currPage} of ${totalPages}</span>
    <button class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700" ${currPage >= totalPages ? 'disabled' : ''} onclick="window.changePage(${currPage + 1})">
      Next
    </button>
  `;
}

function changePage(newPage) {
  appState.filters.page = newPage;
  renderMasterLogs();
}

// Export CSV
function exportCurrentViewCSV() {
  if (appState.masterViewMode === 'projects') {
    const projects = aggregateProjects(appState.tasks);
    const headers = ['Project Name', 'Client Studio', 'Total Cumulative Hours', 'Daily Progress Logs Count', 'Assigned Team', 'Earliest Start', 'Latest Delivery', 'Status', 'Turnaround Days'];
    const rows = projects.map(p => [
      `"${p.projectName.replace(/"/g, '""')}"`,
      `"${p.client.replace(/"/g, '""')}"`,
      p.totalHours,
      p.dailyLogsCount,
      `"${p.team.join(', ')}"`,
      p.earliestStart || '',
      p.latestDelivered || '',
      p.status,
      p.tatDays || ''
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadBlob(csvContent, `dotMKV-Deduplicated-Projects-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Exported deduplicated projects to CSV.', 'success');
  } else {
    const tasks = appState.tasks;
    const headers = ['ID', 'Employee', 'Date', 'Client', 'Project', 'Hours', 'Started On', 'Delivered On', 'Status', 'TAT Days'];
    const rows = tasks.map(t => [
      t.id,
      `"${t.employee}"`,
      t.date || '',
      `"${(t.client || '').replace(/"/g, '""')}"`,
      `"${(t.project || '').replace(/"/g, '""')}"`,
      t.hours || 0,
      t.started || '',
      t.delivered || '',
      t.status,
      t.tat_days || ''
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadBlob(csvContent, `dotMKV-Daily-Progress-Logs-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Exported daily progress logs to CSV.', 'success');
  }
}

function downloadBlob(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Chart.js Shared Default Options
function getChartBaseOptions(yTitle = 'Value') {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { size: 12 } } },
      tooltip: { backgroundColor: '#0f172a', borderColor: '#334155', borderWidth: 1, padding: 10 }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 11 } },
        title: { display: true, text: yTitle, color: '#64748b' }
      }
    }
  };
}

function renderSvgFallback(canvasEl, svgHtml) {
  if (!canvasEl || !canvasEl.parentElement) return;
  canvasEl.style.display = 'none';
  let wrapper = canvasEl.parentElement.querySelector('.svg-fallback-chart');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'svg-fallback-chart w-full h-full flex items-center justify-center';
    canvasEl.parentElement.appendChild(wrapper);
  }
  wrapper.innerHTML = svgHtml;
}

function clearSvgFallback(canvasEl) {
  if (!canvasEl) return;
  canvasEl.style.display = 'block';
  if (canvasEl.parentElement) {
    const wrapper = canvasEl.parentElement.querySelector('.svg-fallback-chart');
    if (wrapper) wrapper.remove();
  }
}

// ==========================================
// PURE SVG FALLBACK CHARTS (OFFLINE RESILIENCE)
// ==========================================
function renderSvgLineChart(container, labels, data) {
  if (!container || !data || data.length === 0) return;
  const maxVal = Math.max(...data, 10) * 1.15;
  const w = 550, h = 240;
  const pts = data.map((val, idx) => {
    const x = 45 + idx * ((w - 65) / Math.max(1, data.length - 1));
    const y = h - 35 - (val / maxVal) * (h - 60);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const svg = `
    <svg viewBox="0 0 ${w} ${h}" class="w-full h-full">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <!-- Grid lines -->
      <line x1="45" y1="${h-35}" x2="${w-20}" y2="${h-35}" stroke="#334155" stroke-width="1"/>
      <line x1="45" y1="${(h-35)/2}" x2="${w-20}" y2="${(h-35)/2}" stroke="#1e293b" stroke-width="1" stroke-dasharray="4"/>
      <!-- Area fill -->
      <polygon fill="url(#lineGrad)" points="45,${h-35} ${pts.join(' ')} ${pts[pts.length-1].split(',')[0]},${h-35}"/>
      <!-- Line -->
      <polyline fill="none" stroke="#6366f1" stroke-width="3" points="${pts.join(' ')}"/>
      <!-- Data dots -->
      ${data.map((val, idx) => {
        const [x, y] = pts[idx].split(',');
        return `<circle cx="${x}" cy="${y}" r="3.5" fill="#818cf8" stroke="#0f172a" stroke-width="2"/>
                <text x="${x}" y="${h-18}" fill="#64748b" font-size="9" text-anchor="middle" font-family="monospace">${labels[idx]}</text>`;
      }).join('')}
    </svg>
  `;
  renderSvgFallback(container, svg);
}

function renderSvgBarChart(container, labels, data) {
  if (!container || !data || data.length === 0) return;
  const maxVal = Math.max(...data, 10) * 1.15;
  const w = 550, h = 240;
  const barWidth = Math.min(36, (w - 70) / (data.length * 1.4));

  const bars = data.map((val, idx) => {
    const x = 50 + idx * ((w - 70) / data.length) + 6;
    const barHeight = (val / maxVal) * (h - 65);
    const y = h - 35 - barHeight;
    return `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="#06b6d4" opacity="0.85"/>
      <text x="${x + barWidth/2}" y="${y - 4}" fill="#38bdf8" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">${val.toFixed(0)}h</text>
      <text x="${x + barWidth/2}" y="${h - 18}" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">${labels[idx]}</text>
    `;
  }).join('');

  const svg = `
    <svg viewBox="0 0 ${w} ${h}" class="w-full h-full">
      <line x1="45" y1="${h-35}" x2="${w-20}" y2="${h-35}" stroke="#334155" stroke-width="1"/>
      ${bars}
    </svg>
  `;
  renderSvgFallback(container, svg);
}

function renderSvgDonutChart(container, items) {
  if (!container || !items || items.length === 0) return;
  const total = items.reduce((acc, curr) => acc + curr[1], 0) || 1;
  const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#64748b'];

  let cumulativeAngle = 0;
  const cx = 110, cy = 110, r = 75;

  const slices = items.map((item, idx) => {
    const sliceAngle = (item[1] / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + sliceAngle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const pathData = sliceAngle >= 359.9
      ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
      : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return `<path d="${pathData}" fill="${colors[idx % colors.length]}" stroke="#0f172a" stroke-width="2"/>`;
  }).join('');

  const legend = items.slice(0, 5).map((item, idx) => `
    <div class="flex items-center gap-1.5 text-xs text-slate-300">
      <span class="w-2.5 h-2.5 rounded-full inline-block" style="background:${colors[idx % colors.length]}"></span>
      <span class="truncate max-w-[120px]">${item[0]}: <strong>${item[1].toFixed(1)}h</strong></span>
    </div>
  `).join('');

  const html = `
    <div class="flex items-center justify-center gap-4 w-full h-full">
      <svg viewBox="0 0 220 220" class="w-44 h-44">
        ${slices}
        <circle cx="${cx}" cy="${cy}" r="50" fill="#0f172a"/>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc" font-family="monospace">${total.toFixed(0)}h</text>
        <text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="9" fill="#94a3b8">Total</text>
      </svg>
      <div class="flex flex-col gap-1.5">${legend}</div>
    </div>
  `;
  renderSvgFallback(container, html);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Attach functions to window scope for inline HTML handlers
window.selectEmployee = selectEmployee;
window.switchTab = switchTab;
window.toggleProjectExpansion = toggleProjectExpansion;
window.changePage = changePage;
window.exportCurrentViewCSV = exportCurrentViewCSV;
window.handleFileUpload = handleFileUpload;
