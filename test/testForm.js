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
    this.shallowForm = shallow(<Form {...props} />);
  });

  it('should render a <Form /> component', function() {
    expect(this.shallowForm).to.have.length(1);
  });

  it('should render a header', function() {
    expect(this.shallowForm.find('.card-header').text()).to.eq(header)
  });

  describe('Full Name', function() {
    beforeEach(function() {
      this.fullForm = render(<Form {...props} />);
    });

    it('should render a label', function() {
      expect(this.fullForm.find('label[for="x_full_name"]').text()).to
        .eq('Full Name');
    });

    it('should render a text field with a placeholder', function() {
      expect(this.fullForm.find('input#x_full_name').prop('placeholder')).to
        .eq('Enter your full name');
    });
  });

});

