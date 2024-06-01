import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { SongsTableElement } from "../components/songs-table";
import { SongStatsElement } from "../components/song-stats";
import { Msg } from "../messages";
import { Model } from "../model";

define({
  "songs-table": SongsTableElement,
  "song-stats": SongStatsElement
});

export class TourViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @state()
  profiles: Profile[] = [];

  constructor() {
    super("blazing:model");
    this.fetchProfile();
  }

  async fetchProfile() {
    try {
      const response = await fetch(`/api/profiles/${this.userid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      this.profiles = await response.json();
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Fallback to some default data
      this.profiles = [
        {
          name: "Heaven Can Wait",
          artists: ["Dean Martin"],
          album: "Dean Martin Sings",
          genre: "Traditional Pop",
          duration_ms: 195,
          popularity: 85
        },
        {
          name: "Welcome and Goodbye",
          artists: ["Dream, Ivory"],
          album: "Welcome and Goodbye",
          genre: "Alternative/Indie",
          duration_ms: 210,
          popularity: 90
        },
        {
          name: "Rebuke",
          artists: ["Kaytramine"],
          album: "Kaytramine",
          genre: "Hip-Hop/Rap",
          duration_ms: 150,
          popularity: 80
        },
        {
          name: "GRAVITY",
          artists: ["Brent Faiyaz"],
          album: "GRAVITY",
          genre: "R&B/Soul",
          duration_ms: 220,
          popularity: 88
        },
        {
          name: "Shut Up My Moms Calling",
          artists: ["Hotel Ugly"],
          album: "Shut Up My Moms Calling",
          genre: "Alternative/Indie",
          duration_ms: 140,
          popularity: 92
        },
        {
          name: "Got Caught In Amsterdam",
          artists: ["Arc De Soleil"],
          album: "Got Caught In Amsterdam",
          genre: "Alternative/Indie",
          duration_ms: 200,
          popularity: 75
        },
        {
          name: "CHROMA 002 L.A.V.A",
          artists: ["B.D.B"],
          album: "CHROMA 002",
          genre: "Electronic",
          duration_ms: 230,
          popularity: 70
        },
        {
          name: "The Roof",
          artists: ["Mariah Carey"],
          album: "Butterfly",
          genre: "R&B/Soul",
          duration_ms: 240,
          popularity: 85
        },
        {
          name: "Do You",
          artists: ["Ne-Yo"],
          album: "Because of You",
          genre: "R&B/Soul",
          duration_ms: 210,
          popularity: 89
        }
      ];
    }
  }

  render(): TemplateResult {
    return html`
      <main class="page">
        <div class="top-row">
          <section class="right-top">
            <h2>Welcome to Your Spotify Analyzer</h2>
            <p>Connect your Spotify account and get insights into your playlists.</p>
            <button @click="${this.connectSpotify}">Connect to Spotify</button>
          </section>
          <section class="left-top">
            <h2>Dashboard</h2>
            <label for="playlistURL">Enter Playlist URL:</label>
            <input type="url" id="playlistURL" name="playlistURL" placeholder="https://example.com/playlist" @change="${this.loadPlaylist}">
            <p>Copy URL from one playlist to analyze songs</p>
            <p>Still in development</p>
            </section>
        </div>
        <header>
        <h2></h2>
        <h2>Song List</h2>
      </header>
        <songs-table .using=${this.profiles}></songs-table>
        <song-stats .profiles=${this.profiles}></song-stats>
        <footer>
          <p>Copyright &copy; 2024 Music Discovery</p>
        </footer>
      </main>
    `;
  }

  connectSpotify() {
    console.log("Connecting to Spotify...");
    // Add your Spotify connection logic here
  }

  loadPlaylist(event: Event) {
    const input = event.target as HTMLInputElement;
    const url = input.value;
    console.log("Loading playlist from URL:", url);
    // Add your playlist loading logic here
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto auto 1fr auto;
    }
    h2 {
      margin: 0;
      padding-bottom: 16px;
    }
    main.page {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .top-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      width: 100%;
    }
    section.right-top,
    section.left-top{
      padding: 16px;
      background: #e7eae5;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    section.right-bottom input {
      width: 100%;
      padding: 8px;
      margin-top: 8px;
    }
    button {
      background-color: rgb(128, 0, 0);
      color: rgb(214, 181, 117);
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
    }
    footer {
      grid-row-start: 4;
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--size-spacing-medium);
      background-color: rgb(128, 0, 0);
      color: rgb(214, 181, 117);
      width: 100%;
    }
  `;
}

customElements.define("tour-view", TourViewElement);
