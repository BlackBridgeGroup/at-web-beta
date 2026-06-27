export interface MockJob {
  slug: string;
  hotelName: string;
  roleName: string;
  location: string;
  salary: string;
  contractType: string;
  housingProvided: boolean;
  matchScore: number;
  description?: string;
  startDate?: string;
  hoursPerWeek?: number;
  languages?: string[];
}

export const mockJobs: MockJob[] = [
  {
    slug: 'kitchen-assistant-hotel-edelweiss',
    hotelName: 'Hotel Edelweiss',
    roleName: 'Kitchen Assistant',
    location: 'Kitzbühel, Tyrol',
    salary: '€2,400 / month',
    contractType: 'Full-time',
    housingProvided: true,
    matchScore: 92,
    startDate: 'December 2025',
    hoursPerWeek: 40,
    languages: ['German', 'English'],
    description: 'Join our dynamic kitchen team at the 4-star Hotel Edelweiss in the heart of Kitzbühel. You will assist our head chef in preparing alpine cuisine for up to 120 covers per service. We operate year-round with a strong winter and summer season. Housing in a shared staff apartment is included. Transport to ski lifts is 5 minutes on foot.',
  },
  {
    slug: 'receptionist-grandhotel-zell',
    hotelName: 'Grand Hotel Zell am See',
    roleName: 'Receptionist',
    location: 'Zell am See, Salzburg',
    salary: '€2,200 / month',
    contractType: 'Full-time',
    housingProvided: true,
    matchScore: 87,
    startDate: 'November 2025',
    hoursPerWeek: 40,
    languages: ['German', 'English', 'Czech'],
    description: 'The Grand Hotel Zell am See is looking for a motivated receptionist to join our front-of-house team. You will check in guests, handle reservations via Protel, and coordinate with housekeeping. Previous hotel experience is an advantage but not required. Full in-house training provided. The hotel is a 5-minute walk from the lake and gondola.',
  },
  {
    slug: 'chef-de-partie-arlberg',
    hotelName: 'Arlberg Resort',
    roleName: 'Chef de Partie',
    location: 'St. Anton, Tyrol',
    salary: '€2,800 / month',
    contractType: 'Full-time',
    housingProvided: false,
    matchScore: 84,
    startDate: 'December 2025',
    hoursPerWeek: 45,
    languages: ['German', 'English'],
    description: 'One of the most iconic ski resorts in the Alps is seeking an experienced Chef de Partie to lead the hot kitchen station. You will oversee a section of 3–4 cooks and contribute to the development of our seasonal menu. Minimum 2 years of commercial kitchen experience required. Staff meals provided; housing assistance available through the resort.',
  },
  {
    slug: 'housekeeper-posthotel-innsbruck',
    hotelName: 'Posthotel Innsbruck',
    roleName: 'Housekeeper',
    location: 'Innsbruck, Tyrol',
    salary: '€1,900 / month',
    contractType: 'Seasonal',
    housingProvided: true,
    matchScore: 79,
    startDate: 'January 2026',
    hoursPerWeek: 38,
    languages: ['German'],
    description: 'The Posthotel Innsbruck in the city centre is looking for a diligent housekeeper for the winter season. Duties include room cleaning and preparation, linen management and laundry coordination. No prior hotel experience needed — full training in our brand standards is provided. Staff accommodation in a private room is included in the package.',
  },
  {
    slug: 'waiter-berghotel-lech',
    hotelName: 'Berghotel Lech',
    roleName: 'Waiter / Waitress',
    location: 'Lech am Arlberg, Vorarlberg',
    salary: '€2,100 / month',
    contractType: 'Seasonal',
    housingProvided: true,
    matchScore: 88,
    startDate: 'December 2025',
    hoursPerWeek: 40,
    languages: ['German', 'English'],
    description: 'Lech am Arlberg is one of Austria\'s most exclusive ski destinations. The Berghotel Lech is looking for a polished waiter or waitress to join our à la carte restaurant team for the winter season. You will serve an international, high-end clientele. Tips significantly augment the base salary. Housing in a staff chalet is included.',
  },
  {
    slug: 'sous-chef-alpinresort-obertauern',
    hotelName: 'AlpinResort Obertauern',
    roleName: 'Sous Chef',
    location: 'Obertauern, Salzburg',
    salary: '€3,000 / month',
    contractType: 'Full-time',
    housingProvided: false,
    matchScore: 81,
    startDate: 'November 2025',
    hoursPerWeek: 48,
    languages: ['German', 'English'],
    description: 'AlpinResort Obertauern is recruiting a Sous Chef to support the Executive Chef in running a busy kitchen serving 200+ covers per service across two outlets. You will be responsible for food costs, rota planning and quality control during service. Minimum 3 years experience in a similar role required. Relocation support provided.',
  },
];
