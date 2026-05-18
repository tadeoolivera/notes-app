export const noteBodySchema = {
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 67 }, // SIX SEVENNNN
    content: { type: 'string' },
    color: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$' },
  }
}