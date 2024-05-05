import React from 'react';

type ErrorProps = {
  error: Error | null;
};

export default function Error({ error }: ErrorProps) {
  return <div>{error?.message}</div>;
}
