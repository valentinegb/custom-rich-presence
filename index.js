import React from 'react';
import { Plugin } from '@vizality/entities';

import { getModule } from '@vizality/webpack';

import Settings from './components/Settings';

const { SET_ACTIVITY } = getModule('INVITE_BROWSER');

const defaults = {
  name: 'Custom Rich Presence',
  id: '834520573135814757',
  details: 'Vizality Plugin',
  state: 'Browsing Discord',
  timestamps: {
    start: true
  },
  large_image: 'custom_rich_presence',
  small_image: 'vz',
  large_text: '',
  small_text: 'Vizality',
  button1: {
    label: 'Custom Rich Presence',
    url: 'https://github.com/v-briese/custom-rich-presence'
  },
  button2: { label: 'Vizality', url: 'https://vizality.com' }
};

export default class CustomRichPresence extends Plugin {
  start () {
    this.registerSettings((props) => (
      <Settings
        setActivity={this.setActivity.bind(this)}
        defaults={defaults}
        {...props}
      />
    ));

    this.setActivity();
  }

  stop () {
    this.setActivity(true);
  }

  setActivity (clear) {
    const button1 = this.settings.get('button1', defaults.button1);
    const button2 = this.settings.get('button2', defaults.button2);

    const buttons = [];

    (button1.label && button1.url) && buttons.push(button1);
    (button2.label && button2.url) && buttons.push(button2);

    SET_ACTIVITY.handler({
      socket: {
        transport: getModule('TransportTypes').TransportTypes.IPC,
        application: {
          name: this.settings.get('name', defaults.name),
          id: this.settings.get('id', defaults.id)
        }
      },
      args: {
        pid: 7777777777777777, // Fun fact: my favourite number is 7 :)
        activity: !clear
          ? {
            state: this.settings.get('state', defaults.state) || undefined,
            details: this.settings.get('details', defaults.details) || undefined,
            timestamps: this.settings.get('timestamps_start', defaults.timestamps.start)
              ? {
                start: Date.now()
              }
              : undefined,
            assets: {
              large_image: this.settings.get(
                'large_image',
                defaults.large_image
              ) || undefined,
              large_text: this.settings.get('large_text', defaults.large_text) || undefined,
              small_image: this.settings.get(
                'small_image',
                defaults.small_image
              ) || undefined,
              small_text: this.settings.get('small_text', defaults.small_text) || undefined
            },
            buttons: buttons || undefined
          }
          : null
      }
    });
  }
}
