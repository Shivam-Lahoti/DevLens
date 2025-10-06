import React, { useState, useEffect } from 'react';

function AddressBar({ currentUrl, onNavigate }) {
  const [inputValue, setInputValue] = useState(currentUrl);

  useEffect(() => {
    setInputValue(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter URL or search..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </form>
  );
}

export default AddressBar;