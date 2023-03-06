import { useState } from 'react';
import { DragStatus } from '../components/common/inputs/inputTypes';

export const useDragAndDrop = () => {
  const [dragStatus, setDragStatus] = useState(DragStatus.none);

  const onDragEnter = () => {
    setDragStatus(DragStatus.over);
  };

  const onDragLeave = () => {
    setDragStatus(DragStatus.none);
  };

  const onDrop = () => {
    setDragStatus(DragStatus.none);
  };

  return { dragStatus, onDragEnter, onDragLeave, onDrop };
};
