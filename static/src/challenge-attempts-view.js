define(["./bbbbc-segment-tracker.js"],function(_bbbbcSegmentTracker){"use strict";class ChallengeAttemptsView extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html$1`
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
        id="getAttemptsAjax"
        auto
        url="[[appconfig.api]]/v1.0/attempts/[[challenge.id]]"
        method="get"
        handle-as="json"
        last-response="{{attempts}}">
      </iron-ajax>

      <div class="card">
        <h1>Attempts</h1>
        <p>Challenge: [[attempts.challenge.segment_name]]</p>
        <vaadin-grid theme="no-border" aria-label="Members Table" items="[[attempts.attempts]]">
          <vaadin-grid-column width="80px" flex-grow="0" text-align="center">
            <template><member-avatar member-id="[[item.member_id]]"></member-avatar></template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Name</template>
            <template>[[item.member_id]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column text-align="center">
            <template class="header">Attempt Timestamp</template>
            <template>
              <date-formatter datetime="[[item.activity_timestamp]]" format="UTC:dd-mmm-yy HH:MM"></date-formatter>
            </template>
          </vaadin-grid-column>
          <vaadin-grid-column text-align="center">
            <template class="header">Recorded Time (s)</template>
            <template>[[item.recorded_time_secs]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Strava link -->
            <template><a href="https://www.strava.com/segment_efforts/[[item.id]]" target="blank"><paper-icon-button icon="open-in-new" title="view in strava"></paper-icon-button></a></template>
          </vaadin-grid-column>
        </vaadin-grid>


      </div>
    `}static get properties(){return{challenge:{type:Object}}}stringify(obj){return JSON.stringify(obj)}}window.customElements.define("challenge-attempts-view",ChallengeAttemptsView)});