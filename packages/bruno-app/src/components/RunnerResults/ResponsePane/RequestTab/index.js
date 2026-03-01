import React from 'react';
import HeadersBlock from 'components/ResponsePane/Timeline/TimelineItem/Common/Headers/index';
import BodyBlock from 'components/ResponsePane/Timeline/TimelineItem/Common/Body/index';
import StyledWrapper from './StyledWrapper';

const safeStringifyJSONIfNotString = (obj) => {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string') return obj;
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return '[Unserializable Object]';
  }
};

const RequestTab = ({ requestSent, item, collection }) => {
  if (!requestSent) {
    return <div className="p-4 text-muted">No request data available</div>;
  }

  const { url, method, headers, data, dataBuffer } = requestSent;
  const resolvedDataBuffer = dataBuffer || (data ? Buffer.from(safeStringifyJSONIfNotString(data)).toString('base64') : null);

  return (
    <StyledWrapper className="pb-4 w-full">
      <div className="method-url-bar mb-3">
        <span className="method-badge">{method}</span>
        <pre className="url-text whitespace-pre-wrap">{url}</pre>
      </div>

      <HeadersBlock headers={headers} type="request" />

      <BodyBlock
        collection={collection}
        data={data}
        dataBuffer={resolvedDataBuffer}
        headers={headers}
        item={item}
        type="request"
      />
    </StyledWrapper>
  );
};

export default RequestTab;
