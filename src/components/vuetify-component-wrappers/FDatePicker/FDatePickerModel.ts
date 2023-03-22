import moment from "moment";
import { now } from "moment";
import { FDatePickerModelType } from "./FDatePickerModelType";

export default class FDatePickerModel {
  public value: string;

  private _initialValue: string;
  private _type: FDatePickerModelType;

  constructor(type = FDatePickerModelType.date, date = moment(now())) {
    this.value = date.format(this.getFormatFromType(type));
    this._initialValue = this.value;
    this._type = type;
  }

  public get type(): FDatePickerModelType {
    return this._type;
  }

  public reset(): void {
    this.value = this._initialValue;
  }

  private getFormatFromType(type: FDatePickerModelType): string {
    switch (type) {
      case FDatePickerModelType.date:
        return "YYYY-MM-DD";
      case FDatePickerModelType.month:
        return "YYYY-MM";
    }
  }
}
