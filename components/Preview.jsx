import React, { memo } from 'react';

import { getModule, getModuleByDisplayName } from '@vizality/webpack';
import { Card } from '@vizality/components';
import { FormItem } from '@vizality/components/settings';

const UserActivitySection = getModuleByDisplayName('UserActivitySection');
const HelpMessage = getModuleByDisplayName('HelpMessage');
const findActivityModule = getModule(m => m.default?.findActivity);
const getStreamForUserModule = getModule(m => m.default?.getStreamForUser);
const { getCurrentUser } = getModule('getCurrentUser');
const { useStateFromStores } = getModule('useStateFromStores');

export default memo(({ sticky }) => {
  const currentUser = getCurrentUser();

  const hasActivity = useStateFromStores(
    [ findActivityModule.default ],
    () => findActivityModule.default
      .findActivity(
        currentUser.id,
        e => e.type !== getModule('ActivityTypes').ActivityTypes.CUSTOM_STATUS
      )
  );
  const hasStream = useStateFromStores(
    [ getStreamForUserModule.default ],
    () => getStreamForUserModule.default
      .getStreamForUser(currentUser.id)
  );

  return (
    <div style={sticky ? { position: 'sticky', top: '79px' } : { }}>
      <FormItem title="Current Activity">
        {
          hasActivity != null ||
          hasStream
            ? (
              <Card>
                <UserActivitySection user={currentUser} />
              </Card>
            )
            : (
              <HelpMessage messageType={2}>
                Custom Rich Presence is unable to detect any activities, even though there should be at least one from Custom Rich Presence. This may be due to activity status being disabled or having your status set to "invisible".
              </HelpMessage>
            )
        }
      </FormItem>
    </div>
  );
});
