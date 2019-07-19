export const HTTP_STATUS_CODES: { [key: string]: number } = {

  /*
   *   The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give
   *   proper response. Unlike 401, the client's identity is known to the server.
   */
  forbidden: 403,

  /*
   * The request has succeeded. The meaning of a success varies depending on the HTTP method:
   * GET: The resource has been fetched and is transmitted in the message body.
   * HEAD: The entity headers are in the message body.
   * PUT or POST: The resource describing the result of the action is transmitted in the message body.
   * TRACE: The message body contains the request message as received by the server
   */
  success: 200,

  /*
   * This response means that server could not understand the request due to invalid syntax.
   */
  bad_request: 400,

  /*
   * The server has encountered a situation it doesn't know how to handle.
   */
  internal_server_error: 500,

  /*
   * There is no content to send for this request, but the headers may be useful.
   * The user-agent may update its cached headers for this resource with the new ones.
   */
  no_content: 204

};
