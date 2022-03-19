import { render } from '@testing-library/react';
import App from '../containers/App';

test('renders learn react link', () => {
  const { container } = render(<App />);
  const linkElement = container.querySelector('.App');
  expect(linkElement).toBeInTheDocument();
});

// figure out snapshots later
// test('renders correctly', () => {
//   try{
//     const {asFragment} = render(<App />);
//     expect(asFragment()).toMatchSnapshot();
//   } catch(err){
//     console.log(err)
//   }
// });
