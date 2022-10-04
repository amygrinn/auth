import React from 'react';

export default class TayBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  { hasError: boolean }
> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <p>Oops, something went wrong.</p>;
    }

    return this.props.children;
  }
}
