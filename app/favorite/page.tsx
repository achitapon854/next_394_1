import { bands } from '../data/bands';
import BandExplorer from '../components/BandExplorer';

export default function FavoritePage() {
  return (
    <main className="favoritePage">
      <div className="favoriteIntro">
        <p className="eyebrow">FAVORITE BANDS</p>
        <h1>วงดนตรีที่ชื่นชอบ</h1>
        <p>ค้นหาและติดตามวงดนตรีที่คุณอยากรู้จัก</p>
      </div>
      <BandExplorer bands={bands} />
    </main>
  );
}