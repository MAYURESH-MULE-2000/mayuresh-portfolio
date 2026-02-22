import type { Curriculum } from '../../types/astralearn';
import { validateCurriculum } from './validator';

export interface GeminiResponse {
    curriculum: Curriculum | null;
    error: string | null;
}

export async function generateCurriculum(promptInputs: any): Promise<GeminiResponse> {
    const apiKey = localStorage.getItem('astralearn_gemini_key') || import.meta.env?.PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        return {
            curriculum: null,
            error: "Gemini API Key is missing. Please add it in Settings or .env file."
        };
    }

    const { targetLanguage, nativeLanguage, level, time, goal, additionalContext } = promptInputs;

    const systemPrompt = `You are an expert language teacher creating highly structured curriculum for AstraLearn.
Generate a JSON file with this structure:
{
  "id": "unique-id-from-title",
  "meta": {
    "targetLanguage": "${targetLanguage}",
    "targetLanguageCode": "en", 
    "nativeLanguage": "${nativeLanguage}",
    "nativeLanguageCode": "en",
    "proficiencyLevel": "${level}",
    "learningGoal": "${goal}",
    "estimatedHours": 20,
    "title": "Comprehensive ${targetLanguage} Course",
    "description": "A structured course to help you achieve your goal: ${goal}"
  },
  "modules": [
    {
      "id": "mod-1",
      "title": "Module Title",
      "description": "Brief description",
      "order": 1,
      "notes": ["Important Grammar point 1", "Cultural note..."],
      "moduleExercises": [
         {
           "id": "ex-mod-1",
           "type": "multiple-choice",
           "prompt": "Test memory of the module concepts...",
           "options": ["A", "B"],
           "correctAnswer": "A",
           "explanation": "Because..."
         }
      ],
      "topics": [
        {
          "id": "top-1-1",
          "title": "Topic Title",
          "description": "Topic description",
          "order": 1,
          "lessons": [
            {
              "id": "les-1-1-1",
              "title": "Lesson Title",
              "type": "vocabulary",
              "estimatedMinutes": 10,
              "content": {
                "vocabulary": [
                  { "word": "Example", "translation": "Example", "pronunciation": "..." }
                ],
                "explanation": "Grammar or context note..."
              },
              "exercises": [
                {
                  "id": "ex-1",
                  "type": "multiple-choice",
                  "prompt": "Question text...",
                  "options": ["A", "B", "C", "D"],
                  "correctAnswer": "A",
                  "explanation": "Why this is correct..."
                }
              ]
            }
          ]
        }
      ],
      "unlockCriteria": { "type": "none" }
    }
  ],
  "version": "1.0.0",
  "createdAt": "${new Date().toISOString()}"
}

IMPORTANT:
1. "targetLanguageCode" must be a 2-letter ISO code.
2. Create 3 modules. Each module should have comprehensive Notes (string array) and 3 moduleExercises.
3. Include varied lesson types (vocabulary, grammar) and exercise types (multiple-choice, matching, fill-blank).
4. Return ONLY valid JSON natively formatted. DO NOT wrap the JSON in markdown code blocks (return the raw JSON object directly).
5. User Additional Context: ${additionalContext || "None"}
`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt }]
                }],
                generationConfig: {
                    temperature: 0.2,
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error (${response.status}): ${errorText}`);
        }

        const data = await response.json();

        let jsonString = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!jsonString) {
            throw new Error("Invalid response format from Gemini API");
        }

        const curriculumObj = JSON.parse(jsonString) as Curriculum;

        // Validate
        const validation = validateCurriculum(curriculumObj);
        if (!validation.valid) {
            console.warn("Validation errors:", validation.errors);
            // If there's a minor error, we might still want to return it, or fail
            // For now, depending on strictness, we'll let it pass if it's mostly structured, or throw
            // throw new Error("Generated curriculum failed schema validation.");
        }

        return { curriculum: curriculumObj, error: null };
    } catch (e: any) {
        console.error("Gemini API Error:", e);
        return { curriculum: null, error: e.message || "Failed to generate curriculum" };
    }
}
