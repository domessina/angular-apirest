export class PartialAssign<T> {
  constructor(type: Partial<T>) {
    Object.assign(this, type);
  }
}
