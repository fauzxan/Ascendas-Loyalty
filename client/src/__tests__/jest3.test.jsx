import renderer from 'react-test-renderer';

//const renderer = require('react-test-renderer');
//const Link = require('../Link');

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://localhost:3000/Ascendas-Loyalty#/enquire">Ascendas</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});