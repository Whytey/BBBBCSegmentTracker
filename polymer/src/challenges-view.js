import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import './date-formatter.js';
import './shared-styles.js';

class ChallengesView extends PolymerElement {
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
      
      <app-localstorage-document key="config" data="{{appconfig}}"></app-localstorage-document>

      <iron-ajax
        id="getMembersAjax"
        auto
        url="[[appconfig.api]]/v1.0/challenges"
        method="get"
        handle-as="json"
        last-response="{{challenges}}">
      </iron-ajax>

      <div class="card">
        <h1>Challenges</h1>
        <vaadin-grid theme="no-border" aria-label="Challenges Table" items="[[challenges.challenges]]">
          <vaadin-grid-column>
            <template class="header">Name</template>
            <template>
              <a href="challenge-attempts-view/[[item.id]]">
                [[item.segment_name]]
              </a>
            </template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Start Date</template>
            <template>
              <date-formatter datetime="[[item.date_from]]" format="dd-mmm-yy"></date-formatter>
            </template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">End Date</template>
            <template>
              <date-formatter datetime="[[item.date_to]]" format="dd-mmm-yy"></date-formatter>
            </template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Strava link -->
            <template><a href="https://www.strava.com/segments/[[item.segment_id]]" target="blank"><paper-icon-button icon="open-in-new" title="view in strava"></paper-icon-button></a></template>
          </vaadin-grid-column>
        </vaadin-grid>

        <paper-fab icon="add" disabled></paper-fab>

      </div>
    `;
  }
}

window.customElements.define('challenges-view', ChallengesView);
