import '@polymer/app-route/app-location';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-if';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './status-icon.js';
import '@polymer/paper-toast/paper-toast.js';

class ConnectView extends PolymerElement {
  
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        td {
          height: 50px;
          vertical-align: middle;
        }

      </style>

      <app-location id="location" query-params="{{params}}" on-query-params-changed="step1Response"></app-location>

      <iron-ajax
        id="step2Ajax"
        url="http://127.0.0.1:5000/api/v1.0/connect"
        method="post"
        content-type="application/json"
        handle-as="json"
        last-response="{{step2Response}}"
        last-error="{{step2Error}}"
        loading="{{__step2Loading}}"
        on-response="processStep2Response"
        on-error="processStep2Error">
      </iron-ajax>


      <div class="card">
        <h1>Connect</h1>
        <table>
          <tr>
            <td width="50px">
              <status-icon 
                id="step1" 
                started 
                succeeded="[[__step1Succeeded]]" 
                errored="[[__step1Errored]]">
              </status-icon>
            </td>
            <td>
              Step 1: Login to Strava
              <template is="dom-if" if="[[params.error]]">
                : [[params.error]]
              </template>
            </td>
          </tr>
          <tr>
            <td>
              <status-icon 
                id="step2" 
                started="[[__step2Loading]]" 
                succeeded="[[__step2Succeeded]]" 
                errored="[[__step2Errored]]">
              </status-icon>
            </td>
            <td>
              Step 2: Store Strava connection
              <template is="dom-if" if="[[step2Error]]">
                : [[json(step2Error.response)]]
              </template>              
            </td>
          </tr>
          <!-- <tr>
            <td>
              <status-icon id="step3"></status-icon>
          </td>
            <td>
              Step 3: Pull down Challenge Attempts from Strava
            </td>
          </tr> -->
        </table>
      </div>
    `;
  }

  static get properties() {
    return {
      step2Body: Object,
      addedUser: Object,
      __step1Succeeded: { 
        type: Boolean, 
        value: false 
      },
      __step1Errored: { 
        type: Boolean, 
        value: false 
      },
      __step2Succeeded: { 
        type: Boolean, 
        value: false 
      },
      __step2Errored: { 
        type: Boolean, 
        value: false 
      }
    }
  }


  step1Response() {
    // We have come into the page with some params, if they didn't include an error, store the connection.
    var qp = this.$.location.queryParams;
    if (!qp.error) {
      this.__step1Succeeded=true;
      this.$.step2Ajax.body = { "code": qp.code };
      this.$.step2Ajax.generateRequest();
    } else {
      this.__step1Errored=true;
    }
  }

  processStep2Response(event) {
    console.log("Step 2 responded")
    this.__step2Succeeded=true;
    this.addedUser = event.detail.response;
    console.log(this.addedUser);
  }

  processStep2Error() {
    console.log("Step 2 errored")
    this.__step2Errored=true;
  }

  json(s) {
    return JSON.stringify(s, null, 2);
  }

}

window.customElements.define('connect-view', ConnectView);
