export async function POST(request) {
  try {
    const { role, years, industries, tools } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ questions: null });
    }

    const prompt = `You are the hiring manager at JZ Smart Media, a digital marketing agency for home service businesses (roofing, HVAC, locksmith, home remodeling, medical transport, etc.).

An SEO specialist applicant has submitted:
- Role applying for: ${role}
- Years of experience: ${years}
- Industries they have worked in: ${industries.join(', ')}
- Tools they use daily: ${tools.join(', ')}

Generate 5 precise technical interview questions tailored specifically to this person's role and industries. Requirements:
- Each question must be a realistic scenario they would face in their stated role
- Questions must test actual depth — a generic answer must clearly fail
- Reference their specific industries and role directly where it makes sense
- Keep questions sharp and concise, not vague

Return ONLY a valid JSON array with exactly 5 objects. No markdown, no explanation, no text outside the array:
[
  { "question": "...", "hint": "Up to 200 words." },
  { "question": "...", "hint": "Up to 200 words." },
  { "question": "...", "hint": "Up to 200 words." },
  { "question": "...", "hint": "Up to 200 words." },
  { "question": "...", "hint": "Up to 200 words." }
]`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic API ${res.status}`);

    const data = await res.json();
    const text = data.content?.[0]?.text?.trim() || '';

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON array in response');

    const questions = JSON.parse(match[0]);
    if (!Array.isArray(questions) || questions.length < 5) throw new Error('Bad format');

    return Response.json({ questions: questions.slice(0, 5) });
  } catch (err) {
    console.error('ai-questions error:', err.message);
    return Response.json({ questions: null });
  }
}
