import { ObjectId } from "mongodb";

export default class Users {
  constructor(
    public name: string,
    public bio: string,
    public id?: ObjectId,
  ) {}
}