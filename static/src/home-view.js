define(["./bbbbc-segment-tracker.js"],function(_bbbbcSegmentTracker){"use strict";(0,_bbbbcSegmentTracker.Polymer)({_template:_bbbbcSegmentTracker.html`
    <style include="paper-material-styles">
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        background-color: var(--paper-card-background-color, var(--primary-background-color));
        border-radius: 2px;

        @apply --paper-font-common-base;
        @apply --paper-card;
      }

      /* IE 10 support for HTML5 hidden attr */
      :host([hidden]), [hidden] {
        display: none !important;
      }

      .header {
        position: relative;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        overflow: hidden;

        @apply --paper-card-header;
      }

      .header iron-image {
        display: block;
        width: 100%;
        --iron-image-width: 100%;
        pointer-events: none;

        @apply --paper-card-header-image;
      }

      .header .title-text {
        padding: 16px;
        font-size: 24px;
        font-weight: 400;
        color: var(--paper-card-header-color, #000);

        @apply --paper-card-header-text;
      }

      .header .title-text.over-image {
        position: absolute;
        bottom: 0px;

        @apply --paper-card-header-image-text;
      }

      :host ::slotted(.card-content) {
        padding: 16px;
        position:relative;

        @apply --paper-card-content;
      }

      :host ::slotted(.card-actions) {
        border-top: 1px solid #e8e8e8;
        padding: 5px 16px;
        position:relative;

        @apply --paper-card-actions;
      }

      :host([elevation="1"]) {
        @apply --paper-material-elevation-1;
      }

      :host([elevation="2"]) {
        @apply --paper-material-elevation-2;
      }

      :host([elevation="3"]) {
        @apply --paper-material-elevation-3;
      }

      :host([elevation="4"]) {
        @apply --paper-material-elevation-4;
      }

      :host([elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>

    <div class="header">
      <iron-image hidden\$="[[!image]]" aria-hidden\$="[[_isHidden(image)]]" src="[[image]]" alt="[[alt]]" placeholder="[[placeholderImage]]" preload="[[preloadImage]]" fade="[[fadeImage]]"></iron-image>
      <div hidden\$="[[!heading]]" class\$="title-text [[_computeHeadingClass(image)]]">[[heading]]</div>
    </div>

    <slot></slot>
`,is:"paper-card",properties:{/**
     * The title of the card.
     */heading:{type:String,value:"",observer:"_headingChanged"},/**
     * The url of the title image of the card.
     */image:{type:String,value:""},/**
     * The text alternative of the card's title image.
     */alt:{type:String},/**
     * When `true`, any change to the image url property will cause the
     * `placeholder` image to be shown until the image is fully rendered.
     */preloadImage:{type:Boolean,value:!1},/**
     * When `preloadImage` is true, setting `fadeImage` to true will cause the
     * image to fade into place.
     */fadeImage:{type:Boolean,value:!1},/**
     * This image will be used as a background/placeholder until the src image
     * has loaded. Use of a data-URI for placeholder is encouraged for instant
     * rendering.
     */placeholderImage:{type:String,value:null},/**
     * The z-depth of the card, from 0-5.
     */elevation:{type:Number,value:1,reflectToAttribute:!0},/**
     * Set this to true to animate the card shadow when setting a new
     * `z` value.
     */animatedShadow:{type:Boolean,value:!1},/**
     * Read-only property used to pass down the `animatedShadow` value to
     * the underlying paper-material style (since they have different names).
     */animated:{type:Boolean,reflectToAttribute:!0,readOnly:!0,computed:"_computeAnimated(animatedShadow)"}},/**
   * Format function for aria-hidden. Use the ! operator results in the
   * empty string when given a falsy value.
   */_isHidden:function(image){return image?"false":"true"},_headingChanged:function(heading){var currentHeading=this.getAttribute("heading"),currentLabel=this.getAttribute("aria-label");if("string"!==typeof currentLabel||currentLabel===currentHeading){this.setAttribute("aria-label",heading)}},_computeHeadingClass:function(image){return image?" over-image":""},_computeAnimated:function(animatedShadow){return animatedShadow}});class HomeView extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html$1`
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

    `}}window.customElements.define("home-view",HomeView)});