'use client';

import { useMemo, useState } from 'react';
import BandCard from './BandCard';
import { Band } from '../types/band';

interface BandExplorerProps {
  bands: Band[];
}

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState<'name' | 'foundedYear'>('name');

  const visibleBands = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return bands
      .filter((band) => band.name.toLowerCase().includes(normalizedSearchTerm))
      .sort((firstBand, secondBand) => {
        if (sortBy === 'name') {
          return firstBand.name.localeCompare(secondBand.name);
        }

        return firstBand.foundedYear - secondBand.foundedYear;
      });
  }, [bands, searchTerm, sortBy]);

  const toggleFollow = (bandId: number) => {
    setFollowingIds((currentIds) =>
      currentIds.includes(bandId)
        ? currentIds.filter((id) => id !== bandId)
        : [...currentIds, bandId],
    );
  };

  const addLike = (bandId: number) => {
    setLikeCounts((currentCounts) => ({
      ...currentCounts,
      [bandId]: (currentCounts[bandId] ?? 0) + 1,
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('name');
  };

  return (
    <>
      <section className="bandControls" aria-label="ตัวกรองวงดนตรี">
        <label htmlFor="bandSearch">ค้นหาชื่อวงดนตรี</label>
        <input
          id="bandSearch"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="เช่น Purpeech"
        />

        <label htmlFor="bandSort">เรียงตาม</label>
        <select
          id="bandSort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as 'name' | 'foundedYear')}
        >
          <option value="name">ชื่อวง</option>
          <option value="foundedYear">ปีที่ก่อตั้ง</option>
        </select>

        <button type="button" className="clearButton" onClick={clearFilters}>
          ล้างเงื่อนไข
        </button>
        <p className="followingCount">ติดตามอยู่ {followingIds.length} วง</p>
      </section>

      {visibleBands.length > 0 ? (
        <section className="bandGrid" aria-live="polite">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followingIds.includes(band.id)}
              likeCount={likeCounts[band.id] ?? 0}
              onToggleFollow={() => toggleFollow(band.id)}
              onLike={() => addLike(band.id)}
            />
          ))}
        </section>
      ) : (
        <section className="emptyState" aria-live="polite">
          <h2>ไม่พบวงดนตรี</h2>
          <p>ลองค้นหาด้วยชื่อวงอื่น หรือล้างเงื่อนไขเพื่อดูวงทั้งหมด</p>
        </section>
      )}
    </>
  );
}
