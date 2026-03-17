function buildPrompt(topic) {
  return [
    "You are an expert legal reasoning assistant.",
    "Generate concise opening arguments for BOTH sides of a legal debate topic.",
    `Topic: ${topic}`,
    "Return JSON with keys: pro, con, judge.",
    "Judge should include brief reasoning and scores out of 10 for each side.",
  ].join("\n");
}

export async function generateArguments({ topic, mode }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You write balanced legal analysis in plain language.",
        },
        {
          role: "user",
          content: buildPrompt(topic),
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${text}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "{}";

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Failed to parse model output as JSON.");
  }

  return {
    pro: parsed.pro || "No pro argument generated.",
    con: parsed.con || "No con argument generated.",
    judge: mode === "aiJudge" ? parsed.judge || "No judge summary generated." : undefined,
  };
}
