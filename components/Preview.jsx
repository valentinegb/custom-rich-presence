import React, { Component } from "react";

import { getModule, getModuleByDisplayName } from "@vizality/webpack";
import { FormItem } from "@vizality/components/settings";
import { Spinner } from "@vizality/components";

export default class Preview extends Component {
	render() {
		const UserProfile = getModuleByDisplayName("UserProfile");
		const HelpMessage = getModuleByDisplayName("HelpMessage");
		const { getCurrentUser } = getModule("getCurrentUser");

		return (
			<div id="custom-rich-presence-preview-container">
				<FormItem title="Preview">
					<Spinner id="custom-rich-presence-preview-spinner" />
					<div
						id="custom-rich-presence-preview-notice"
						style={{ display: "none" }}
					>
						<HelpMessage messageType={2}>
							It seems that I am unable to set your Rich Presence, this is
							likely due to game activity being disabled. Enable it, then reload
							this page.
						</HelpMessage>
					</div>

					<div id="custom-rich-presence-preview" style={{ display: "none" }}>
						<UserProfile user={getCurrentUser()} />
					</div>
				</FormItem>
			</div>
		);
	}

	componentDidMount() {
		setTimeout(() => {
			const profile = document.getElementById("custom-rich-presence-preview")
				.children[0];
			profile.style = "width: auto;";
			profile.children[1].remove();
			profile.children[0].children[0].remove();

			document.getElementById("custom-rich-presence-preview-spinner").style =
				"display: none;";
			document.getElementById("custom-rich-presence-preview-container").style =
				"top: 40px; position: sticky;";

			if (
				!document.getElementsByClassName(
					getModule("activityProfile").activityProfile
				).length
			)
				return (document.getElementById(
					"custom-rich-presence-preview-notice"
				).style = "");

			document.getElementById("custom-rich-presence-preview").style = "";
		}, 500);
	}
}
