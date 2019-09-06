import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import './member-avatar.js';
import './my-config.js';
import './shared-styles.js';

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
      
      <my-config config="{{config}}"></my-config>

      <iron-ajax
        id="getMembersAjax"
        auto
        url="[[config.api]]/v1.0/members"
        method="get"
        handle-as="json"
        last-response="{{members}}">
      </iron-ajax>

      <div class="card">
        <h1>Members</h1>
        <vaadin-grid theme="no-border" aria-label="Members Table" items="[[members.members]]">
          <vaadin-grid-column width="80px" flex-grow="0" text-align="center">
            <template><member-avatar member-id="[[item.id]]"></member-avatar></template>
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
            <template><a href="https://www.strava.com/athletes/[[item.id]]" target="blank"><paper-icon-button icon="open-in-new" title="view in strava"></paper-icon-button></a></template>
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

        <paper-fab icon="refresh" disabled></paper-fab>

      </div>
    `;
  }

}

window.customElements.define('members-view', MembersView);
