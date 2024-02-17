import React, { useState } from 'react';

const CopyToClipboardButton = ({ text, onCopySuccess, onCopyError, buttonText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        if (onCopySuccess) {
          onCopySuccess();
        }
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      },
      (error) => {
        if (onCopyError) {
          onCopyError(error);
        }
      }
    );
  };

  return (
    <div>
      <button onClick={handleCopyClick}>{buttonText || 'Copy to Clipboard'}</button>
      {isCopied && <p>Copied!</p>}
    </div>
  );
};

export default CopyToClipboardButton;
