export class UserLog {
    constructor(
        public eventName: string,
        public userName: string|undefined,
        public dateTime: string,
    ){}
}
