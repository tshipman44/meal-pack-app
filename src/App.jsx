import MealPackList from './components/MealPackList';
import './index.css'; // Make sure you're importing the tailwind styles

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <MealPackList />
      </main>
    </div>
  );
}

export default App;