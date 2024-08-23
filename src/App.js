import React, { useState } from 'react';
import './App.css';

function App() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [result, setResult] = useState({ hours: 0, minutes: 0, totalMinutes: 0 });
  const [error, setError] = useState('');

  const calculateDifference = () => {
    // Clear previous errors
    setError('');

    // Check if inputs are valid
    if (!startTime || !endTime) {
      setError('Both start and end times are required.');
      return;
    }

    // Convert input time strings to Date objects
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
      setError('Invalid time format.');
      return;
    }

    const start = new Date();
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    let diff = end - start;
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // Handle the case where end time is on the next day
    }

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setResult({ hours, minutes, totalMinutes });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hour Calculator</h1>
        <div>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="HH:MM"
            />
          </label>
        </div>
        <div>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="HH:MM"
            />
          </label>
        </div>
        <button onClick={calculateDifference}>Calculate</button>
        {error && <p className="error">{error}</p>}
        {result.totalMinutes > 0 && (
          <div>
            <h2>Result:</h2>
            <p>{result.hours} hours {result.minutes} minutes</p>
            <p>{result.totalMinutes} minutes</p>
            <p>{(result.totalMinutes / 60).toFixed(2)} hours</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
