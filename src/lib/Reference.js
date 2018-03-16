const reduceValue = (pre, next) => {
	if(pre) {
    return pre[next];
  }

  return null;
};

const getValue = ({ path, schema }) => {
  if(!path) {
    return null;
  }
  const keys = path.replace('#/', '').split('/');
  return keys.reduce(reduceValue, schema);
};

const Maybe = () => ({
  refWrapper (value){
    return RefWrapper(value)
  },
  nothing() {
    return Nothing()
  },
  of(value) {
    return this.fromNullable(value)
  },
  isNothing() {
    return false
  },
  isRefWrapper() {
    return false
  },
  fromNullable(nullable) {
    if(!nullable || !nullable.path || !nullable.schema) {
      return (this.nothing('Invalid instantiator', nullable));
    }

    const refExists = !!getValue(nullable);
    return refExists? this.refWrapper(nullable) : this.nothing('Object not a valid ref', nullable)
  }
});

const Nothing = (message, instantiator) => ({
  ...Maybe(),
  value() {
    if(instantiator) {
      console.error(instantiator);
    }

    const errorMessage = message || 'No value provided';
    throw new TypeError(errorMessage);
  },
  valueOrElse() {
    return '';
  },
  isNothing() {
    return true;
  },
  map() {
    return this;
  }
});

const RefWrapper = ({
  path,
  schema
}) => ({
  ...Maybe(),
  value() {
    return getValue({path, schema});
  },
  valueOrElse() {
    return this.value()
  },
  path() {
    return path;
  },
  schema() {
    return schema;
  },
  isRefWrapper() { return  true },
  map(func) {
    return this.of(func(this.value()))
  }
});

const Reference = (val) => {
  return Maybe().fromNullable(val);
};

export default Reference;
