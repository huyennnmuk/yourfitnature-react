import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function() {
    this.submit();
  };
}
