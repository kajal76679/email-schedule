import React, { useState, useEffect } from 'react';
import ScheduleUpdate from './ScheduleUpdate';

interface Schedule {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string[];
  time: string;
}

interface ScheduleListProps {
  schedules: Schedule[];
  onEditSchedule: (index: number) => void;
  onDeleteSchedule: (index: number) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, onEditSchedule, onDeleteSchedule }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedScheduleIndex, setEditedScheduleIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  const handleEditClick = (index: number) => {
    setEditedScheduleIndex(index);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    onDeleteSchedule(index);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditedScheduleIndex(null);
  };

  return (
    <div className="schedule-list">
      <div className="schedule-items">
        <p>Title</p>
        <p>Description</p>
        <p>Subject</p>
        <p>Schedule</p>
        <p>Actions</p>
      </div>
      <hr />
      {schedules.map((schedule, index) => (
        <div key={index} className="schedule-item">
          <p>{schedule.title}</p>
          <p>{schedule.description}</p>
          <p>{schedule.subject}</p>
          <p>{schedule.frequency === 'Weekly' ? `Weekly at ${schedule.time}` : `Monthly on ${schedule.repeat}`}</p>
          <p>
            <i className="fa fa-pencil" aria-hidden="true" onClick={() => handleEditClick(index)}></i>
            <i className="fa fa-trash" aria-hidden="true" onClick={() => handleDeleteClick(index)}></i>
          </p>
        </div>
      ))}
      <hr />

      {isEditModalOpen && editedScheduleIndex !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <ScheduleUpdate
              onClose={handleCloseEditModal}
              editedSchedule={schedules[editedScheduleIndex]}
              onUpdateSchedule={(updatedSchedule) => {
                console.log('Updated Schedule:', updatedSchedule);
                handleCloseEditModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
