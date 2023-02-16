import { render, mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import TodoList from './TodoList';

const props = {
  todoItems: [
    { id: 1, name: 'task 01', completed: true },
    { id: 2, name: 'task 02', completed: false },
  ],
  setTodoItems: jest.fn(),
  isCompleted: true,
};

jest.mock('axios');

describe('TodoList', () => {
  it('should take TodoList snapshot', () => {
    const wrapper = render(<TodoList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should list correctly using Enzyme and Jest', () => {
    let wrapper;
    wrapper = mount(<TodoList {...props} />);
    wrapper.update();
    expect(wrapper.find('.task-item')).toHaveLength(1);
    expect(wrapper.find('.task-item').at(0).find('.task-text').text()).toBe(
      'task 01'
    );
  });

  it('should delete the item on delete button click', async () => {
    let wrapper;
    axios.delete.mockResolvedValue();

    await act(async () => {
      wrapper = mount(<TodoList {...props} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.task-item')
        .at(0)
        .simulate('mouseover')
        .find('.bi-trash')
        .simulate('click');
    });
    wrapper.update();

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/tasks/1');
  });
});
