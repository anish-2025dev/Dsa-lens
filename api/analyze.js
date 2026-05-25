export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic rate limit check via simple header (optional extra layer)
  const { scenario } = req.body;
  if (!scenario || typeof scenario !== 'string' || scenario.trim().length < 10) {
    return res.status(400).json({ error: 'Invalid scenario text' });
  }

  if (scenario.length > 5000) {
    return res.status(400).json({ error: 'Scenario too long (max 5000 chars)' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a DSA (Data Structures & Algorithms) expert coach for competitive programming. 
When given a real-world scenario, you will:
1. Identify the core DSA pattern (e.g. Stack, Queue, Graph, DP, etc.)
2. Explain WHY that pattern fits using a precise analogy mapping
3. Name 2-3 LeetCode problems that match this pattern
4. Give a one-line "extraction tip" — a mental shortcut to spot this pattern type faster next time.

Format your response with clear sections using these exact headers:
PATTERN: <name>
WHY IT FITS: <explanation>
LEETCODE PROBLEMS: <list>
EXTRACTION TIP: <tip>

Be concise, sharp, and educational. Target audience: CS students preparing for coding interviews.`,
        messages: [
          {
            role: 'user',
            content: `Analyze this real-world scenario and identify the DSA pattern:\n\n${scenario}`
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(502).json({ error: 'AI service error. Please try again.' });
    }

    const data = await response.json();
    const text = data.content.map(b => b.text || '').join('\n');

    return res.status(200).json({ result: text });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
