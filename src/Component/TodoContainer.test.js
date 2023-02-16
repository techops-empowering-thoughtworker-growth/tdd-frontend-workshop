// import { shallow } from 'enzyme';
import { mount, render } from 'enzyme';
import TodoContainer from './TodoContainer';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

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

jest.mock('axios');

describe('TodoContainer', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(getResponse);
  });

  it('should match snapshot', async () => {
    const wrapper = render(<TodoContainer />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render static app', () => {
    const wrapper = render(<TodoContainer />);
    expect(wrapper.find('.title').text()).toBe(
      'Use this to manage your life and work'
    );
    expect(wrapper.find('.add-input').prop('placeholder')).toBe(
      'Enter your todo item'
    );
    expect(wrapper.find('.add-button').text()).toBe('+');
    expect(wrapper.find('h2').text()).toBe('Completed');
  });

  it('should list correctly using Enzyme and Jest', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<TodoContainer />);
    });
    wrapper.update();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/tasks');
    expect(wrapper.find('.task-item')).toHaveLength(2);
    expect(wrapper.find('.task-item').at(0).find('.task-text').text()).toBe(
      'task 01'
    );
    expect(wrapper.find('.task-item').at(1).find('.task-text').text()).toBe(
      'task 02'
    );
  });
});
