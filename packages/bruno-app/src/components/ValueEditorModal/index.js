import React, { useState } from 'react';
import Modal from 'components/Modal/index';
import CodeEditor from 'components/CodeEditor/index';
import { useTheme } from 'providers/Theme';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import StyledWrapper from './StyledWrapper';

const ValueEditorModal = ({ value, title, collection, item, onSave, onClose }) => {
  const { displayedTheme } = useTheme();
  const preferences = useSelector((state) => state.app.preferences);
  const [currentValue, setCurrentValue] = useState(value || '');

  const handleConfirm = () => {
    onSave(currentValue);
    onClose();
  };

  return (
    <Modal
      size="lg"
      title={title || 'Edit Value'}
      handleCancel={onClose}
      handleConfirm={handleConfirm}
      confirmText="Save"
      disableEscapeKey={true}
      dataTestId="value-editor-modal"
    >
      <StyledWrapper>
        <div className="editor-container">
          <CodeEditor
            collection={collection}
            item={item}
            theme={displayedTheme}
            font={get(preferences, 'font.codeFont', 'default')}
            fontSize={get(preferences, 'font.codeFontSize')}
            value={currentValue}
            onEdit={(val) => setCurrentValue(val)}
            mode="application/ld+json"
            enableVariableHighlighting={true}
          />
        </div>
      </StyledWrapper>
    </Modal>
  );
};

export default ValueEditorModal;
