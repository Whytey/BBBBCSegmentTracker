define(["./bbbbc-segment-tracker.js"],function(_bbbbcSegmentTracker){"use strict";class HomeView extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
      </div>
    `}}window.customElements.define("home-view",HomeView)});