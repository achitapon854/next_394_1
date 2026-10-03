import Link from 'next/link';
import type { Game, GameStatus } from '../types/game';

type GameCardProps = {
  game: Game;
  isDeletePending: boolean;
  onEdit: (game: Game) => void;
  onDelete: (gameId: number) => void;
  onStatusChange: (gameId: number, nextStatus: GameStatus) => void;
};

const gameStatusOptions: GameStatus[] = ['ยังไม่เริ่ม', 'กำลังเล่น', 'เล่นจบแล้ว'];

export default function GameCard({
  game,
  isDeletePending,
  onEdit,
  onDelete,
  onStatusChange,
}: GameCardProps) {
  return (
    <article className="gameCard">
      <div className="gameCardHeader">
        <div>
          <span className={`statusBadge statusBadge--${game.status}`}>{game.status}</span>
          <Link href={`/games/${game.id}`} className="gameTitleLink">
            <h3>{game.name}</h3>
          </Link>
        </div>

        <div className="actionGroup">
          <button type="button" className="smallButton" onClick={() => onEdit(game)}>
            แก้ไข
          </button>
          <button
            type="button"
            className={isDeletePending ? 'smallButton dangerButton' : 'smallButton'}
            onClick={() => onDelete(game.id)}
          >
            {isDeletePending ? 'ยืนยันลบ' : 'ลบ'}
          </button>
        </div>
      </div>

      <dl className="gameDetails">
        <div>
          <dt>แพลตฟอร์ม</dt>
          <dd>{game.platform}</dd>
        </div>
        <div>
          <dt>ชั่วโมง</dt>
          <dd>{game.hours} ชั่วโมง</dd>
        </div>
        <div>
          <dt>สถานะ</dt>
          <dd>{game.status}</dd>
        </div>
      </dl>

      <div className="statusControl">
        <label htmlFor={`status-${game.id}`}>เปลี่ยนสถานะ</label>
        <select
          id={`status-${game.id}`}
          value={game.status}
          onChange={(event) => onStatusChange(game.id, event.target.value as GameStatus)}
        >
          {gameStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
