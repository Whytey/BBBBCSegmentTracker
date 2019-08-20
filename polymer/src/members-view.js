/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './shared-styles.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-grid/vaadin-grid.js'
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-fab/paper-fab.js';



class MembersView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

    paper-fab {
        position: fixed;
        right: 25px;
        bottom: 30px;
    }
      </style>

      <iron-ajax
        id="getMembersAjax"
        auto
        url="http://127.0.0.1:5000/api/v1.0/members"
        method="get"
        handle-as="json"
        last-response="{{members}}">
      </iron-ajax>

      <div class="card">
        <h1>Members</h1>
        <vaadin-grid theme="no-border" aria-label="Member Table" items="[[members.members]]">
          <vaadin-grid-column width="60px" flex-grow="0" text-align="center">
            <template><iron-image style="width:50px; height:50px; background-color: blue; display: block; " width="30" height="30" sizing="cover" preload fade src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/308150/139501/1/medium.jpg"></iron-image></template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Name</template>
            <template>[[item.first_name]] [[item.last_name]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column text-align="center">
            <template class="header">Current Handicap</template>
            <template>1.0</template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Strava link -->
            <template><a href="https://www.strava.com/athletes/[[item.id]]" target="blank"><paper-icon-button icon="open-in-browser" title="show in strava"></paper-icon-button></a></template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Resync Activities -->
            <template><paper-icon-button icon="cached" title="resync activities" disabled></paper-icon-button></template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Disconnect/Delete -->
            <template><paper-icon-button icon="delete" title="delete" disabled></paper-icon-button></template>
          </vaadin-grid-column>
        </vaadin-grid>

        <paper-fab icon="add"></paper-fab>

      </div>
    `;
  }

}

window.customElements.define('members-view', MembersView);
