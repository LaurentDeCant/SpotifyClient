import { State } from "../reducers";

export function selectNotifications({ notifications }: State) {
  return notifications;
}
