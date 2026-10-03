'use client';

import { useState } from 'react';
import { games as initialGames } from '../data/games';
import GameExplorer from './GameExplorer';
import type { Game, GameStatus } from '../types/game';

const gamePlatforms = ['PC', 'PlayStation 5', 'Xbox Series X|S', 'Nintendo Switch', 'Mobile'];
const gameStatusOptions: GameStatus[] = ['ยังไม่เริ่ม', 'กำลังเล่น', 'เล่นจบแล้ว'];

type GameFormState = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

const emptyFormState: GameFormState = {
  name: '',
  platform: '',
  hours: '',
  status: 'ยังไม่เริ่ม',
};

export default function GameForm() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [formData, setFormData] = useState<GameFormState>(emptyFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof GameFormState, string>>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData(emptyFormState);
    setEditingId(null);
    setErrors({});
    setDeletePendingId(null);
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof GameFormState, string>> = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'กรุณากรอกชื่อเกม';
    }

    if (!formData.platform.trim()) {
      nextErrors.platform = 'กรุณาเลือกแพลตฟอร์ม';
    }

    const hoursValue = Number(formData.hours);
    if (!Number.isInteger(hoursValue) || hoursValue <= 0) {
      nextErrors.hours = 'จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange = (field: keyof GameFormState, value: string) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const nextGame: Omit<Game, 'id'> = {
      name: formData.name.trim(),
      platform: formData.platform,
      hours: Number(formData.hours),
      status: formData.status,
    };

    if (editingId !== null) {
      setGames((currentGames) =>
        currentGames.map((game) =>
          game.id === editingId
            ? {
                ...game,
                ...nextGame,
              }
            : game,
        ),
      );
    } else {
      const nextId = games.reduce((maximumId, game) => Math.max(maximumId, game.id), 0) + 1;

      setGames((currentGames) => [{ id: nextId, ...nextGame }, ...currentGames]);
    }

    resetForm();
  };

  const handleEdit = (game: Game) => {
    setEditingId(game.id);
    setFormData({
      name: game.name,
      platform: game.platform,
      hours: String(game.hours),
      status: game.status,
    });
    setErrors({});
    setDeletePendingId(null);
  };

  const handleDelete = (gameId: number) => {
    if (deletePendingId === gameId) {
      setGames((currentGames) => currentGames.filter((game) => game.id !== gameId));
      setDeletePendingId(null);
      if (editingId === gameId) {
        resetForm();
      }
      return;
    }

    setDeletePendingId(gameId);
  };

  const handleStatusChange = (gameId: number, nextStatus: GameStatus) => {
    setGames((currentGames) =>
      currentGames.map((game) =>
        game.id === gameId
          ? {
              ...game,
              status: nextStatus,
            }
          : game,
      ),
    );
  };

  return (
    <main className="gamesPage">
      <section className="gamesHeader">
        <p className="eyebrow">GAME BACKLOG</p>
        <h1>รายการเกมที่ตั้งใจจะเล่น</h1>
        <p>บันทึกเกมที่คุณอยากเล่น พร้อมติดตามสถานะและจำนวนชั่วโมงที่คาดว่าจะใช้</p>
      </section>

      <section className="gamesLayout">
        <aside className="gameFormPanel">
          <h2>{editingId !== null ? 'แก้ไขข้อมูลเกม' : 'เพิ่มเกมใหม่'}</h2>

          <form className="gameForm" onSubmit={handleSubmit}>
            <div className="fieldGroup">
              <label htmlFor="gameName">ชื่อเกม</label>
              <input
                id="gameName"
                type="text"
                value={formData.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                placeholder="เช่น Elden Ring"
              />
              {errors.name && <p className="errorText">{errors.name}</p>}
            </div>

            <div className="fieldGroup">
              <label htmlFor="gamePlatform">แพลตฟอร์ม</label>
              <select
                id="gamePlatform"
                value={formData.platform}
                onChange={(event) => handleFieldChange('platform', event.target.value)}
              >
                <option value="">เลือกแพลตฟอร์ม</option>
                {gamePlatforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              {errors.platform && <p className="errorText">{errors.platform}</p>}
            </div>

            <div className="fieldGroup">
              <label htmlFor="gameHours">จำนวนชั่วโมงที่คาดว่าจะใช้เล่น</label>
              <input
                id="gameHours"
                type="number"
                min="1"
                step="1"
                value={formData.hours}
                onChange={(event) => handleFieldChange('hours', event.target.value)}
                placeholder="เช่น 30"
              />
              {errors.hours && <p className="errorText">{errors.hours}</p>}
            </div>

            <div className="fieldGroup">
              <label htmlFor="gameStatus">สถานะ</label>
              <select
                id="gameStatus"
                value={formData.status}
                onChange={(event) => handleFieldChange('status', event.target.value as GameStatus)}
              >
                {gameStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="formActions">
              <button type="submit" className="primaryButton">
                {editingId !== null ? 'บันทึกการแก้ไข' : 'เพิ่มเกม'}
              </button>
              {editingId !== null && (
                <button type="button" className="secondaryButton" onClick={resetForm}>
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </aside>

        <GameExplorer
          games={games}
          deletePendingId={deletePendingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </section>
    </main>
  );
}