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

class AboutView extends LitElement {
    static styles = css`
      section {
        text-align: center;
        padding: var(--size-spacing-large);
      }
      h1 {
        margin-bottom: var(--size-spacing-medium);
      }
    `;
  
    render() {
      return html`
        <section>
          <h1>About Us</h1>
          <p>
            This is a simple about page for our application. We are creating a single page application for CSC 437. This project focuses on analyzing and organizing song data.
            Future directions would include the option to link your spotify account to have access to all playlists or to paste the URL of a single Spotify playlist to analyze the data.
          </p>
        </section>
      `;
    }
  }
  
  

export class AboutViewElement extends View<Model, Msg> {
  constructor() {
    super("blazing:model"); 
  }

  static uses = define({
    "about-view": AboutView,
  });

  render() {
    return html`
      <about-view></about-view>
    `;
  }
}
