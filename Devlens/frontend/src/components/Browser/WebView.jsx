import React, { useEffect, useRef } from 'react';

function WebView({ url, onUrlChange, onWebviewReady }) {
  const webviewRef = useRef(null);

  useEffect(() => {
    const webview = webviewRef.current;
    
    if (webview) {
      // Wait for webview to be ready
      const handleDomReady = () => {
        onWebviewReady(webview);
        
        const handleUrlChange = () => {
          if (typeof webview.getURL === 'function') {
            onUrlChange(webview.getURL());
          }
        };

        webview.addEventListener('did-navigate', handleUrlChange);
        webview.addEventListener('did-navigate-in-page', handleUrlChange);
      };

      webview.addEventListener('dom-ready', handleDomReady);

      return () => {
        webview.removeEventListener('dom-ready', handleDomReady);
      };
    }
  }, [onUrlChange, onWebviewReady]);

  useEffect(() => {
    const webview = webviewRef.current;
    
    if (webview && url) {
      // Wait for dom-ready before loading URL
      const loadUrl = () => {
        if (typeof webview.loadURL === 'function') {
          webview.loadURL(url);
        }
      };

      if (webview.isReady && webview.isReady()) {
        loadUrl();
      } else {
        webview.addEventListener('dom-ready', loadUrl, { once: true });
      }
    }
  }, [url]);

  return (
    <div className="w-full h-full bg-white">
      <webview
        ref={webviewRef}
        src={url}
        style={{ width: '100%', height: '100%' }}
        allowpopups="true"
      />
    </div>
  );
}

export default WebView;