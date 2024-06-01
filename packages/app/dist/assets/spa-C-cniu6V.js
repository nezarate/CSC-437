import{u as P,f as $,s as y,O,d as f,a as C,x as l,i as w,e as k,b as m,V as _,h as z,c as D,_ as j}from"./lit-element-DDfLEKI7.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:$},U=(t=A,s,e)=>{const{kind:r,metadata:a}=e;let i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),i.set(e.name,t),r==="accessor"){const{name:n}=e;return{set(o){const d=s.get.call(this);s.set.call(this,o),this.requestUpdate(n,d,t)},init(o){return o!==void 0&&this.P(n,void 0,t),o}}}if(r==="setter"){const{name:n}=e;return function(o){const d=this[n];s.call(this,o),this.requestUpdate(n,d,t)}}throw Error("Unsupported decorator location: "+r)};function g(t){return(s,e)=>typeof e=="object"?U(t,s,e):((r,a,i)=>{const n=a.hasOwnProperty(i);return a.constructor.createProperty(i,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(a,i):void 0})(t,s,e)}var M=Object.defineProperty,T=(t,s,e,r)=>{for(var a=void 0,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=n(s,e,a)||a);return a&&M(s,e,a),a};const p=class p extends y{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new O(this,"blazing:auth")}render(){return l`
    <header>
    <div class="header-content">
        <h1>Music Discovery</h1>
        <p>A tool for your Spotify playlists</p>
    </div>
    <nav>
        <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="./contact.html">Contact</a></li>
            <drop-down>
            <a href="#" slot="actuator">
              <slot name="greeting"
                >Hello, ${this.username}</slot
              ></a
            >
            <ul>
              <li>
                <label @change=${N}>
                  <input type="checkbox" autocomplete="off" />
                  Dark mode
                </label>
              </li>
              <li>
                <a href="#" @click=${S}> Sign out </a>
              </li>
            </ul>
          </drop-down>
        </ul>
    </nav>
    <div class="header-image">
        <img src="./images/music_note.png" alt="Descriptive Alt Text">
    </div>
    </header> `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:s})=>{s&&(this.username=s.username)})}};p.uses=f({"drop-down":C.Element}),p.styles=w`
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
  
  header-content {
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
  
  header-image {
    display: flex;
    align-items: center; 
  }
  
  header-image img {
    width: 100px;
    height: auto; 
  } `;let u=p;T([g()],u.prototype,"username");function N(t){const e=t.target.checked;k.relay(t,"dark-mode",{checked:e})}function S(t){k.relay(t,"auth:message",["auth/signout"])}const q={};function F(t,s,e){switch(t[0]){case"profile/save":J(t[1],e).then(a=>s(i=>({...i,profile:a})));break;case"profile/select":B(t[1],e).then(a=>s(i=>({...i,profile:a})));break;case"tour/select":break;default:const r=t[0];throw new Error(`Unhandled Auth message "${r}"`)}}function J(t,s){return fetch(`/api/profiles/${t.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...m.headers(s)},body:JSON.stringify(t.profile)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return e})}function B(t,s){return fetch(`/api/profiles/${t.userid}`,{headers:m.headers(s)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}var E=Object.defineProperty,G=Object.getOwnPropertyDescriptor,x=(t,s,e,r)=>{for(var a=r>1?void 0:r?G(s,e):s,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=(r?n(s,e,a):n(a))||a);return r&&a&&E(s,e,a),a};const v=class v extends y{render(){return l`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button class="new">New…</button>
          <button class="edit">Edit</button>
          <button class="close">Close</button>
          <button class="delete">Delete</button>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
          <dt>Nickname</dt>
          <dd><slot name="nickname"></slot></dd>
          <dt>Home City</dt>
          <dd><slot name="home"></slot></dd>
          <dt>Airports</dt>
          <dd><slot name="airports"></slot></dd>
        </dl>
      </section>
    `}};v.styles=w`
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
    }
    h1 {
      grid-row: 4;
      grid-column: value;
    }
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
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
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
  `;let h=v;const b=class b extends _{constructor(){super("blazing:model"),this.userid=""}get profile(){return this.model.profile}attributeChangedCallback(s,e,r){s==="user-id"&&e!==r&&r&&(console.log("Profiler Page:",r),this.dispatchMessage(["profile/select",{userid:r}])),super.attributeChangedCallback(s,e,r)}render(){const{name:s,artists:e=[],album:r,genre:a,duration_ms:i,popularity:n}=this.profile||{},o=e.map(d=>l`
          <li>${d}</li>
        `);return l`
      <profile-viewer>
        <span slot="name">${s}</span>
        <ul slot="artists">
        ${o}
      </ul>
        <span slot="album">${r}</span>
        <span slot="genre">${a}</span>
        <span slot="duration">${i}</span>
        <span slot="popularity">${n}</span>
      </profile-viewer>
    `}};b.uses=f({"profile-viewer":h});let c=b;x([g({attribute:"user-id",reflect:!0})],c.prototype,"userid",2);x([g()],c.prototype,"profile",1);const H=[{path:"/app/profile/:id",view:t=>l`
        <profile-view user-id=${t.id}></profile-view>
      `},{path:"/app",view:()=>l`
        <landing-view></landing-view>
      `},{path:"/",redirect:"/app"}];f({"mu-auth":m.Provider,"mu-history":z.Provider,"mu-store":class extends D.Provider{constructor(){super(F,q,"blazing:auth")}},"mu-switch":class extends j.Element{constructor(){super(H,"blazing:history")}},"blazing-header":u,"profile-view":c});
