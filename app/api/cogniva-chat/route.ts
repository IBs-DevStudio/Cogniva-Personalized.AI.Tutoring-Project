export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400 }
      );
    }

    const systemPrompt = `
You are the Cogniva AI assistant.

Primary goal:
- Help users understand and use Cogniva effectively.

Behavior rules:
1. You MUST answer every question the user asks.
2. If the question is about Cogniva features, provide:
   - Clear step-by-step guidance
   - Correct UI navigation
   - Relevant official links
3. If the question is NOT about Cogniva:
   - Answer it normally and helpfully
   - Do NOT refuse
   - Keep responses concise and accurate
4. When possible, gently relate answers back to Cogniva features.

Cogniva knowledge:
- Dashboard: https://cogniva.ai/dashboard
- Create Companion: https://cogniva.ai/dashboard/companions/new
- Companion Docs: https://cogniva.ai/docs/companions

Tone:
- Friendly
- Professional
- Clear
- Helpful
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Cogniva Universal Assistant",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.5,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", errText);

      return new Response(
        JSON.stringify({ error: "AI request failed" }),
        { status: 502 }
      );
    }

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
