export interface IDataForCreate {
    id: number;
    name: string;
    imgLink: string;
    lapsValues: number[];
    isWinner: boolean;
    isLoser: boolean
}


export class PlayerModel {
    constructor(
        public id: number, 
        public name: string,  
        public imgLink: string, 
        public lapsValues: number[],
        public isWinner: boolean,
        public isLoser: boolean
    ) {
    }

    public get totalScore(): number {
        return this.lapsValues.reduce((acc, cur) => acc + cur, 0);
    }
}

export const createNewPlayer = (data: IDataForCreate): PlayerModel => {
    const newPlayer = new PlayerModel(
        data.id,
        data.name,
        data.imgLink,
        data.lapsValues,
        data.isWinner,
        data.isLoser
    );
    return newPlayer;
}