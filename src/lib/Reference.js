const reduceValue = (pre, next) => {
  if(pre) {
    return pre[Number(next) || next];
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
    return Reference(value);
  },
  nothing(message, nullable) {
    return Nothing(message, nullable);
  },
  of(value) {
    return this.fromNullable(value);
  },
  isNothing() {
    return false;
  },
  isReference() {
    return false;
  },
  fromNullable(message, nullable) {
    if(!nullable || !nullable.path || !nullable.schema) {
      return (this.nothing(message, nullable));
    }

    const refExists = !!getValue(nullable);
    return refExists? this.refWrapper(nullable) : this.nothing('Object is not a valid ref', nullable)
  }
});

const Nothing = (message, instantiator) => ({
  ...Maybe(),
  value() {
    if(instantiator) {
      console.error(instantiator.path);
      console.error(instantiator.schema);
    }

    const errorMessage = message || 'No value provided';
    throw new TypeError(errorMessage);
  },
  valueOrElse(other) {
    return other;
  },
  isNothing() {
    return true;
  },
  map() {
    return this;
  }
});

const Reference = ({
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
  isReference() {
    return true;
  },
  map(func) {
    return this.of(func(this.value()));
  }
});

const RefWrapper = (val) => {
  return Maybe().fromNullable(null, val);
};

export default RefWrapper;
