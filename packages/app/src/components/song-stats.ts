import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import Chart from "chart.js/auto";
import { Profile } from "server/models";


interface HTMLCanvasElement {
  [x: string]: any;
  chart?: Chart;
}

export class SongStatsElement extends LitElement {
  @property({ type: Array })
  profiles: Profile[] = [];

  firstUpdated() {
    this.renderCharts();
  }

  updated() {
    this.renderCharts();
  }

  renderCharts() {
    const genreCanvas = this.shadowRoot?.getElementById("genreChart") as HTMLCanvasElement;

    if (genreCanvas) {
      this.createGenreChart(genreCanvas);
    }
  }

  createGenreChart(canvas: HTMLCanvasElement) {
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return; 
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.getGenreLabels(),
        datasets: [{
          label: 'Genres',
          data: this.getGenreData(),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getGenreLabels() {
    const genres = this.profiles.map(profile => profile.genre);
    return Array.from(new Set(genres));
  }

  getGenreData() {
    const genreCount: { [key: string]: number } = {};
    this.profiles.forEach(profile => {
      if (genreCount[profile.genre]) {
        genreCount[profile.genre]++;
      } else {
        genreCount[profile.genre] = 1;
      }
    });
    return this.getGenreLabels().map(genre => genreCount[genre]);
  }

  render() {
    return html`
      <section>
        <h3>Song Statistics (Genre Distribution)</h3>
        <canvas id="genreChart"></canvas>
      </section>
    `;
  }

  static styles = css`
    section {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    canvas {
      width: 100% !important;
      height: auto !important;
    }
  `;
}

customElements.define("song-stats", SongStatsElement);
