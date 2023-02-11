import App from './App';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { render, screen, waitFor } from '@testing-library/react';
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

const addResponse = {
  data: {
    id: 3,
    name: 'task 03',
    completed: false,
  },
};

const checkResponse = {
  data: {
    id: 1,
    name: 'task 01',
    completed: true,
  },
};

const uncheckResponse = {
  data: {
    id: 2,
    name: 'task 02',
    completed: false,
  },
};

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(getResponse);
  });

  it('should list correctly using testLibrary', async () => {
    const mockAxios = axios.get.mockResolvedValue(getResponse);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('task 01')).toBeInTheDocument();
      expect(screen.getByText('task 02')).toBeInTheDocument();
    });
    expect(mockAxios).toHaveBeenCalledWith('http://localhost:8080/tasks');
  });

  it('should list correctly using Enzyme and Jest', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<App />);
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

  it('should add correctly', async () => {
    let wrapper;
    const mockAdd = axios.post.mockResolvedValue(addResponse);

    await act(async () => {
      wrapper = mount(<App />);
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
    expect(wrapper.find('.task-item')).toHaveLength(3);
  });

  it('should delete correctly', async () => {
    let wrapper;
    axios.delete.mockResolvedValue();

    await act(async () => {
      wrapper = mount(<App />);
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
    expect(wrapper.find('.task-item')).toHaveLength(1);
    expect(wrapper.find('.task-item').find('.task-text').text()).toBe(
      'task 02'
    );
  });

  it('should check task', async () => {
    let wrapper;
    axios.put.mockResolvedValue(checkResponse);

    await act(async () => {
      wrapper = mount(<App />);
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.task-item')
        .at(0)
        .find({ type: 'checkbox' })
        .simulate('click');
    });
    wrapper.update();

    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/tasks/1', {
      name: 'task 01',
      completed: true,
    });
    expect(wrapper.find('.completed-list').find('.task-item')).toHaveLength(2);
  });

  it('should uncheck task', async () => {
    let wrapper;
    axios.put.mockResolvedValue(uncheckResponse);

    await act(async () => {
      wrapper = mount(<App />);
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.task-item')
        .at(1)
        .find({ type: 'checkbox' })
        .simulate('click');
    });
    wrapper.update();

    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/tasks/2', {
      name: 'task 02',
      completed: false,
    });
    expect(wrapper.find('.todo-list').find('.task-item')).toHaveLength(2);
  });
});
