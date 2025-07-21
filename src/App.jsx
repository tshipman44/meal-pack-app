import { Routes, Route } from 'react-router-dom';
import MealPackList from './components/MealPackList';
import MealPackDetail from './pages/MealPackDetail'; // We will create this next
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <Routes>
          <Route path="/" element={<MealPackList />} />
          <Route path="/mealpack/:id" element={<MealPackDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;