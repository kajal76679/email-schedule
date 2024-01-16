import React, { useState, useEffect } from 'react';

interface Schedule {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string[];
  time: string;
}

interface ScheduleFormProps {
  onClose: () => void;
  onAddSchedule?: (newSchedule: Schedule) => void;
  onUpdateSchedule?: (updatedSchedule: Schedule) => void;
  editedSchedule?: Schedule;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ onClose, onAddSchedule, onUpdateSchedule, editedSchedule }) => {
  const [title, setTitle] = useState(editedSchedule?.title || '');
  const [description, setDescription] = useState(editedSchedule?.description || '');
  const [subject, setSubject] = useState(editedSchedule?.subject || '');
  const [frequency, setFrequency] = useState(editedSchedule?.frequency || 'Weekly');
  const [repeat, setRepeat] = useState<string[]>(editedSchedule?.repeat || []);
  const [time, setTime] = useState(editedSchedule?.time || '');

  useEffect(() => {
    if (editedSchedule) {
      setTitle(editedSchedule.title || '');
      setDescription(editedSchedule.description || '');
      setSubject(editedSchedule.subject || '');
      setFrequency(editedSchedule.frequency || 'Weekly');
      setRepeat(editedSchedule.repeat || []);
      setTime(editedSchedule.time || '');
    }
  }, [editedSchedule]);

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

  const handleDoneClick = () => {
    const newSchedule: Schedule = {
      title,
      description,
      subject,
      frequency,
      repeat,
      time,
    };

    if (onAddSchedule) {
      onAddSchedule(newSchedule);
    } else if (onUpdateSchedule) {
      onUpdateSchedule(newSchedule);
    }

    setTitle('');
    setDescription('');
    setSubject('');
    setFrequency('Weekly');
    setRepeat([]);
    setTime('');
    onClose();
  };

  const handleCancelClick = () => {
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
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
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
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="10:00AM">10:00AM</option>
          <option value="11:00AM">11:00AM</option>
          <option value="12:00AM">12:00AM</option>
        </select>
      </div>
      <div className="button-section">
        <button onClick={handleCancelClick}>Cancel</button>
        <button onClick={handleDoneClick}>Done</button>
      </div>
    </div>
  );
};

export default ScheduleForm;
