define(["./bbbbc-segment-tracker.js"],function(_bbbbcSegmentTracker){"use strict";class ChallengesView extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html$1`
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
    `}}window.customElements.define("challenges-view",ChallengesView)});