import React, { Component } from "react";

import {
	SwitchItem,
	TextInput,
	Category,
	FormTitle,
} from "@vizality/components/settings";
import { Flex } from "@vizality/components";
import { getModule } from "@vizality/webpack";

import Preview from "./Preview";

let timeout;

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
			setActivity,
			defaults,
		} = this.props;

		const { FormSection } = getModule("FormSection");
		const { marginBottom40 } = getModule("marginBottom40");

		const updateActivity = () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				setActivity();
			}, 500);
		};

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
							updateActivity();
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
							updateActivity();
						}}
					>
						Application ID
					</TextInput>
					<TextInput
						note="First line, bold."
						defaultValue={getSetting("name", defaults.name)}
						onChange={(value) => {
							updateSetting("name", value);
							updateActivity();
						}}
					>
						Name
					</TextInput>
					<TextInput
						note="Second line unless previous input is empty."
						defaultValue={getSetting("details", defaults.details)}
						onChange={(value) => {
							updateSetting("details", value);
							updateActivity();
						}}
					>
						Details
					</TextInput>
					<TextInput
						note="Third line unless any previous inputs are empty."
						defaultValue={getSetting("state", defaults.state)}
						onChange={(value) => {
							updateSetting("state", value);
							updateActivity();
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
									updateActivity();
								}}
							>
								Asset
							</TextInput>
							<TextInput
								note="This text will appear as a tooltip when hovering over the large image."
								defaultValue={getSetting("large_text", defaults.large_text)}
								onChange={(value) => {
									updateSetting("large_text", value);
									updateActivity();
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
									updateActivity();
								}}
							>
								Asset
							</TextInput>
							<TextInput
								note="This text will appear as a tooltip when hovering over the small image."
								defaultValue={getSetting("small_text", defaults.small_text)}
								onChange={(value) => {
									updateSetting("small_text", value);
									updateActivity();
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
									updateSetting("button1", {
										label: val,
										url: getSetting("button1", defaults.button1).url || "",
									});
									updateActivity();
								}}
							>
								Text
							</TextInput>
							<TextInput
								defaultValue={getSetting("button1", defaults.button1).url}
								onChange={(val) => {
									updateSetting("button1", {
										label: getSetting("button1", defaults.button1).label || "",
										url: val,
									});
									updateActivity();
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
									updateSetting("button2", {
										label: val,
										url: getSetting("button2", defaults.button2).url || "",
									});
									updateActivity();
								}}
							>
								Text
							</TextInput>
							<TextInput
								defaultValue={getSetting("button2", defaults.button2).url}
								onChange={(val) => {
									updateSetting("button2", {
										label: getSetting("button2", defaults.button2).label || "",
										url: val,
									});
									updateActivity();
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
