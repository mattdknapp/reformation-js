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
    this.form = render(<Form {...props} />);
  });

  it('should render a <Form /> component', function() {
    expect(this.form).to.have.length(1);
  });

  it('should render a header', function() {
    expect(this.form.find('.card-header').text()).to.eq(header)
  });

  describe('name field', function() {
    it('should render a label', function() {
      expect(this.form.find('label[for="x_full_name"]').text()).to
        .eq('Full Name');
    });

    it('should render a text field with a placeholder', function() {
      expect(this.form.find('input#x_full_name').prop('placeholder')).to
        .eq('Enter your full name');
    });
  });

});

