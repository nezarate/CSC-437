
import { define } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";

export class SongsTableElement extends LitElement {
  @property({ attribute: false })
  using?: Profile[];

  @state()
  filteredProfiles: Profile[] = [];

  @state()
  searchQuery: string = "";

  @state()
  durationSortOrder: 'asc' | 'desc' = 'asc';

  @state()
  popularitySortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    super();
    this.filteredProfiles = this.using || [];
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('using')) {
      this.filteredProfiles = this.using || [];
    }
  }

  toggleSort(key: keyof Profile) {
    this.filteredProfiles = [...this.filteredProfiles].sort((a, b) => {
      const aKey = a[key];
      const bKey = b[key];

      if (Array.isArray(aKey) && Array.isArray(bKey)) {
        const aValue = String(aKey[0] ?? '');
        const bValue = String(bKey[0] ?? '');
        return aValue.localeCompare(bValue);
      } else if (typeof aKey === 'string' && typeof bKey === 'string') {
        return aKey.localeCompare(bKey);
      }
      return 0;
    });
  }

  toggleSortDuration() {
    const order = this.durationSortOrder === 'asc' ? 1 : -1;
    this.filteredProfiles = [...this.filteredProfiles].sort((a, b) => {
      const durationA = a.duration_ms ?? 0;
      const durationB = b.duration_ms ?? 0;
      return order * (durationA - durationB);
    });
    this.durationSortOrder = this.durationSortOrder === 'asc' ? 'desc' : 'asc';
  }

  toggleSortPopularity() {
    const order = this.popularitySortOrder === 'asc' ? 1 : -1;
    this.filteredProfiles = [...this.filteredProfiles].sort((a, b) => {
      const popularityA = a.popularity ?? 0;
      const popularityB = b.popularity ?? 0;
      return order * (popularityA - popularityB);
    });
    this.popularitySortOrder = this.popularitySortOrder === 'asc' ? 'desc' : 'asc';
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value.toLowerCase();
    this.filteredProfiles = (this.using || []).filter(profile =>
      profile.name.toLowerCase().includes(this.searchQuery) ||
      profile.artists.some(artist => artist.toLowerCase().includes(this.searchQuery)) ||
      profile.album.toLowerCase().includes(this.searchQuery) ||
      profile.genre.toLowerCase().includes(this.searchQuery)
    );
  }

  renderRow = (row: Profile) => {
    const {
      name,
      artists,
      album,
      genre,
      duration_ms,
      popularity
    } = row;

    return html`
      <tr>
        <td>${name}</td>
        <td>${artists.join(", ")}</td>
        <td>${album}</td>
        <td>${genre}</td>
        <td>${duration_ms}</td>
        <td>${popularity !== undefined ? popularity : "-"}</td>
      </tr>
    `;
  };

  render() {
    return html`
      <section>
        <input
          type="text"
          placeholder="Search features..."
          @input="${this.handleSearch}"
          .value="${this.searchQuery}"
        />
        <div class="buttons">
          <button @click="${() => this.toggleSort('name')}">Sort by Name</button>
          <button @click="${() => this.toggleSort('artists')}">Sort by Artist</button>
          <button @click="${() => this.toggleSort('album')}">Sort by Album</button>
          <button @click="${() => this.toggleSort('genre')}">Sort by Genre</button>
          <button @click="${this.toggleSortDuration}">
            Sort by Duration (${this.durationSortOrder === 'asc' ? 'Longest First' : 'Shortest First'})
          </button>
          <button @click="${this.toggleSortPopularity}">
            Sort by Popularity (${this.popularitySortOrder === 'asc' ? 'Most Popular First' : 'Least Popular First'})
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Duration (sec)</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            ${this.filteredProfiles.map(this.renderRow)}
          </tbody>
        </table>
      </section>
    `;
  }

  static styles = css`
    section {
        font: --font-family-body;
      padding: 16px;
    }
    input {
      margin-bottom: 16px;
    }
    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      border: 1px solid #ddd;
    }
    th {
      background-color: rgb(128 0 0);
      color: rgb(214, 181, 117);
      cursor: pointer;
    }
  `;
}

customElements.define("songs-table", SongsTableElement);

