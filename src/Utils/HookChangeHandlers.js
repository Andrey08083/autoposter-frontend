import requestErrorsHandler from './RequestErrorsHandler';

export const handleTextChange = (setHook) => (e) => setHook(e.target.value);

export const handleAPIRequest = (apiRequest, requestParams) => apiRequest(requestParams)
  .catch(requestErrorsHandler);
