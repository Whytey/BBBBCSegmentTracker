import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';


class MyConfig extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax auto url="/appconfig.json" handle-as="json" last-response="{{appconfig}}"></iron-ajax>
      <app-localstorage-document key="config" data="{{appconfig}}"></app-localstorage-document>
    `;
  }
}

window.customElements.define('my-config', MyConfig);
