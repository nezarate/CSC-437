import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property} from "lit/decorators.js";
import { Profile } from "server/models";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

const gridStyles = css`
  slot[name="avatar"] {
    display: block;
    grid-row: 1 / span 4;
  }
  nav {
    display: contents;
    text-align: right;
  }
  nav > * {
    grid-column: controls;
  }
`;


class ProfileViewer extends LitElement {

  @property()
  name?: string;


  render() {
    return html`
      <section>
      <nav>
      <a href="/app/profile/${this.name}/edit" class="edit">Edit</a>
    </nav>
        <dl>
        <dt>Song Name</dt>
        <dd><slot name="name"></slot></dd>
        <dt>Artists</dt>
        <dd><slot name="artists"></slot></dd>
        <dt>Album</dt>
        <dd><slot name="album"></slot></dd>
        <dt>Genre</dt>
        <dd><slot name="genre"></slot></dd>
        <dt>Song Duration</dt>
        <dd><slot name="duration_ms"></slot></dd>
        <dt>Popularity</dt>
        <dd><slot name="popularity"></slot></dd>
        </dl>
      </section>
    `;
  }
  static styles = [
    resetStyles,
    gridStyles,
    css`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-row: 4;
        grid-column: value;
      }
      dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: key;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: value;
      }
      ::slotted(ul) {
        list-style: none;
        display: flex;
        gap: var(--size-spacing-medium);
      }
    `
  ];

}

class ProfileEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });
  @property()
  name?: string;

  @property({ attribute: false })
  init?: Profile;

  render() {
    return html`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.name}">Close</a>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this.init}>
          <label>
            <span>Name</span>
            <input disabled name="name" />
          </label>
          <label>
          <span>Artists</span>
          <input-array name="artists">
            <span slot="label-add">Add an artist</span>
          </input-array>
        </label>
        <label>
        <span>Album</span>
        <input name="album" />
      </label>
          <label>
            <span>Genre</span>
            <input name="genre" />
          </label>
          <label>
            <span>Duration</span>
            <input name="duration_ms" />
          </label>
          <label>
          <span>Popularity</span>
          <input name="popularity" />
        </label>
        </mu-form>
      </section>
    `;
  }

  static styles = [
    resetStyles,
    gridStyles,
    css`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
    `
  ];
}

customElements.define("profile-editor", ProfileEditor);

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-editor": ProfileEditor
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "user-id", reflect: true })
  name = "";

  @property()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "user-id" && oldValue !== newValue && newValue) {
      console.log("Profile Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { name: newValue }
      ]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    const {
      name,
      artists = [],
      album,
      genre,
      duration_ms,
      popularity
    } = this.profile || {};

    const artists_html = artists.map(
      (artist) => html`<li>${artist}</li>`
    );

    return this.edit
      ? html`
          <profile-editor
            name=${name}
            .init=${this.profile}
            @mu-form:submit=${(event: Form.SubmitEvent<Profile>) =>
              this._handleSubmit(event)}
          >
          </profile-editor>
        `
      : html`
          <profile-viewer name=${name}>
            <span slot="name">${name}</span>
            <ul slot="artists">${artists_html}</ul>
            <span slot="album">${album}</span>
            <span slot="genre">${genre}</span>
            <span slot="duration_ms">${duration_ms}</span>
            <span slot="popularity">${popularity}</span>
          </profile-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<Profile>) {
    this.dispatchMessage([
      "profile/save",
      {
        name: this.name,
        profile: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${this.name}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }
}
customElements.define("profile-view", ProfileViewElement);


