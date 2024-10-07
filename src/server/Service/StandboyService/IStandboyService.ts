export type IStandboy = {
    id: number,

    bg: number,
    body: number,
    clouth: number,
    color: number,
    eyes: number,
    fg: number,
    hair: number,
    mouth: number,
    stand: number,

    isAvailable: boolean,
    price: number,
    purchaseDate: Date | null,
    owner: string | null,
}

export interface IStandboyService {
    searchStandboy(filter: Partial<IStandboy>, page: number, limit: number): Promise<{ data: IStandboy[], totalCount: number }>;
}
