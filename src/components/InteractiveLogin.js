import "./AvatarAvocado.js";

class InteractiveLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 350px;
        --height: 550px;
        --font-family: Montserrat, sans-serif;
        font-size: 16px;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: var(--width);
        height: var(--height);
        border: 1px solid #555;
        background: #fff;
        padding: 30px;
        box-shadow: 10px 10px 5px #0004;
        font-family: var(--font-family);
      }

      .avatar {
        --width: 200px;
        --height: 200px;

        width: var(--width);
        height: var(--height);
        background: #CCDF8C;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #cc9;
      }

      h2 {
        color: #444;
        font-size: 2rem;
      }

      form {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      form label {
        position: relative;
        width: 100%;
        height: 50px;
        margin: 5px 0;
      }

      form label::before {
        content: attr(id);
        text-transform: capitalize;
        position: relative;
        z-index: 5;
        color: #888;
        font-weight: 300;
        font-size: 0.8rem;
        padding: 5px;
      }

      form :is(input[type="text"], input[type="password"]) {
        width: 100%;
        height: 100%;
        border: 1px solid #bbb;
        border-radius: 4px;
        background: #eee;
        color: #111;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding-top: 12px;
        padding-left: 5px;
        font-size: 1rem;
      }

      form input:focus {
        border: 0;
        outline: 1px solid #666;
      }

      form button {
        border: 0;
        border-radius: 20px;
        height: 50px;
        background: #83B84F;
        font-family: var(--font-family);
        font-weight: 300;
        font-size: 1.1rem;
        color: #fff;
        margin-top: 6px;
      }

      form button:hover {
        background: #539313;
        cursor: pointer;
      }

      form button:active {
        background: #19aa67;
      }

      p,
      p a {
        color: #555;
        font-weight: 300;
      }

      p a:hover {
        color: #f33;
      }

      #spy {
        background: blue;
        color: white;
        visibility: hidden;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.email = this.shadowRoot.querySelector("#email input");
    this.password = this.shadowRoot.querySelector("#password input");
    this.avatar = this.shadowRoot.querySelector("avatar-avocado");
    this.spy = this.shadowRoot.querySelector("#spy");

    this.email.addEventListener("input", () => this.onEmailInput());
    this.email.addEventListener("focus", () => this.onEmailEnter());
    this.password.addEventListener("focus", () => this.avatar.toggleBlind());
    this.password.addEventListener("blur", () => this.avatar.toggleBlind());
  }

  onEmailEnter() {
    this.avatar.showFace();
  }

  onEmailInput() {
    this.spy.textContent = this.email.value;
    const size = parseFloat(getComputedStyle(this.spy).width);

    const isStart = size >= 0 && size <= 100;
    const isLeft = size > 100 && size <= 170;
    const isMiddle = size > 170 && size <= 280;
    const isRight = size > 280 && size <= 400;

    const value = isStart
      ? 0
      : isLeft
        ? 1
        : isMiddle
          ? 2
          : isRight ? 3 : 4;

    this.avatar.setEyeX(value);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${InteractiveLogin.styles}</style>
    <div class="container">
      <div class="avatar">
        <avatar-avocado></avatar-avocado>
      </div>
      <h2>Account Manz.dev</h2>
      <form>
        <label id="email"><input type="text"></label>
        <label id="password"><input type="password"></label>
        <button>Create Account</button>
      </form>
      <p>
        Or <a href="#">use an existing account</a>
      </p>
      <data id="spy"></data>
    </div>`;
  }
}

customElements.define("interactive-login", InteractiveLogin);
