import jwt from 'jsonwebtoken'
/*
  WE WILL SEND THE JWT TO THE FRONTEND UPON SUCCESSFUL REGISTRATION OR LOGIN, AND THE FRONTEND WILL SEND  SEND IT BACK WITH EVERY REQUEST AS LONG AS THE JWT HAS NOT EXPIRED
*/

/**
 * GENERATES JWT
 * @param {id, role} payload
 * @returns {token} token
 */
export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  return token
}
