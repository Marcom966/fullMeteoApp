export class UserData {
    constructor(
        public id: string,
        public date: string,
        public currentPage: string,
        public userName: string|undefined,
        public dateSinceString: number
    ){}
}
