import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-meta/iron-meta.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

class MyConfig extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax auto url="/appconfig.json" handle-as="json" last-response="{{appconfig}}"></iron-ajax>
      <iron-meta id="appconfig" key="config" value$="{{appconfig}}" on-value-changed="configChanged"></iron-meta>
    `;
  }

  static get properties() {
    return {
      config: {
          type: Object,
          reflectToAttribute: true,
          readOnly: true,
          notify: true
      }
    }
  }   

  configChanged() {
    var config = this.$.appconfig.byKey('config');
    this._setConfig(JSON.parse(config));
  }

}

window.customElements.define('my-config', MyConfig);
