import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-image/iron-image.js';
import './my-config.js';

class ConnectButton extends PolymerElement {
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
        url="[[config.api]]/v1.0/connect"
        method="get"
        params='{{__getRedirectURL()}}'
        handle-as="json"
        last-response="{{connect}}">
      </iron-ajax>

      <a href="[[connect.url]]"><iron-image src="/images/btn_strava_connectwith_orange.png"></iron-image></a>
    `;
  }

  __getRedirectURL() {
    var url = new URL(document.location);
    url.pathname = "connect-view";

    console.log(url.toString());

    var params = {"redirect_url": url.toString()};
    return params;

  }
}

window.customElements.define('connect-button', ConnectButton);
