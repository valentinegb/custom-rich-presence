import React, { Component } from "react";

import {
	SwitchItem,
	TextInput,
	Category,
	FormTitle,
} from "@vizality/components/settings";
import { Flex, FormNotice } from "@vizality/components";
import { getModule } from "@vizality/webpack";

import Preview from "./Preview";

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

		const { FormSection } = getModule("FormSection");
		const { marginBottom40 } = getModule("marginBottom40");

		return (
			<Flex justify={Flex.Justify.BETWEEN} align={Flex.Align.START}>
				<Flex.Child
					grow={2}
					style={
						getSetting("sticky_preview", false) && {
							paddingRight: "20px",
							borderRight: "thin solid var(--background-modifier-accent)",
							marginRight: "20px",
						}
					}
				>
					<FormNotice
						title="Before Anything"
						body="Make sure you have game activity enabled or the plugin won't work!"
						type={FormNotice.Types.PRIMARY}
						className={marginBottom40}
					/>

					<SwitchItem
						note="When Sticky Preview is enabled, the preview will stick to the right so that you can always see it."
						value={getSetting("sticky_preview", false)}
						onChange={() => {
							toggleSetting("sticky_preview");
						}}
					>
						Sticky Preview
					</SwitchItem>
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
						note={
							<div
								class={getModule("markup").markup}
								style={{ color: "var(--header-secondary)" }}
							>
								Influences what assets are available for use as images. (Default
								value: <code class="inline">{defaults.app_id}</code>)
							</div>
						}
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
						note="First line, bold."
						defaultValue={getSetting("name", defaults.name)}
						onChange={(value) => {
							updateSetting("name", value);
							reloadRichPresence();
						}}
					>
						Name
					</TextInput>
					<TextInput
						note="Second line unless previous input is empty."
						defaultValue={getSetting("details", defaults.details)}
						onChange={(value) => {
							updateSetting("details", value);
							reloadRichPresence();
						}}
					>
						Details
					</TextInput>
					<TextInput
						note="Third line unless any previous inputs are empty."
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
						<FormSection className={marginBottom40}>
							<FormTitle>Large Image</FormTitle>

							<TextInput
								note="This should be the name of your large image's asset."
								defaultValue={getSetting("large_image", defaults.large_image)}
								onChange={(value) => {
									updateSetting("large_image", value);
									reloadRichPresence();
								}}
							>
								Asset
							</TextInput>
							<TextInput
								note="This text will appear as a tooltip when hovering over the large image."
								defaultValue={getSetting("large_text", defaults.large_text)}
								onChange={(value) => {
									updateSetting("large_text", value);
									reloadRichPresence();
								}}
							>
								Text
							</TextInput>
						</FormSection>

						<FormSection className={marginBottom40}>
							<FormTitle>Small Image</FormTitle>

							<TextInput
								note="This should be the name of your small image's asset."
								defaultValue={getSetting("small_image", defaults.small_image)}
								onChange={(value) => {
									updateSetting("small_image", value);
									reloadRichPresence();
								}}
							>
								Asset
							</TextInput>
							<TextInput
								note="This text will appear as a tooltip when hovering over the small image."
								defaultValue={getSetting("small_text", defaults.small_text)}
								onChange={(value) => {
									updateSetting("small_text", value);
									reloadRichPresence();
								}}
							>
								Text
							</TextInput>
						</FormSection>
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
						<FormSection className={marginBottom40}>
							<FormTitle>Button 1</FormTitle>

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
								Text
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
								Url
							</TextInput>
						</FormSection>

						<FormSection>
							<FormTitle>Button 2</FormTitle>

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
								Text
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
								Url
							</TextInput>
						</FormSection>
					</Category>

					{!getSetting("sticky_preview", false) && <Preview />}
				</Flex.Child>

				{getSetting("sticky_preview", false) && <Preview />}
			</Flex>
		);
	}
}
