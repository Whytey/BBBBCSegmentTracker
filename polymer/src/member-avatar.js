import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-image/iron-image.js';
import './my-config.js';

class MemberAvatar extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      <my-config config="{{config}}"></my-config>

      <iron-ajax
        id="getConnectAjax"
        auto
        url="[[config.api]]/v1.0/members/[[memberId]]/avatar"
        method="get"
        handle-as="json"
        last-response="{{avatar}}">
      </iron-ajax>

      <iron-image style="width:32px; height:32px; background-color: blue; display: block;" sizing="contain" preload fade src="[[avatar.avatar.url]]"></iron-image>
    `;
  }

  static get properties() {
    return {
      memberId: {
        type: Number,
        reflectToAttribute: true
      }
    }
  }


}

window.customElements.define('member-avatar', MemberAvatar);
