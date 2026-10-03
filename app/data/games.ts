import type { Game } from '../types/game';

export const games: Game[] = [
  {
    id: 1,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Nintendo Switch',
    hours: 48,
    status: 'กำลังเล่น',
  },
  {
    id: 2,
    name: 'Elden Ring',
    platform: 'PC',
    hours: 112,
    status: 'เล่นจบแล้ว',
  },
  {
    id: 3,
    name: 'Cyberpunk 2077',
    platform: 'PlayStation 5',
    hours: 35,
    status: 'ยังไม่เริ่ม',
  },
  {
    id: 4,
    name: 'Hades',
    platform: 'PC',
    hours: 22,
    status: 'กำลังเล่น',
  },
  {
    id: 5,
    name: 'Stardew Valley',
    platform: 'Xbox Series X|S',
    hours: 60,
    status: 'ยังไม่เริ่ม',
  },
];
