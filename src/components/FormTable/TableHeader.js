import React from 'react';

const getHeader = ([key, value]) => {
  return value.title || '';
};

const getData = (properties) => (
  Object.entries(properties).map(getHeader)
);

const TableHeader = (props) => {
  const {
    properties,
  } = props;

  const headers = getData(properties);

  return (
    <thead>
      <tr>
        {headers.map((header, i) => {
          return (
            <th scope="column" key={i}>
              {header}
            </th>
          )
        })}
        <th>
          Delete
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
