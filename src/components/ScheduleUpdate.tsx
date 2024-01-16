import React, { useState } from 'react';

interface Schedule {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string[];
  time: string;
}

interface ScheduleUpdateProps {
    onClose: () => void;
    editedSchedule: Schedule;
    onUpdateSchedule: (updatedSchedule: Schedule) => void;
  }
  

  const ScheduleUpdate: React.FC<ScheduleUpdateProps> = ({ onClose, editedSchedule, onUpdateSchedule }) => {
  const [title, setTitle] = useState(editedSchedule?.title || '');
  const [description, setDescription] = useState(editedSchedule?.description || '');
  const [subject, setSubject] = useState(editedSchedule?.subject || '');
  const [frequency, setFrequency] = useState(editedSchedule?.frequency || 'Weekly');
  const [repeat, setRepeat] = useState<string[]>(editedSchedule?.repeat || []);
  const [time, setTime] = useState(editedSchedule?.time || '');

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFrequency = event.target.value;
    setFrequency(selectedFrequency);

    if (selectedFrequency !== 'Weekly') {
      setRepeat([]);
    }
  };

  const handleRepeatChange = (day: string) => {
    const updatedRepeat = [...repeat];
    const index = updatedRepeat.indexOf(day);

    if (index === -1) {
      updatedRepeat.push(day);
    } else {
      updatedRepeat.splice(index, 1);
    }

    setRepeat(updatedRepeat);
  };

  const handleUpdateClick = () => {
    const updatedSchedule: Schedule = {
      title,
      description,
      subject,
      frequency,
      repeat,
      time,
    };

    onUpdateSchedule(updatedSchedule);
  };

  const handleDoneClick = () => {
    setTitle('');
    setDescription('');
    setSubject('');
    setFrequency('Weekly');
    setRepeat([]);
    setTime('');
    onClose();
  };


  return (
    <div className="schedule-form">
      <h3>Add Schedule</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="frequency">Frequency</label>
        <select value={frequency} onChange={handleFrequencyChange}>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Daily">Daily</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="repeat">Repeat</label>
        {frequency === 'Monthly' && (
          <select value={frequency} onChange={handleFrequencyChange}>
            <option value="Monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
          </select>
        )}
        {frequency === 'Weekly' && (
          <div>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <label key={day} className="day-checkbox">
                <input
                  type='radio'
                  checked={repeat.includes(day)}
                  onChange={() => handleRepeatChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <select value={time} onChange={handleFrequencyChange}>
          <option value="Weekly">10:00AM</option>
          <option value="Monthly">11:00AM</option>
          <option value="Daily">12:00AM</option>
        </select>
      </div>
      <div className="button-section">
        <button onClick={handleDoneClick}>Cancel</button>
        <button onClick={handleUpdateClick} className="update">
          Update
        </button>
      </div>
    </div>
  );
};

export default ScheduleUpdate;
