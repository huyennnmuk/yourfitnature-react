import React from 'react';

const customMotion = (Component) => {
  return React.forwardRef((props, ref) => {
    const {
      initial,
      animate,
      exit,
      variants,
      transition,
      whileHover,
      whileTap,
      whileFocus,
      whileDrag,
      whileInView,
      ...rest
    } = props;
    return <Component ref={ref} {...rest} />;
  });
};

const motion = {
  div: customMotion('div'),
  button: customMotion('button'),
  h2: customMotion('h2'),
  // Add any other motion elements you use in your components
};

export { motion };