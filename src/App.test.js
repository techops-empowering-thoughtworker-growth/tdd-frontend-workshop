import { mount, shallow } from 'enzyme';
import App from './App';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios');

const getResponse = {
  data: [
    {
      id: 1,
      name: 'task 01',
      completed: false,
    },
    {
      id: 2,
      name: 'task 02',
      completed: true,
    },
  ],
};

describe('App test', () => {
  it('should render static app', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.find('.main').find('.input-component').find('.title').text()
    ).toBe('Use this to manage your work and life');
    expect(
      wrapper
        .find('.main')
        .find('.input-component')
        .find('.input-bar')
        .find('.add-input')
        .prop('placeholder')
    ).toBe('Enter your todo item');
    expect(
      wrapper
        .find('.main')
        .find('.input-component')
        .find('.input-bar')
        .find('.add-button')
        .text()
    ).toBe('+');
    expect(wrapper.find('.todo-list')).toHaveLength(1);
    expect(
      wrapper
        .find('.main')
        .find('.completed-list')
        .find('.completed-title')
        .text()
    ).toBe('Completed');
  });

  it('should list tasks correctly', async () => {
    axios.get.mockResolvedValue(getResponse);
    let wrapper;
    await act(async () => {
      wrapper = mount(<App />);
    });
    wrapper.update();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/tasks');
    expect(wrapper.find('.task-item')).toHaveLength(2);
    expect(wrapper.find('.todo-list').find('.task-item')).toHaveLength(1);
    expect(wrapper.find('.completed-list').find('.task-item')).toHaveLength(1);
  });
});
