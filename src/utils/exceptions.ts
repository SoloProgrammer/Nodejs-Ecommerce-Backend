export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode?: number) {
    super(message); // super key word is use to call the constructor of the parent class which in this case is a (Error)
    this.statusCode = statusCode; // optional if not given still works!
  }
}
