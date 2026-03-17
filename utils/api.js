const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function createDebate(payload) {
  const response = await fetch(`${BACKEND_URL}/api/debate/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate arguments.");
  }

  return response.json();
}

export async function getDebateById(id) {
  const response = await fetch(`${BACKEND_URL}/api/debate/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch debate results.");
  }

  return response.json();
}
