import React, {ComponentType, ComponentProps} from 'react';

export const onlyGuest = (Component: ComponentType) => (props: ComponentProps<any>) => {
  // todo: check with parent domain if user already authenticated
  return <Component {...props}/>
};

