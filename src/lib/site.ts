export const site = {
  name: "Heaven Furniture Mart",
  shortName: "Heaven",
  tagline: "Designed. Crafted. Customized.",
  category: "Bespoke Furniture & Interior Styling",
  city: "Chattogram",
  founded: 2020,
  founder: "Abul Kalam Bhuiyan",
  founderTitle: "Managing Director",
  address: {
    landmark: "Opposite RAK Ceramics",
    street: "Agrabad Access Road",
    city: "Chattogram",
    country: "Bangladesh",
  },
  phone: {
    display: "+880 1960-481983",
    e164: "+8801960481983",
    whatsapp: "8801960481983",
  },
  email: "heavenfurnituremart@gmail.com",
  socials: [
    { name: "Facebook", handle: "HeavenFurnitureMart", href: "https://facebook.com/HeavenFurnitureMart" },
    { name: "Instagram", handle: "heaven_furniture_ltd", href: "https://instagram.com/heaven_furniture_ltd" },
    { name: "YouTube", handle: "HeavenFurnitureMart", href: "https://youtube.com/@HeavenFurnitureMart" },
  ],
  whatsappMessage:
    "Hello Heaven Furniture Mart, I'd like to book a free design consultation.",
} as const;

export const whatsappHref = `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const nav = [
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "Showroom", href: "#showroom" },
] as const;

export const trustPoints = [
  {
    title: "Free design consultation",
    body: "Sit with our designers, share your space and taste, and leave with a plan — no charge, no pressure.",
  },
  {
    title: "Fully bespoke",
    body: "Every piece is built to your room, your dimensions and your finish — never pulled off a shelf.",
  },
  {
    title: "Premium wood & materials",
    body: "Seasoned solid timber, hand-carved details and upholstery finished by skilled in-house craftsmen.",
  },
  {
    title: "A showroom you can walk through",
    body: "See, sit and touch full collections at our large showroom on Agrabad Access Road, Chattogram.",
  },
  {
    title: "Delivery & installation included",
    body: "We deliver, assemble and place every piece in your home — the price you see is the price you pay.",
  },
  {
    title: "Easy payment options",
    body: "Flexible plans so a well-made piece fits your budget as neatly as it fits your room.",
  },
] as const;

export const collections = [
  {
    id: "living",
    name: "Living Room",
    items: "Sofas · Coffee tables · TV units · Consoles",
    blurb: "Sofas and seating shaped around how your family actually lives.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    items: "Beds · Wardrobes · Dressing tables · Bedsides",
    blurb: "Calm, tailored bedrooms with storage that disappears into the design.",
  },
  {
    id: "dining",
    name: "Dining",
    items: "Dining tables · Chairs · Cabinets",
    blurb: "Marble, solid wood and carved detail for the table everyone gathers around.",
  },
  {
    id: "office",
    name: "Office & Study",
    items: "Executive tables · Bookshelves · Workstations",
    blurb: "Refined workspaces for homes and offices that mean business.",
  },
] as const;

export const bespokeSteps = [
  {
    step: "01",
    title: "Consult",
    body: "Tell us about the room, the people and the mood. We measure, listen and sketch — free of charge.",
  },
  {
    step: "02",
    title: "Design",
    body: "Choose timber, fabric, finish and proportion. You approve the design before a single cut is made.",
  },
  {
    step: "03",
    title: "Craft & install",
    body: "Our in-house craftsmen build your piece, then deliver and install it in your home.",
  },
] as const;

export const quote = {
  text: "At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.",
  author: site.founder,
  role: site.founderTitle,
} as const;

export const milestones = [
  { year: "2020", label: "Founded in Chattogram by Abul Kalam Bhuiyan" },
  { year: "2021", label: "Opened the Agrabad showroom" },
  { year: "2024", label: "Exhibited at the International Furniture Fair, Chattogram" },
  { year: "2025", label: "Member of the Chamber of Commerce" },
  { year: "2026", label: "Nationwide BFIOA recognition" },
] as const;
