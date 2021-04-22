import React from "react";
import { Plugin } from "@vizality/entities";

import { getModule } from "@vizality/webpack";

import Settings from "./components/Settings";

const { SET_ACTIVITY } = getModule("INVITE_BROWSER", false);

const defaults = {
	app_id: "834520573135814757",
	name: "Custom Rich Presence",
	details: "Browsing Discord",
	state: "Vizality",
	large_image: "custom_rich_presence",
	large_text: "Custom Rich Presence",
	small_image: "vizality",
	small_text: "Vizality",
	button1: {
		label: "Custom Rich Presence",
		url: "https://github.com/v-briese/custom-rich-presence",
	},
	button2: { label: "Vizality", url: "https://vizality.com" },
};

export default class CustomRichPresence extends Plugin {
	start() {
		this.registerSettings((props) => (
			<Settings
				reloadRichPresence={this.reloadRichPresence.bind(this)}
				defaults={defaults}
				{...props}
			/>
		));

		setTimeout(() => {
			SET_ACTIVITY.handler({
				socket: {
					id: 100,
					application: {
						id: this.settings.get("app_id", defaults.app_id),
						name: this.settings.get("name", defaults.name),
					},
					transport: "ipc",
				},
				args: {
					pid: 10,
					activity: this.game(),
				},
			});
		}, 1000);
	}

	stop() {
		SET_ACTIVITY.handler({
			socket: {
				id: 100,
				application: {
					id: this.settings.get("app_id", defaults.app_id),
					name: this.settings.get("name", defaults.name),
				},
				transport: "ipc",
			},
			args: {
				pid: 10,
				activity: undefined,
			},
		});
	}

	game() {
		let rp = {
			details: this.settings.get("details", defaults.details),
			state: this.settings.get("state", defaults.state),
			timestamps: this.settings.get("show_time", true)
				? {
						start: Date.now(),
				  }
				: undefined,
			assets: {
				large_image: this.settings.get("large_image", defaults.large_image),
				small_image: this.settings.get("small_image", defaults.small_image),
				large_text: this.settings.get("large_text", defaults.large_text),
				small_text: this.settings.get("small_text", defaults.small_text),
			},
		};

		let buttons = [];
		if (
			this.settings.get("button1", defaults.button1).label != "" &&
			this.settings.get("button1", defaults.button1).url != ""
		)
			buttons.push(this.settings.get("button1", defaults.button1));
		if (
			this.settings.get("button2", defaults.button2).label != "" &&
			this.settings.get("button2", defaults.button2).url != ""
		)
			buttons.push(this.settings.get("button2", defaults.button2));
		if (buttons[0]) rp.buttons = buttons;
		return rp;
	}

	reloadRichPresence() {
		SET_ACTIVITY.handler({
			socket: {
				id: 100,
				application: {
					id: this.settings.get("app_id", defaults.app_id),
					name: this.settings.get("name", defaults.name),
				},
				transport: "ipc",
			},
			args: {
				pid: 10,
				activity: this.game(),
			},
		});
	}
}
