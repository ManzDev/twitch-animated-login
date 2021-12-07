import savocado from "../assets/savocado.svg?raw";

class AvatarAvocado extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --x: 0px;
        --y: 3px;
        --avocado-y: 60px;
        --blur-opacity: 0;
      }

      svg {
        width: var(--width);
        height: var(--height);
      }

      .show {
        --avocado-y: 0px;
      }

      #layer1 {
        transform: translateY(var(--avocado-y)) rotateZ(1deg);
        transition: transform 0.5s ease-in-out;
      }

      #left-pupil {
        transform: translate(var(--x), var(--y));
      }

      #right-pupil {
        transform: translate(var(--x), var(--y));
      }

      #blur-left,
      #blur-right {
        opacity: var(--blur-opacity);
        transition: opacity 0.75s ease;
      }

      .avocamouth.sad {
        transform-origin: 50% 50%;
        transform: scaleY(-1) translateY(-25px);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  setEyeX(x) {
    this.style.setProperty("--x", `${x}px`);
  }

  showFace() {
    this.shadowRoot.querySelector("#layer1").classList.add("show");
  }

  toggleBlind() {
    const avocaMouth = this.shadowRoot.querySelector(".avocamouth");
    const value = avocaMouth.classList.contains("sad") ? 0 : 1;
    this.style.setProperty("--blur-opacity", value);
    avocaMouth.classList.toggle("sad");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${AvatarAvocado.styles}</style>
    <div class="container">
      ${savocado}
    </div>`;
  }
}

customElements.define("avatar-avocado", AvatarAvocado);
