import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Notifications Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<Notifications />);
  });

  describe('Renders correct elements based on displayDrawer prop', () => {
    it('renders the menu item when displayDrawer is false', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} />);
      expect(wrapper.find('div').at(0).text()).toContain('Your notifications');
      expect(wrapper.find('div').at(1).exists()).toBe(false);
    });

    it('renders the notifications div when displayDrawer is true', () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find('div').at(0).find('p').text()).toContain('Here is the list of notifications');
      expect(wrapper.find('div').at(1).exists()).toBe(false);
    });
  });

  describe('Renders notifications correctly based on listNotifications prop', () => {
    it('renders default notification message when listNotifications is not passed or is an empty array', () => {
      const wrapperWithoutList = shallow(<Notifications displayDrawer={true} />);
      const wrapperWithEmptyList = shallow(
        <Notifications displayDrawer={true} listNotifications={[]} />
      );

      [wrapperWithoutList, wrapperWithEmptyList].forEach(wrapper => {
        expect(wrapper.find(NotificationItem)).toHaveLength(1);
        expect(wrapper.find(NotificationItem).prop('value')).toEqual(
          'No new notification for now'
        );
      });
    });

    it('renders the correct number of notifications and their content when listNotifications contains elements', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'Notification 1' },
        { id: 2, type: 'urgent', value: 'Notification 2' },
        { id: 3, type: 'urgent', html: { __html: '<u>Notification 3</u>' } }
      ];

      const wrapper = shallow(
        <Notifications displayDrawer={true} listNotifications={notifications} />
      );

      expect(wrapper.find(NotificationItem)).toHaveLength(notifications.length);

      notifications.forEach((notification, index) => {
        const item = wrapper.find(NotificationItem).at(index);
        expect(item.prop('type')).toEqual(notification.type);

        if (notification.html) {
          expect(item.prop('html')).toEqual(notification.html);
        } else {
          expect(item.prop('value')).toEqual(notification.value);
        }
      });
    });
  });

  describe('<Notifications />', () => {
    let consoleLogSpy;

    beforeAll(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterAll(() => {
      consoleLogSpy.mockRestore();
    });

    it('calls markAsRead with correct message when notification is marked as read', () => {
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={[
            { id: 1, type: 'default', value: 'Test notification' }
          ]}
        />
      );

      wrapper.instance().markAsRead(1);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Notification 1 has been marked as read'
      );
    });
  });

  describe('Notifications component', () => {
    it('does not re-render when updating props with the same list', () => {
      const listNotifications = [
        { id: 1, type: 'default', value: 'New course available' }
      ];

      const wrapper = shallow(
        <Notifications displayDrawer listNotifications={listNotifications} />
      );

      const shouldComponentUpdateSpy = jest.spyOn(
        Notifications.prototype,
        'shouldComponentUpdate'
      );

      wrapper.setProps({ listNotifications });

      expect(shouldComponentUpdateSpy).toHaveReturnedWith(false);

      shouldComponentUpdateSpy.mockRestore();
    });

    it('re-renders when updating props with a longer list', () => {
      const initialList = [
        { id: 1, type: 'default', value: 'New course available' }
      ];

      const newList = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' }
      ];

      const wrapper = shallow(
        <Notifications displayDrawer listNotifications={initialList} />
      );

      const shouldComponentUpdateSpy = jest.spyOn(
        Notifications.prototype,
        'shouldComponentUpdate'
      );

      wrapper.setProps({ listNotifications: newList });

      expect(shouldComponentUpdateSpy).toHaveReturnedWith(true);

      shouldComponentUpdateSpy.mockRestore();
    });
  });

  it('calls handleDisplayDrawer when the menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    wrapper.setProps({ displayDrawer: false });
    const menuItem = wrapper.find('#menuItem');
    menuItem.simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  it('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );
    const closeButton = wrapper.find('#closeBtn');
    closeButton.simulate('click');
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });
});
