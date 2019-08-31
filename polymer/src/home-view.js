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
import '@polymer/paper-card/paper-card.js';
import './shared-styles.js';

class HomeView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        paper-card {
          width: 400px;
        }
      </style>

      <paper-card heading="Current Challenge">
        <div class="card-content">
          Map of current challenge and top three contenders.
        </div>
      </paper-card>
      <paper-card heading="Top 5 Members">
        <div class="card-content">
          List the top five, based on current handicap.

          <p>1. Whytey</p>
          <p>2. Someone not Whytey</p>
          <p>3. Etc.</p>
        </div>
      </paper-card>
      <paper-card heading="Weather">
        <div class="card-content">
          Today's weather.
        </div>
      </paper-card>
      <paper-card heading="Club Info">
        <div class="card-content">
          Stats from the Club page on Strava.
        </div>
      </paper-card>
      <paper-card heading="Activity Stream">
        <div class="card-content">
          What's been going on with the challenges, who has attempted, etc.
        </div>
      </paper-card>

    `;
  }
}

window.customElements.define('home-view', HomeView);
