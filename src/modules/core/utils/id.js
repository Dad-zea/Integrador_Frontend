// UUID v4, igual que uuid.uuid4() en los scripts de Python.
export function generarId() {
  return crypto.randomUUID()
}
