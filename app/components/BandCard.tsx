import Image from 'next/image';
import { Band } from '../types/band';

interface BandCardProps {
  band: Band;
  isFollowing: boolean;
  likeCount: number;
  onToggleFollow: () => void;
  onLike: () => void;
}

export default function BandCard({
  band,
  isFollowing,
  likeCount,
  onToggleFollow,
  onLike,
}: BandCardProps) {
  return (
    <article className="bandCard">
      <Image
        src={band.image}
        alt={band.name}
        width={300}
        height={280}
        className="bandImage"
      />
      <div className="bandCardContent">
        <div className="bandCardHeading">
          <div>
            <h2>{band.name}</h2>
            <p>แนวเพลง: {band.genre} | ก่อตั้งปี: {band.foundedYear}</p>
          </div>
          <button
            type="button"
            className={isFollowing ? 'followButton following' : 'followButton'}
            onClick={onToggleFollow}
            aria-pressed={isFollowing}
          >
            {isFollowing ? 'เลิกติดตาม' : 'ติดตาม'}
          </button>
        </div>

        <h3>สมาชิก</h3>
        <ul>
          {band.members.map((member) => (
            <li key={member.id}>
              {member.name} ({member.nickname}) - {member.role}
            </li>
          ))}
        </ul>

        <button type="button" className="likeButton" onClick={onLike}>
          Like ({likeCount})
        </button>
      </div>
    </article>
  );
}