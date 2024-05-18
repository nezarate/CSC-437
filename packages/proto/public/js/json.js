import { addFragment } from "./html.js";
import { prepareTemplate } from "./template.js";
import { Observer } from "@calpoly/mustang";

export class JsonObjectElement extends HTMLElement {
  static template = prepareTemplate(`<template>
      <dl>
        <slot></slot>
      </dl>
      <style>
        dl {
          display: grid;
          grid-template-columns: 1fr 3fr;
        }
        ::slotted(dt) {
          color: var(--color-accent);
          grid-column-start: 1;
        }
        ::slotted(dd) {
          grid-column-start: 2;
        }
      </style>
    </template>`);

  get dl() {
    return this.shadowRoot.querySelector("dl");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      JsonObjectElement.template.cloneNode(true)
    );
  }

  _authObserver = new Observer(this, "blazing:auth");

  connectedCallback() {
    const src = this.getAttribute("src");
    const open = this.hasAttribute("open");

    this._authObserver.observe(({ user }) => {
      console.log("Setting user as effect of change", user);
      this._user = user;
      if (this.src) {
        if (open)
          loadJSON(
            src,
            this,
            renderAssignments,
            this.authorization
          );
      }
    });

    this.addEventListener("json-object:open", () =>
      loadJSON(src, this, renderAssignments, this.authorization)
    );
  }
}

customElements.define("json-object", JsonObjectElement);

export function loadJSON(
  src,
  container,
  render,
  authorization
) {
  container.replaceChildren();
  return fetch(src, {
    headers: authorization || undefined
  })
    .then((response) => {
      if (response.status !== 200) {
        throw {
          status: response.status,
          url: src,
          headers: authorization
        };
      }
      return response.json();
    })
    .then((json) => addFragment(render(json), container));
}

function renderAssignments(json) {
  const entries = Object.entries(json);
  const dtdd = ([key, value]) => `
    <dt>${key}</dt>
    <dd>${value}</dd>
    `;
  return entries.map(dtdd).join("\n");
}// import { addFragment } from "./html.js";
// import { prepareTemplate } from "./template.js";

// export class JsonObjectElement extends HTMLElement {
//   static template = prepareTemplate(`<template>
//       <dl>
//         <slot></slot>
//       </dl>
//       <style>
//         dl {
//           display: grid;
//           grid-template-columns: 1fr 3fr;
//         }
//         ::slotted(dt) {
//           color: var(--color-accent);
//           grid-column-start: 1;
//         }
//         ::slotted(dd) {
//           grid-column-start: 2;
//         }
//       </style>
//     </template>`);

//   get dl() {
//     return this.shadowRoot.querySelector("dl");
//   }

//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" }).appendChild(
//       JsonObjectElement.template.cloneNode(true)
//     );
//   }

//   connectedCallback() {
//     const src = this.getAttribute("src");
//     const open = this.hasAttribute("open");

//     if (open) loadJSON(src, this, renderJSON);

//     this.addEventListener("json-object:open", () =>
//       loadJSON(src, this, renderJSON)
//     );
//   }
// }

// customElements.define("json-object", JsonObjectElement);

// // export function loadJSON(src, container, render) {
// //   container.replaceChildren();
// //   fetch(src)
// //     .then((response) => {
// //       if (response.status !== 200) {
// //         throw `Status: ${response.status}`;
// //       }
// //       return response.json();
// //     })
// //     .then((json) => addFragment(render(json), container))
// //     .catch((error) =>
// //       addFragment(
// //         `<dt class="error">Error</dt>
// //          <dd>${error}</dd>
// //          <dt>While Loading</dt>
// //          <dd>${src}</dd>
// //         `,
// //         container
// //       )
// //     );
// // }

// export function loadJSON(
//   src,
//   container,
//   render,
//   authorization
// ) {
//   container.replaceChildren();
//   fetch(src, {
//     headers: authorization
//   })
//     .then((response) => {
//       if (response.status !== 200) {
//         throw `Status: ${response.status}`;
//       }
//       return response.json();
//     })
//     .then((json) => addFragment(render(json), container))
//     .catch((error) =>
//       addFragment(
//         render({
//           Error: error,
//           "While Loading": src
//         }),
//         container
//       )
//     );
// }

// function renderJSON(json) {
//   const entries = Object.entries(json);
//   const dtdd = ([key, value]) => `
//     <dt>${key}</dt>
//     <dd>${value}</dd>
//     `;
//   return entries.map(dtdd).join("\n");
// }