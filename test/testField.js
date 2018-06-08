import React from 'react';

import Field from '../src/components/FormField';

const props = {
  getRootSchema() { return {} },
  schema: {},
}

describe('<Field />', () => {
  it('should render a <Field /> component', () => {
    const field = shallow(<Field {...props} />);
    expect(field).to.have.length(1);
  });
});

