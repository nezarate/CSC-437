import { Auth, Update } from "@calpoly/mustang";

import {Profile} from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";


export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
  ) {
    console.log(`Updating for message:`, message);
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) =>
          apply((model) => ({ ...model, profile }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
      default:
        const unhandled: never = message[0];
        throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
  }
// export default function update(
//   message: Msg,
//   apply: Update.ApplyMap<Model>,
//   user: Auth.User
// ) {
//   switch (message[0]) {
//     case "profile/save":
//       saveProfile(message[1], user).then((profile) =>
//         apply((model) => ({ ...model, profile }))
//       );
//       break;
//     case "profile/select":
//       selectProfile(message[1], user).then((profile) =>
//         apply((model) => ({ ...model, profile }))
//       );
//       break;
//     // case "tour/select":
//     //   selectTour(message[1], user).then(
//     //     (tour: Tour | undefined) =>
//     //       apply((model) => ({ ...model, tour }))
//     //   );
//     //   break;
//     default:
//       const unhandled: never = message[0];
//       throw new Error(`Unhandled Auth message "${unhandled}"`);
//   }
// }

function saveProfile(
  msg: {
    name: string;
    profile: Profile;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function selectProfile(
  msg: { name: string },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.name}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    });
}

// function selectTour(msg: { tourid: string }, user: Auth.User) {
//   return fetch(`/api/tours/${msg.tourid}`, {
//     headers: Auth.headers(user)
//   })
//     .then((response: Response) => {
//       if (response.status === 200) {
//         return response.json();
//       }
//       return undefined;
//     })
//     .then((json: unknown) => {
//       if (json) {
//         console.log("Tour:", json);
//         let tour: Tour = convertStartEndDates<Tour>(json);
//         tour.destinations = tour.destinations.map(
//           convertStartEndDates<Destination>
//         );
//         tour.transportation = tour.transportation.map(
//           convertStartEndDates<Transportation>
//         );
//         return tour;
//       }
//     });
// }