import React, { useState } from 'react';
import AddressBar from './components/Browser/AddressBar';
import NavigationButtons from './components/Browser/NavigationButtons';
import WebView from './components/Browser/WebView';
import AIPanel from './components/AI/AIPanel';

function App() {
  const [currentUrl, setCurrentUrl] = useState('https://google.com');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [webviewRef, setWebviewRef] = useState(null);

  const handleNavigate = (url) => {
    const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
    setCurrentUrl(formattedUrl);
  };

  const handleBack = () => {
    webviewRef?.goBack();
  };

  const handleForward = () => {
    webviewRef?.goForward();
  };

  const handleReload = () => {
    webviewRef?.reload();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-3">
        <NavigationButtons 
          onBack={handleBack}
          onForward={handleForward}
          onReload={handleReload}
        />
        <AddressBar 
          currentUrl={currentUrl}
          onNavigate={handleNavigate}
        />
        <button
          onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isAIPanelOpen ? 'Hide AI' : 'Show AI'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Browser View */}
        <div className={`flex-1 ${isAIPanelOpen ? 'w-2/3' : 'w-full'}`}>
          <WebView 
            url={currentUrl} 
            onUrlChange={setCurrentUrl}
            onWebviewReady={setWebviewRef}
          />
        </div>

        {/* AI Panel */}
        {isAIPanelOpen && (
          <div className="w-1/3 border-l border-gray-200">
            <AIPanel currentUrl={currentUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;