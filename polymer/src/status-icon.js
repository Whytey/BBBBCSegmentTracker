import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-spinner/paper-spinner-lite';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

class StatusIcon extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }

        paper-spinner-lite {
          width: 24px;
          height: 24px;
        }        
      </style>

      <template is="dom-if" if="[[_showNotStarted(started, errored, succeeded)]]">
        <iron-icon icon="radio-button-unchecked"></iron-icon>
      </template>
      <template is="dom-if" if="[[_showStarted(started, errored, succeeded)]]">
        <paper-spinner-lite active></paper-spinner-lite>
      </template>
      <template is="dom-if" if="[[errored]]">
        <iron-icon icon="error-outline"></iron-icon>
      </template>
      <template is="dom-if" if="[[succeeded]]">
        <iron-icon icon="check-circle"></iron-icon>
      </template>
    `;
  }

  static get properties() {
    return {
      id: String,
      started: { 
        type: Boolean, 
        value: false 
      },
      errored: { 
        type: Boolean, 
        value: false 
      },
      succeeded: { 
        type: Boolean, 
        value: false 
      }
    }
  }

  _showNotStarted(started, errored, succeeded) {
    console.log(this.id+":_showNotStarted("+started+", "+errored+", "+succeeded+")");
    return !started && !(errored || succeeded);
  }

  _showStarted(started, errored, succeeded) {
    console.log(this.id+":_showStarted("+started+", "+errored+", "+succeeded+")");
    return started && !(errored || succeeded);
  }

  _showErrored(started, errored, succeeded) {
    console.log(this.id+":_showErrored("+started+", "+errored+", "+succeeded+")");
    return started && !(errored || succeeded);
  }

  _showSucceeded(started, errored, succeeded) {
    console.log(this.id+":_showSucceeded("+started+", "+errored+", "+succeeded+")");
    return started && !(errored || succeeded);
  }
}

window.customElements.define('status-icon', StatusIcon);
