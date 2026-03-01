import React, { useState, useCallback, useEffect } from 'react';
import { get } from 'lodash';
import Modal from 'components/Modal/index';
import { parseBatchData, validateBatchDataKeys } from 'utils/common/parseBatchData';
import StyledWrapper from './StyledWrapper';

const MAX_PREVIEW_ROWS = 5;

const BatchDataModal = ({ collection, onConfirm, onCancel }) => {
  const [inputMode, setInputMode] = useState('paste');
  const [rawText, setRawText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const collectionVarNames = get(collection, 'root.request.vars.req', [])
    .filter((v) => v.enabled)
    .map((v) => v.name)
    .filter(Boolean);

  const handleParse = useCallback((text) => {
    if (!text || !text.trim()) {
      setParsedData(null);
      setParseError(null);
      setValidationResult(null);
      return;
    }

    try {
      const data = parseBatchData(text);
      setParsedData(data);
      setParseError(null);
      setValidationResult(validateBatchDataKeys(data.headers, collectionVarNames));
    } catch (err) {
      setParseError(err.message);
      setParsedData(null);
      setValidationResult(null);
    }
  }, [collectionVarNames]);

  const handleTextChange = useCallback((e) => {
    const text = e.target.value;
    setRawText(text);
  }, []);

  const handleParseClick = useCallback(() => {
    handleParse(rawText);
  }, [rawText, handleParse]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setRawText(text);
      handleParse(text);
    };
    reader.readAsText(file);
  }, [handleParse]);

  const handleConfirm = useCallback(() => {
    if (parsedData && parsedData.rows.length > 0) {
      onConfirm(parsedData);
    }
  }, [parsedData, onConfirm]);

  const previewRows = parsedData ? parsedData.rows.slice(0, MAX_PREVIEW_ROWS) : [];
  const remainingRows = parsedData ? parsedData.rows.length - MAX_PREVIEW_ROWS : 0;

  return (
    <Modal
      title="Batch Data"
      size="lg"
      handleCancel={onCancel}
      handleConfirm={handleConfirm}
      confirmText={parsedData ? `Load ${parsedData.rows.length} iteration${parsedData.rows.length > 1 ? 's' : ''}` : 'Load'}
      confirmDisabled={!parsedData || parsedData.rows.length === 0}
      disableEscapeKey={false}
      dataTestId="batch-data-modal"
    >
      <StyledWrapper data-testid="batch-data-content">
        <div className="tab-toggle">
          <button
            className={`tab-button ${inputMode === 'paste' ? 'active' : ''}`}
            onClick={() => setInputMode('paste')}
            data-testid="batch-tab-paste"
          >
            Paste Data
          </button>
          <button
            className={`tab-button ${inputMode === 'upload' ? 'active' : ''}`}
            onClick={() => setInputMode('upload')}
            data-testid="batch-tab-upload"
          >
            Upload File
          </button>
        </div>

        {inputMode === 'paste' ? (
          <div>
            <textarea
              className="data-textarea"
              placeholder={'Paste JSON array or CSV data here...\n\nJSON example:\n[{"var1": "value1", "var2": "value2"}, {"var1": "value3", "var2": "value4"}]\n\nCSV example:\nvar1,var2\nvalue1,value2\nvalue3,value4'}
              value={rawText}
              onChange={handleTextChange}
              data-testid="batch-textarea"
            />
            <div className="mt-2">
              <button
                className="tab-button"
                onClick={handleParseClick}
                data-testid="batch-parse-button"
              >
                Parse
              </button>
            </div>
          </div>
        ) : (
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              data-testid="batch-file-input"
            />
          </div>
        )}

        {parseError ? (
          <div className="parse-error" data-testid="batch-parse-error">
            {parseError}
          </div>
        ) : null}

        {validationResult ? (
          <div className="validation-section" data-testid="batch-validation">
            {validationResult.matched.length > 0 ? (
              <div className="validation-matched">
                Matched variables: {validationResult.matched.join(', ')}
              </div>
            ) : null}
            {validationResult.unmatched.length > 0 ? (
              <div className="validation-unmatched">
                Unknown keys (not in collection vars): {validationResult.unmatched.join(', ')}
              </div>
            ) : null}
            {validationResult.missing.length > 0 ? (
              <div className="validation-missing">
                Collection vars not in data: {validationResult.missing.join(', ')}
              </div>
            ) : null}
          </div>
        ) : null}

        {parsedData && previewRows.length > 0 ? (
          <div className="preview-section" data-testid="batch-preview">
            <div className="preview-label">
              Preview ({parsedData.rows.length} row{parsedData.rows.length > 1 ? 's' : ''})
            </div>
            <div className="overflow-x-auto">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>#</th>
                    {parsedData.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      {parsedData.headers.map((header) => (
                        <td key={header}>{row[header]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {remainingRows > 0 ? (
              <div className="preview-more">
                ...and {remainingRows} more row{remainingRows > 1 ? 's' : ''}
              </div>
            ) : null}
          </div>
        ) : null}
      </StyledWrapper>
    </Modal>
  );
};

export default BatchDataModal;
