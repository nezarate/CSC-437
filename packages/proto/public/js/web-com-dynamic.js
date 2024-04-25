
export class HtmlFragmentElement extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false; 
    }

    connectedCallback() {
        const href = this.getAttribute("href");
        this.addEventListener("html-fragment:open", () => {
            if (!this.isOpen) {
                loadHTML(href, this);
                this.isOpen = true; 
            } else {
                this.replaceChildren(); 
                this.isOpen = false; 
            }
        });
    }
}

customElements.define("html-fragment", HtmlFragmentElement);


function loadHTML(href, container) {
    container.replaceChildren(); 
    fetch(href)
        .then((response) => {
            if (response.status !== 200) {
                throw `Status: ${response.status}`;
            }
            return response.text();
        })
        .then((htmlString) => {
            addFragment(htmlString, container);
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.onclick = () => closeContent(container); 
            container.appendChild(closeButton);
        })
        .catch((error) =>
            addFragment(
                `<p class="error">
                Failed to fetch ${href}: ${error}
                </p>`,
                container
            )
        );
}


function closeContent(container) {
    container.replaceChildren(); 
    if (container instanceof HtmlFragmentElement) {
        container.isOpen = false; 
    }
}

const parser = new DOMParser();
function addFragment(htmlString, container) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);
  container.append(...fragment);
}







