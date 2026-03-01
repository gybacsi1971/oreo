import React, { useState, useCallback } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useTheme } from 'providers/Theme';
import { IconMaximize } from '@tabler/icons';
import {
  moveFormUrlEncodedParam,
  setFormUrlEncodedParams
} from 'providers/ReduxStore/slices/collections';
import MultiLineEditor from 'components/MultiLineEditor';
import ValueEditorModal from 'components/ValueEditorModal';
import { sendRequest, saveRequest } from 'providers/ReduxStore/slices/collections/actions';
import EditableTable from 'components/EditableTable';
import StyledWrapper from './StyledWrapper';

const FormUrlEncodedParams = ({ item, collection }) => {
  const dispatch = useDispatch();
  const { storedTheme } = useTheme();
  const [expandedRow, setExpandedRow] = useState(null);
  const params = item.draft ? get(item, 'draft.request.body.formUrlEncoded') : get(item, 'request.body.formUrlEncoded');

  const onSave = () => dispatch(saveRequest(item.uid, collection.uid));
  const handleRun = () => dispatch(sendRequest(item, collection.uid));

  const handleParamsChange = useCallback((updatedParams) => {
    dispatch(setFormUrlEncodedParams({
      collectionUid: collection.uid,
      itemUid: item.uid,
      params: updatedParams
    }));
  }, [dispatch, collection.uid, item.uid]);

  const handleParamDrag = useCallback(({ updateReorderedItem }) => {
    dispatch(moveFormUrlEncodedParam({
      collectionUid: collection.uid,
      itemUid: item.uid,
      updateReorderedItem
    }));
  }, [dispatch, collection.uid, item.uid]);

  const columns = [
    {
      key: 'name',
      name: 'Key',
      isKeyField: true,
      placeholder: 'Key',
      width: '30%'
    },
    {
      key: 'value',
      name: 'Value',
      placeholder: 'Value',
      render: ({ row, value, onChange, isLastEmptyRow }) => (
        <div className="relative value-cell w-full">
          <MultiLineEditor
            value={value || ''}
            theme={storedTheme}
            onSave={onSave}
            onChange={onChange}
            allowNewlines={true}
            onRun={handleRun}
            collection={collection}
            item={item}
            placeholder={!value ? 'Value' : ''}
          />
          {!isLastEmptyRow && (
            <button
              className="expand-btn"
              onClick={() => setExpandedRow(row)}
              title="Expand editor"
            >
              <IconMaximize size={14} />
            </button>
          )}
        </div>
      )
    }
  ];

  const defaultRow = {
    name: '',
    value: '',
    description: ''
  };

  return (
    <StyledWrapper className="w-full">
      <EditableTable
        columns={columns}
        rows={params || []}
        onChange={handleParamsChange}
        defaultRow={defaultRow}
        reorderable={true}
        onReorder={handleParamDrag}
      />
      {expandedRow && (
        <ValueEditorModal
          value={(params || []).find((p) => p.uid === expandedRow.uid)?.value || ''}
          title={`Edit Value: ${expandedRow.name || 'Untitled'}`}
          collection={collection}
          item={item}
          onSave={(newValue) => {
            const updatedParams = (params || []).map((p) => {
              if (p.uid === expandedRow.uid) {
                return { ...p, value: newValue };
              }
              return p;
            });
            handleParamsChange(updatedParams);
          }}
          onClose={() => setExpandedRow(null)}
        />
      )}
    </StyledWrapper>
  );
};

export default FormUrlEncodedParams;
