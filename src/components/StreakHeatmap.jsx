import { getLastNDays } from '../game/utils';

export default function StreakHeatmap({ streaks }) {
  const days = getLastNDays();

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map(day => (
        <div
          key={day}
          title={day}
          className={`w-4 h-4 rounded-sm ${
            Object.values(streaks).some(s => s.lastCompleted === day)
              ? 'bg-purple-500'
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        />
      ))}
    </div>
  );
}
