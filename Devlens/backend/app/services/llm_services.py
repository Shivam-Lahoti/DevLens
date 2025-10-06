import google.generativeai as genai
from app.core.config import settings

class LLMServices:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        """
        Generate a response from Gemini
        """
        try:
            # Configure generation settings
            generation_config = genai.types.GenerationConfig(
                temperature=settings.TEMPERATURE,
                max_output_tokens=settings.MAX_TOKENS,
            )
            
            # Prepend system instruction to prompt if provided
            if system_instruction:
                full_prompt = f"{system_instruction}\n\n{prompt}"
            else:
                full_prompt = prompt
            
            response = self.model.generate_content(
                full_prompt,
                generation_config=generation_config
            )
            
            return response.text
        
        except Exception as e:
            print(f"Error generating response: {e}")
            raise
    
    async def explain_page(self, url: str, content: str = None) -> str:
        """
        Explain a webpage
        """
        system_instruction = "You are a helpful AI assistant that explains webpages and documentation to developers. Be concise, clear, and focus on the key technical points."
        
        if content:
            prompt = f"Please explain the key points of this webpage at {url}:\n\n{content[:4000]}"
        else:
            prompt = f"Please provide a general explanation of what might be found at {url}"
        
        return await self.generate_response(prompt, system_instruction)
    
    async def explain_code(self, code: str, language: str) -> str:
        """
        Explain code snippet
        """
        system_instruction = "You are an expert programmer who explains code clearly to other developers. Break down the logic, highlight important patterns, and explain what the code does."
        prompt = f"Explain this {language} code:\n\n```{language}\n{code}\n```"
        
        return await self.generate_response(prompt, system_instruction)
    
    async def chat(self, message: str, context: str = None) -> str:
        """
        General chat with context
        """
        system_instruction = "You are a helpful AI assistant for developers browsing the web. Answer questions about the content they're viewing with technical accuracy and clarity."
        
        if context:
            prompt = f"Context: Currently viewing {context}\n\nUser question: {message}"
        else:
            prompt = message
        
        return await self.generate_response(prompt, system_instruction)

# Singleton instance
llm_services = LLMServices()