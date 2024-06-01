import {
    Auth,
    History,
    Store,
    Switch,
    define
  } from "@calpoly/mustang";
  import { html } from "lit";
  import { SongHeaderElement } from "./components/song-header";
  import { Msg } from "./messages";
  import { Model, init } from "./model";
  import update from "./update";
  import { ProfileViewElement } from "./views/profile-view";
  import { AboutViewElement } from "./views/about-view";
  import{SongsTableElement} from "./components/songs-table"
  import { TourViewElement } from "./views/main-view";
  import { ContactViewElement } from "./views/contact-view";
  
  const routes = [
    {
      path: "/app/profile/:id",
      view: (params: Switch.Params) => html`
        <profile-view user-id=${params.id}></profile-view>
      `
    },
    {
      path: "/app/profile/:id/edit",
      view: (params: Switch.Params) => html`
        <profile-view edit user-id=${params.id}></profile-view>
      `
    },
    {
      path: "/app",
      view: () => html`
        <tour-view></tour-view>
        <landing-view></landing-view>
      `
    },
    {
      path: "/app/about",
      view: () => html`
        <about-view></about-view>
      `
    },
    {
      path: "/app/contact",
      view: () => html`
        <contact-view></contact-view>
      `
    },
    
    {
      path: "/",
      redirect: "/app"
    }
  ];
  
  define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore extends Store.Provider<
      Model,
      Msg
    > {
      constructor() {
        super(update, init, "blazing:auth");
      }
    },
    "mu-switch": class AppSwitch extends Switch.Element {
      constructor() {
        super(routes, "blazing:history");
      }
    },
    "song-header": SongHeaderElement,
    "profile-view": ProfileViewElement,
    "about-view": AboutViewElement,
    "songs-table": SongsTableElement,
    "tour-view": TourViewElement,
    "contact-view": ContactViewElement
    
  });