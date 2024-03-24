export type CardType = {
    title: string,
    text: string,
    createdAt: Date,
    updatedAt: Date
}

export type ExistedCardType = CardType & { id: number }