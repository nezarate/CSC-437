
import { Profile } from "server/models";

export type Msg =
  | [
    "profile/save",
    {
      name: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["profile/select", { name: string }]
  ;