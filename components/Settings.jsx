import React, { memo, useState } from 'react';

import { SwitchItem, TextInput, Category, FormTitle } from '@vizality/components/settings';
import { Flex } from '@vizality/components';
import { getModule } from '@vizality/webpack';

import Preview from './Preview';

const { FormSection } = getModule('FormSection');
const { marginBottom40 } = getModule('marginBottom40');

let timeout;

export default memo(({ getSetting, updateSetting, toggleSetting, setActivity, defaults }) => {
  const [ category0Opened, setCategory0Opened ] = useState(false);
  const [ category1Opened, setCategory1Opened ] = useState(false);

  const [ detailsError, setDetailsError ] = useState(false);
  const [ stateError, setStateError ] = useState(false);
  const [ largeTextError, setLargeTextError ] = useState(false);
  const [ smallTextError, setSmallTextError ] = useState(false);
  const [ button1UrlError, setButton1UrlError ] = useState(false);
  const [ button2UrlError, setButton2UrlError ] = useState(false);

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
          getSetting('sticky_preview', false) && {
            paddingRight: '20px',
            borderRight: 'thin solid var(--background-modifier-accent)',
            marginRight: '20px'
          }
        }
      >
        <SwitchItem
          note='When Sticky Preview is enabled, the preview will stick to the right so that you can always see it.'
          value={getSetting('sticky_preview', false)}
          onChange={() => {
            toggleSetting('sticky_preview');
          }}
        >
          Sticky Preview
        </SwitchItem>
        <SwitchItem
          value={getSetting('timestamps_start', true)}
          onChange={() => {
            toggleSetting('timestamps_start');
            updateActivity();
          }}
        >
          Show Time
        </SwitchItem>
        <TextInput
          note={
            <div
              class={getModule('markup').markup}
              style={{ color: 'var(--header-secondary)' }}
            >
              Influences what assets are available for use as images. (Default value: <code class='inline'>{defaults.id}</code>)
            </div>
          }
          defaultValue={getSetting('id', defaults.id)}
          required={true}
          onChange={(value) => {
            updateSetting('id', value);
            updateActivity();
          }}
        >
          Application ID
        </TextInput>
        <TextInput
          note='First line, bold.'
          defaultValue={getSetting('name', defaults.name)}
          onChange={(value) => {
            updateSetting('name', value);
            updateActivity();
          }}
        >
          Name
        </TextInput>
        <TextInput
          maxLength={128}
          note='Second line unless previous input is empty.'
          error={detailsError && 'Must be at least 2 characters long or empty.'}
          defaultValue={getSetting('details', defaults.details)}
          onChange={(value) => {
            if (value.length < 2 && value.length !== 0) {
              setDetailsError(true);
              updateSetting('details', '');
            } else {
              setDetailsError(false);
              updateSetting('details', value);
            }
            updateActivity();
          }}
        >
          Details
        </TextInput>
        <TextInput
          maxLength={128}
          note='Third line unless any previous inputs are empty.'
          error={stateError && 'Must be at least 2 characters long or empty.'}
          defaultValue={getSetting('state', defaults.state)}
          onChange={(value) => {
            if (value.length < 2 && value.length !== 0) {
              setStateError(true);
              updateSetting('state', '');
            } else {
              setStateError(false);
              updateSetting('state', value);
            }
            updateActivity();
          }}
        >
          State
        </TextInput>

        <Category
          name='Images'
          description='Select a large/small image and (optionally) define their tooltip text.'
          opened={category0Opened}
          onChange={() => {
            setCategory0Opened(!category0Opened);
            setCategory1Opened(false);
          }}
        >
          <FormSection className={marginBottom40}>
            <FormTitle>Large Image</FormTitle>

            <TextInput
              maxLength={32}
              note="This should be the name of your large image's asset."
              defaultValue={getSetting('large_image', defaults.large_image)}
              onChange={(value) => {
                updateSetting('large_image', value);
                updateActivity();
              }}
            >
              Asset
            </TextInput>
            <TextInput
              maxLength={128}
              note='This text will appear as a tooltip when hovering over the large image.'
              error={largeTextError && 'Must be at least 2 characters long or empty.'}
              defaultValue={getSetting('large_text', defaults.large_text)}
              onChange={(value) => {
                if (value.length < 2 && value.length !== 0) {
                  setLargeTextError(true);
                  updateSetting('large_text', '');
                } else {
                  setLargeTextError(false);
                  updateSetting('large_text', value);
                }
                updateActivity();
              }}
            >
              Text
            </TextInput>
          </FormSection>

          <FormSection className={marginBottom40}>
            <FormTitle>Small Image</FormTitle>

            <TextInput
              maxLength={32}
              note="This should be the name of your small image's asset."
              defaultValue={getSetting('small_image', defaults.small_image)}
              onChange={(value) => {
                updateSetting('small_image', value);
                updateActivity();
              }}
            >
              Asset
            </TextInput>
            <TextInput
              maxLength={128}
              note='This text will appear as a tooltip when hovering over the small image.'
              error={smallTextError && 'Must be at least 2 characters long or empty.'}
              defaultValue={getSetting('small_text', defaults.small_text)}
              onChange={(value) => {
                if (value.length < 2 && value.length !== 0) {
                  setSmallTextError(true);
                  updateSetting('small_text', '');
                } else {
                  setSmallTextError(false);
                  updateSetting('small_text', value);
                }
                updateActivity();
              }}
            >
              Text
            </TextInput>
          </FormSection>
        </Category>

        <Category
          name='Buttons'
          description='Define up to two buttons.'
          opened={category1Opened}
          onChange={() => {
            setCategory0Opened(false);
            setCategory1Opened(!category1Opened);
          }}
        >
          <FormSection className={marginBottom40}>
            <FormTitle>Button 1</FormTitle>

            <TextInput
              maxLength={32}
              defaultValue={getSetting('button1', defaults.button1).label}
              onChange={(value) => {
                updateSetting('button1', {
                  label: value,
                  url: getSetting('button1', defaults.button1).url
                });
                updateActivity();
              }}
            >
              Text
            </TextInput>
            <TextInput
              maxLength={512}
              error={button1UrlError && 'Must be a valid URI.'}
              defaultValue={getSetting('button1', defaults.button1).url}
              onChange={(value) => {
                if (!value.startsWith('http') && value.length > 0) {
                  setButton1UrlError(true);
                  updateSetting('button1', {
                    label: getSetting('button1', defaults.button1).label,
                    url: ''
                  });
                } else {
                  setButton1UrlError(false);
                  updateSetting('button1', {
                    label: getSetting('button1', defaults.button1).label,
                    url: value
                  });
                }
                updateActivity();
              }}
            >
              Url
            </TextInput>
          </FormSection>

          <FormSection>
            <FormTitle>Button 2</FormTitle>

            <TextInput
              maxLength={32}
              defaultValue={getSetting('button2', defaults.button2).label}
              onChange={(value) => {
                updateSetting('button2', {
                  label: value,
                  url: getSetting('button2', defaults.button2).url
                });
                updateActivity();
              }}
            >
              Text
            </TextInput>
            <TextInput
              maxLength={512}
              error={button2UrlError && 'Must be a valid URI.'}
              defaultValue={getSetting('button2', defaults.button2).url}
              onChange={(value) => {
                if (!value.startsWith('http') && value.length > 0) {
                  setButton2UrlError(true);
                  updateSetting('button2', {
                    label: getSetting('button2', defaults.button2).label,
                    url: ''
                  });
                } else {
                  setButton2UrlError(false);
                  updateSetting('button2', {
                    label: getSetting('button2', defaults.button2).label,
                    url: value
                  });
                }
                updateActivity();
              }}
            >
              Url
            </TextInput>
          </FormSection>
        </Category>

        {!getSetting('sticky_preview', false) && <Preview sticky={false} />}
      </Flex.Child>

      {getSetting('sticky_preview', false) && <Preview sticky={true} />}
    </Flex>
  );
});
