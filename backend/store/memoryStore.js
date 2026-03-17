const debates = new Map();

export function saveDebate(debate) {
  debates.set(debate.id, debate);
}

export function getDebate(id) {
  return debates.get(id);
}
