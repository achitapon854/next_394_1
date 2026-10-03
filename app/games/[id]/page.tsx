import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games } from '../../data/games';

type GameDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const gameId = Number(id);
  const game = games.find((item) => item.id === gameId);

  if (!game) {
    return {
      title: 'เกมไม่พบ',
    };
  }

  return {
    title: `${game.name} | Game Backlog`,
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const gameId = Number(id);
  const game = games.find((item) => item.id === gameId);

  if (!game) {
    notFound();
  }

  return (
    <main className="gameDetailPage">
      <Link href="/games" className="backLink">
        ← กลับไปหน้ารายการเกม
      </Link>

      <article className="gameDetailCard">
        <p className="eyebrow">GAME DETAILS</p>
        <h1>{game.name}</h1>

        <dl className="gameDetailList">
          <div>
            <dt>แพลตฟอร์ม</dt>
            <dd>{game.platform}</dd>
          </div>
          <div>
            <dt>จำนวนชั่วโมง</dt>
            <dd>{game.hours} ชั่วโมง</dd>
          </div>
          <div>
            <dt>สถานะ</dt>
            <dd>{game.status}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
