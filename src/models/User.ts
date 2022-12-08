type User = {id: number, firstname : string, lastname: string, email: string, pwd: string}
export const users = [
    {id: 1, firstname: 'Yanis', lastname: 'Bevia', pwd: 'test123'},
    {id: 2, firstname: 'Cyril', lastname: 'Cauquil'},
    {id: 3, firstname: 'Lionel', lastname: 'Abatan'}
]

export const getModelUser = (id: number) : {id: number, firstname: string} | undefined => users.find((item) => item.id === id)