import React, { useState, useEffect } from 'react';
import './app.css';
import ScheduleList from './components/ScheduleList';
import ScheduleForm from './components/ScheduleForm';

interface Schedule {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string[];
  time: string;
}

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const storedSchedules = localStorage.getItem('schedules');
    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
    }
  }, []);

  const saveSchedulesToLocalStorage = (updatedSchedules: Schedule[]) => {
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
  };
  

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddSchedule = (newSchedule: Schedule) => {
    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    saveSchedulesToLocalStorage(updatedSchedules);
    setShowForm(false);
  };
  
  const handleEditSchedule = (index: number) => {
    console.log('Editing schedule at index:', index);
  };

  const handleDeleteSchedule = (index: number) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
    saveSchedulesToLocalStorage(updatedSchedules);
  };

  return (
    <div className="app">
      <div className="upper-section"></div>
      <div className="main-section">
        <div className="rightnav-mini">
          <div className="leftnav-mini"></div>
        </div>
        <div className='button'>
          <div className='search'>
            <input type="text" placeholder='Search' /><i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <div className="add" onClick={handleAddClick}><i className="fa fa-plus" aria-hidden="true"></i>Add</div>
        </div>
      </div>
      <ScheduleList
        schedules={schedules}
        onEditSchedule={handleEditSchedule}
        onDeleteSchedule={handleDeleteSchedule}
      />
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <ScheduleForm onClose={handleCloseForm} onAddSchedule={handleAddSchedule} />
          </div>
        </div>
      )}
      <div className="footer"></div>
    </div>
  );
};

export default App;
