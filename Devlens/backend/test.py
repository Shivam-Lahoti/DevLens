import google.generativeai as genai

genai.configure(api_key="YOUR_KEY_HERE")

try:
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content("Hello")
    print("✅ API key is working!")
    print("Response:", response.text)
except Exception as e:
    print("❌ API key error:", e)