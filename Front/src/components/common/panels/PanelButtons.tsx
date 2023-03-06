import React, { MouseEvent } from 'react';
import { Modes } from './DropdownPanel';

import { ReactComponent as AddIco } from 'assets/icons/add-circle.svg';
import { ReactComponent as SaveIco } from 'assets/icons/save.svg';
import { ReactComponent as EditIco } from 'assets/icons/edit.svg';
import { ReactComponent as DeleteIco } from 'assets/icons/delete.svg';
import { ReactComponent as CancelIco } from 'assets/icons/status/unverified.svg';

interface Props {
  canAdd?: boolean;
  canEdit?: boolean;
  canSave?: boolean;
  hasChanged?: boolean;
  editable?: boolean;
  selectedMode: Modes;
  onSubmit?: () => void;
  onClear?: () => void;
  setMode: (mode: Modes) => void;
}

const StyledIcon = ({ Icon }: { Icon: typeof AddIco }) => <Icon className='h-5 w-6 opacity-60 hover:opacity-80' />;

const PanelButtons = ({
  canAdd,
  canEdit,
  canSave,
  hasChanged,
  editable,
  selectedMode,
  onClear,
  onSubmit,
  setMode,
}: Props) => {
  const showAdd = editable && canAdd && selectedMode === Modes.View;
  const showEdit = editable && canEdit && selectedMode === Modes.View;
  const showSave = canSave && (hasChanged || selectedMode === Modes.Edit);
  const showDelete = editable && canEdit && selectedMode === Modes.Edit;
  const showCancel = selectedMode === Modes.Edit;

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    setMode(Modes.Edit);
  };

  const handleSave = () => {
    setMode(Modes.View);

    if (onSubmit) {
      onSubmit();
    }
  };

  const handleCancel = () => {
    setMode(Modes.View);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='flex gap-x-2 px-18'
    >
      {showAdd && (
        <button onClick={handleEdit} title='dodaj'>
          <StyledIcon Icon={AddIco} />
        </button>
      )}
      {showEdit && (
        <button onClick={handleEdit} title='edytuj'>
          <StyledIcon Icon={EditIco} />
        </button>
      )}
      {showSave && (
        <button onClick={handleSave} title='zapisz'>
          <StyledIcon Icon={SaveIco} />
        </button>
      )}
      {showDelete && (
        <button title='usuń' onClick={onClear}>
          <StyledIcon Icon={DeleteIco} />
        </button>
      )}
      {showCancel && (
        <button onClick={handleCancel} title='anuluj'>
          <CancelIco />
        </button>
      )}
    </div>
  );
};

export default PanelButtons;
