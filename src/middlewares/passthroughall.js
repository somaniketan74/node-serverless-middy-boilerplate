export const passthroughAll = () => ({
  before: (_, next) => next(),
  after: (_, next) => next(),
  onError: (_, next) => next(),
});
