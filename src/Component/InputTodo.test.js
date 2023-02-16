import { render, mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import InputTodo from './InputTodo';

const props = {
  todoItems: [],
  setTodoItems: jest.fn(),
};

const addResponse = {
  data: {
    id: 3,
    name: 'task 03',
    completed: false,
  },
};

jest.mock('axios');

describe('InputTodo', () => {
  it('should take InputTodo snapshot', () => {
    const wrapper = render(<InputTodo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add a todo item when click the add button', async () => {
    let wrapper;
    const mockAdd = axios.post.mockResolvedValue(addResponse);

    await act(async () => {
      wrapper = mount(<InputTodo {...props} />);
    });
    wrapper.update();
    wrapper
      .find('.add-input')
      .simulate('change', { target: { value: 'task 03' } });

    await act(async () => {
      wrapper.find('.add-button').simulate('click');
    });
    wrapper.update();

    expect(mockAdd).toHaveBeenCalledWith('http://localhost:8080/tasks', {
      completed: false,
      name: 'task 03',
    });
  });
});
