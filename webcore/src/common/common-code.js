/**
 * Created by hien.tran on 6/9/2017.
 */

const systems = {
  unauthorized: {
    code: 401,
    msg: "Unauthorized!"
  },
  forbidden: {
    code: 403,
    msg: "Forbidden!"
  },
  notFound: {
    code: 404,
    msg: "Not Found!"
  },
  invalidToken: {
    code: 600,
    msg: 'Invalid Token!'
  },
  systemError: {
    code: 500,
    msg: "System Error!"
  }
}

export { systems }