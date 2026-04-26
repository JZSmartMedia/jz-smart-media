export async function POST(request) {
  try {
    const { role, years, industries, tools } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('[ai-questions] ANTHROPIC_API_KEY is not set — returning null');
      return Response.json({ questions: null });
    }

    console.log('[ai-questions] Generating for role:', role);
    console.log('[ai-questions] Key prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 20), '| len:', process.env.ANTHROPIC_API_KEY?.length);

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

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Anthropic API ${res.status}: ${errBody}`);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text?.trim() || '';

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON array in response');

    const questions = JSON.parse(match[0]);
    if (!Array.isArray(questions) || questions.length < 5) throw new Error('Bad format');

    console.log('[ai-questions] Successfully generated', questions.length, 'questions');
    return Response.json({ questions: questions.slice(0, 5) });
  } catch (err) {
    console.error('[ai-questions] Error:', err.message);
    return Response.json({ questions: null });
  }
}
