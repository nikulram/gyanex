import React, { useState } from 'react';
import '../Pages.css';

const WebsiteExtractor = () => {
  const [websiteURL, setWebsiteURL] = useState('');
  const [websiteTopics, setWebsiteTopics] = useState([]);
  const [topicContent, setTopicContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWebsiteExtract = async () => {
    setError('');
    setWebsiteTopics([]);
    setTopicContent({});
    if (!websiteURL) return;
    setLoading(true);

    try {
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const fetchUrl = proxyUrl + encodeURIComponent(websiteURL);
      const response = await fetch(fetchUrl);
      const data = await response.json();
      const htmlText = data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      const headingElements = doc.querySelectorAll('h1, h2, h3, h4');
      const extractedTopics = {};
      const topicList = [];

      headingElements.forEach((el) => {
        const topic = el.textContent.trim();
        if (!topic) return;
        topicList.push(topic);

        // Extract content from next sibling elements until the next heading
        let content = '';
        let sibling = el.nextElementSibling;
        while (sibling && !sibling.matches('h1, h2, h3, h4')) {
          content += sibling.textContent + '\n';
          sibling = sibling.nextElementSibling;
        }
        extractedTopics[topic] = content.trim();
      });

      setWebsiteTopics([...new Set(topicList)]);
      setTopicContent(extractedTopics);
    } catch (err) {
      console.error('Website extraction error:', err);
      setError('⚠️ Could not extract topics. The website may have restrictions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2> Extract Website Topics</h2>
      <input
        type="text"
        className="smaller-input"
        placeholder="Enter website URL..."
        value={websiteURL}
        onChange={(e) => setWebsiteURL(e.target.value)}
      />
      <button onClick={handleWebsiteExtract}>Extract Topics</button>
      {loading && <p className="loading-text"> Extracting topics...</p>}
      {error && <p className="error-text">{error}</p>}

      {websiteTopics.length > 0 && (
        <div className="website-topics">
          <h3> Extracted Topics:</h3>
          <ul>
            {websiteTopics.map((topic, index) => (
              <li key={index} onClick={() => alert(topicContent[topic] || 'No content available')}>
                {topic}{' '}
                <a
                  href={`https://www.google.com/search?q=${topic}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔍
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WebsiteExtractor;
