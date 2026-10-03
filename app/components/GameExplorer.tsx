'use client';

import { useMemo, useState } from 'react';
import GameCard from './GameCard';
import type { Game, GameStatus } from '../types/game';

type GameExplorerProps = {
  games: Game[];
  deletePendingId: number | null;
  onEdit: (game: Game) => void;
  onDelete: (gameId: number) => void;
  onStatusChange: (gameId: number, nextStatus: GameStatus) => void;
};

const gameStatusOptions: GameStatus[] = ['ยังไม่เริ่ม', 'กำลังเล่น', 'เล่นจบแล้ว'];

export default function GameExplorer({
  games,
  deletePendingId,
  onEdit,
  onDelete,
  onStatusChange,
}: GameExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | GameStatus>('all');

  const visibleGames = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === 'all' || game.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [games, searchTerm, statusFilter]);

  const totalUnstartedHours = useMemo(
    () =>
      games
        .filter((game) => game.status === 'ยังไม่เริ่ม')
        .reduce((total, game) => total + game.hours, 0),
    [games],
  );

  return (
    <section className="gameListPanel">
      <div className="listToolbar">
        <label className="searchField" htmlFor="gameSearch">
          <span>ค้นหาชื่อเกม</span>
          <input
            id="gameSearch"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="ค้นหาจากชื่อเกม"
          />
        </label>

        <label className="filterField" htmlFor="gameStatusFilter">
          <span>ตัวกรองตามสถานะ</span>
          <select
            id="gameStatusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | GameStatus)}
          >
            <option value="all">ทั้งหมด</option>
            {gameStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="summaryRow">
        <p>
          จำนวนชั่วโมงรวมที่ยังไม่เริ่ม: <strong>{totalUnstartedHours}</strong> ชั่วโมง
        </p>
      </div>

      {visibleGames.length > 0 ? (
        <div className="gameList" aria-live="polite">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isDeletePending={deletePendingId === game.id}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <h2>ไม่พบเกม</h2>
          <p>ลองปรับคำค้นหา หรือเปลี่ยนตัวกรองสถานะเพื่อดูรายการเกมอื่น</p>
        </div>
      )}
    </section>
  );
}
