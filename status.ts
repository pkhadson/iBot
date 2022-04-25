import fs from "fs";

type Status =
  | "INIT"
  | "SINIT"
  | "WAITING_INDICATE"
  | "WAITING_START_QUESTION"
  | "WAITING_MAIN_QUESTION"
  | "WAITING_DOCUMENT_NUMBER"
  | "WAITING_RETURN"
  | "WAITING_RETURN"
  | "WAITING_TYPE_QUESTION"
  | "WAITING_PAYMENT_TYPE";

class StatusManager {
  public _status: Record<string, [Status, any]> = JSON.parse(
    fs.readFileSync("./status.data.json", "utf-8")
  ) as {};

  getStatus(contact: string): Status | undefined {
    return this._status[contact] ? this._status[contact][0] : undefined;
  }

  setStatus(contact: string, status: Status) {
    if (!this._status[contact]) this._status[contact] = [status, {}];
    this._status[contact][0] = status;
    this.save();
  }

  save() {
    fs.writeFileSync("./status.data.json", JSON.stringify(this._status));
  }
}

export const statusManager = new StatusManager();
