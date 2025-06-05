import React, { useState } from "react";
import DayTabs from "./components/DayTabs";
import RoutineDisplay from "./components/RoutineDisplay";
import routineData from "./data/routineData";
import './App.css';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [data, setData] = useState(routineData);

  const handleAddRoutine = (day, newRoutine) => {
    setData((prevData) => ({
      ...prevData,
      [day]: [...(prevData[day] || []), newRoutine],
    }));
  };

  const handleDeleteRoutine = (day, indexToDelete) => {
    setData((prevData) => ({
      ...prevData,
      [day]: prevData[day].filter((_, index) => index !== indexToDelete),
    }));
  };

  return (
    <div className="App">
      {!selectedDay ? (
        <>
          <h1 className="gradient-text">Select a Day to See Your Routine</h1>
          <DayTabs selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        </>
      ) : (
        <RoutineDisplay
          day={selectedDay}
            routine={data[selectedDay]}
          onAdd={(routine) => handleAddRoutine(selectedDay, routine)}
            onDelete={(index) => handleDeleteRoutine(selectedDay, index)}
         onBack={() => setSelectedDay(null)}  // ✅ Renamed from goBack to onBack
/>

      )}
    </div>
  );
}

export default App;
