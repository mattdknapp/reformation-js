import React from 'react';

import Form from '../src/components/Form';
import schema from './fixtures/simpleSchema.json';

const formState = {
  fieldOne: 'default',
  fieldTwo: 'anotherDefault',
}

const header = 'My Amazing Form';

const props = {
  header,
  schema,
  formState,
}

describe('<Form />', () => {
  beforeEach(function() {
    this.form = shallow(<Form {...props} />);
    // console.log(this.form.html())
  });

  it('should render a <Form /> component', function() {
    expect(this.form).to.have.length(1);
  });

  it('should render a header', function() {
    expect(this.form.find('.card-header').text()).to.eq(header)
  });
});

