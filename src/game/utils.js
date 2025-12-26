export const todayKey = () => new Date().toISOString().slice(0, 10);

export const clamp = (n, min = 0) => Math.max(min, n);

export function levelUp(xp, level, maxXp) {
  let newXp = xp;
  let newLevel = level;
  let newMax = maxXp;

  while (newXp >= newMax) {
    newXp -= newMax;
    newLevel += 1;
    newMax = Math.floor(newMax * 1.5);
  }

  return { xp: newXp, level: newLevel, maxXp: newMax };
}

export function getLastNDays(n = 84) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function exportSave(state) {
  const blob = new Blob([JSON.stringify(state)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'project-margo-save.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importSave(file, dispatch) {
  const reader = new FileReader();
  reader.onload = e => {
    dispatch({ type: 'LOAD', payload: JSON.parse(e.target.result) });
  };
  reader.readAsText(file);
}
