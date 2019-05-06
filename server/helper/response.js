export class Response {
    constructor(data = {}, message='Operation completed successfully.', status=200) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}