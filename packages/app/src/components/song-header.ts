import { Auth, Dropdown, Events, Observer, define } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

export class SongHeaderElement extends LitElement {
  static uses = define({
    "drop-down": Dropdown.Element
  });

  @property()
  username = "anonymous";
  render() {
    return html`
    <header>
    <div class="header-content">
        <h1>Music Discovery</h1>
        <p>A tool for your Spotify playlists</p>
    </div>
    <nav>
        <ul>
            <li><a href="/app">Home</a></li>
            <li><a href="/app/about">About</a></li>
            <li><a href="/app/contact">Contact</a></li>
            <drop-down>
            <a href="#" slot="actuator">
              <slot name="greeting"
                >Hello, ${this.username}</slot
              ></a
            >
            <ul>
              <li>
                <label @change=${toggleDarkMode}>
                  <input type="checkbox" autocomplete="off" />
                  Dark mode
                </label>
              </li>
              <li>
                <a href="#" @click=${signOutUser}> Sign out </a>
              </li>
            </ul>
          </drop-down>
        </ul>
    </nav>
    <div class="header-image">
    <img src="../../public/images/music_note.png" alt="Music Note" />
  </div>
    </header> `;
  }



  static styles = css`
    body {
      font-family: var(--font-family-body);
      background-color: var(--color-background-page);
      color: var(--color-text);
    }

    .page {
      display: grid;
      grid-template-rows: auto 1fr auto; 
      min-height: 100vh;
      gap: var(--size-spacing-medium);
    }

    header {
      grid-column: 1 / -1; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-link-inverted);
      flex-wrap: wrap; 
    }

    .header-content{
      font-family: var(--font-family-display);
      display: flex;
      flex-direction: column; 
      flex-grow: 1; 
    }

    nav {
      display: flex;
      align-items: space-between; 
    }

    nav ul {
      display: flex;
      justify-content: space-around; 
      list-style-type: none;
      padding: 0;
      margin: 0; 
    }

    nav li {
      padding: 0 10px; 
    }

    header a[href] {
      color: var(--color-link-inverted);
      text-decoration: none; 
    }

    .header-image {
      display: flex;
      align-items: center; 
    }

    .header-image img {
      width: 100px;
      height: auto; 
    }
  `;

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this.username = user.username;
      }
    });
  }
}

type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}



