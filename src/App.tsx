import { useState } from 'react';
import ChecklistScreen from './components/ChecklistScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'checklist' | 'results'>('checklist');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSubmitChecklist = (selected: number[]) => {
    setSelectedItems(selected);
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="journey-refresh min-h-screen font-sans">
      {currentScreen === 'checklist' && (
        <ChecklistScreen
          initialSelected={selectedItems}
          onSubmit={handleSubmitChecklist}
        />
      )}
      {currentScreen === 'results' && (
        <ResultsScreen
          selectedItems={selectedItems}
          onRestart={() => {
            setCurrentScreen('checklist');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}

export default App;
