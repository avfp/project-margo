import { useEffect, useReducer, useState } from 'react';
import { gameReducer, initialState } from './game/reducer';
import { exportSave, importSave } from './game/utils';
import StreakHeatmap from './components/StreakHeatmap';

export default function ProjectMargo() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [xpPop, setXpPop] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('projectMargoData');
    if (saved) {
      dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projectMargoData', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.lastXpGain > 0) {
      setXpPop(`+${state.lastXpGain} XP`);
      setTimeout(() => setXpPop(null), 800);
    }
  }, [state.lastXpGain]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Project Margo</h1>

      <StreakHeatmap streaks={state.streaks} />

      {xpPop && (
        <div className="text-purple-500 animate-bounce">
          {xpPop}
        </div>
      )}

      <button
        onClick={() => exportSave(state)}
        className="px-3 py-1 bg-purple-600 text-white rounded"
      >
        Export Save
      </button>

      <input
        type="file"
        accept="application/json"
        onChange={e =>
          importSave(e.target.files[0], dispatch)
        }
      />
    </div>
  );
}
