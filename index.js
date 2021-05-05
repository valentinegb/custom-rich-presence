import React from "react";
import { Plugin } from "@vizality/entities";

import { getModule } from "@vizality/webpack";

import Settings from "./components/Settings";

const { SET_ACTIVITY } = getModule("INVITE_BROWSER");

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
				setActivity={this.setActivity.bind(this)}
				defaults={defaults}
				{...props}
			/>
		));

		this.setActivity();
	}

	stop() {
		this.setActivity(true);
	}

	setActivity(clear) {
		const button1 = this.settings.get("button1", defaults.button1);
		const button2 = this.settings.get("button2", defaults.button2);

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
				activity: clear
					? undefined
					: {
							state: this.settings.get("state", defaults.state),
							details: this.settings.get("details", defaults.details),
							timestamps: this.settings.get("show_time_start", true)
								? {
										start: Date.now(),
								  }
								: undefined,
							assets: {
								large_image: this.settings.get(
									"large_image",
									defaults.large_image
								),
								large_text: this.settings.get(
									"large_text",
									defaults.large_text
								),
								small_image: this.settings.get(
									"small_image",
									defaults.small_image
								),
								small_text: this.settings.get(
									"small_text",
									defaults.small_text
								),
							},
							buttons: [
								button1 != { label: "", url: "" } ? button1 : undefined,
								button2 != { label: "", url: "" } ? button2 : undefined,
							],
					  },
			},
		});
	}
}
