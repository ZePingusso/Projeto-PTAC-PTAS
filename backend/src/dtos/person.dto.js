
export function toPersonDTO(pessoa) {
    return {
        id: pessoa.id,
        name: pessoa.name,
        email: pessoa.email,
        cpf: pessoa.cpf,
        category: pessoa.category,

        ...(pessoa.category === 'teacher' && {
            discipline: pessoa.discipline
        })
    }
}
