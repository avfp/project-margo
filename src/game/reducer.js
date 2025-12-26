import { todayKey, levelUp } from './utils';

export const initialState = {
  paths: {
    scholar: { level: 1, xp: 0, maxXp: 100 },
    author: { level: 1, xp: 0, maxXp: 100 },
    leader: { level: 1, xp: 0, maxXp: 100 },
    vessel: { level: 1, xp: 0, maxXp: 100 },
  },
  dailyHabits: [],
  completedToday: [],
  streaks: {},
  achievements: [],
  totalXP: 0,
  lastVisit: todayKey(),
  lastXpGain: 0,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...action.payload };

    case 'NEW_DAY':
      if (state.lastVisit === todayKey()) return state;
      return {
        ...state,
        completedToday: [],
        lastVisit: todayKey(),
      };

    case 'ADD_HABIT': {
      const habit = { ...action.habit, id: crypto.randomUUID() };
      return {
        ...state,
        dailyHabits: [...state.dailyHabits, habit],
        streaks: {
          ...state.streaks,
          [habit.id]: { count: 0, lastCompleted: null },
        },
      };
    }

    case 'TOGGLE_HABIT': {
      const habit = action.habit;
      if (state.completedToday.includes(habit.id)) return state;

      const today = todayKey();
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);

      const prev = state.streaks[habit.id] || {
        count: 0,
        lastCompleted: null,
      };

      const count =
        prev.lastCompleted === yesterday ? prev.count + 1 : 1;

      const gainedXP = 10 + Math.floor(count / 7) * 10;
      const path = state.paths[habit.pathKey];
      const leveled = levelUp(
        path.xp + gainedXP,
        path.level,
        path.maxXp
      );

      return {
        ...state,
        completedToday: [...state.completedToday, habit.id],
        streaks: {
          ...state.streaks,
          [habit.id]: { count, lastCompleted: today },
        },
        paths: {
          ...state.paths,
          [habit.pathKey]: { ...path, ...leveled },
        },
        totalXP: state.totalXP + gainedXP,
        lastXpGain: gainedXP,
      };
    }

    default:
      return state;
  }
}
