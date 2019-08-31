define(["./bbbbc-segment-tracker.js"],function(_bbbbcSegmentTracker){"use strict";class MemberAvatar extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html$1`
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
    `}static get properties(){return{memberId:{type:Number,reflectToAttribute:!0}}}}window.customElements.define("member-avatar",MemberAvatar);class MembersView extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html$1`
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
    `}}window.customElements.define("members-view",MembersView)});