import { Band } from '../types/band';

export const bands: Band[] = [
  {
    id: 1,
    name: 'Purpeech',
    genre: 'Indie Pop',
    foundedYear: 2018,
    image: '/images/bands/1.webp',
    members: [
      { id: 1, nickname: 'เรฟ ', name: 'ศราวุฒิ สุยะเขต' ,role: 'นักร้องนำ' },
      { id: 2, nickname: 'เซ็นต์', name: 'สิทธิโชค ตาสา ', role: 'มือกีตาร์' },
      { id: 3, nickname: 'คอมพ์', name: 'ทรรศนะ เพ็ญจันทร์', role: 'มือเบส' },
      { id: 4, nickname: 'เจมส์', name: 'จักรพรรณ ธนาศุภณัฏฐ์', role: 'มือกลอง' },
      { id: 5, nickname: 'ยีนส์', name: 'ภูริช สมชื่อ', role: 'คีย์บอร์ด' },
    ],
  },
  {
    id: 2,
    name: 'Safeplanet',
    genre: 'Indie Pop',
    foundedYear: 2017,
    image: '/images/bands/2.jpg',
    members: [
      { id: 1, nickname: 'เอ', name: 'ฐิติภัทร อรรถจินดา' ,role: 'นักร้องนำ,มือกีตาร์' },
      { id: 2, nickname: 'ดอย', name: 'อภิวิชญ์ คำฟู', role: 'มือกลอง' },
    ],
  },
  {
    id: 3,
    name: 'Anatomy rabbit',
    genre: 'Rock',
    foundedYear: 2015,
    image: '/images/bands/3.jpg',
    members: [
      { id: 1, nickname: 'โอ๊ค', name: 'สุพัฒน์กิจ ถวิลการ' ,role: 'นักร้องนำ,มือกีตาร์' },
      { id: 2, nickname: 'ทัช', name: 'ณัตฐพงษ์ สุทธิวงศ์กร', role: 'มือกลอง' },
    ],
  },
];