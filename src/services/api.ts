const SERVER_URL = 'http://localhost:3001';

export default async function queryAI(prompt: string, temperature: number = 0.7) {
    try {  
        const response = await fetch(`${SERVER_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                temperature: temperature,
                maxTokens: 400
            })
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        return data.result.alternatives[0].message.text;
    } catch (error) {
        console.error('Request error:', error);
        return null;
    }
}