import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import './shared-styles.js';
import './my-config.js';

class ChallengesView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      
      <my-config config="{{config}}"></my-config>

      <iron-ajax
        id="getMembersAjax"
        auto
        url="[[config.api]]/v1.0/challenges"
        method="get"
        handle-as="json"
        last-response="{{challenges}}">
      </iron-ajax>

      <div class="card">
        <h1>Challenges</h1>
        <vaadin-grid theme="no-border" aria-label="Challenges Table" items="[[challenges.challenges]]">
          <vaadin-grid-column>
            <template class="header">Name</template>
            <template>[[item.segment_name]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Start Date</template>
            <template>[[item.date_from]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">End Date</template>
            <template>[[item.date_to]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Strava link -->
            <template><a href="https://www.strava.com/segments/[[item.segment_id]]" target="blank"><paper-icon-button icon="open-in-new" title="view in strava"></paper-icon-button></a></template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }
}

window.customElements.define('challenges-view', ChallengesView);
