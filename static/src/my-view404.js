define(["./bbbbc-segment-tracker.js"],function(_bbbbcSegmentTracker){"use strict";class MyView404 extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      Oops you hit a 404. <a href="[[rootPath]]">Head back to home.</a>
    `}}window.customElements.define("my-view404",MyView404)});