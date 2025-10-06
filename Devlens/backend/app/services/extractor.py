import httpx
from bs4 import BeautifulSoup
from typing import Optional

class ContentExtractor:
    """
    Service to extract content from webpages
    """
    
    async def fetch_page_content(self, url: str) -> Optional[str]:
        """
        Fetch and extract text content from a webpage
        """
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, follow_redirects=True)
                response.raise_for_status()
                
                # Parse HTML
                soup = BeautifulSoup(response.text, 'lxml')
                
                # Remove script and style elements
                for script in soup(["script", "style", "nav", "footer"]):
                    script.decompose()
                
                # Get text
                text = soup.get_text(separator='\n', strip=True)
                
                # Clean up whitespace
                lines = (line.strip() for line in text.splitlines())
                chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
                text = '\n'.join(chunk for chunk in chunks if chunk)
                
                return text
                
        except Exception as e:
            print(f"Error fetching content from {url}: {e}")
            return None
    
    def extract_code_snippets(self, html: str) -> list[dict]:
        """
        Extract code snippets from HTML
        """
        soup = BeautifulSoup(html, 'lxml')
        snippets = []
        
        # Find code blocks
        for code in soup.find_all(['code', 'pre']):
            snippet = {
                'code': code.get_text(strip=True),
                'language': code.get('class', [''])[0] if code.get('class') else 'text'
            }
            snippets.append(snippet)
        
        return snippets


content_extractor = ContentExtractor()