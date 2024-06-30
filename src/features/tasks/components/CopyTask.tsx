import { IconButton } from '@components/inputs/buttons';
import { Tooltip } from '@components/overlays';

import CopyIcon from '../../../assets/icons/copy.svg?react';

type CopyTaskProps = {
  taskText: string;
};

export const CopyTask = ({ taskText }: CopyTaskProps) => {
  const handleCopyTask = (showTooltip: () => void) => {
    return () => {
      navigator.clipboard
        .writeText(taskText)
        .then(() => showTooltip())
        .catch((error) => {
          console.error('copy failed: ' + error);
          window.alert(
            'Copying task to clipboard failed. Please try again!'
          );
        });
    };
  };

  return (
    <Tooltip label="Copied" showOn="click" showFor={1500}>
      {({ showTooltip }) => {
        return (
          <IconButton onClick={handleCopyTask(showTooltip)}>
            <CopyIcon className="icon-rg" />
          </IconButton>
        );
      }}
    </Tooltip>
  );
};
