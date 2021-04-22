import React, { Component } from "react";

import { getModule, getModuleByDisplayName } from "@vizality/webpack";
import {
	SwitchItem,
	TextInput,
	Category,
	FormItem,
} from "@vizality/components/settings";
import { Flex } from "@vizality/components";

export default class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category0Opened: false,
			category1Opened: false,
		};
	}

	render() {
		const {
			getSetting,
			updateSetting,
			toggleSetting,
			reloadRichPresence,
			defaults,
		} = this.props;

		const UserProfile = getModuleByDisplayName("UserProfile");
		const { getCurrentUser } = getModule("getCurrentUser");

		return (
			<Flex justify={Flex.Justify.BETWEEN} align={Flex.Align.START}>
				<Flex.Child
					grow={2}
					style={{
						paddingRight: "20px",
						borderRight: "thin solid var(--background-modifier-accent)",
						marginRight: "20px",
					}}
				>
					<SwitchItem
						value={getSetting("show_time", true)}
						onChange={() => {
							toggleSetting("show_time");
							reloadRichPresence();
						}}
					>
						Show Time
					</SwitchItem>
					<TextInput
						defaultValue={getSetting("app_id", defaults.app_id)}
						required={true}
						onChange={(value) => {
							updateSetting("app_id", value);
							reloadRichPresence();
						}}
					>
						Application ID
					</TextInput>
					<TextInput
						defaultValue={getSetting("name", defaults.name)}
						onChange={(value) => {
							updateSetting("name", value);
							reloadRichPresence();
						}}
					>
						Name
					</TextInput>
					<TextInput
						defaultValue={getSetting("details", defaults.details)}
						onChange={(value) => {
							updateSetting("details", value);
							reloadRichPresence();
						}}
					>
						Details
					</TextInput>
					<TextInput
						defaultValue={getSetting("state", defaults.state)}
						onChange={(value) => {
							updateSetting("state", value);
							reloadRichPresence();
						}}
					>
						State
					</TextInput>

					<Category
						name="Images"
						description="Select a large/small image and (optionally) define their tooltip text."
						opened={this.state.category0Opened}
						onChange={() => {
							this.setState({
								category1Opened: false,
								category0Opened: !this.state.category0Opened,
							});
						}}
					>
						<TextInput
							note="This should be the name of your large image's asset."
							defaultValue={getSetting("large_image", defaults.large_image)}
							onChange={(value) => {
								updateSetting("large_image", value);
								reloadRichPresence();
							}}
						>
							Large Image
						</TextInput>
						<TextInput
							note="This text will appear as a tooltip when hovering over the large image."
							defaultValue={getSetting("large_text", defaults.large_text)}
							onChange={(value) => {
								updateSetting("large_text", value);
								reloadRichPresence();
							}}
						>
							Large Text
						</TextInput>
						<TextInput
							note="This should be the name of your small image's asset."
							defaultValue={getSetting("small_image", defaults.small_image)}
							onChange={(value) => {
								updateSetting("small_image", value);
								reloadRichPresence();
							}}
						>
							Small Image
						</TextInput>
						<TextInput
							note="This text will appear as a tooltip when hovering over the small image."
							defaultValue={getSetting("small_text", defaults.small_text)}
							onChange={(value) => {
								updateSetting("small_text", value);
								reloadRichPresence();
							}}
						>
							Small Text
						</TextInput>
					</Category>

					<Category
						name="Buttons"
						description="Define up to two buttons."
						opened={this.state.category1Opened}
						onChange={() => {
							this.setState({
								category0Opened: false,
								category1Opened: !this.state.category1Opened,
							});
						}}
					>
						<TextInput
							defaultValue={getSetting("button1", defaults.button1).label}
							onChange={(val) => {
								let button1 = getSetting("button1", defaults.button1);
								button1.label = val;
								updateSetting("button1", button1);
								if (button1.url != "") {
									reloadRichPresence();
								}
							}}
						>
							Button 1 Text
						</TextInput>
						<TextInput
							defaultValue={getSetting("button1", defaults.button1).url}
							onChange={(val) => {
								let button1 = getSetting("button1", defaults.button1);
								button1.url = val;
								updateSetting("button1", button1);
								if (button1.label != "") {
									reloadRichPresence();
								}
							}}
						>
							Button 1 Url
						</TextInput>
						<TextInput
							defaultValue={getSetting("button2", defaults.button2).label}
							onChange={(val) => {
								let button2 = getSetting("button2", defaults.button2);
								button2.label = val;
								updateSetting("button2", button2);
								if (button2.url != "") {
									reloadRichPresence();
								}
							}}
						>
							Button 2 Text
						</TextInput>
						<TextInput
							defaultValue={getSetting("button2", defaults.button2).url}
							onChange={(val) => {
								let button2 = getSetting("button2", defaults.button2);
								button2.url = val;
								updateSetting("button2", button2);
								if (button2.label != "") {
									reloadRichPresence();
								}
							}}
						>
							Button 2 Url
						</TextInput>
					</Category>
				</Flex.Child>

				<div style={{ top: "40px", position: "sticky" }}>
					<FormItem title="Preview">
						<UserProfile user={getCurrentUser()} />
						{
							//todo Figure how to get the note to behave in UserPopout so that can be used instead
						}
					</FormItem>
				</div>
			</Flex>
		);
	}
}
