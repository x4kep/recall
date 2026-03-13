# JSON Import Format

Use this format when generating cards with ChatGPT. Paste the prompt below, replace the topic, and save the output as a `.json` file.

---

## ChatGPT Prompt

```
Generate a JSON flashcard deck about [YOUR TOPIC] with 15 cards.
Use exactly this format:

{
  "name": "Deck title here",
  "description": "Short description",
  "cards": [
    {
      "question": "Question text",
      "answer": "Answer text",
      "why_important": "Why knowing this matters (1-2 sentences)",
      "simple_example": "A concrete example that makes it click",
      "use_cases": ["Real-world use 1", "Real-world use 2", "Real-world use 3"],
      "difficulty": "easy"
    }
  ]
}

difficulty must be one of: easy, medium, hard
Return only the JSON, no extra text.
```

---

## Minimal Format (also works)

If you only need questions and answers:

```json
{
  "name": "My Deck",
  "cards": [
    { "question": "What is X?", "answer": "X is..." },
    { "question": "How does Y work?", "answer": "Y works by..." }
  ]
}
```

---

## Rules
- `name` and `cards` are required
- Each card must have `question` and `answer`
- All other fields are optional
- Save as `.json` and import via the app's **↑ Import** button
