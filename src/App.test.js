import App from './App';
import { configure, EnzymeAdapter, render } from 'enzyme';
import axios from 'axios';

configure({ adapter: new EnzymeAdapter() });
jest.mock('axios');

describe('App', function () {
  it('should list correctly', function () {
    const wrapper = render(<App />);
    const mockGet = axios.get.mockResolvedValue([
      { id: 1, name: 'task 01', completed: false },
      { id: 2, name: 'task 02', completed: false },
    ]);
    expect(wrapper).toContain('task 01');
    expect(wrapper).toContain('task 02');
    expect(mockGet).toHaveBeenCalled();
  });
});
