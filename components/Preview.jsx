import React, { Component } from "react";

import { getModule, getModuleByDisplayName } from "@vizality/webpack";
import { FormItem } from "@vizality/components/settings";
import { Spinner } from "@vizality/components";

export default class Preview extends Component {
	render() {
		const UserProfile = getModuleByDisplayName("UserProfile");
		const { getCurrentUser } = getModule("getCurrentUser");

		return (
			<>
				<Spinner id="custom-rich-presence-preview-spinner" />
				<div id="custom-rich-presence-preview" style={{ display: "none" }}>
					<FormItem title="Preview">
						<UserProfile user={getCurrentUser()} />
					</FormItem>
				</div>
			</>
		);
	}

	componentDidMount() {
		setTimeout(() => {
			const profile = document.getElementById("custom-rich-presence-preview")
				.children[0].children[1];

			profile.style = "width: auto;";
			profile.children[1].remove();
			profile.children[0].children[0].remove();

			document.getElementById("custom-rich-presence-preview-spinner").style =
				"display: none;";
			document.getElementById("custom-rich-presence-preview").style =
				"top: 40px; position: sticky;";
		}, 500);
	}
}
