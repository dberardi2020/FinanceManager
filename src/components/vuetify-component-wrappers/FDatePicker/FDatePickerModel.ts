import { FDatePickerModelType } from "./FDatePickerModelType";

export class FDatePickerModel {
  public value: string;
  private _type: FDatePickerModelType;

  constructor(type = FDatePickerModelType.date, date = new Date()) {
    this.value = this.convertDateToISOString(date, type);
    this._type = type;
  }

  public get type(): FDatePickerModelType {
    return this._type;
  }

  private convertDateToISOString(
    date: Date,
    type: FDatePickerModelType
  ): string {
    return date.toISOString().substring(0, this.getIndexFromType(type));
  }

  private getIndexFromType(type: FDatePickerModelType): number {
    switch (type) {
      case FDatePickerModelType.date:
        return 10;
      case FDatePickerModelType.month:
        return 7;
    }
  }
}
