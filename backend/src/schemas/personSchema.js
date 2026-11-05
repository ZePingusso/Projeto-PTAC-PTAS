import { z } from 'zod'

export const personSchema = z.discriminatedUnion('category', [
    z.object({
        name: z.string().min(1),
        email: z.string().email(),
        cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        category: z.literal('student')
    }),

    z.object({
        name: z.string().min(1),
        email: z.string().email(),
        cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        category: z.literal('teacher'),
        discipline: z.string().min(1)
    })
])

export const updatePersonSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).optional(),
    category: z.enum(['student', 'teacher']).optional(),
    discipline: z.string().min(1).optional()
})