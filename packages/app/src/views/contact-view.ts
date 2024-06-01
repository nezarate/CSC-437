import {
    define,
    Form,
    History,
    InputArray,
    View
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

export class ContactInfo extends LitElement {
  static styles = css`
    section {
      text-align: center;
      padding: var(--size-spacing-large);
    }
    header {
      margin-bottom: var(--size-spacing-medium);
    }
    dl {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    dt {
      font-weight: bold;
      margin-top: var(--size-spacing-small);
    }
    dd {
      margin: 0;
      margin-bottom: var(--size-spacing-small);
    }
  `;

  render() {
    return html`
      <section class="contact">
        <header>
          <h2>Contact Information</h2>
        </header>
        <dl>
          <dt>Creator</dt>
          <dd>Nicholas Zarate</dd>
          <dt>Email</dt>
          <dd>nezarate@calpoly.edu</dd>
        </dl>
      </section>
    `;
  }
}

export class ContactViewElement extends View<Model, Msg> {
  constructor() {
    super("blazing:model"); 
  }

  static uses = define({
    "contact-info": ContactInfo,
  });

  render() {
    return html`
      <contact-info></contact-info>
    `;
  }
}

customElements.define("contact-view", ContactViewElement);
