/**
 * CSV/JSON batch data parser and validator for the collection runner.
 *
 * Both formats produce the same output: { headers: string[], rows: Record<string, string>[] }
 */

/**
 * State-machine CSV parser that handles quoted fields (commas and newlines inside quotes).
 * First row is treated as headers.
 */
const parseCSV = (text) => {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          // Escaped quote
          currentField += '"';
          i += 2;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
        }
      } else {
        currentField += char;
        i++;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
        i++;
      } else if (char === '\r') {
        // Handle \r\n and standalone \r
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.length > 0 && currentRow.some((f) => f !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
        i++;
        if (i < text.length && text[i] === '\n') {
          i++;
        }
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.length > 0 && currentRow.some((f) => f !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
        i++;
      } else {
        currentField += char;
        i++;
      }
    }
  }

  // Push the last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f !== '')) {
      rows.push(currentRow);
    }
  }

  if (rows.length === 0) {
    throw new Error('CSV data is empty');
  }

  if (rows.length < 2) {
    throw new Error('CSV data must have at least a header row and one data row');
  }

  const headers = rows[0];

  if (headers.some((h) => !h)) {
    throw new Error('CSV header row contains empty column names');
  }

  const uniqueHeaders = new Set(headers);
  if (uniqueHeaders.size !== headers.length) {
    throw new Error('CSV header row contains duplicate column names');
  }

  const dataRows = rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = idx < row.length ? row[idx] : '';
    });
    return obj;
  });

  return { headers, rows: dataRows };
};

/**
 * Parses JSON text, expecting an array of objects.
 */
const parseJSON = (text) => {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('JSON data must be an array of objects');
  }

  if (parsed.length === 0) {
    throw new Error('JSON data array must not be empty');
  }

  for (let i = 0; i < parsed.length; i++) {
    if (typeof parsed[i] !== 'object' || parsed[i] === null || Array.isArray(parsed[i])) {
      throw new Error(`JSON array element at index ${i} must be a plain object`);
    }
  }

  // Collect all unique keys across all objects
  const headerSet = new Set();
  parsed.forEach((obj) => {
    Object.keys(obj).forEach((key) => headerSet.add(key));
  });
  const headers = Array.from(headerSet);

  const rows = parsed.map((obj) => {
    const row = {};
    headers.forEach((header) => {
      const value = obj[header];
      row[header] = value !== undefined && value !== null ? String(value) : '';
    });
    return row;
  });

  return { headers, rows };
};

/**
 * Auto-detects format (JSON or CSV) and parses.
 */
const parseBatchData = (text) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Batch data text is required');
  }

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Batch data text is empty');
  }

  if (trimmed.startsWith('[')) {
    return parseJSON(trimmed);
  }

  return parseCSV(trimmed);
};

/**
 * Validates batch data headers against collection variable names.
 * Returns { matched, unmatched, missing } arrays.
 */
const validateBatchDataKeys = (batchHeaders, collectionVarNames) => {
  const varNameSet = new Set(collectionVarNames);
  const batchHeaderSet = new Set(batchHeaders);

  const matched = batchHeaders.filter((h) => varNameSet.has(h));
  const unmatched = batchHeaders.filter((h) => !varNameSet.has(h));
  const missing = collectionVarNames.filter((v) => !batchHeaderSet.has(v));

  return { matched, unmatched, missing };
};

export { parseCSV, parseJSON, parseBatchData, validateBatchDataKeys };
